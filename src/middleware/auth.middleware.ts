import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Bearer <token>

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Replace with your token verification API URL
      const response = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/verify_token', { token });

      // If the response is successful, you can attach user data to the request
      req['user'] = response.data;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}