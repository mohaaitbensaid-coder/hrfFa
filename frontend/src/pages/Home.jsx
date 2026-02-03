import { useTranslation } from 'react-i18next'
import { ArrowRight, Users, Award, TrendingUp, Briefcase } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import ArtisanCard from '../components/ArtisanCard'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
    const { t, i18n } = useTranslation()
    const [featuredArtisans, setFeaturedArtisans] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFeaturedArtisans()
    }, [])

    const fetchFeaturedArtisans = async () => {
        try {
            const response = await axios.get('/api/artisans?limit=6')
            setFeaturedArtisans(response.data)
        } catch (error) {
            console.error('Error fetching artisans:', error)
            // Use mock data for demo
            setFeaturedArtisans(getMockArtisans())
        } finally {
            setLoading(false)
        }
    }

    const getMockArtisans = () => [
        {
            _id: '1',
            name: i18n.language === 'ar' ? 'محمد الحداد' : 'Mohamed El Haddad',
            profession: 'profession.carpenter',
            city: 'city.casablanca',
            rating: 4.8,
            phone: '212600000001',
            isPremium: true,
            description: i18n.language === 'ar'
                ? 'نجار محترف مع خبرة 15 سنة في صناعة الأثاث الفاخر'
                : 'Professional carpenter with 15 years of experience in luxury furniture'
        },
        {
            _id: '2',
            name: i18n.language === 'ar' ? 'عبد الله السباك' : 'Abdellah Sebbak',
            profession: 'profession.plumber',
            city: 'city.rabat',
            rating: 4.5,
            phone: '212600000002',
            isPremium: false,
            description: i18n.language === 'ar'
                ? 'خبير في السباكة والصيانة المنزلية'
                : 'Expert in plumbing and home maintenance'
        },
        {
            _id: '3',
            name: i18n.language === 'ar' ? 'يوسف الكهربائي' : 'Youssef El Kahrabai',
            profession: 'profession.electrician',
            city: 'city.marrakech',
            rating: 4.9,
            phone: '212600000003',
            isPremium: true,
            description: i18n.language === 'ar'
                ? 'كهربائي معتمد مع شهادات دولية'
                : 'Certified electrician with international certifications'
        },
        {
            _id: '4',
            name: i18n.language === 'ar' ? 'رشيد الدهان' : 'Rachid Dahhan',
            profession: 'profession.painter',
            city: 'city.fes',
            rating: 4.6,
            phone: '212600000004',
            isPremium: false,
            description: i18n.language === 'ar'
                ? 'متخصص في الدهانات الحديثة والديكور'
                : 'Specialist in modern painting and decoration'
        },
        {
            _id: '5',
            name: i18n.language === 'ar' ? 'حسن البناء' : 'Hassan Banna',
            profession: 'profession.mason',
            city: 'city.tangier',
            rating: 4.7,
            phone: '212600000005',
            isPremium: true,
            description: i18n.language === 'ar'
                ? 'بناء محترف في المشاريع الكبيرة'
                : 'Professional mason for large projects'
        },
        {
            _id: '6',
            name: i18n.language === 'ar' ? 'عمر الميكانيكي' : 'Omar Mecanici',
            profession: 'profession.mechanic',
            city: 'city.agadir',
            rating: 4.4,
            phone: '212600000006',
            isPremium: false,
            description: i18n.language === 'ar'
                ? 'خبير في صيانة السيارات والمحركات'
                : 'Expert in car and engine maintenance'
        }
    ]

    const stats = [
        {
            icon: Users,
            number: '10,000+',
            label: i18n.language === 'ar' ? 'حرفي مسجل' : 'Registered Artisans'
        },
        {
            icon: Briefcase,
            number: '50,000+',
            label: i18n.language === 'ar' ? 'مشروع منجز' : 'Completed Projects'
        },
        {
            icon: Award,
            number: '4.8/5',
            label: i18n.language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'
        },
        {
            icon: TrendingUp,
            number: '98%',
            label: i18n.language === 'ar' ? 'نسبة الرضا' : 'Satisfaction Rate'
        }
    ]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-b from-navy-dark to-transparent">
                <div className="container-custom">
                    <div className="text-center max-w-4xl mx-auto mb-12 animate-fadeIn">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-white/80 mb-8">
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                        <SearchBar />
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="card text-center animate-fadeIn"
                                style={{ animationDelay: `${0.1 * index}s` }}
                            >
                                <stat.icon className="w-12 h-12 mx-auto mb-4 text-royal-blue" />
                                <div className="text-3xl font-bold gradient-text mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-white/70">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Artisans Section */}
            <section className="section-padding bg-gradient-to-b from-transparent to-navy-dark/50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {i18n.language === 'ar' ? 'حرفيون مميزون' : 'Featured Artisans'}
                        </h2>
                        <p className="text-white/70 text-lg">
                            {i18n.language === 'ar'
                                ? 'تعرف على أفضل الحرفيين المحترفين في المغرب'
                                : 'Meet the best professional artisans in Morocco'}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredArtisans.map((artisan, index) => (
                                <div
                                    key={artisan._id}
                                    className="animate-fadeIn"
                                    style={{ animationDelay: `${0.1 * index}s` }}
                                >
                                    <ArtisanCard artisan={artisan} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <a
                            href="/search"
                            className="btn-primary inline-flex items-center space-x-2 rtl:space-x-reverse"
                        >
                            <span>{i18n.language === 'ar' ? 'عرض الكل' : 'View All'}</span>
                            <ArrowRight size={20} className="rtl:rotate-180" />
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="glass-strong p-12 text-center rounded-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {i18n.language === 'ar' ? 'هل أنت حرفي؟' : 'Are you an artisan?'}
                        </h2>
                        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                            {i18n.language === 'ar'
                                ? 'انضم إلى منصة HRFA.MA واحصل على المزيد من العملاء'
                                : 'Join HRFA.MA platform and get more clients'}
                        </p>
                        <a href="/login" className="btn-primary">
                            {i18n.language === 'ar' ? 'سجل الآن' : 'Register Now'}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
