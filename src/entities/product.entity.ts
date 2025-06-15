import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  @Column('float', { nullable: true })
  discountPercentage: number;

  @Column('float', { nullable: true })
  rating: number;

  @Column()
  stock: number;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column()
  thumbnail: string;

  @Column('simple-array')
  images: string[];
} 