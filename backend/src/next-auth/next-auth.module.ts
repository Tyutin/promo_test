import { Module } from '@nestjs/common';
import { NextAuthController } from './next-auth.controller';
import { NextAuthService } from './next-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, SessionEntity, UserEntity } from './nextAuth.entity';

@Module({
  controllers: [NextAuthController],
  providers: [NextAuthService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity, SessionEntity]),
  ],
  exports: [NextAuthService],
})
export class NextAuthModule {}
