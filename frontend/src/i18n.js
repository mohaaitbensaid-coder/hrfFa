import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    ar: {
        translation: {
            // Navigation
            "home": "الرئيسية",
            "search": "بحث",
            "login": "تسجيل الدخول",
            "register": "إنشاء حساب",
            "dashboard": "لوحة التحكم",
            "admin": "الإدارة",
            "logout": "تسجيل الخروج",

            // Home Page
            "hero.title": "اعثر على أفضل الحرفيين في المغرب",
            "hero.subtitle": "منصة HRFA.MA تربطك بأمهر الحرفيين المحترفين في مدينتك",
            "hero.cta": "ابحث الآن",

            // Search
            "search.profession": "المهنة",
            "search.city": "المدينة",
            "search.button": "بحث",
            "search.results": "نتائج البحث",
            "search.noResults": "لا توجد نتائج",

            // Professions
            "profession.carpenter": "نجار",
            "profession.painter": "دهان",
            "profession.plumber": "سباك",
            "profession.electrician": "كهربائي",
            "profession.mason": "بناء",
            "profession.mechanic": "ميكانيكي",
            "profession.welder": "حداد",
            "profession.all": "جميع المهن",

            // Cities
            "city.casablanca": "الدار البيضاء",
            "city.rabat": "الرباط",
            "city.marrakech": "مراكش",
            "city.fes": "فاس",
            "city.tangier": "طنجة",
            "city.agadir": "أكادير",
            "city.all": "جميع المدن",

            // Artisan Profile
            "profile.contact": "تواصل",
            "profile.whatsapp": "واتساب",
            "profile.call": "اتصال",
            "profile.portfolio": "معرض الأعمال",
            "profile.reviews": "التقييمات",
            "profile.rating": "التقييم",
            "profile.premium": "حساب مميز",
            "profile.free": "حساب مجاني",

            // Reviews
            "review.submit": "إضافة تقييم",
            "review.rating": "التقييم",
            "review.comment": "التعليق",
            "review.send": "إرسال",

            // Auth
            "auth.email": "البريد الإلكتروني",
            "auth.password": "كلمة المرور",
            "auth.name": "الاسم الكامل",
            "auth.phone": "رقم الهاتف",
            "auth.role": "نوع الحساب",
            "auth.client": "عميل",
            "auth.artisan": "حرفي",
            "auth.loginTitle": "تسجيل الدخول",
            "auth.registerTitle": "إنشاء حساب جديد",
            "auth.haveAccount": "لديك حساب؟",
            "auth.noAccount": "ليس لديك حساب؟",

            // Dashboard
            "dashboard.welcome": "مرحباً",
            "dashboard.profile": "الملف الشخصي",
            "dashboard.edit": "تعديل",
            "dashboard.save": "حفظ",
            "dashboard.upgrade": "الترقية للحساب المميز",

            // Admin
            "admin.users": "المستخدمين",
            "admin.artisans": "الحرفيين",
            "admin.reviews": "التقييمات",
            "admin.activate": "تفعيل",
            "admin.deactivate": "تعطيل",
            "admin.delete": "حذف",

            // Common
            "loading": "جاري التحميل...",
            "error": "حدث خطأ",
            "success": "تمت العملية بنجاح",
            "cancel": "إلغاء",
            "confirm": "تأكيد",
            "close": "إغلاق",
        }
    },
    en: {
        translation: {
            // Navigation
            "home": "Home",
            "search": "Search",
            "login": "Login",
            "register": "Register",
            "dashboard": "Dashboard",
            "admin": "Admin",
            "logout": "Logout",

            // Home Page
            "hero.title": "Find the Best Artisans in Morocco",
            "hero.subtitle": "HRFA.MA connects you with skilled professional artisans in your city",
            "hero.cta": "Search Now",

            // Search
            "search.profession": "Profession",
            "search.city": "City",
            "search.button": "Search",
            "search.results": "Search Results",
            "search.noResults": "No results found",

            // Professions
            "profession.carpenter": "Carpenter",
            "profession.painter": "Painter",
            "profession.plumber": "Plumber",
            "profession.electrician": "Electrician",
            "profession.mason": "Mason",
            "profession.mechanic": "Mechanic",
            "profession.welder": "Welder",
            "profession.all": "All Professions",

            // Cities
            "city.casablanca": "Casablanca",
            "city.rabat": "Rabat",
            "city.marrakech": "Marrakech",
            "city.fes": "Fes",
            "city.tangier": "Tangier",
            "city.agadir": "Agadir",
            "city.all": "All Cities",

            // Artisan Profile
            "profile.contact": "Contact",
            "profile.whatsapp": "WhatsApp",
            "profile.call": "Call",
            "profile.portfolio": "Portfolio",
            "profile.reviews": "Reviews",
            "profile.rating": "Rating",
            "profile.premium": "Premium Account",
            "profile.free": "Free Account",

            // Reviews
            "review.submit": "Submit Review",
            "review.rating": "Rating",
            "review.comment": "Comment",
            "review.send": "Send",

            // Auth
            "auth.email": "Email",
            "auth.password": "Password",
            "auth.name": "Full Name",
            "auth.phone": "Phone Number",
            "auth.role": "Account Type",
            "auth.client": "Client",
            "auth.artisan": "Artisan",
            "auth.loginTitle": "Login",
            "auth.registerTitle": "Create New Account",
            "auth.haveAccount": "Have an account?",
            "auth.noAccount": "Don't have an account?",

            // Dashboard
            "dashboard.welcome": "Welcome",
            "dashboard.profile": "Profile",
            "dashboard.edit": "Edit",
            "dashboard.save": "Save",
            "dashboard.upgrade": "Upgrade to Premium",

            // Admin
            "admin.users": "Users",
            "admin.artisans": "Artisans",
            "admin.reviews": "Reviews",
            "admin.activate": "Activate",
            "admin.deactivate": "Deactivate",
            "admin.delete": "Delete",

            // Common
            "loading": "Loading...",
            "error": "An error occurred",
            "success": "Operation successful",
            "cancel": "Cancel",
            "confirm": "Confirm",
            "close": "Close",
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ar',
        lng: localStorage.getItem('language') || 'ar',
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

// Update HTML dir and lang attributes when language changes
i18n.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('lang', lng);
    document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.style.fontFamily = lng === 'ar' ? 'Cairo, sans-serif' : 'Inter, sans-serif';
});

export default i18n;
