"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterForm() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "client";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        // TODO: Implement registration API call
        console.log("Registering as:", type);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 font-cairo" dir="rtl">
            <div className="w-full max-w-md space-y-8 glass p-8 rounded-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        إنشاء حساب جديد
                    </h2>
                    <p className="mt-2 text-center text-sm text-text-muted">
                        {type === "artisan" ? "سجل كحرفي محترف" : "سجل كزبون"}
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <input
                                type="text"
                                required
                                className="relative block w-full rounded-lg border-0 py-2.5 text-white bg-white/5 ring-1 ring-inset ring-gray-800 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4"
                                placeholder="الاسم الكامل"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                required
                                className="relative block w-full rounded-lg border-0 py-2.5 text-white bg-white/5 ring-1 ring-inset ring-gray-800 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4"
                                placeholder="البريد الإلكتروني"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="relative block w-full rounded-lg border-0 py-2.5 text-white bg-white/5 ring-1 ring-inset ring-gray-800 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4"
                                placeholder="كلمة المرور"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-background hover:bg-secondary transition-all"
                        >
                            إنشاء حساب
                        </button>
                    </div>
                    <div className="text-center">
                        <Link href="/login" className="text-sm text-text-muted hover:text-white transition-colors">
                            هل لديك حساب بالفعل؟ سجل دخولك
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-white">جاري التحميل...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
