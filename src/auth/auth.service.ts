import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  }

  async createInitialUsers() {
    this.logger.log('Attempting to create initial users...');
    const adminExists = await this.usersRepository.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const adminPassword = await bcrypt.hash('admin123', 10);
      await this.usersRepository.save({
        username: 'admin',
        email: 'admin@system.com',
        password: adminPassword,
        role: 'admin'
      });
      this.logger.log('Admin user created successfully.');
    } else {
      this.logger.log('Admin user already exists.');
    }

    const userExists = await this.usersRepository.findOne({ where: { username: 'user' } });
    if (!userExists) {
      const userPassword = await bcrypt.hash('user123', 10);
      await this.usersRepository.save({
        username: 'user',
        email: 'user@system.com',
        password: userPassword,
        role: 'user'
      });
      this.logger.log('Regular user created successfully.');
    } else {
      this.logger.log('Regular user already exists.');
    }
    this.logger.log('Finished attempting to create initial users.');
  }
} 