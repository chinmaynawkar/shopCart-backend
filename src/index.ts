import express from 'express';
import connectDB from './config/database';    
import productRoute from './Routes/product.route';
import cors from 'cors';
import verifyToken from './Middlewares/auth';
import authRoute from './Routes/auth.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/products', verifyToken,productRoute);


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server: ${error}');
        process.exit(1);
    }
};
startServer();