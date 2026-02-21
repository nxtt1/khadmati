"use client";

import { motion } from "framer-motion";
import { Search, UserPlus, ClipboardList, Handshake, CreditCard, Star, FileCheck, Hammer, Send, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HowItWorksPage() {
    const { user } = useAuth();

    const customerSteps = [
        {
            id: 1,
            title: "سجل حسابك",
            description: "بخطوات بسيطة، سوي حساب واختار نوعك 'زبون'.",
            icon: UserPlus,
            color: "bg-blue-100 text-blue-600"
        },
        {
            id: 2,
            title: "اطلب شغلة",
            description: "اضغط على 'اطلب شغلة' واكتب تفاصيل العمل اللي تحتاجه وميزانيتك.",
            icon: ClipboardList,
            color: "bg-orange-100 text-orange-600"
        },
        {
            id: 3,
            title: "اختار المحترف",
            description: "راح تجيك عروض من محترفين، شوف تقييماتهم واختار الأنسب الك.",
            icon: Handshake,
            color: "bg-green-100 text-green-600"
        },
        {
            id: 4,
            title: "اتفق وابدأ",
            description: "تواصل وية المحترف، كمل الشغلة، وبعدين يله تدفع.",
            icon: FileCheck,
            color: "bg-purple-100 text-purple-600"
        }
    ];

    const workerSteps = [
        {
            id: 1,
            title: "سجل كمحترف",
            description: "سوي حساب 'محترف'، واكتب مهاراتك وخبرتك.",
            icon: Hammer,
            color: "bg-blue-100 text-blue-600"
        },
        {
            id: 2,
            title: "تصفح الشغلات",
            description: "شوف طلبات الزبائن القريبة منك والمناسبة لاختصاصك.",
            icon: Search,
            color: "bg-orange-100 text-orange-600"
        },
        {
            id: 3,
            title: "قدم عرضك",
            description: "دز عرض سعر ومقترح للشغلة اللي تعجبك.",
            icon: Send,
            color: "bg-green-100 text-green-600"
        },
        {
            id: 4,
            title: "نفذ واقبض",
            description: "كمل الشغل باتقان، واستلم فلوسك وتقييم زين.",
            icon: CreditCard,
            color: "bg-purple-100 text-purple-600"
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-muted/30">
            <Navbar />

            <main className="flex-1">
                {/* Header Section */}
                <section className="bg-primary text-primary-foreground py-20 md:py-32 relative overflow-hidden text-center">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="container relative px-4 md:px-6 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
                                شلون تشتغل منصة <span className="text-secondary">خدماتي</span>؟
                            </h1>
                            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                                سواء كنت تدور على شخص ينظف البيت، أو تريد تشتغل بمهارتك، خدماتي هي الحل الأسهل والأسرع الك.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Steps Section with Tabs */}
                <section className="py-20">
                    <div className="container px-4 md:px-6">
                        <Tabs defaultValue="customer" className="w-full max-w-5xl mx-auto">
                            <div className="flex justify-center mb-12">
                                <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-muted rounded-full">
                                    <TabsTrigger value="customer" className="rounded-full text-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">أني زبون 🏠</TabsTrigger>
                                    <TabsTrigger value="worker" className="rounded-full text-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">أني محترف 🛠️</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="customer">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {customerSteps.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="relative"
                                        >
                                            {index < customerSteps.length - 1 && (
                                                <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-muted-foreground/20 -z-10 -ml-[50%]" />
                                            )}
                                            <Card className="h-full border-none shadow-md bg-background text-center hover:shadow-lg transition-shadow">
                                                <CardHeader className="flex flex-col items-center pt-8 pb-4">
                                                    <div className={`p-4 rounded-full ${step.color} mb-4`}>
                                                        <step.icon className="h-8 w-8" />
                                                    </div>
                                                    <div className="absolute top-4 right-4 text-6xl font-black text-muted/10 -z-10 font-sans">
                                                        {step.id}
                                                    </div>
                                                    <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription className="text-base">
                                                        {step.description}
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-16 text-center">
                                    {!user && (
                                        <Button size="lg" className="rounded-full px-10 text-lg h-12" asChild>
                                            <Link href="/auth/register?role=customer">ابدأ بطلب خدمة</Link>
                                        </Button>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="worker">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {workerSteps.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="relative"
                                        >
                                            {index < workerSteps.length - 1 && (
                                                <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-muted-foreground/20 -z-10 -ml-[50%]" />
                                            )}
                                            <Card className="h-full border-none shadow-md bg-background text-center hover:shadow-lg transition-shadow">
                                                <CardHeader className="flex flex-col items-center pt-8 pb-4">
                                                    <div className={`p-4 rounded-full ${step.color} mb-4`}>
                                                        <step.icon className="h-8 w-8" />
                                                    </div>
                                                    <div className="absolute top-4 right-4 text-6xl font-black text-muted/10 -z-10 font-sans">
                                                        {step.id}
                                                    </div>
                                                    <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription className="text-base">
                                                        {step.description}
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-16 text-center">
                                    {!user && (
                                        <Button size="lg" className="rounded-full px-10 text-lg h-12" asChild>
                                            <Link href="/auth/register?role=worker">انضم كمحترف</Link>
                                        </Button>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* Trust & Safety Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-4 bg-background rounded-full shadow-sm">
                                    <BadgeCheck className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">محترفين موثقين</h3>
                                <p className="text-muted-foreground">نتأكد من هوية ومهارات كل مقدم خدمة لضمان جودة العمل.</p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-4 bg-background rounded-full shadow-sm">
                                    <Star className="h-8 w-8 text-yellow-500" />
                                </div>
                                <h3 className="text-xl font-bold">تقييمات حقيقية</h3>
                                <p className="text-muted-foreground">اقرأ آراء ومراجعات الزبائن السابقين قبل ما تختار.</p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-4 bg-background rounded-full shadow-sm">
                                    <Handshake className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold">ضمان الرضا</h3>
                                <p className="text-muted-foreground">هدفنا رضاك، وفريق الدعم موجود دائماً للمساعدة.</p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
