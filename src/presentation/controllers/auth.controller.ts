import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { LoginControllerDto } from '../dtos/login.controller.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginControllerDto) {
    return this.authService.login(loginDto);
  }
}