import { Controller, Get, Post, Put, Delete, Body, Param, Logger, UseGuards, Request } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Roles('user', 'admin')
  @Get()
  async getAllProducts(): Promise<Product[]> {
    this.logger.log('GET /api/products - Fetching all products');
    return this.productService.getAllProducts();
  }

  @Roles('user', 'admin')
  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    this.logger.log(`GET /api/products/${id} - Fetching product by ID`);
    return this.productService.getProductById(id);
  }

  @Roles('admin')
  @Post()
  async createProduct(@Body() product: Product): Promise<Product> {
    this.logger.log('POST /api/products - Creating new product');
    return this.productService.createProduct(product);
  }

  @Roles('admin')
  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() product: Product,
  ): Promise<Product> {
    this.logger.log(`PUT /api/products/${id} - Updating product`);
    return this.productService.updateProduct(id, product);
  }

  @Roles('admin')
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    this.logger.log(`DELETE /api/products/${id} - Deleting product`);
    return this.productService.deleteProduct(id);
  }

  // Local database endpoints
  @Roles('user', 'admin')
  @Get('local')
  async getAllFromLocalDatabase(): Promise<Product[]> {
    this.logger.log('GET /api/products/local - Fetching all products from local database');
    return this.productService.getAllFromLocalDatabase();
  }

  @Roles('user', 'admin')
  @Get('local/:id')
  async getFromLocalDatabase(@Param('id') id: number): Promise<Product> {
    this.logger.log(`GET /api/products/local/${id} - Fetching product from local database`);
    return this.productService.getFromLocalDatabase(id);
  }

  @Roles('admin')
  @Post('local')
  async saveToLocalDatabase(@Body() product: Product): Promise<Product> {
    this.logger.log('POST /api/products/local - Saving product to local database');
    return this.productService.saveToLocalDatabase(product);
  }

  @Roles('admin')
  @Delete('local/:id')
  async deleteFromLocalDatabase(@Param('id') id: number): Promise<void> {
    this.logger.log(`DELETE /api/products/local/${id} - Deleting product from local database`);
    return this.productService.deleteFromLocalDatabase(id);
  }
} 