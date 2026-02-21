import Link from "next/link";
import { Hammer } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="rounded-lg bg-primary p-1.5">
                                <Hammer className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-primary">
                                خدماتي
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            منصتك الأولى للخدمات المنزلية والمهنية في العراق. تجربة آمنة، موثوقة، وسهلة للجميع.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">الشركة</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-primary">
                                    من نحن
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-primary">
                                    وظائف
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary">
                                    اتصل بنا
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">خدمات</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/services/cleaning" className="hover:text-primary">
                                    تنظيف
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/repair" className="hover:text-primary">
                                    صيانة
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/moving" className="hover:text-primary">
                                    نقل أثاث
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">قانوني</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-primary">
                                    سياسة الخصوصية
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary">
                                    شروط الاستخدام
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} خدماتي. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
}
