import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "شروط الاستخدام | خدماتي",
    description: "شروط الاستخدام لمنصة خدماتي - الشروط والأحكام التي تحكم استخدامك للمنصة.",
};

export default function TermsPage() {
    return (
        <div className="container py-12 md:py-24 px-4 md:px-6 dir-rtl" dir="rtl">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-start">
                    <Button variant="ghost" asChild className="gap-2 hover:bg-primary/10 hover:text-primary">
                        <Link href="/">
                            <ArrowRight className="h-4 w-4" />
                            العودة للرئيسية
                        </Link>
                    </Button>
                </div>

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
                        شروط الاستخدام
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        منصة خدماتي (Khadamati)
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-right">
                    <p className="lead">
                        مرحبًا بكم في منصة خدماتي. باستخدامك لهذا الموقع أو أي من خدماته، فإنك تقرّ وتوافق على الالتزام بشروط الاستخدام هذه. في حال عدم الموافقة على أي بند من هذه الشروط، يُرجى عدم استخدام المنصة.
                    </p>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">أولاً: التعريفات</h2>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li><strong>المنصة:</strong> موقع خدماتي الإلكتروني وجميع الخدمات المرتبطة به.</li>
                            <li><strong>المستخدم:</strong> كل شخص يقوم بزيارة المنصة أو إنشاء حساب فيها، سواء كان عميلاً أو مقدّم خدمة.</li>
                            <li><strong>مقدّم الخدمة:</strong> أي شخص مسجّل في المنصة لعرض أو تقديم خدماته للعملاء.</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">ثانياً: شروط التسجيل</h2>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>يجب أن يكون المستخدم بعمر لا يقل عن 18 عامًا.</li>
                            <li>يلتزم المستخدم بتقديم معلومات صحيحة ودقيقة ومحدّثة عند التسجيل.</li>
                            <li>يتحمّل المستخدم كامل المسؤولية عن الحفاظ على سرية بيانات الدخول الخاصة به.</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">ثالثاً: استخدام المنصة</h2>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>تُستخدم منصة خدماتي لأغراض قانونية فقط.</li>
                            <li>يُحظر استخدام المنصة لأي نشاط مخالف للقوانين أو الآداب العامة.</li>
                            <li>يلتزم المستخدم بعدم إساءة استخدام المنصة أو محاولة اختراقها أو التأثير على أدائها.</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">رابعاً: شروط مقدّمي الخدمات</h2>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>يلتزم مقدّم الخدمة بتقديم مستندات صحيحة، مثل الهوية الرسمية والشهادات المهنية عند الطلب.</li>
                            <li>يتحمّل مقدّم الخدمة المسؤولية الكاملة عن جودة الخدمات المقدّمة.</li>
                            <li>يحق للمنصة تعليق أو إلغاء حساب أي مقدّم خدمة في حال ثبوت تقديم معلومات غير صحيحة أو إساءة استخدام المنصة.</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">خامساً: الحجوزات والدفع</h2>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>تتم عمليات الحجز والدفع وفقًا للآلية المعتمدة في المنصة.</li>
                            <li>لا تتحمّل منصة خدماتي أي مسؤولية عن النزاعات التي قد تنشأ بين العميل ومقدّم الخدمة، إلا في حدود إدارة الشكاوى وفق السياسات الداخلية.</li>
                            <li>يقرّ المستخدم بأن أي تعامل يتم عبر المنصة يكون على مسؤوليته الخاصة.</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">سادساً: التقييمات والمحتوى</h2>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>يلتزم المستخدم بتقديم تقييمات حقيقية وغير مسيئة.</li>
                            <li>يُمنع نشر أي محتوى يتضمن إساءة، تشهير، معلومات كاذبة، أو انتهاك لحقوق الآخرين.</li>
                            <li>يحق للمنصة حذف أو تعديل أي محتوى يخالف هذه الشروط.</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">سابعاً: الملكية الفكرية</h2>
                        <p>
                            جميع حقوق الملكية الفكرية المتعلقة بالمنصة، بما في ذلك الاسم والشعار والتصميم والمحتوى، هي ملك حصري لمنصة خدماتي، ويُمنع استخدامها دون إذن خطي مسبق.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">ثامناً: إيقاف أو إنهاء الحساب</h2>
                        <p>يحق لمنصة خدماتي تعليق أو إنهاء أي حساب في حال:</p>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>مخالفة شروط الاستخدام</li>
                            <li>تقديم معلومات مضللة</li>
                            <li>إساءة استخدام المنصة</li>
                            <li>وجود نشاط غير قانوني أو مشبوه</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">تاسعاً: تحديد المسؤولية</h2>
                        <p>لا تتحمّل منصة خدماتي أي مسؤولية عن:</p>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>جودة أو نتائج الخدمات المقدّمة من مقدّمي الخدمات</li>
                            <li>أي خسائر مباشرة أو غير مباشرة ناتجة عن استخدام المنصة</li>
                            <li>أي أعطال تقنية خارجة عن السيطرة</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">عاشراً: التعديلات</h2>
                        <p>
                            تحتفظ منصة خدماتي بحق تعديل شروط الاستخدام في أي وقت، ويتم نشر التعديلات على هذه الصفحة، ويُعد استمرار استخدام المنصة موافقة على الشروط المعدّلة.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">حادي عشر: القانون الواجب التطبيق</h2>
                        <p>
                            تخضع شروط الاستخدام هذه وتُفسّر وفقًا للقوانين المعمول بها في جمهورية العراق.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">ثاني عشر: التواصل</h2>
                        <p>
                            لأي استفسار أو شكوى بخصوص شروط الاستخدام، يمكن التواصل مع إدارة منصة خدماتي عبر القنوات الرسمية المعتمدة.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
