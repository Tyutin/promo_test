import { Controller } from '@nestjs/common';
import { NextAuthService } from './next-auth.service';

@Controller('auth')
export class NextAuthController {
  constructor(private readonly nextAuthService: NextAuthService) {
    this.nextAuthService = nextAuthService;
  }
}
