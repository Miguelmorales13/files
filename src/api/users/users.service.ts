import { Inject, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { SequelizeCrudService } from "../sequelize-crud-service";
import { getModelToken } from "@nestjs/sequelize";
import { password_generator } from "../../configs/helpers.config";
import { EmailService } from "../../helpers/email/email.service";
import { TemplateEnum } from "../../enums/template.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService extends SequelizeCrudService<User, CreateUserDto, UpdateUserDto> {

  constructor(
    @Inject(getModelToken(User)) private readonly userProvider: typeof User,
    private readonly emailService: EmailService
  ) {
    super(userProvider);
  }

  async findAll(): Promise<User[]> {
    return this.userProvider.scope("withOutPass").findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userProvider.scope("withOutPass").findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userProvider.findOne({ where: { email } });
  }


  async create(itemCreate: CreateUserDto): Promise<User> {
    const password = password_generator(10);
    await this.emailService.sendEmail(itemCreate.email, TemplateEnum.subscription, {
      password,
      userName: itemCreate.name,
      link: ""
    });
    const user = await this.userProvider.scope("withOutPass").create({ ...itemCreate, password });
    return this.findOne(user.id);
  }
}
