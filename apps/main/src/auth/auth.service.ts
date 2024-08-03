import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UsersService } from '../users/users.service';
import { Role, User } from '../users/models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) { }
  async verifyGoogleToken(googleAccessToken: string) {
    let url: string = "https://www.googleapis.com/oauth2/v1/userinfo";

    const googleResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`
      }
    })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        throw new BadRequestException();
        console.log(error);
      })

    let user = null;
    try {
      user = await this.usersService.getUserByEmail(googleResponse.email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        //Create an user if it doesn't exist
        user = await this.usersService.create({
          email: googleResponse.email,
          role: Role.member,
          name: googleResponse.name,
          picture: googleResponse.picture
        })
      }
    }

    let jwt = await this.generateToken({ userId: user._id, email: user.email })
    return {
      token: jwt,
      userInfo: user,
    };
  }

  private async generateToken(payload): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}

