"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [role, setRole] = useState("customer");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        if (!email || !password || !name) return;
        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            // Create user document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                role: role,
                createdAt: new Date().toISOString(),
            });

            // Redirect based on role
            if (role === 'worker') {
                router.push("/dashboard/worker");
            } else {
                router.push("/dashboard/customer");
            }
        } catch (error) {
            console.error("Error registering:", error);
            alert("فشل إنشاء الحساب. تأكد من المعلومات وحاول مرة ثانية.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">سوي حساب جديد</CardTitle>
                <CardDescription>
                    أدخل معلوماتك حتى تبدي ويانا
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {/* Role Selection */}
                <div className="grid gap-2">
                    <Label>نوع الحساب</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            className={`cursor-pointer rounded-md border p-4 text-center transition-all ${role === 'customer' ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}
                            onClick={() => setRole('customer')}
                        >
                            <div className="font-semibold">زبون</div>
                            <div className="text-xs text-muted-foreground">أدور خدمات</div>
                        </div>
                        <div
                            className={`cursor-pointer rounded-md border p-4 text-center transition-all ${role === 'worker' ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}
                            onClick={() => setRole('worker')}
                        >
                            <div className="font-semibold">أسطة</div>
                            <div className="text-xs text-muted-foreground">أريد أشتغل</div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                        id="name"
                        placeholder="فلان الفلاني"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <Button className="w-full" onClick={handleRegister} disabled={loading}>
                    {loading ? "جارِ التسجيل..." : "تسجيل"}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                    عندك حساب؟{" "}
                    <Link href="/auth/login" className="text-primary hover:underline">
                        فوت لحسابك
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
