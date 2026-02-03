import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    artisan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
        minlength: [10, 'Comment must be at least 10 characters'],
        maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    isApproved: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Prevent duplicate reviews from same client to same artisan
reviewSchema.index({ artisan: 1, client: 1 }, { unique: true });

// Update artisan rating after review is saved
reviewSchema.post('save', async function () {
    const Review = this.constructor;
    const User = mongoose.model('User');

    const stats = await Review.aggregate([
        { $match: { artisan: this.artisan, isApproved: true } },
        {
            $group: {
                _id: '$artisan',
                avgRating: { $avg: '$rating' },
                count: { $sum: 1 }
            }
        }
    ]);

    if (stats.length > 0) {
        await User.findByIdAndUpdate(this.artisan, {
            rating: Math.round(stats[0].avgRating * 10) / 10,
            reviewCount: stats[0].count
        });
    }
});

// Update artisan rating after review is deleted
reviewSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        const Review = mongoose.model('Review');
        const User = mongoose.model('User');

        const stats = await Review.aggregate([
            { $match: { artisan: doc.artisan, isApproved: true } },
            {
                $group: {
                    _id: '$artisan',
                    avgRating: { $avg: '$rating' },
                    count: { $sum: 1 }
                }
            }
        ]);

        if (stats.length > 0) {
            await User.findByIdAndUpdate(doc.artisan, {
                rating: Math.round(stats[0].avgRating * 10) / 10,
                reviewCount: stats[0].count
            });
        } else {
            await User.findByIdAndUpdate(doc.artisan, {
                rating: 0,
                reviewCount: 0
            });
        }
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
