import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import ArtisanProfile from './pages/ArtisanProfile'
import Login from './pages/Login'
import Register from './pages/Register'
import ArtisanDashboard from './pages/ArtisanDashboard'
import AdminPanel from './pages/AdminPanel'

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/artisan/:id" element={<ArtisanProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<ArtisanDashboard />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
