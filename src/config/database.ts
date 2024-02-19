import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect('Your URL');
            
        console.log("MongoDB connected");

    } catch(erro) {
        console.error("Error connecting to MongoDB :  ${error}");
        process.exit(1);
    }
};
export default connectDB;
