import { IsEmail } from "class-validator";
import { Role } from "../models/user.schema";

export class CreateUserDto {
  @IsEmail()
  email: string
  role: Role;

  name: string;

  picture: string;
}
