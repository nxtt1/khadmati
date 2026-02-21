"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) return;
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // AuthContext will pick this up, we just redirect
            // Ideally we check their role first, but for now default to customer dashboard
            // or we can fetch their profile here if needed.
            router.push("/dashboard/customer");
        } catch (error) {
            console.error("Error logging in:", error);
            alert("فشل الدخول. تأكد من الإيميل والرمز.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">فوت لحسابك</CardTitle>
                <CardDescription>
                    خلي إيميلك والرمز حتى تفوت
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">الإيميل</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">الرمز</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" onClick={handleLogin} disabled={loading}>
                    {loading ? "جارِ الدخول..." : "دخول"}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                    ما عندك حساب؟{" "}
                    <Link href="/auth/register" className="text-primary hover:underline">
                        سوي حساب جديد
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
