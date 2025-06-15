import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'products.db',
      entities: [Product, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, User]),
    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {} 