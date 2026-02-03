import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authAPI, userAPI } from '../services/api';
import { User, Mail, Phone, MapPin, Briefcase, Edit2, Save, Loader2, AlertCircle } from 'lucide-react';

function ArtisanDashboard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        bio: '',
        experience: '',
        hourlyRate: '',
        profession: '',
        city: ''
    });

    const professions = ['carpenter', 'painter', 'plumber', 'electrician', 'mason', 'mechanic', 'welder'];
    const cities = ['casablanca', 'rabat', 'marrakech', 'fes', 'tangier', 'agadir'];

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            if (!authAPI.isAuthenticated()) {
                navigate('/login');
                return;
            }

            const response = await userAPI.getProfile();
            if (response.success) {
                const userData = response.data.user;
                setUser(userData);
                setFormData({
                    name: userData.name || '',
                    phone: userData.phone || '',
                    bio: userData.bio || '',
                    experience: userData.experience || '',
                    hourlyRate: userData.hourlyRate || '',
                    profession: userData.profession || '',
                    city: userData.city || ''
                });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                setError(err.response?.data?.message || t('error'));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const updateData = {
                name: formData.name,
                phone: formData.phone
            };

            if (user.role === 'artisan') {
                updateData.bio = formData.bio;
                updateData.experience = formData.experience ? parseInt(formData.experience) : undefined;
                updateData.hourlyRate = formData.hourlyRate ? parseFloat(formData.hourlyRate) : undefined;
                updateData.profession = formData.profession;
                updateData.city = formData.city;
            }

            const response = await userAPI.updateProfile(updateData);

            if (response.success) {
                setUser(response.data.user);
                setSuccess(response.message || t('success'));
                setEditing(false);
            }
        } catch (err) {
            setError(err.response?.data?.message || t('error'));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-royal-blue flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                    <p className="text-white/70">{t('loading')}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-royal-blue py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Welcome Header */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/20">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {t('dashboard.welcome')}, {user.name}!
                    </h1>
                    <p className="text-white/70">
                        {user.role === 'artisan' ? t('dashboard.artisanSubtitle') || 'Manage your artisan profile' : t('dashboard.clientSubtitle') || 'Manage your profile'}
                    </p>
                </div>

                {/* Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                        <p className="text-green-200 text-sm">{success}</p>
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">{t('dashboard.profile')}</h2>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
                            >
                                <Edit2 className="w-4 h-4" />
                                {t('dashboard.edit')}
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-2">
                                    <User className="w-4 h-4 inline me-2" />
                                    {t('auth.name')}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-2">
                                    <Mail className="w-4 h-4 inline me-2" />
                                    {t('auth.email')}
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/50 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-2">
                                    <Phone className="w-4 h-4 inline me-2" />
                                    {t('auth.phone')}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-2">
                                    {t('auth.role')}
                                </label>
                                <input
                                    type="text"
                                    value={t(`auth.${user.role}`)}
                                    disabled
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/50 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Artisan-specific fields */}
                        {user.role === 'artisan' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">
                                            <Briefcase className="w-4 h-4 inline me-2" />
                                            {t('search.profession')}
                                        </label>
                                        <select
                                            name="profession"
                                            value={formData.profession}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {professions.map(prof => (
                                                <option key={prof} value={prof} className="bg-navy text-white">
                                                    {t(`profession.${prof}`)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">
                                            <MapPin className="w-4 h-4 inline me-2" />
                                            {t('search.city')}
                                        </label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {cities.map(city => (
                                                <option key={city} value={city} className="bg-navy text-white">
                                                    {t(`city.${city}`)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-2">
                                        {t('profile.bio') || 'Bio'}
                                    </label>
                                    <textarea
                                        name="bio"
                                        rows="4"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">
                                            {t('profile.experience') || 'Experience (years)'}
                                        </label>
                                        <input
                                            type="number"
                                            name="experience"
                                            min="0"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">
                                            {t('profile.hourlyRate') || 'Hourly Rate (MAD)'}
                                        </label>
                                        <input
                                            type="number"
                                            name="hourlyRate"
                                            min="0"
                                            step="0.01"
                                            value={formData.hourlyRate}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Rating Display */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">
                                            {t('profile.rating')}
                                        </label>
                                        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
                                            <span className="text-2xl text-yellow-400">⭐</span>
                                            <span className="text-white font-semibold">{user.rating?.toFixed(1) || '0.0'}</span>
                                            <span className="text-white/50">({user.reviewCount || 0} {t('profile.reviews')})</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">
                                            {t('dashboard.accountType') || 'Account Type'}
                                        </label>
                                        <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
                                            <span className={`font-semibold ${user.isPremium ? 'text-yellow-400' : 'text-white/70'}`}>
                                                {user.isPremium ? '⭐ ' + t('profile.premium') : t('profile.free')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Action Buttons */}
                        {editing && (
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-navy-dark rounded-lg font-semibold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    {saving ? t('loading') : t('dashboard.save')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditing(false);
                                        setError('');
                                        setSuccess('');
                                        // Reset form data
                                        setFormData({
                                            name: user.name || '',
                                            phone: user.phone || '',
                                            bio: user.bio || '',
                                            experience: user.experience || '',
                                            hourlyRate: user.hourlyRate || '',
                                            profession: user.profession || '',
                                            city: user.city || ''
                                        });
                                    }}
                                    disabled={saving}
                                    className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {t('cancel')}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ArtisanDashboard;
