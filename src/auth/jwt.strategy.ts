import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
const secret = process.env.JWTSECRET || '515b400cc9024b3a97fc25aceebb71e3';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Use env variable in production!
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}