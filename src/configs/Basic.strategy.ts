import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { BasicStrategy as Strategy } from "passport-http";
import { Request } from "express";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../api/users/entities/user.entity";

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, "basic") {
  constructor(@Inject(getModelToken(User)) private readonly userProvider: typeof User
  ) {
    super({
      passReqToCallback: true
    });
  }

  async validate(req: Request, username: string, password: string) {

    let user = await this.userProvider.findOne({ where: { email: username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException();
    }
    return {
      id: user.id,
      username: user.email,
      password
    };
  };
}
