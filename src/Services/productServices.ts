import Product from '../Models/product.model';


// The ProductService class contains methods for interacting with the Product model.
// <typeof Product> is used to refer to the instance type of the Product model class. 
// Tells TypeScript the methods will return instances of the Product model or arrayss,

class ProductService {
  async getAllProducts(): Promise<InstanceType<typeof Product>[]> {
    return await Product.find();
  }

  async getProductById(id: string): Promise<InstanceType<typeof Product> | null> {
    return await Product.findById(id);
  }

  //productData is an object with properties similar to a Product instance, but all the properties are optional
  async createProduct(productData: Partial<InstanceType<typeof Product>>): Promise<InstanceType<typeof Product>> {
    return await new Product(productData).save();
  }

  async updateProduct(id: string, updateData: Partial<InstanceType<typeof Product>>): Promise<InstanceType<typeof Product> | null> {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  //partialUpdateProduct is a static method that accepts a product id and an object with properties to update
  static async partialUpdateProduct(productId: string, updateData: Partial<typeof Product>): Promise<typeof Product | null> {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true }) as typeof Product;
      if (!updatedProduct) {
        throw new Error('Product not found');
      }
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await Product.deleteOne({ _id: id });
    return result.deletedCount >   0;
  }
}

export default new ProductService();
