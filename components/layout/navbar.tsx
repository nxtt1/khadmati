"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Hammer } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
    { name: "الرئيسية", href: "/" },
    { name: "تصفح الخدمات", href: "/services" },
    { name: "كيف تعمل", href: "/how-it-works" },
    { name: "للمحترفين", href: "/for-workers" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary p-1.5">
                            <Hammer className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-primary">
                            خدماتي
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:items-center md:gap-6">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-primary font-bold"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex md:items-center md:gap-4">
                    <ThemeToggle />
                    {user ? (
                        <>
                            <Button asChild className="hidden lg:flex font-bold shadow-md animate-pulse">
                                <Link href="/dashboard/customer/post">
                                    + اطلب خدمة
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link href="/dashboard/customer">لوحة التحكم</Link>
                            </Button>
                            <Button variant="outline" onClick={() => signOut()}>
                                تسجيل خروج
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button asChild className="hidden lg:flex font-bold shadow-md">
                                <Link href="/auth/login?redirect=/dashboard/customer/post">
                                    + اطلب خدمة
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link href="/auth/login">تسجيل الدخول</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/auth/register">إنشاء حساب</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X className="h-6 w-6 text-foreground" />
                    ) : (
                        <Menu className="h-6 w-6 text-foreground" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border-b bg-background md:hidden"
                >
                    <div className="flex flex-col space-y-4 p-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href
                                        ? "text-primary font-bold"
                                        : "text-muted-foreground"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href={user ? "/dashboard/customer/post" : "/auth/login?redirect=/dashboard/customer/post"}
                            className="text-sm font-medium transition-colors text-primary hover:text-primary/80 font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            + اطلب خدمة
                        </Link>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm font-medium">المظهر</span>
                            <ThemeToggle />
                        </div>
                        <div className="flex flex-col gap-2 pt-4 border-t">
                            {user ? (
                                <>
                                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                                        <Link href="/dashboard/customer">لوحة التحكم</Link>
                                    </Button>
                                    <Button variant="outline" onClick={() => { signOut(); setIsOpen(false); }}>
                                        تسجيل خروج
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                                        <Link href="/auth/login">تسجيل الدخول</Link>
                                    </Button>
                                    <Button asChild onClick={() => setIsOpen(false)}>
                                        <Link href="/auth/register">إنشاء حساب</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </header>
    );
}
