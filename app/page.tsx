"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Wrench, Home as HomeIcon, Truck, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingSticker } from "@/components/ui/floating-sticker";

const categories = [
  { name: "تنظيف منازل", icon: HomeIcon, color: "bg-blue-100 text-blue-600" },
  { name: "صيانة عامة", icon: Wrench, color: "bg-orange-100 text-orange-600" },
  { name: "نقل اغراض", icon: Truck, color: "bg-green-100 text-green-600" },
  { name: "كهرباء", icon: Star, color: "bg-yellow-100 text-yellow-600" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-20" />

          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">


            {/* Floating Icons/Stickers - Animated & Hand Drawn Style - HIGH CONTRAST / DARK */}
            <FloatingSticker className="top-20 left-[15%]" duration={5} rotateRange={[-10, 10]} yRange={[-15, 15]}>
              {/* Hand drawn star 1 */}
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-20">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </FloatingSticker>

            <FloatingSticker className="top-40 left-[8%]" delay={1} duration={6} rotateRange={[-5, 5]} yRange={[0, 20]}>
              {/* Hand drawn arrow down */}
              <svg width="50" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-20">
                <path d="M12 2v20" />
                <path d="m19 15-7 7-7-7" />
              </svg>
            </FloatingSticker>

            <FloatingSticker className="top-60 left-[12%]" delay={2} duration={5.5} rotateRange={[5, -5]} yRange={[0, -20]}>
              {/* Hand drawn arrow up */}
              <svg width="40" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-20">
                <path d="M12 22V2" />
                <path d="m5 9 7-7 7 7" />
              </svg>
            </FloatingSticker>

            <FloatingSticker className="bottom-40 left-[20%]" delay={0.5} duration={7} rotateRange={[-15, 0]}>
              {/* Hand drawn messy star */}
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-20">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </FloatingSticker>

            <FloatingSticker className="top-32 right-[10%]" delay={1.5} duration={6} rotateRange={[10, 25]} yRange={[-10, 10]}>
              {/* Hammer - Slightly lighter gray */}
              <Wrench className="w-20 h-20 text-primary opacity-20" strokeWidth={2} />
            </FloatingSticker>

            <FloatingSticker className="bottom-40 right-[15%]" delay={2} duration={5} rotateRange={[-5, 5]} yRange={[10, -10]}>
              {/* Hand drawn arrow up (right side) */}
              <svg width="45" height="75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-20">
                <path d="M12 22V2" />
                <path d="m5 9 7-7 7 7" />
              </svg>
            </FloatingSticker>

            {/* Extra random stickers */}
            <FloatingSticker className="top-[50%] right-[30%] opacity-50" delay={3} duration={8}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-15"><circle cx="12" cy="12" r="10" /></svg>
            </FloatingSticker>
            <FloatingSticker className="bottom-20 right-[40%] opacity-50" delay={1} duration={6}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-15"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </FloatingSticker>
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-primary/20 bg-primary/10 text-primary mb-6">
                  ✨ المنصة الأولى للخدمات في العراق
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl mx-auto leading-tight">
                  كلشي تحتاجه للبيت <span className="text-primary">بلمسة وحدة</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
                  من التنظيف إلى الصيانة، نصلك بأفضل المحترفين الموثوقين في منطقتك.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-lg relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-25 group-hover:opacity-50 blur transition duration-200" />
                <div className="relative flex items-center bg-background rounded-full border shadow-sm p-1">
                  <div className="pl-4 pr-3 text-muted-foreground">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    className="border-0 shadow-none focus-visible:ring-0 text-base py-6 bg-transparent"
                    placeholder="ابحث عن كهربائي، سباك، تنظيف..."
                  />
                  <Button size="lg" className="rounded-full px-8 shadow-md">بحث</Button>
                </div>
              </motion.div>

              <div className="pt-8 flex flex-wrap justify-center gap-3">
                {["تنظيف منازل", "صيانة تكييف", "نقل اغراض", "مكافحة حشرات"].map((tag) => (
                  <Link key={tag} href={`/services/${tag}`}>
                    <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-secondary/50">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 bg-secondary/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">خدماتنا المميزة</h2>
              <p className="mt-4 text-muted-foreground">كل ما يحتاجه منزلك في مكان واحد</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link key={category.name} href={`/services/${category.name}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full cursor-pointer hover:shadow-lg transition-all border-none bg-background shadow-sm group">
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                        <div className={`p-4 rounded-2xl ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                          <category.icon className="h-8 w-8" />
                        </div>
                        <h3 className="font-bold text-lg">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container">
            <div className="relative rounded-3xl bg-primary px-6 py-16 md:px-12 md:py-24 overflow-hidden text-center text-primary-foreground">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">هل أنت محترف؟</h2>
                <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                  انضم إلى فريق مقدمي الخدمات في خدماتي وابدأ في زيادة دخلك اليوم.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="rounded-full px-8 text-lg h-12">
                    <Link href="/auth/register">سجل كمحترف</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-12 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    المزيد من المعلومات
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
