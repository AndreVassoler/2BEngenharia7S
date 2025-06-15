import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    try {
      return await this.authService.login(loginDto.username, loginDto.password);
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async checkAuth(@Request() req) {
    return {
      authenticated: true,
      user: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
      }
    };
  }
} 