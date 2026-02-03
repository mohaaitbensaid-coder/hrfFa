import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { artisanAPI } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';
import SearchBar from '../components/SearchBar';
import { Loader2, AlertCircle } from 'lucide-react';

function SearchResults() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const profession = searchParams.get('profession') || 'all';
    const city = searchParams.get('city') || 'all';

    useEffect(() => {
        fetchArtisans();
    }, [profession, city]);

    const fetchArtisans = async () => {
        setLoading(true);
        setError('');

        try {
            const filters = {};
            if (profession && profession !== 'all') filters.profession = profession;
            if (city && city !== 'all') filters.city = city;

            const response = await artisanAPI.getAll(filters);

            if (response.success) {
                setArtisans(response.data.artisans);
            }
        } catch (err) {
            setError(err.response?.data?.message || t('error'));
            setArtisans([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-royal-blue">
            {/* Search Bar Section */}
            <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 py-8">
                <div className="container mx-auto px-4">
                    <SearchBar />
                </div>
            </div>

            {/* Results Section */}
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {t('search.results')}
                    </h1>
                    {!loading && (
                        <p className="text-white/70">
                            {artisans.length} {artisans.length === 1 ? t('artisan') : t('artisans') || 'artisan(s)'} {t('found') || 'found'}
                            {profession !== 'all' && ` - ${t(`profession.${profession}`)}`}
                            {city !== 'all' && ` - ${t(`city.${city}`)}`}
                        </p>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
                        <p className="text-white/70">{t('loading')}</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="max-w-md mx-auto">
                        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-red-300 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-red-200 font-semibold mb-1">{t('error')}</h3>
                                <p className="text-red-200/80 text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* No Results State */}
                {!loading && !error && artisans.length === 0 && (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="w-10 h-10 text-white/70" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {t('search.noResults')}
                            </h3>
                            <p className="text-white/70 mb-6">
                                {t('search.tryDifferent') || 'Try adjusting your search filters to find what you\'re looking for.'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Results Grid */}
                {!loading && !error && artisans.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artisans.map((artisan) => (
                            <ArtisanCard key={artisan._id} artisan={artisan} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
