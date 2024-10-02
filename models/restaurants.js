import mongoose, {Schema} from "mongoose";

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    rating: {
        total_rating: Number,
        rate: Number,
    },
    website: {
        type: String,
    },
    email: {
        type: String,
    },
    openingHours: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;