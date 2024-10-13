import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly privateKey: crypto.KeyObject;
  private readonly publicKey: crypto.KeyObject;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
  }

  async generateAuthMessage() {
    const timestamp = Date.now().toString();
    const maxLength = 117 - timestamp.length - 1;
    const randomPart = crypto
      .randomBytes(maxLength)
      .toString('base64')
      .slice(0, maxLength);
    const originalMessage = `${timestamp}_${randomPart}`;

    const encryptedMessage = crypto.publicEncrypt(
      {
        key: this.publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(originalMessage),
    );

    return {
      encryptedMessage: "Sign to make comments: "+encryptedMessage.toString('base64'),
      originalMessage,
    };
  }


}