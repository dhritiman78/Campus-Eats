import mongoose from 'mongoose';

const dbConn = () => {
    mongoose.connect('mongodb://localhost:27017/foodOrderingApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
    }
    );
    }

export default dbConn;