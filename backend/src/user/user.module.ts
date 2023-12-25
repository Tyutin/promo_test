import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRequestEntity, SessionEntity, UserEntity } from './user.entity';
import { PromocodeEntity } from 'src/promocode/promocode.entity';
import { PromocodeService } from 'src/promocode/promocode.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SessionEntity,
      AuthRequestEntity,
      PromocodeEntity,
    ]),
  ],
  providers: [UserService, PromocodeService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
