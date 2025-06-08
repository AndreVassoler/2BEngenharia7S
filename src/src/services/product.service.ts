import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import axios from 'axios';
@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  private readonly apiUrl = 'https://dummyjson.com/products';

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      this.logger.log('Fetching all products from API');
      const response = await axios.get(this.apiUrl);
      const products = response.data.products;
      this.logger.log(`Successfully fetched ${products.length} products`);
      return products;
    } catch (error) {
      this.logger.error('Error fetching products:', error.message);
      throw error;
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      this.logger.log(`Fetching product with ID: ${id}`);
      const response = await axios.get(`${this.apiUrl}/${id}`);
      this.logger.log('Successfully fetched product');
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching product ${id}:`, error.message);
      throw error;
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      this.logger.log('Creating new product');
      const response = await axios.post(`${this.apiUrl}/add`, product);
      this.logger.log('Successfully created product');
      return response.data;
    } catch (error) {
      this.logger.error('Error creating product:', error.message);
      throw error;
    }
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    try {
      this.logger.log(`Updating product with ID: ${id}`);
      const response = await axios.put(`${this.apiUrl}/${id}`, product);
      this.logger.log('Successfully updated product');
      return response.data;
    } catch (error) {
      this.logger.error(`Error updating product ${id}:`, error.message);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      this.logger.log(`Deleting product with ID: ${id}`);
      await axios.delete(`${this.apiUrl}/${id}`);
      this.logger.log('Successfully deleted product');
    } catch (error) {
      this.logger.error(`Error deleting product ${id}:`, error.message);
      throw error;
    }
  }

  async saveToLocalDatabase(product: Product): Promise<Product> {
    try {
      this.logger.log('Saving product to local database');
      const savedProduct = await this.productRepository.save(product);
      this.logger.log('Successfully saved product to local database');
      return savedProduct;
    } catch (error) {
      this.logger.error('Error saving product to local database:', error.message);
      throw error;
    }
  }

  async getAllFromLocalDatabase(): Promise<Product[]> {
    try {
      this.logger.log('Fetching all products from local database');
      const products = await this.productRepository.find();
      this.logger.log(`Successfully fetched ${products.length} products from local database`);
      return products;
    } catch (error) {
      this.logger.error('Error fetching products from local database:', error.message);
      throw error;
    }
  }

  async getFromLocalDatabase(id: number): Promise<Product> {
    try {
      this.logger.log(`Fetching product from local database with ID: ${id}`);
      const product = await this.productRepository.findOne({ where: { id } });
      this.logger.log('Successfully fetched product from local database');
      return product;
    } catch (error) {
      this.logger.error('Error fetching product from local database:', error.message);
      throw error;
    }
  }

  async deleteFromLocalDatabase(id: number): Promise<void> {
    try {
      this.logger.log(`Deleting product from local database with ID: ${id}`);
      await this.productRepository.delete(id);
      this.logger.log('Successfully deleted product from local database');
    } catch (error) {
      this.logger.error('Error deleting product from local database:', error.message);
      throw error;
    }
  }
} 