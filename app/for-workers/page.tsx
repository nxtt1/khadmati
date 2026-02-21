"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Clock, Shield, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ForWorkersPage() {
    const { user } = useAuth();

    const benefits = [
        {
            title: "دخل إضافي ومضمون",
            description: "زيد دخلك من خلال الوصول لآلاف الزبائن اللي يحتاجون خدماتك يومياً.",
            icon: DollarSign,
            color: "bg-green-100 text-green-600"
        },
        {
            title: "أوقات عمل مرنة",
            description: "أنت مدير نفسك. اختار الأوقات اللي تناسبك والشغلات اللي تحب تسويها.",
            icon: Clock,
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "تسويق مجاني لنفسك",
            description: "ما تحتاج تصرف فلوس إعلانات. ملفك الشخصي وتقييماتك هي اللي تجيبلك الشغل.",
            icon: TrendingUp,
            color: "bg-purple-100 text-purple-600"
        },
        {
            title: "ضمان حقوقك",
            description: "نظامنا يضمن حقك، وتفاصيل الاتفاق موثقة بالمنصة.",
            icon: Shield,
            color: "bg-orange-100 text-orange-600"
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-muted/30">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-primary text-primary-foreground py-20 md:py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="container relative px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6 text-center lg:text-right"
                        >
                            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground mb-2">
                                👷‍♂️ انضم لمجتمع المحترفين
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-center md:text-right">
                                حول مهاراتك إلى <span className="text-secondary">دخل مستمر</span>
                            </h1>
                            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-center md:text-right">
                                عندك مهارة؟ سواء كنت كهربائي، سباك، نجار، أو حتى مدرس خصوصي.. مكانك ويانا موجود. سجل الآن وابدأ باستقبال الطلبات.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {!user ? (
                                    <Button size="lg" variant="secondary" className="rounded-full px-8 text-lg h-12 w-full sm:w-auto" asChild>
                                        <Link href="/auth/register?role=worker">سجل كمحترف مجاناً</Link>
                                    </Button>
                                ) : (
                                    <Button size="lg" variant="secondary" className="rounded-full px-8 text-lg h-12 w-full sm:w-auto" asChild>
                                        <Link href="/dashboard/worker">اذهب للوحة التحكم</Link>
                                    </Button>
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-background p-6 text-foreground">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div className="font-bold text-lg">أحدث الطلبات القريبة منك</div>
                                        <div className="text-sm text-green-600 font-medium">نشط الآن</div>
                                    </div>
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-default">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Users className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-sm">تصليح تكييف سبليت</div>
                                                <div className="text-xs text-muted-foreground">الكرادة (2 كم) • الميزانية: 25,000 د.ع</div>
                                            </div>
                                            <Button size="sm" variant="outline">عرض</Button>
                                        </div>
                                    ))}
                                </div>
                                {/* Floating Stats Card */}
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border animate-bounce-slow">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                                            <TrendingUp className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground">معدل الدخل الشهري</div>
                                            <div className="font-bold text-lg">+850,000 د.ع</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">ليش تشتغل ويانا؟</h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                                نوفرلك كل الأدوات اللي تحتاجها حتى تنجح وتكبر شغلك.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="h-full border-none shadow-sm bg-background hover:shadow-md transition-all text-center group">
                                        <CardHeader>
                                            <div className={`w-16 h-16 rounded-2xl ${benefit.color} mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <benefit.icon className="h-8 w-8" />
                                            </div>
                                            <CardTitle className="text-xl">{benefit.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Requirements Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-6">شنو تحتاج حتى تبدأ؟</h2>
                                <ul className="space-y-4">
                                    {[
                                        "أن يكون عمرك 18 سنة فما فوق.",
                                        "هوية أحوال مدنية أو بطاقة وطنية نافذة.",
                                        "مهارة أو حرفة حقيقية تقدر تقدمها.",
                                        "شهادة أو إجازة ممارسة مهنة (إن وجدت).",
                                        "حسن السيرة والسلوك والالتزام بالمواعيد.",
                                        "هاتف ذكي لاستقبال الطلبات."
                                    ].map((req, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                                            <span className="text-lg">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative h-[400px] bg-gray-200 rounded-2xl overflow-hidden">
                                {/* Placeholder for an image of a happy worker */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-muted-foreground">
                                    <Users className="h-20 w-20 opacity-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Footer */}
                <section className="py-24">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-6">جاهز تبدأ رحلتك؟</h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            آلاف الزبائن بانتظار خدماتك. لا تضيع الفرصة وسجل ويانا اليوم.
                        </p>
                        {!user ? (
                            <Button size="lg" className="rounded-full px-10 text-lg h-14" asChild>
                                <Link href="/auth/register?role=worker">سـجــل الآن</Link>
                            </Button>
                        ) : (
                            <Button size="lg" className="rounded-full px-10 text-lg h-14" asChild>
                                <Link href="/dashboard/worker">لوحة التحكم</Link>
                            </Button>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
