"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
    MapPin,
    Calendar,
    Search,
    Filter,
    ChevronDown,
    Heart,
    Share2,
    MoreHorizontal,
    Clock,
    Briefcase
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/navbar";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { Job } from "@/types";

export default function WorkerDashboard() {
    const [budgetRange, setBudgetRange] = useState([5, 850]);
    const [filters, setFilters] = useState({
        availableOnly: true,
        noOffersOnly: false
    });
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState<any>(null);

    useEffect(() => {
        const q = query(
            collection(db, "jobs"),
            where("status", "==", "open"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedTasks = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(fetchedTasks);
            // Select first task by default if none selected
            if (!selectedTask && fetchedTasks.length > 0) {
                setSelectedTask(fetchedTasks[0]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Helper to format date
    const formatDate = (timestamp: any) => {
        if (!timestamp) return "الآن";
        // Handle Firestore Timestamp or Date string
        const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleDateString('ar-IQ', { weekday: 'long', day: 'numeric', month: 'long' });
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <Navbar />

            {/* ... (Search & Filters - keeping same for now) */}
            {/* Top Bar / Search & Filters */}
            <div className="border-b bg-background sticky top-16 z-30">
                <div className="container py-4 px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="دور على شغلة..."
                                className="pr-9 bg-muted/50 border-transparent focus:bg-background focus:border-input transition-colors"
                            />
                        </div>

                        {/* ... Filters ... */}
                        {/* (Keeping filters UI as is for now, functionality can be added later) */}
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            <Select defaultValue="category">
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="النوع" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="category">النوع</SelectItem>
                                    <SelectItem value="cleaning">تنظيفات</SelectItem>
                                    <SelectItem value="maintenance">صيانة</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* ... more selects ... */}
                        </div>
                    </div>
                </div>
            </div>

            <main className="container py-8 px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-12">

                    {/* Main Feed (Tasks) */}
                    <div className="lg:col-span-8 lg:order-2 space-y-6">

                        {loading ? (
                            <div className="text-center py-20">جارِ تحميل الشغلات...</div>
                        ) : tasks.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed rounded-lg">
                                <p className="text-muted-foreground">ماكو شغلات متاحة حالياً.</p>
                            </div>
                        ) : (
                            <>
                                {/* Selected Task Details View */}
                                {selectedTask && (
                                    <Card className="border-none shadow-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                                        <CardContent className="p-6 md:p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex gap-2">
                                                    <Badge variant="success" className="px-3 py-1 text-xs uppercase tracking-wider">مفتوح</Badge>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                                        <Heart className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <span className="text-xs font-medium text-muted-foreground block mb-2">
                                                        {formatDate(selectedTask.createdAt)}
                                                    </span>
                                                    <h1 className="text-2xl md:text-3xl font-bold leading-tight text-foreground mb-4">
                                                        {selectedTask.title}
                                                    </h1>
                                                </div>
                                                <div className="text-center hidden md:block rtl:mr-6 ltr:ml-6">
                                                    <div className="text-sm text-muted-foreground mb-1">سعر الشغلة</div>
                                                    <div className="text-3xl font-bold text-primary">${selectedTask.budget}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mb-8">
                                                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                                    <AvatarFallback>{selectedTask.customerName ? selectedTask.customerName.substring(0, 2) : "C"}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="text-sm font-medium text-muted-foreground">نشرها</div>
                                                    <div className="font-bold text-foreground">{selectedTask.customerName || "زبون"}</div>
                                                </div>
                                                <Button size="lg" className="mr-auto px-8 rounded-full">
                                                    دز عرضك <Share2 className="mr-2 h-4 w-4 rotate-180" />
                                                </Button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg mb-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-background rounded-full shadow-sm">
                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-muted-foreground">المكان</div>
                                                        <div className="font-semibold">{selectedTask.location}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-background rounded-full shadow-sm">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-muted-foreground">شوكت؟</div>
                                                        <div className="font-semibold">{formatDate(selectedTask.createdAt)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="font-bold text-lg">التفاصيل</h3>
                                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                                    {selectedTask.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Other Listings List */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    {tasks.filter(t => t.id !== selectedTask?.id).map(task => (
                                        <Card
                                            key={task.id}
                                            className="cursor-pointer hover:shadow-md transition-shadow"
                                            onClick={() => setSelectedTask(task)}
                                        >
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <Badge variant="secondary" className="rounded-md font-normal">السعر</Badge>
                                                <span className="font-bold text-primary text-lg">${task.budget}</span>
                                            </CardHeader>
                                            <CardContent className="pt-4">
                                                <h3 className="font-bold mb-2 line-clamp-2 min-h-[3rem]">{task.title}</h3>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>{task.customerName ? task.customerName.substring(0, 2) : "C"}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="text-xs">
                                                        <div className="text-muted-foreground">نشرها</div>
                                                        <div className="font-medium">{task.customerName || "زبون"}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <MapPin className="h-3 w-3" /> {task.location}
                                                </div>

                                                <Button className="w-full rounded-full mt-4" variant="outline" asChild>
                                                    <Link href={`/jobs/${task.id}`}>شوف التفاصيل</Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}

                    </div>

                    {/* Sidebar (Filters) */}
                    <div className="lg:col-span-4 lg:order-1 space-y-6">

                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <h3 className="font-semibold">سعر الشغلة</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <Slider
                                        defaultValue={[5, 850]}
                                        max={1000}
                                        step={10}
                                        value={budgetRange}
                                        onValueChange={setBudgetRange}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between text-sm font-medium mt-2">
                                        <span>$5</span>
                                        <span>${budgetRange[1]}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <h3 className="font-semibold">تصفية</h3>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            الشغلات المتاحة بس
                                        </label>
                                        <p className="text-xs text-muted-foreground">
                                            لا تطلع الشغلات اللي أخذوها
                                        </p>
                                    </div>
                                    <Switch
                                        checked={filters.availableOnly}
                                        onCheckedChange={(c) => setFilters(f => ({ ...f, availableOnly: c }))}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            شغلات ما بيها عروض
                                        </label>
                                        <p className="text-xs text-muted-foreground">
                                            لا تطلع الشغلات اللي دزولها عروض
                                        </p>
                                    </div>
                                    <Switch
                                        checked={filters.noOffersOnly}
                                        onCheckedChange={(c) => setFilters(f => ({ ...f, noOffersOnly: c }))}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </main>
        </div>
    );
}
