"use client";

import { Plus, Clock, CheckCircle, Search, Filter, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";

export default function CustomerDashboard() {
    const { user } = useAuth();
    const [activeRequests, setActiveRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [jobToDelete, setJobToDelete] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "jobs"),
            where("customerId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const jobs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setActiveRequests(jobs);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const confirmDelete = async () => {
        if (!jobToDelete) return;
        try {
            await deleteDoc(doc(db, "jobs", jobToDelete));
            setJobToDelete(null);
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("حدث خطأ أثناء حذف الطلب");
        }
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <Navbar />
            <main className="container py-8 px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">لوحة التحكم</h1>
                        <p className="text-muted-foreground">هلا بيك، تابع طلباتك وشوف آخر التحديثات.</p>
                    </div>
                    <Button className="gap-2 shadow-lg hover:shadow-xl transition-all rounded-full px-6" asChild>
                        <Link href="/dashboard/customer/post">
                            <Plus className="h-4 w-4" /> طلب جديد
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-12">

                    {/* Main Content Area */}
                    <div className="md:col-span-8 space-y-6">

                        {/* Stats Cards */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="shadow-sm border-none">
                                <CardHeader className="pb-2">
                                    <CardDescription>الطلبات الفعالة</CardDescription>
                                    <CardTitle className="text-3xl text-primary">{activeRequests.length}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card className="shadow-sm border-none">
                                <CardHeader className="pb-2">
                                    <CardDescription>المكتملة</CardDescription>
                                    <CardTitle className="text-3xl text-primary">0</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card className="shadow-sm border-none">
                                <CardHeader className="pb-2">
                                    <CardDescription>صرفياتك</CardDescription>
                                    <CardTitle className="text-3xl text-primary">$0</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Tasks Tab */}
                        <Tabs defaultValue="active" className="w-full">
                            <div className="flex items-center justify-between mb-4">
                                <TabsList className="bg-background border">
                                    <TabsTrigger value="active">تشتغل هسه</TabsTrigger>
                                    <TabsTrigger value="completed">خلصت</TabsTrigger>
                                    <TabsTrigger value="drafts">مسودات</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="active" className="space-y-4">
                                {loading ? (
                                    <div className="text-center py-10">جارِ التحميل...</div>
                                ) : activeRequests.length === 0 ? (
                                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                                        <p className="text-muted-foreground mb-4">ما عندك أي طلبات حالياً</p>
                                        <Button variant="outline" asChild>
                                            <Link href="/dashboard/customer/post">اطلب شغلة جديدة</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    activeRequests.map((req) => (
                                        <Card key={req.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                                            <CardContent className="p-0">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="h-full w-full md:w-2 bg-primary/10 md:bg-primary/80" /> {/* Status Strip */}
                                                    <div className="flex-1 p-6">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h3 className="font-bold text-lg">{req.title}</h3>
                                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                                    <Clock className="h-3 w-3" /> نشرت: {req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleDateString('ar-IQ') : 'الآن'}
                                                                </p>
                                                            </div>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="-mt-2 -ml-2 text-muted-foreground">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem
                                                                        className="text-destructive focus:text-destructive cursor-pointer"
                                                                        onClick={() => setJobToDelete(req.id)}
                                                                    >
                                                                        <Trash className="mr-2 h-4 w-4" />
                                                                        <span>حذف الطلب</span>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>

                                                        <Separator className="my-4" />

                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant={req.status === "open" ? "secondary" : "default"} className="font-normal">
                                                                    {req.status === "open" ? "ننتظر العروض" : "ديشتغلون عليها"}
                                                                </Badge>
                                                            </div>
                                                            <div className="font-bold text-lg cursor-default">
                                                                {req.budget.toLocaleString()} د.ع
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )))}
                            </TabsContent>
                            <TabsContent value="completed">
                                <div className="text-center py-12 text-muted-foreground">
                                    ماكو طلبات مخلصة جديد
                                </div>
                            </TabsContent>
                        </Tabs>

                    </div>

                    {/* Sidebar Area */}
                    <div className="md:col-span-4 space-y-6">
                        <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
                            <CardHeader>
                                <CardTitle>عضوية مميزة ✨</CardTitle>
                                <CardDescription className="text-primary-foreground/80">
                                    احصل على عروض أسرع وخصومات .
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button variant="secondary" className="w-full text-black hover:bg-white/90">سوي ترقية لحسابك</Button>
                            </CardFooter>
                        </Card>

                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">نشاط حديث</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback>U{i}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">قدم محمد علي عرض جديد</p>
                                            <p className="text-xs text-muted-foreground">قبل 15 دقيقة</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                </div>

                <AlertDialog open={!!jobToDelete} onOpenChange={(open) => !open && setJobToDelete(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد من حذف هذا الطلب؟</AlertDialogTitle>
                            <AlertDialogDescription>
                                هذا الإجراء نهائي ولا يمكن استرجاع الطلب بعد حذفه.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90 text-white">
                                نعم، احذف الطلب
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </main>
        </div>
    );
}
