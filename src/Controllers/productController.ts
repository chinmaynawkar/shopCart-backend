import { Request, Response } from 'express';
import ProductService from '../Services/productServices';
import mongoose from 'mongoose';

class ProductController {
  // Create a new product
  public async addProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productData = {
        product_id: req.body.product_id,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
      };
      const savedProduct = await ProductService.createProduct(productData);
      return res.status(201).json(savedProduct);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  // Get all products
  public async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Get a single product by its id
  public async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const product = await ProductService.getProductById(productId);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(product);
      }
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Update a product
  public async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      const updatedProduct = await ProductService.updateProduct(productId, updateData);
      if (!updatedProduct) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(updatedProduct);
      }
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Partially update a product i.e Patch
  public async partialUpdateProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const updateData = req.body; // only fields that need to be updated
      const updatedProduct = await ProductService.updateProduct(productId, updateData);
      if (!updatedProduct) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(updatedProduct);
      }
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
  // Delete a product
  public async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const isDeleted = await ProductService.deleteProduct(productId);
      if (!isDeleted) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json({ message: 'Product deleted successfully' });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new ProductController();
