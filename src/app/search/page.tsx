"use client";

import { useState } from "react";
import { Search, MapPin, Filter, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

const artisans = [
    {
        id: "1",
        name: "ياسين النجار",
        trade: "نجارة",
        city: "الدار البيضاء",
        rating: 4.9,
        reviews: 120,
        price: "ابتداءً من 150 DH",
        image: null,
        isAvailable: true
    },
    {
        id: "2",
        name: "محمد الصباغ",
        trade: "صباغة",
        city: "الرباط",
        rating: 4.7,
        reviews: 85,
        price: "ابتداءً من 200 DH",
        image: null,
        isAvailable: true
    },
    {
        id: "3",
        name: "أمين الكهربائي",
        trade: "كهرباء",
        city: "مراكش",
        rating: 4.8,
        reviews: 150,
        price: "ابتداءً من 100 DH",
        image: null,
        isAvailable: false
    }
];

export default function SearchPage() {
    const [query, setQuery] = useState("");

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 font-cairo" dir="rtl">
            <header className="mb-12">
                <h1 className="text-3xl font-bold text-white mb-4">ابحث عن أمهر الحرفيين</h1>
                <p className="text-text-muted">اختر التخصص والمدينة للحصول على أفضل النتائج.</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="w-full lg:w-72 space-y-8">
                    <div className="glass p-6 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-primary" />
                            تصفية النتائج
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-white block mb-2">المهنة</label>
                                <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white w-full focus:ring-1 focus:ring-primary outline-none appearance-none">
                                    <option>كل المهن</option>
                                    <option>نجارة</option>
                                    <option>صباغة</option>
                                    <option>كهرباء</option>
                                    <option>سباكة</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-white block mb-2">المدينة</label>
                                <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white w-full focus:ring-1 focus:ring-primary outline-none appearance-none">
                                    <option>كل المدن</option>
                                    <option>الدار البيضاء</option>
                                    <option>الرباط</option>
                                    <option>مراكش</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-white block mb-2">التقييم</label>
                                <div className="space-y-2">
                                    {[4, 3, 2].map((star) => (
                                        <label key={star} className="flex items-center gap-2 cursor-pointer group">
                                            <input type="checkbox" className="rounded border-white/10 bg-white/5 text-primary focus:ring-0" />
                                            <span className="text-sm text-text-muted group-hover:text-white transition-colors flex items-center gap-1">
                                                {star} نجوم وأكثر
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content (Results) */}
                <div className="flex-1 space-y-6">
                    <div className="relative mb-8">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                        <input
                            type="text"
                            placeholder="ابحث بالاسم أو التخصص..."
                            className="bg-white/5 border border-white/10 rounded-2xl pr-12 pl-4 py-4 text-white w-full focus:ring-1 focus:ring-primary outline-none transition-all"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                        {artisans.map((artisan) => (
                            <div key={artisan.id} className="glass p-6 rounded-2xl group hover:border-primary/20 transition-all">
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center text-primary relative shrink-0">
                                        <User className="w-10 h-10" />
                                        {artisan.isAvailable && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" title="متاح الآن" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-bold text-white truncate">{artisan.name}</h4>
                                            <div className="flex items-center gap-1 text-yellow-400 shrink-0">
                                                <span className="text-sm font-bold font-inter">{artisan.rating}</span>
                                                <Star className="w-4 h-4 fill-current" />
                                            </div>
                                        </div>
                                        <p className="text-xs text-primary mb-2 font-bold">{artisan.trade}</p>
                                        <div className="flex items-center gap-2 text-xs text-text-muted">
                                            <MapPin className="w-3 h-3" />
                                            <span>{artisan.city}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                                    <div>
                                        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">التكلفة</div>
                                        <div className="text-sm font-bold text-white">{artisan.price}</div>
                                    </div>
                                    <Link
                                        href={`/artisan/${artisan.id}`}
                                        className="bg-primary hover:bg-secondary text-background px-4 py-2 rounded-lg text-xs font-bold transition-all"
                                    >
                                        عرض الملف
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// User icon placeholder
function User(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
