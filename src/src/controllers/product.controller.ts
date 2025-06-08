import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    this.logger.log('GET /api/products - Fetching all products');
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    this.logger.log(`GET /api/products/${id} - Fetching product by ID`);
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() product: Product): Promise<Product> {
    this.logger.log('POST /api/products - Creating new product');
    return this.productService.createProduct(product);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() product: Product,
  ): Promise<Product> {
    this.logger.log(`PUT /api/products/${id} - Updating product`);
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    this.logger.log(`DELETE /api/products/${id} - Deleting product`);
    return this.productService.deleteProduct(id);
  }

  // Local database endpoints
  @Get('local')
  async getAllFromLocalDatabase(): Promise<Product[]> {
    this.logger.log('GET /api/products/local - Fetching all products from local database');
    return this.productService.getAllFromLocalDatabase();
  }

  @Get('local/:id')
  async getFromLocalDatabase(@Param('id') id: number): Promise<Product> {
    this.logger.log(`GET /api/products/local/${id} - Fetching product from local database`);
    return this.productService.getFromLocalDatabase(id);
  }

  @Post('local')
  async saveToLocalDatabase(@Body() product: Product): Promise<Product> {
    this.logger.log('POST /api/products/local - Saving product to local database');
    return this.productService.saveToLocalDatabase(product);
  }

  @Delete('local/:id')
  async deleteFromLocalDatabase(@Param('id') id: number): Promise<void> {
    this.logger.log(`DELETE /api/products/local/${id} - Deleting product from local database`);
    return this.productService.deleteFromLocalDatabase(id);
  }
} 