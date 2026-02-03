import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { Phone, MessageCircle, MapPin, Award, Star, Send } from 'lucide-react'
import RatingStars from '../components/RatingStars'
import axios from 'axios'

export default function ArtisanProfile() {
    const { id } = useParams()
    const { t, i18n } = useTranslation()
    const [artisan, setArtisan] = useState(null)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    useEffect(() => {
        fetchArtisanData()
    }, [id])

    const fetchArtisanData = async () => {
        try {
            const [artisanRes, reviewsRes] = await Promise.all([
                axios.get(`/api/artisans/${id}`),
                axios.get(`/api/reviews/${id}`)
            ])
            setArtisan(artisanRes.data)
            setReviews(reviewsRes.data)
        } catch (error) {
            console.error('Error fetching artisan:', error)
            // Use mock data
            setArtisan(getMockArtisan())
            setReviews(getMockReviews())
        } finally {
            setLoading(false)
        }
    }

    const getMockArtisan = () => ({
        _id: id,
        name: i18n.language === 'ar' ? 'محمد الحداد' : 'Mohamed El Haddad',
        profession: 'profession.carpenter',
        city: 'city.casablanca',
        rating: 4.8,
        phone: '212600000001',
        whatsapp: '212600000001',
        isPremium: true,
        description: i18n.language === 'ar'
            ? 'نجار محترف مع خبرة 15 سنة في صناعة الأثاث الفاخر والديكورات الخشبية المخصصة. متخصص في الأثاث الحديث والكلاسيكي.'
            : 'Professional carpenter with 15 years of experience in luxury furniture and custom wood decorations. Specialized in modern and classic furniture.',
        portfolio: [
            'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=400',
            'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
            'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'
        ]
    })

    const getMockReviews = () => [
        {
            _id: '1',
            clientName: i18n.language === 'ar' ? 'أحمد علي' : 'Ahmed Ali',
            rating: 5,
            comment: i18n.language === 'ar'
                ? 'عمل ممتاز وجودة عالية. أنصح به بشدة!'
                : 'Excellent work and high quality. Highly recommended!',
            date: '2024-01-15'
        },
        {
            _id: '2',
            clientName: i18n.language === 'ar' ? 'فاطمة الزهراء' : 'Fatima Zahra',
            rating: 4,
            comment: i18n.language === 'ar'
                ? 'محترف في عمله ودقيق في المواعيد'
                : 'Professional in his work and punctual',
            date: '2024-01-10'
        },
        {
            _id: '3',
            clientName: i18n.language === 'ar' ? 'يوسف بنعلي' : 'Youssef Benali',
            rating: 5,
            comment: i18n.language === 'ar'
                ? 'أفضل نجار تعاملت معه. النتيجة فاقت التوقعات'
                : 'Best carpenter I have worked with. Results exceeded expectations',
            date: '2024-01-05'
        }
    ]

    const handleWhatsApp = () => {
        window.open(`https://wa.me/${artisan.whatsapp}`, '_blank')
    }

    const handleCall = () => {
        window.location.href = `tel:${artisan.phone}`
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        if (!user) {
            alert(i18n.language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first')
            return
        }

        try {
            const response = await axios.post('/api/reviews', {
                artisanId: id,
                rating: newReview.rating,
                comment: newReview.comment
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setReviews([response.data, ...reviews])
            setNewReview({ rating: 5, comment: '' })
            alert(t('success'))
        } catch (error) {
            console.error('Error submitting review:', error)
            alert(t('error'))
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if (!artisan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">{t('error')}</h2>
                    <p className="text-white/70">
                        {i18n.language === 'ar' ? 'الحرفي غير موجود' : 'Artisan not found'}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen section-padding">
            <div className="container-custom">
                {/* Artisan Header */}
                <div className="glass-strong p-8 mb-8 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Profile Image */}
                        <div className="md:col-span-1">
                            <div className="w-full aspect-square bg-gradient-to-br from-royal-blue to-blue-500 
                            rounded-2xl overflow-hidden">
                                {artisan.image ? (
                                    <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-8xl font-bold text-white">
                                        {artisan.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">{artisan.name}</h1>
                                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                                        <span className="px-4 py-2 bg-royal-blue/30 rounded-full font-semibold">
                                            {t(artisan.profession)}
                                        </span>
                                        {artisan.isPremium && (
                                            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 
                                    text-navy-dark px-4 py-2 rounded-full font-bold 
                                    flex items-center space-x-1 rtl:space-x-reverse">
                                                <Award size={18} />
                                                <span>{t('profile.premium')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-white/70">
                                <MapPin size={20} />
                                <span className="text-lg">{t(artisan.city)}</span>
                            </div>

                            <RatingStars rating={artisan.rating} size={24} />

                            <p className="text-white/80 text-lg leading-relaxed">
                                {artisan.description}
                            </p>

                            {/* Contact Buttons */}
                            <div className="flex space-x-4 rtl:space-x-reverse pt-4">
                                <button
                                    onClick={handleWhatsApp}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 
                           rounded-xl transition-all duration-300 hover:scale-105 
                           flex items-center justify-center space-x-2 rtl:space-x-reverse 
                           font-semibold text-lg"
                                >
                                    <MessageCircle size={24} />
                                    <span>{t('profile.whatsapp')}</span>
                                </button>

                                <button
                                    onClick={handleCall}
                                    className="flex-1 bg-royal-blue hover:bg-blue-700 text-white px-6 py-4 
                           rounded-xl transition-all duration-300 hover:scale-105 
                           flex items-center justify-center space-x-2 rtl:space-x-reverse 
                           font-semibold text-lg"
                                >
                                    <Phone size={24} />
                                    <span>{t('profile.call')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Portfolio Section */}
                {artisan.portfolio && artisan.portfolio.length > 0 && (
                    <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-3xl font-bold mb-6">{t('profile.portfolio')}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {artisan.portfolio.map((image, index) => (
                                <div
                                    key={index}
                                    className="aspect-square rounded-xl overflow-hidden card cursor-pointer"
                                >
                                    <img
                                        src={image}
                                        alt={`Portfolio ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reviews Section */}
                <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-3xl font-bold mb-6">{t('profile.reviews')}</h2>

                    {/* Submit Review Form */}
                    {user && user.role === 'client' && (
                        <form onSubmit={handleSubmitReview} className="glass-strong p-6 mb-6">
                            <h3 className="text-xl font-bold mb-4">{t('review.submit')}</h3>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">{t('review.rating')}</label>
                                <div className="flex space-x-2 rtl:space-x-reverse">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={32}
                                                className={star <= newReview.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-400'}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">{t('review.comment')}</label>
                                <textarea
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    className="input-field min-h-[100px] resize-none"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                                <Send size={20} />
                                <span>{t('review.send')}</span>
                            </button>
                        </form>
                    )}

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review._id} className="glass p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-lg">{review.clientName}</h4>
                                        <RatingStars rating={review.rating} size={18} showNumber={false} />
                                    </div>
                                    <span className="text-white/50 text-sm">
                                        {new Date(review.date).toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : 'en-US')}
                                    </span>
                                </div>
                                <p className="text-white/80">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
