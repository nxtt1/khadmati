"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, addDoc, updateDoc, collection, query, where, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Job } from "@/types";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Clock, Share2, Heart, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function JobDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
    const [proposalPrice, setProposalPrice] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [proposals, setProposals] = useState<any[]>([]);

    // Check if current user has already applied
    useEffect(() => {
        const checkApplicationStatus = async () => {
            if (!user || !params.id) return;
            const q = query(
                collection(db, "proposals"),
                where("jobId", "==", params.id),
                where("workerId", "==", user.uid)
            );
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                setHasApplied(true);
            }
        };
        checkApplicationStatus();
    }, [user, params.id]);

    // Fetch Job Details
    useEffect(() => {
        const fetchJob = async () => {
            if (!params.id) return;
            try {
                const docRef = doc(db, "jobs", params.id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setJob({ id: docSnap.id, ...docSnap.data() } as Job);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching job:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [params.id]);

    // Fetch proposals if user is the customer (owner)
    useEffect(() => {
        if (!user || !job || user.uid !== job.customerId) return;

        const q = query(
            collection(db, "proposals"),
            where("jobId", "==", job.id)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const proposalsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProposals(proposalsData);
        });

        return () => unsubscribe();
    }, [user, job]);

    const handleApply = async () => {
        if (!user || !job) return;
        setSubmitting(true);
        try {
            await addDoc(collection(db, "proposals"), {
                jobId: job.id,
                workerId: user.uid,
                workerName: user.displayName || user.email?.split('@')[0] || "عامل",
                price: Number(proposalPrice) || job.budget,
                coverLetter,
                status: 'pending',
                createdAt: serverTimestamp(),
            });
            setHasApplied(true);
            setIsApplyDialogOpen(false);
            alert("تم إرسال العرض بنجاح!");
        } catch (error) {
            console.error("Error submitting proposal:", error);
            alert("فشل ارسال العرض");
        } finally {
            setSubmitting(false);
        }
    };

    const handleAcceptProposal = async (proposal: any) => {
        if (!confirm("متأكد تريد توافق على هذا العرض؟")) return;

        try {
            // 1. Update Proposal Status
            const proposalRef = doc(db, "proposals", proposal.id);
            await updateDoc(proposalRef, { status: 'accepted' });

            // 2. Update Job Status
            if (job && job.id) {
                const jobRef = doc(db, "jobs", job.id);
                await updateDoc(jobRef, {
                    status: 'assigned',
                    workerId: proposal.workerId
                });
            }

            alert("تم قبول العرض بنجاح! تواصل وية المحترف هسه.");
            // Update local job state
            setJob(prev => prev ? { ...prev, status: 'assigned', workerId: proposal.workerId } : null);

        } catch (error) {
            console.error("Error accepting proposal:", error);
            alert("فشل قبول العرض");
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return "الآن";
        const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleDateString('ar-IQ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-muted/30 flex flex-col">
                <Navbar />
                <div className="flex-1 container py-10 flex items-center justify-center">
                    <p className="text-muted-foreground">جارِ تحميل تفاصيل الشغلة...</p>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-muted/30 flex flex-col">
                <Navbar />
                <div className="flex-1 container py-10 flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold">الشغلة ما موجودة</h1>
                    <p className="text-muted-foreground">تأكد من الرابط او يجوز انحذفت.</p>
                    <Button onClick={() => router.push('/dashboard/worker')}>ارجع للوحة التحكم</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30">
            <Navbar />

            <main className="container py-8 px-4 md:px-6">
                <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
                    <ArrowRight className="h-4 w-4" /> رجوع
                </Button>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardHeader className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <Badge variant={job.status === 'open' ? 'success' : 'secondary'} className="px-3 py-1">
                                        {job.status === 'open' ? 'مفتوح' : job.status}
                                    </Badge>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight mb-2">{job.title}</h1>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>نشرت: {formatDate(job.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{job.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="prose max-w-none">
                                    <h3 className="text-xl font-semibold mb-4">تفاصيل الشغلة</h3>
                                    <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                                        {job.description}
                                    </p>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-xl font-semibold mb-4">معلومات اضافية</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <div className="text-sm text-muted-foreground mb-1">الميزانية</div>
                                            <div className="text-2xl font-bold text-primary">{job.budget.toLocaleString()} د.ع</div>
                                        </div>
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <div className="text-sm text-muted-foreground mb-1">الموقع</div>
                                            <div className="font-semibold">{job.location}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <CardTitle>
                                    {user?.uid === job.customerId ? "العروض المقدمة" : "عن الزبون"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {user?.uid === job.customerId ? (
                                    <div className="space-y-4">
                                        {proposals.length === 0 ? (
                                            <p className="text-muted-foreground text-center py-4">ماكو عروض لحد الآن.</p>
                                        ) : (
                                            proposals.map((proposal) => (
                                                <div key={proposal.id} className="p-4 border rounded-lg bg-background">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <div className="font-bold">{proposal.workerName}</div>
                                                            <div className="text-sm text-muted-foreground">عرض: {proposal.price.toLocaleString()} د.ع</div>
                                                        </div>
                                                        {proposal.status === 'accepted' ? (
                                                            <Badge variant="success">مقبول</Badge>
                                                        ) : (
                                                            <Badge variant="outline">جديد</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-3 bg-muted/50 p-2 rounded">
                                                        "{proposal.coverLetter}"
                                                    </p>
                                                    {job.status === 'open' && proposal.status === 'pending' && (
                                                        <Button
                                                            size="sm"
                                                            className="w-full"
                                                            onClick={() => handleAcceptProposal(proposal)}
                                                        >
                                                            قبول العرض
                                                        </Button>
                                                    )}
                                                    {proposal.status === 'accepted' && (
                                                        <Button size="sm" variant="outline" className="w-full">
                                                            تواصل (قريباً)
                                                        </Button>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarFallback>{(job as any).customerName?.substring(0, 2) || 'C'}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold">{(job as any).customerName || 'زبون'}</div>
                                                <div className="text-xs text-muted-foreground">مشترك منذ 2024</div>
                                            </div>
                                        </div>

                                        {user?.uid !== job.customerId && (
                                            <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button className="w-full" size="lg" disabled={hasApplied || job.status !== 'open'}>
                                                        {hasApplied ? "تم التقديم" : (job.status === 'open' ? "قدم عرضك هسه" : "مغلقة")}
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>تقديم عرض</DialogTitle>
                                                        <DialogDescription>
                                                            قدم عرضك للزبون. حاول تكون واضح ومقنع.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="price">السعر المقترح (د.ع)</Label>
                                                            <Input
                                                                id="price"
                                                                type="number"
                                                                value={proposalPrice}
                                                                onChange={(e) => setProposalPrice(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="coverLetter">ليش تختارني؟ (رسالة للزبون)</Label>
                                                            <Textarea
                                                                id="coverLetter"
                                                                placeholder="اني خبرة بهذا المجال..."
                                                                value={coverLetter}
                                                                onChange={(e) => setCoverLetter(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={handleApply} disabled={submitting}>
                                                            {submitting ? "جارِ التقديم..." : "دز العرض"}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                        {user?.uid === job.customerId && (
                                            <Button variant="outline" className="w-full" size="lg">تعديل الطلب</Button>
                                        )}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
