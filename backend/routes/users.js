import express from 'express';
import { body } from 'express-validator';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res, next) => {
    try {
        res.json({
            success: true,
            data: {
                user: req.user
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, [
    body('name').optional().trim().isLength({ min: 2, max: 100 }),
    body('phone').optional().matches(/^(\+212|0)[5-7]\d{8}$/),
    body('bio').optional().isLength({ max: 500 }),
    body('experience').optional().isInt({ min: 0 }),
    body('hourlyRate').optional().isFloat({ min: 0 }),
    validate
], async (req, res, next) => {
    try {
        const { name, phone, bio, experience, hourlyRate, profession, city } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;

        // Artisan-specific fields
        if (req.user.role === 'artisan') {
            if (bio !== undefined) updateData.bio = bio;
            if (experience !== undefined) updateData.experience = experience;
            if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate;
            if (profession) updateData.profession = profession;
            if (city) updateData.city = city;
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: user.getPublicProfile()
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res, next) => {
    try {
        const users = await User.find().select('-password');

        res.json({
            success: true,
            count: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/users/:id/status
// @desc    Update user status (Admin only)
// @access  Private/Admin
router.put('/:id/status', protect, authorize('admin'), async (req, res, next) => {
    try {
        const { isActive } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User status updated successfully',
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/users/:id
// @desc    Delete user (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

export default router;
