"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export default function PostJobPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Network Check
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            alert("لا يوجد اتصال بالانترنت. يرجى التحقق من الشبكة.");
            return;
        }

        console.log("Submit clicked");
        if (!user) {
            console.error("No user logged in");
            alert("يرجى تسجيل الدخول أولاً");
            return;
        }

        const budgetValue = Number(budget);
        if (isNaN(budgetValue) || budgetValue <= 0) {
            alert("يرجى إدخال ميزانية صحيحة");
            return;
        }

        setLoading(true);

        try {
            console.log("Preparing to add document...");
            const docData = {
                title,
                description,
                location,
                budget: budgetValue,
                status: "open",
                customerId: user.uid,
                customerName: user.displayName || user.email?.split('@')[0] || "زبون",
                createdAt: serverTimestamp(),
            };
            console.log("Document data:", docData);

            // Timeout Promise (10 seconds)
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("REQUEST_TIMEOUT")), 10000);
            });

            // Race addDoc against timeout
            await Promise.race([
                addDoc(collection(db, "jobs"), docData),
                timeoutPromise
            ]);

            console.log("Document added successfully");
            alert("تم نشر الطلب بنجاح!");
            router.push("/dashboard/customer");
        } catch (error) {
            console.error("Error adding document:", error);
            if (error instanceof Error && error.message === "REQUEST_TIMEOUT") {
                alert("تعذر الاتصال بالخادم. الإنترنت ضعيف أو الاتصال محجوب. يرجى المحاولة لاحقاً.");
            } else {
                alert(`فشل نشر الطلب: ${error instanceof Error ? error.message : "خطأ غير معروف"}`);
            }
        } finally {
            console.log("Finally block reached");
            setLoading(false);
        }
    };

    return (
        <div className="container max-w-2xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">اطلب شغلة جديدة</CardTitle>
                    <CardDescription>
                        اوصف الشغلة اللي تريدها، والمحترفين راح يقدمون عليك
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">عنوان الشغلة</Label>
                            <Input
                                id="title"
                                placeholder="مثلاً: تنظيف شقة 3 غرف"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">تفاصيل الشغلة</Label>
                            <Textarea
                                id="description"
                                placeholder="اشرح الشغلة بالتفصيل..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">الموقع</Label>
                                <Input
                                    id="location"
                                    placeholder="بغداد، المنصور"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">الميزانية المقترحة (د.ع)</Label>
                                <Input
                                    id="budget"
                                    type="number"
                                    placeholder="50000"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => router.back()}
                        >
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "جارِ النشر..." : "انشر الطلب"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
