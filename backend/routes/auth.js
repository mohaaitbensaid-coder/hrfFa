import express from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').matches(/^(\+212|0)[5-7]\d{8}$/).withMessage('Please provide a valid Moroccan phone number'),
    body('role').isIn(['client', 'artisan']).withMessage('Role must be either client or artisan'),
    validate
], async (req, res, next) => {
    try {
        const { name, email, password, phone, role, profession, city, bio, experience, hourlyRate } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Validate artisan-specific fields
        if (role === 'artisan') {
            if (!profession || !city) {
                return res.status(400).json({
                    success: false,
                    message: 'Profession and city are required for artisan accounts'
                });
            }
        }

        // Create user
        const userData = {
            name,
            email,
            password,
            phone,
            role
        };

        // Add artisan-specific fields
        if (role === 'artisan') {
            userData.profession = profession;
            userData.city = city;
            if (bio) userData.bio = bio;
            if (experience) userData.experience = experience;
            if (hourlyRate) userData.hourlyRate = hourlyRate;
        }

        const user = await User.create(userData);

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: user.getPublicProfile(),
                token
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
], async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user and include password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Your account has been deactivated'
            });
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: user.getPublicProfile(),
                token
            }
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res, next) => {
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

export default router;
