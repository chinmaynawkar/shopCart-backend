import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://cnawkar19:eKrc13oL6L21fY7z@mydatabase.ao4wrdn.mongodb.net/shopcartDB?retryWrites=true&w=majority');
            
        console.log("MongoDB connected");

    } catch(erro) {
        console.error("Error connecting to MongoDB :  ${error}");
        process.exit(1);
    }
};
export default connectDB;