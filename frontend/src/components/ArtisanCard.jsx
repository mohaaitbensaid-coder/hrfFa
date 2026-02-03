import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, MessageCircle, MapPin, Award } from 'lucide-react'
import RatingStars from './RatingStars'

export default function ArtisanCard({ artisan }) {
    const { t } = useTranslation()

    const handleWhatsApp = (e) => {
        e.preventDefault()
        window.open(`https://wa.me/${artisan.phone}`, '_blank')
    }

    const handleCall = (e) => {
        e.preventDefault()
        window.location.href = `tel:${artisan.phone}`
    }

    return (
        <div className="card group">
            {/* Premium Badge */}
            {artisan.isPremium && (
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 
                      bg-gradient-to-r from-yellow-400 to-yellow-600 
                      text-navy-dark px-3 py-1 rounded-full text-sm font-bold 
                      flex items-center space-x-1 rtl:space-x-reverse">
                    <Award size={16} />
                    <span>{t('profile.premium')}</span>
                </div>
            )}

            {/* Artisan Image */}
            <div className="w-full h-48 bg-gradient-to-br from-royal-blue to-blue-500 
                    rounded-lg mb-4 overflow-hidden">
                {artisan.image ? (
                    <img
                        src={artisan.image}
                        alt={artisan.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-white">
                        {artisan.name.charAt(0)}
                    </div>
                )}
            </div>

            {/* Artisan Info */}
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">{artisan.name}</h3>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-white/70">
                    <span className="px-3 py-1 bg-royal-blue/30 rounded-full text-sm">
                        {t(artisan.profession)}
                    </span>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-white/70">
                    <MapPin size={18} />
                    <span>{t(artisan.city)}</span>
                </div>

                {/* Rating */}
                <RatingStars rating={artisan.rating || 0} />

                {/* Description */}
                {artisan.description && (
                    <p className="text-white/60 text-sm line-clamp-2">
                        {artisan.description}
                    </p>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 rtl:space-x-reverse pt-2">
                    <button
                        onClick={handleWhatsApp}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 
                     rounded-lg transition-all duration-300 hover:scale-105 
                     flex items-center justify-center space-x-2 rtl:space-x-reverse"
                    >
                        <MessageCircle size={18} />
                        <span>{t('profile.whatsapp')}</span>
                    </button>

                    <button
                        onClick={handleCall}
                        className="flex-1 bg-royal-blue hover:bg-blue-700 text-white px-4 py-2 
                     rounded-lg transition-all duration-300 hover:scale-105 
                     flex items-center justify-center space-x-2 rtl:space-x-reverse"
                    >
                        <Phone size={18} />
                        <span>{t('profile.call')}</span>
                    </button>
                </div>

                {/* View Profile Link */}
                <Link
                    to={`/artisan/${artisan._id}`}
                    className="block text-center text-royal-blue hover:text-blue-400 
                   font-semibold transition-colors pt-2"
                >
                    {t('dashboard.profile')} →
                </Link>
            </div>
        </div>
    )
}
