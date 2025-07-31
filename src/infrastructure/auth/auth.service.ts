import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string) {
    const payload = { username, sub: 1 }; 
    const token = this.jwtService.sign(payload);  
    return { access_token: token };
  }
}