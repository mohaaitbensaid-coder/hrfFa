import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search as SearchIcon } from 'lucide-react'

export default function SearchBar() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [profession, setProfession] = useState('')
    const [city, setCity] = useState('')

    const professions = [
        'profession.all',
        'profession.carpenter',
        'profession.painter',
        'profession.plumber',
        'profession.electrician',
        'profession.mason',
        'profession.mechanic',
        'profession.welder'
    ]

    const cities = [
        'city.all',
        'city.casablanca',
        'city.rabat',
        'city.marrakech',
        'city.fes',
        'city.tangier',
        'city.agadir'
    ]

    const handleSearch = (e) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (profession && profession !== 'profession.all') {
            params.append('profession', profession)
        }
        if (city && city !== 'city.all') {
            params.append('city', city)
        }
        navigate(`/search?${params.toString()}`)
    }

    return (
        <form onSubmit={handleSearch} className="glass-strong p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Profession Select */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">
                        {t('search.profession')}
                    </label>
                    <select
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        className="input-field cursor-pointer"
                    >
                        <option value="">{t('profession.all')}</option>
                        {professions.map((prof) => (
                            <option key={prof} value={prof} className="bg-navy-dark">
                                {t(prof)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City Select */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">
                        {t('search.city')}
                    </label>
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="input-field cursor-pointer"
                    >
                        <option value="">{t('city.all')}</option>
                        {cities.map((c) => (
                            <option key={c} value={c} className="bg-navy-dark">
                                {t(c)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2 rtl:space-x-reverse">
                        <SearchIcon size={20} />
                        <span>{t('search.button')}</span>
                    </button>
                </div>
            </div>
        </form>
    )
}
