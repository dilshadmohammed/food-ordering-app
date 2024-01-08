import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log('Already connected to MongoDB');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
};

export const closeDatabaseConnection = async () => {
    if (mongoose.connection.readyState === 1) {
        // Check if the connection is open before attempting to close it
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    }
};
