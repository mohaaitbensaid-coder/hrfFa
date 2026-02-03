import express from 'express';
import { body } from 'express-validator';
import Review from '../models/Review.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private/Client
router.post('/', protect, [
    body('artisan').notEmpty().withMessage('Artisan ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().isLength({ min: 10, max: 500 }).withMessage('Comment must be between 10 and 500 characters'),
    validate
], async (req, res, next) => {
    try {
        const { artisan, rating, comment } = req.body;

        // Check if artisan exists
        const artisanUser = await User.findOne({ _id: artisan, role: 'artisan' });
        if (!artisanUser) {
            return res.status(404).json({
                success: false,
                message: 'Artisan not found'
            });
        }

        // Check if user already reviewed this artisan
        const existingReview = await Review.findOne({
            artisan,
            client: req.user._id
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this artisan'
            });
        }

        // Create review
        const review = await Review.create({
            artisan,
            client: req.user._id,
            rating,
            comment
        });

        // Populate client info
        await review.populate('client', 'name');

        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: {
                review
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/reviews/artisan/:artisanId
// @desc    Get reviews for an artisan
// @access  Public
router.get('/artisan/:artisanId', async (req, res, next) => {
    try {
        const reviews = await Review.find({
            artisan: req.params.artisanId,
            isApproved: true
        })
            .populate('client', 'name')
            .sort('-createdAt');

        res.json({
            success: true,
            count: reviews.length,
            data: {
                reviews
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/reviews
// @desc    Get all reviews (Admin only)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res, next) => {
    try {
        const reviews = await Review.find()
            .populate('artisan', 'name profession')
            .populate('client', 'name')
            .sort('-createdAt');

        res.json({
            success: true,
            count: reviews.length,
            data: {
                reviews
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/reviews/:id/approve
// @desc    Approve/reject a review (Admin only)
// @access  Private/Admin
router.put('/:id/approve', protect, authorize('admin'), async (req, res, next) => {
    try {
        const { isApproved } = req.body;

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { isApproved },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.json({
            success: true,
            message: 'Review status updated successfully',
            data: {
                review
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private (Owner or Admin)
router.delete('/:id', protect, async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if user is the owner or admin
        if (review.client.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this review'
            });
        }

        await Review.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

export default router;
