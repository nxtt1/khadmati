import { Metadata } from "next";

export const metadata: Metadata = {
    title: "سياسة الخصوصية | خدماتي",
    description: "سياسة الخصوصية لمنصة خدماتي - تعرف على كيفية جمعنا واستخدامنا وحمايتنا لبياناتك الشخصية.",
};

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                        سياسة الخصوصية
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        منصة خدماتي (Khadamati)
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-right">
                    <p className="lead">
                        تحرص منصة خدماتي على حماية خصوصية مستخدميها، وتلتزم بالمحافظة على سرية وأمن البيانات والمعلومات الشخصية التي يتم جمعها أو معالجتها من خلال الموقع الإلكتروني. باستخدامك لمنصة خدماتي، فإنك توافق على الشروط والأحكام الواردة في سياسة الخصوصية هذه.
                    </p>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">أولاً: جمع المعلومات</h2>
                        <p>
                            تقوم منصة خدماتي بجمع ومعالجة بعض البيانات الشخصية عند تسجيل المستخدم أو استخدام الخدمات، وتشمل على سبيل المثال لا الحصر:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>الاسم الكامل</li>
                            <li>رقم الهاتف</li>
                            <li>البريد الإلكتروني</li>
                            <li>معلومات الموقع</li>
                            <li>بيانات الحساب الشخصي</li>
                            <li>المستندات الرسمية لمقدّمي الخدمات (مثل الهوية الوطنية أو الشهادات المهنية)</li>
                            <li>التقييمات والملاحظات</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">ثانياً: استخدام المعلومات</h2>
                        <p>تُستخدم البيانات التي يتم جمعها للأغراض التالية:</p>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>إنشاء وإدارة حسابات المستخدمين</li>
                            <li>تقديم الخدمات وربط العملاء بمقدّمي الخدمات</li>
                            <li>التحقق من هوية مقدّمي الخدمات وصحة المستندات المقدّمة</li>
                            <li>تحسين جودة الخدمات وتطوير المنصة</li>
                            <li>التواصل مع المستخدمين لأغراض تشغيلية أو فنية</li>
                            <li>ضمان الامتثال للأنظمة والقوانين المعمول بها</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">ثالثاً: حماية البيانات</h2>
                        <p>
                            تلتزم منصة خدماتي باتخاذ جميع التدابير الفنية والتنظيمية اللازمة لحماية البيانات الشخصية من أي وصول غير مصرح به أو استخدام غير مشروع أو إفشاء أو تعديل أو إتلاف.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">رابعاً: الإفصاح عن المعلومات</h2>
                        <p>لا تقوم منصة خدماتي بالإفصاح عن البيانات الشخصية لأي طرف ثالث إلا في الحالات التالية:</p>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>بموافقة صريحة من المستخدم</li>
                            <li>إذا كان ذلك مطلوبًا بموجب القوانين أو الأوامر القضائية</li>
                            <li>لحماية حقوق المنصة أو المستخدمين أو منع أي نشاط غير قانوني</li>
                            <li>لمقدّمي الخدمات التقنية وبالقدر اللازم لتشغيل المنصة فقط</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">خامساً: ملفات تعريف الارتباط (Cookies)</h2>
                        <p>
                            قد تستخدم منصة خدماتي ملفات تعريف الارتباط لأغراض تشغيلية وتحليلية، ويحق للمستخدم تعطيلها أو التحكم بها من خلال إعدادات المتصفح، مع العلم أن ذلك قد يؤثر على بعض وظائف المنصة.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">سادساً: حقوق المستخدم</h2>
                        <p>يتمتع المستخدم بالحقوق التالية:</p>
                        <ul className="list-disc list-inside space-y-2 pr-4">
                            <li>الاطلاع على بياناته الشخصية</li>
                            <li>طلب تصحيح أو تحديث البيانات</li>
                            <li>طلب إلغاء الحساب أو حذف البيانات وفقًا للسياسات المعتمدة والأنظمة القانونية</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">سابعاً: مدة الاحتفاظ بالبيانات</h2>
                        <p>
                            تحتفظ منصة خدماتي بالبيانات الشخصية طالما كان ذلك ضروريًا لتحقيق الأغراض الموضحة في هذه السياسة أو وفقًا لما تقتضيه القوانين المعمول بها.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">ثامناً: التعديلات على سياسة الخصوصية</h2>
                        <p>
                            تحتفظ منصة خدماتي بحق تعديل أو تحديث سياسة الخصوصية هذه في أي وقت دون إشعار مسبق، ويتم نشر التعديلات على الموقع الإلكتروني، ويُعد استمرار استخدام المنصة موافقة ضمنية على تلك التعديلات.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6">
                        <h2 className="text-2xl font-bold text-primary">تاسعاً: التواصل</h2>
                        <p>
                            في حال وجود أي استفسار أو شكوى متعلقة بسياسة الخصوصية، يمكن التواصل مع إدارة منصة خدماتي عبر قنوات الاتصال الرسمية المعتمدة.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
