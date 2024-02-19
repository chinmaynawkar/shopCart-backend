import mongoose, { Schema, Document } from 'mongoose';

// Define the Product interface for type safety and clarity
interface Product extends Document {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  product_id: { type: String, required: true },
  
});

export default mongoose.model<Product>('Product', ProductSchema);
