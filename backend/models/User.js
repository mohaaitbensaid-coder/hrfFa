import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^(\+212|0)[5-7]\d{8}$/, 'Please provide a valid Moroccan phone number']
    },
    role: {
        type: String,
        enum: ['client', 'artisan', 'admin'],
        default: 'client'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Artisan-specific fields
    profession: {
        type: String,
        enum: ['carpenter', 'painter', 'plumber', 'electrician', 'mason', 'mechanic', 'welder', 'other'],
        required: function () { return this.role === 'artisan'; }
    },
    city: {
        type: String,
        enum: ['casablanca', 'rabat', 'marrakech', 'fes', 'tangier', 'agadir', 'other'],
        required: function () { return this.role === 'artisan'; }
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    experience: {
        type: Number,
        min: [0, 'Experience cannot be negative']
    },
    hourlyRate: {
        type: Number,
        min: [0, 'Hourly rate cannot be negative']
    },
    portfolio: [{
        type: String // URLs to portfolio images
    }],
    isPremium: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

const User = mongoose.model('User', userSchema);

export default User;
