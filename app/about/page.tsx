"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Hammer, Users, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="container relative px-4 md:px-6 text-center space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            من نحن – خدماتي (Khadamati)
                        </h1>
                        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                            منصتك الأولى للخدمات الموثوقة في العراق
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-12 lg:grid-cols-2 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center rounded-lg bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-medium">
                                    عن خدماتي
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                                    نربطك بأفضل المحترفين
                                </h2>
                                <p className="text-lg text-emerald-950 leading-relaxed font-medium">
                                    خدماتي هي منصة عراقية رقمية تهدف إلى تسهيل الوصول إلى الخدمات اليومية وربط العملاء بمقدّمي الخدمات الموثوقين بكل سهولة وأمان.
                                </p>
                                <p className="text-lg text-emerald-950 leading-relaxed font-medium">
                                    جاءت فكرة خدماتي من حاجة حقيقية في المجتمع العراقي؛ حيث يواجه الكثير من الناس صعوبة في العثور على عامل موثوق بسرعة، وفي نفس الوقت يعاني عدد كبير من أصحاب المهارات والشهادات من قلة فرص العمل. من هنا، قررنا إنشاء منصة تخدم الطرفين.
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <Card>
                                    <CardContent className="p-6 flex flex-col gap-4">
                                        <div className="p-3 w-fit rounded-lg bg-emerald-100 text-emerald-600">
                                            <Hammer className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold text-lg text-emerald-900">سهولة الاستخدام</h3>
                                        <p className="text-emerald-800 font-medium">
                                            واجهة بسيطة وسهلة تتيح لك طلب أي خدمة بضغطة زر.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 flex flex-col gap-4">
                                        <div className="p-3 w-fit rounded-lg bg-emerald-100 text-emerald-600">
                                            <ShieldCheck className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold text-lg text-emerald-900">أمان وموثوقية</h3>
                                        <p className="text-emerald-800 font-medium">
                                            نتحقق من هوية مقدمي الخدمات لضمان راحة بالك.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="sm:col-span-2">
                                    <CardContent className="p-6 flex flex-col gap-4">
                                        <div className="p-3 w-fit rounded-lg bg-emerald-100 text-emerald-600">
                                            <Users className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold text-lg text-emerald-900">فرص عمل للجميع</h3>
                                        <p className="text-emerald-800 font-medium">
                                            نساعد أصحاب المهارات في العثور على فرص عمل وزيادة دخلهم.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
