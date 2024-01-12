import mongoose from 'mongoose';

export const connectToDatabase = () => {
    return new Promise(async (resolve, reject) => {
        if (mongoose.connection.readyState === 1) {
            console.log('Already connected to MongoDB');
            resolve();
        } else {
            try {
                await mongoose.connect(process.env.MONGODB_URL);
                console.log('Connected to MongoDB');
                resolve();
            } catch (error) {
                console.error('Error connecting to MongoDB:', error.message);
                reject(error);
            }
        }
    });
};

export const closeDatabaseConnection = () => {
    return new Promise(async (resolve, reject) => {
        if (mongoose.connection.readyState === 1) {
            try {
                await mongoose.connection.close();
                console.log('Disconnected from MongoDB');
                resolve();
            } catch (error) {
                console.error('Error closing MongoDB connection:', error.message);
                reject(error);
            }
        } else {
            resolve(); // If already disconnected, resolve without attempting to close
        }
    });
};
