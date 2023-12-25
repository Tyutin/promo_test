import { Module } from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { PromocodeController } from './promocode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocodeEntity } from './promocode.entity';
import {
  AuthRequestEntity,
  SessionEntity,
  UserEntity,
} from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PromocodeEntity,
      UserEntity,
      SessionEntity,
      AuthRequestEntity,
    ]),
  ],
  providers: [PromocodeService, UserService],
  controllers: [PromocodeController],
  exports: [PromocodeService],
})
export class PromocodeModule {}
