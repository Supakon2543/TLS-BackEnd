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
      //
      const header_token = await axios.post(`${process.env.SECURITYCONTROLBASEURL ?? 'https://api-dev.osotspa.com/securitycontrol'}/oauth2/token`, {
        client_id: process.env.OAUTH2_CLIENT_ID ?? "2ATwV3iAbpmdkzuazH4XPZaffMsQc94H",
        client_secret: process.env.OAUTH2_CLIENT_SECRET ?? "f8D1UqM9OGVcziQ1SfIoz6UTXL5qaDtp",
        grant_type: process.env.OAUTH2_GRANT_TYPE ?? "client_credentials"
      });
      // 
      const response = await axios.post(`${process.env.SECURITYCONTROLBASEURL ?? 'https://api-dev.osotspa.com/securitycontrol'}/api/auth/verify_token`, {
        accessToken: token,
      }, {
        headers: {
          Authorization: `Bearer ${header_token.data.access_token}`,
        },
      });

      // If the response is successful, you can attach user data to the request
      if (!response.data || !response) {
        throw new UnauthorizedException('Invalid or expired token');
      }
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}