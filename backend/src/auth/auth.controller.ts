import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('message')
  async getAuthMessage() {
    try {
      const { encryptedMessage } = await this.authService.generateAuthMessage();
      return { auth_message: encryptedMessage };
    } catch (error) {
      console.error('Error generating auth message:', error);
      throw new HttpException(
        `Failed to generate auth message: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(
    @Body()
    body: {
      walletAddress: string;
      signedMessage: string;
      encryptedMessage: string;
    },
  ) {
  }
}
