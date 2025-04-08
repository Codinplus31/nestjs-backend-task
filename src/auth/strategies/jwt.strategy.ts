import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import type { ConfigService } from "@nestjs/config"
import type { UsersService } from "../../users/users.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("JWT_SECRET"),
      ignoreExpiration: false,
    })
  }

  async validate(payload: any) {
    return this.usersService.findById(payload.sub)
  }
}
