import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    const { t } = useTranslation()
    const currentYear = new Date().getFullYear()

    return (
        <footer className="glass-strong border-t border-white/10 mt-auto">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-10 h-10 bg-gradient-to-br from-royal-blue to-blue-500 
                            rounded-lg flex items-center justify-center font-bold text-xl">
                                H
                            </div>
                            <span className="text-2xl font-bold gradient-text">HRFA.MA</span>
                        </div>
                        <p className="text-white/70 text-sm">
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">{t('home')}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                                    {t('home')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/search" className="text-white/70 hover:text-white transition-colors">
                                    {t('search')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-white/70 hover:text-white transition-colors">
                                    {t('login')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">{t('profile.contact')}</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 rtl:space-x-reverse text-white/70">
                                <Mail size={18} />
                                <span>contact@hrfa.ma</span>
                            </li>
                            <li className="flex items-center space-x-2 rtl:space-x-reverse text-white/70">
                                <Phone size={18} />
                                <span>+212 600 000 000</span>
                            </li>
                            <li className="flex items-center space-x-2 rtl:space-x-reverse text-white/70">
                                <MapPin size={18} />
                                <span>{t('city.casablanca')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Social Media</h3>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center 
                                   justify-center hover:bg-royal-blue transition-all duration-300 
                                   hover:scale-110">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center 
                                   justify-center hover:bg-royal-blue transition-all duration-300 
                                   hover:scale-110">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center 
                                   justify-center hover:bg-royal-blue transition-all duration-300 
                                   hover:scale-110">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
                    <p>&copy; {currentYear} HRFA.MA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
