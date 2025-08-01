import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: { user: string; password: string }) {
    const payload = { username: loginDto.user, sub: loginDto.password }; 
    const token = this.jwtService.sign(payload);  
    return { access_token: token };
  }
}