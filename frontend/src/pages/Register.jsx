import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authAPI } from '../services/api';
import { UserPlus, Mail, Lock, User, Phone, Briefcase, MapPin, AlertCircle } from 'lucide-react';

function Register() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'client',
        profession: '',
        city: '',
        bio: '',
        experience: '',
        hourlyRate: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const professions = ['carpenter', 'painter', 'plumber', 'electrician', 'mason', 'mechanic', 'welder'];
    const cities = ['casablanca', 'rabat', 'marrakech', 'fes', 'tangier', 'agadir'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Prepare data based on role
            const submitData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                role: formData.role
            };

            // Add artisan-specific fields
            if (formData.role === 'artisan') {
                if (!formData.profession || !formData.city) {
                    setError(t('auth.artisanFieldsRequired') || 'Profession and city are required for artisans');
                    setLoading(false);
                    return;
                }
                submitData.profession = formData.profession;
                submitData.city = formData.city;
                if (formData.bio) submitData.bio = formData.bio;
                if (formData.experience) submitData.experience = parseInt(formData.experience);
                if (formData.hourlyRate) submitData.hourlyRate = parseFloat(formData.hourlyRate);
            }

            const response = await authAPI.register(submitData);

            if (response.success) {
                // Redirect based on user role
                const user = response.data.user;
                if (user.role === 'artisan') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.message || t('error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-royal-blue py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {t('auth.registerTitle')}
                        </h2>
                        <p className="text-white/70">
                            HRFA.MA
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                            <p className="text-red-200 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-3">
                                {t('auth.role')}
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'client' })}
                                    className={`p-4 rounded-lg border-2 transition-all ${formData.role === 'client'
                                            ? 'bg-white/20 border-white text-white'
                                            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                                        }`}
                                >
                                    <User className="w-6 h-6 mx-auto mb-2" />
                                    <div className="font-semibold">{t('auth.client')}</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'artisan' })}
                                    className={`p-4 rounded-lg border-2 transition-all ${formData.role === 'artisan'
                                            ? 'bg-white/20 border-white text-white'
                                            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                                        }`}
                                >
                                    <Briefcase className="w-6 h-6 mx-auto mb-2" />
                                    <div className="font-semibold">{t('auth.artisan')}</div>
                                </button>
                            </div>
                        </div>

                        {/* Basic Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                                    {t('auth.name')}
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                    disabled={loading}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                                    {t('auth.phone')}
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="0612345678"
                                    className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Email and Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                                    {t('auth.email')}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                    disabled={loading}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                                    {t('auth.password')}
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Artisan-specific Fields */}
                        {formData.role === 'artisan' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Profession */}
                                    <div>
                                        <label htmlFor="profession" className="block text-sm font-medium text-white/90 mb-2">
                                            {t('search.profession')} *
                                        </label>
                                        <select
                                            id="profession"
                                            name="profession"
                                            value={formData.profession}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                            required
                                            disabled={loading}
                                        >
                                            <option value="" className="bg-navy text-white">
                                                {t('profession.all')}
                                            </option>
                                            {professions.map(prof => (
                                                <option key={prof} value={prof} className="bg-navy text-white">
                                                    {t(`profession.${prof}`)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-white/90 mb-2">
                                            {t('search.city')} *
                                        </label>
                                        <select
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                            required
                                            disabled={loading}
                                        >
                                            <option value="" className="bg-navy text-white">
                                                {t('city.all')}
                                            </option>
                                            {cities.map(city => (
                                                <option key={city} value={city} className="bg-navy text-white">
                                                    {t(`city.${city}`)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-white/90 mb-2">
                                        {t('profile.bio') || 'Bio'}
                                    </label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        rows="3"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all resize-none"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Experience */}
                                    <div>
                                        <label htmlFor="experience" className="block text-sm font-medium text-white/90 mb-2">
                                            {t('profile.experience') || 'Experience (years)'}
                                        </label>
                                        <input
                                            id="experience"
                                            name="experience"
                                            type="number"
                                            min="0"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Hourly Rate */}
                                    <div>
                                        <label htmlFor="hourlyRate" className="block text-sm font-medium text-white/90 mb-2">
                                            {t('profile.hourlyRate') || 'Hourly Rate (MAD)'}
                                        </label>
                                        <input
                                            id="hourlyRate"
                                            name="hourlyRate"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.hourlyRate}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-navy-dark py-3 px-4 rounded-lg font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? t('loading') : t('register')}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-white/70">
                            {t('auth.haveAccount')}{' '}
                            <Link
                                to="/login"
                                className="text-white font-semibold hover:underline"
                            >
                                {t('login')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
