import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Home, Search, LogIn, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Check if user is logged in (from localStorage)
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <header className="glass-strong sticky top-0 z-50 border-b border-white/10">
            <nav className="container-custom py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-royal-blue to-blue-500 
                          rounded-lg flex items-center justify-center font-bold text-xl">
                            H
                        </div>
                        <span className="text-2xl font-bold gradient-text">HRFA.MA</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                        <Link to="/" className="nav-link flex items-center space-x-2 rtl:space-x-reverse 
                                   text-white/80 hover:text-white transition-colors">
                            <Home size={20} />
                            <span>{t('home')}</span>
                        </Link>
                        <Link to="/search" className="nav-link flex items-center space-x-2 rtl:space-x-reverse 
                                         text-white/80 hover:text-white transition-colors">
                            <Search size={20} />
                            <span>{t('search')}</span>
                        </Link>

                        {user ? (
                            <>
                                <Link to="/dashboard" className="nav-link flex items-center space-x-2 rtl:space-x-reverse 
                                                 text-white/80 hover:text-white transition-colors">
                                    <LayoutDashboard size={20} />
                                    <span>{t('dashboard')}</span>
                                </Link>
                                <button onClick={handleLogout} className="btn-secondary">
                                    {t('logout')}
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                                <LogIn size={20} />
                                <span>{t('login')}</span>
                            </Link>
                        )}

                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white p-2"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-3 animate-fadeIn">
                        <Link to="/" className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            {t('home')}
                        </Link>
                        <Link to="/search" className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            {t('search')}
                        </Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                                    {t('dashboard')}
                                </Link>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                                    {t('logout')}
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                                {t('login')}
                            </Link>
                        )}
                        <div className="px-4">
                            <LanguageSwitcher />
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
