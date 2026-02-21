"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, ShieldCheck, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Temporary Dummy Data for Prototyping
const DUMMY_WORKERS = [
    { id: 1, name: "أحمد علي", rating: 4.8, reviews: 124, price: 15000, location: "المنصور، بغداد", avatar: "أ", verified: true, description: "خبرة 10 سنوات في صيانة المنازل والتنظيف الشامل." },
    { id: 2, name: "سجاد حسن", rating: 4.5, reviews: 89, price: 10000, location: "الكرادة، بغداد", avatar: "س", verified: true, description: "متخصص في التنظيف العميق والشقق الجديدة." },
    { id: 3, name: "محمد جاسم", rating: 4.9, reviews: 210, price: 25000, location: "زيونة، بغداد", avatar: "م", verified: true, description: "فريق كامل مستعد لأي اعمال تنظيف او صيانة منزلية كبرى." },
    { id: 4, name: "علي رعد", rating: 4.2, reviews: 45, price: 8000, location: "الأعظمية، بغداد", avatar: "ع", verified: false, description: "خدمات سريعة وموثوقة بأسعار مناسبة." },
    { id: 5, name: "عمر خالد", rating: 4.7, reviews: 156, price: 20000, location: "الدورة، بغداد", avatar: "ع", verified: true, description: "دقة في العمل والتزام بالمواعيد." },
    { id: 6, name: "مصطفى صباح", rating: 4.4, reviews: 67, price: 12000, location: "العامرية، بغداد", avatar: "م", verified: false, description: "شاب طموح يقدم خدمات ممتازة." },
];

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const categoryName = decodeURIComponent(params.category as string);

    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");

    // Filtering Logic
    const filteredWorkers = DUMMY_WORKERS.filter(worker => {
        const matchesSearch = worker.name.includes(searchQuery) || worker.location.includes(searchQuery) || worker.description.includes(searchQuery);

        const price = worker.price;
        const min = minPrice === "" ? 0 : parseFloat(minPrice);
        const max = maxPrice === "" ? Infinity : parseFloat(maxPrice);

        const matchesPrice = price >= min && price <= max;

        return matchesSearch && matchesPrice;
    });

    return (
        <div className="flex min-h-screen flex-col bg-muted/30">
            <Navbar />

            <main className="flex-1">
                {/* Header Section */}
                <section className="bg-primary text-primary-foreground py-12 md:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="container relative px-4 md:px-6">
                        <Button variant="ghost" className="mb-6 gap-2 text-primary-foreground hover:text-primary hover:bg-white/90" onClick={() => router.back()}>
                            <ArrowRight className="h-4 w-4" /> رجوع
                        </Button>
                        <div className="text-center space-y-4">
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">محترفي {categoryName}</h1>
                            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                                تصفح أفضل المحترفين الموثوقين لخدمات {categoryName} بأسعار تناسب ميزانيتك.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Search & Filters */}
                <section className="py-8 bg-white border-b sticky top-16 z-20 shadow-sm">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Text Search */}
                            <div className="relative w-full lg:w-96 flex-1">
                                <Search className="absolute right-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="ابحث بالاسم، الموقع، أو الوصف..."
                                    className="pr-9 bg-muted/50 border-input focus:bg-background h-11"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Price Filters */}
                            <div className="flex items-center w-full lg:w-auto gap-3 flex-wrap sm:flex-nowrap">
                                <div className="flex items-center gap-2 bg-muted/30 border rounded-lg p-1 w-full sm:w-auto flex-1">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-2.5 text-xs text-muted-foreground font-semibold">د.ع</div>
                                        <Input
                                            type="number"
                                            placeholder="السعر من"
                                            className="border-0 shadow-none focus-visible:ring-0 text-sm h-9 bg-transparent pl-6 pr-2 rounded-md"
                                            min={0}
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-px h-6 bg-border mx-1 hidden sm:block"></div>
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-2.5 text-xs text-muted-foreground font-semibold">د.ع</div>
                                        <Input
                                            type="number"
                                            placeholder="إلى"
                                            className="border-0 shadow-none focus-visible:ring-0 text-sm h-9 bg-transparent pl-6 pr-2 rounded-md"
                                            min={0}
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button className="h-11 px-8 gap-2 w-full sm:w-auto">
                                    <Filter className="h-4 w-4" /> تصفية
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Workers Grid */}
                <section className="py-12">
                    <div className="container px-4 md:px-6">
                        <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
                            <span>نعرض {filteredWorkers.length} محترف</span>
                        </div>

                        {filteredWorkers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {filteredWorkers.map((worker, index) => (
                                        <motion.div
                                            key={worker.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                            layout
                                        >
                                            <Card className="h-full hover:shadow-lg transition-all border-none shadow-sm bg-background group overflow-hidden">
                                                <CardContent className="p-6">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-14 w-14 border-2 border-primary/10">
                                                                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{worker.avatar}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h3 className="font-bold text-lg flex items-center gap-1.5">
                                                                    {worker.name}
                                                                    {worker.verified && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                                                                </h3>
                                                                <div className="flex items-center gap-1 text-sm text-amber-500">
                                                                    <Star className="h-3.5 w-3.5 fill-current" />
                                                                    <span className="font-medium text-foreground">{worker.rating}</span>
                                                                    <span className="text-muted-foreground">({worker.reviews})</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center bg-secondary/20 px-3 py-1.5 rounded-xl border border-secondary/30">
                                                            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">السعر</div>
                                                            <div className="font-bold text-primary flex items-baseline gap-0.5">{worker.price.toLocaleString()} د.ع</div>
                                                        </div>
                                                    </div>

                                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                                                        {worker.description}
                                                    </p>

                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                                                        <MapPin className="h-3.5 w-3.5" /> {worker.location}
                                                    </div>

                                                    <Button className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="outline">
                                                        تواصل مع المحترف
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-2xl border border-dashed">
                                <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">ما لقينا محترفين</h3>
                                <p className="text-muted-foreground">
                                    جرب تغير شروط البحث أو الأسعار.
                                </p>
                                <Button variant="link" onClick={() => { setSearchQuery(""); setMinPrice(""); setMaxPrice(""); }} className="mt-4">
                                    مسح الفلاتر
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
