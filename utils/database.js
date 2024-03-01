import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return; // Return out of the function if already connected
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompt-o-pedia",
        })

        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}
