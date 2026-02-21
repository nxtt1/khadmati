"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Wrench, Home as HomeIcon, Truck, ShieldCheck, Star, Zap, Droplets, Paintbrush, Hammer, Utensils, Scissors, Monitor, GraduationCap, HeartPulse, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const services = [
    { id: 1, name: "تنظيف منازل", description: "تنظيف شامل للمنازل والشقق", icon: HomeIcon, color: "bg-blue-100 text-blue-600" },
    { id: 2, name: "صيانة عامة", description: "تصليحات عامة وتركيبات", icon: Wrench, color: "bg-orange-100 text-orange-600" },
    { id: 3, name: "نقل اغراض", description: "نقل عفش وأثاث مع الفك والتركيب", icon: Truck, color: "bg-green-100 text-green-600" },
    { id: 4, name: "كهرباء", description: "تأسيس وصيانة كهرباء", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
    { id: 5, name: "سباكة", description: "تأسيس وصيانة صحيات", icon: Droplets, color: "bg-cyan-100 text-cyan-600" },
    { id: 6, name: "صبغ وديكور", description: "صبغ جدران وديكورات داخلية", icon: Paintbrush, color: "bg-purple-100 text-purple-600" },
    { id: 7, name: "حدادة ونجارة", description: "تفصيل وصيانة أبواب وشبابيك", icon: Hammer, color: "bg-slate-100 text-slate-600" },
    { id: 8, name: "طبخ ومناسبات", description: "تجهيز طعام للمناسبات والعزائم", icon: Utensils, color: "bg-red-100 text-red-600" },
    { id: 9, name: "تجميل وعناية", description: "خدمات تجميل منزلية", icon: Scissors, color: "bg-pink-100 text-pink-600" },
    { id: 10, name: "تقنيات", description: "صيانة كمبيوتر وموبايل", icon: Monitor, color: "bg-indigo-100 text-indigo-600" },
    { id: 11, name: "تعليم خصوصي", description: "مدرسين خصوصي لكل المراحل", icon: GraduationCap, color: "bg-teal-100 text-teal-600" },
    { id: 12, name: "تمريض منزلي", description: "رعاية كبار السن وخدمات تمريضية", icon: HeartPulse, color: "bg-rose-100 text-rose-600" },
    { id: 13, name: "غسيل سيارات", description: "غسيل وتلميع سيارات متنقل", icon: Car, color: "bg-sky-100 text-sky-600" },
    { id: 14, name: "مكافحة حشرات", description: "رش مبيدات ومكافحة قوارض", icon: ShieldCheck, color: "bg-lime-100 text-lime-600" },
];

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredServices = services.filter((service) =>
        service.name.includes(searchQuery) || service.description.includes(searchQuery)
    );

    return (
        <div className="flex min-h-screen flex-col bg-muted/30">
            <Navbar />

            <main className="flex-1">
                {/* Header Section */}
                <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="container relative px-4 md:px-6 text-center space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">تصفح الخدمات</h1>
                        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                            اكتشف مجموعة واسعة من الخدمات المنزلية والشخصية التي نقدمها من خلال شبكة من المحترفين الموثوقين.
                        </p>

                        <div className="max-w-xl mx-auto mt-8 relative">
                            <div className="relative flex items-center bg-background rounded-full border shadow-lg p-1">
                                <div className="pl-4 pr-3 text-muted-foreground">
                                    <Search className="h-5 w-5" />
                                </div>
                                <Input
                                    className="border-0 shadow-none focus-visible:ring-0 text-base py-6 bg-transparent text-foreground placeholder:text-muted-foreground"
                                    placeholder="على شنو دتدور؟ (مثلاً: تنظيف، كهربائي...)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button size="lg" className="rounded-full px-8">بحث</Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16">
                    <div className="container px-4 md:px-6">
                        {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredServices.map((service, index) => <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    <Link href={`/services/${service.name}`}>
                                        <Card className="h-full hover:shadow-lg transition-all cursor-pointer group border-none shadow-sm bg-background">
                                            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                                <div className={`p-3 rounded-xl ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                                                    <service.icon className="h-6 w-6" />
                                                </div>
                                                <CardTitle className="text-lg font-bold">{service.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription className="text-base mt-2">
                                                    {service.description}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-xl text-muted-foreground">ما لقينا شي يطابق بحثك 😔</p>
                                <Button variant="link" onClick={() => setSearchQuery("")}>عرض كل الخدمات</Button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
