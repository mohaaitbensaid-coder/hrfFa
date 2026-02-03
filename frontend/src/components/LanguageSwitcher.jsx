import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
    const { i18n } = useTranslation()

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar'
        i18n.changeLanguage(newLang)
        localStorage.setItem('language', newLang)
    }

    return (
        <button
            onClick={toggleLanguage}
            className="px-4 py-2 rounded-full bg-white/10 border border-white/20 
                 text-white font-semibold transition-all duration-300 
                 hover:bg-white/20 hover:scale-105 active:scale-95"
        >
            {i18n.language === 'ar' ? 'EN' : 'AR'}
        </button>
    )
}
