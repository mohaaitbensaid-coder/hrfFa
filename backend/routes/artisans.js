import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/artisans
// @desc    Get all artisans with filters
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        const { profession, city, search, sort = '-rating' } = req.query;

        // Build query
        const query = { role: 'artisan', isActive: true };

        if (profession && profession !== 'all') {
            query.profession = profession;
        }

        if (city && city !== 'all') {
            query.city = city;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { bio: { $regex: search, $options: 'i' } }
            ];
        }

        // Execute query
        const artisans = await User.find(query)
            .select('-password')
            .sort(sort);

        res.json({
            success: true,
            count: artisans.length,
            data: {
                artisans
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/artisans/:id
// @desc    Get artisan by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
    try {
        const artisan = await User.findOne({
            _id: req.params.id,
            role: 'artisan'
        }).select('-password');

        if (!artisan) {
            return res.status(404).json({
                success: false,
                message: 'Artisan not found'
            });
        }

        res.json({
            success: true,
            data: {
                artisan
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/artisans/stats/overview
// @desc    Get artisan statistics
// @access  Public
router.get('/stats/overview', async (req, res, next) => {
    try {
        const totalArtisans = await User.countDocuments({ role: 'artisan', isActive: true });
        const premiumArtisans = await User.countDocuments({ role: 'artisan', isActive: true, isPremium: true });

        const professionStats = await User.aggregate([
            { $match: { role: 'artisan', isActive: true } },
            { $group: { _id: '$profession', count: { $sum: 1 } } }
        ]);

        const cityStats = await User.aggregate([
            { $match: { role: 'artisan', isActive: true } },
            { $group: { _id: '$city', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                totalArtisans,
                premiumArtisans,
                professionStats,
                cityStats
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
