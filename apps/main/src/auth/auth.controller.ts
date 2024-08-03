import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @HttpCode(HttpStatus.OK)
  @Post('login/google')
  async loginGoogle(
    @Body() body: {
      token: string,
    }
  ) {
    return await this.authService.verifyGoogleToken(body.token);
  }
}
