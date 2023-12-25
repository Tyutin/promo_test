import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from 'src/telegram-config.factory';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthRequestEntity,
  SessionEntity,
  UserEntity,
} from 'src/user/user.entity';
import { PromocodeEntity } from 'src/promocode/promocode.entity';
import { PromocodeService } from 'src/promocode/promocode.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    TypeOrmModule.forFeature([
      UserEntity,
      SessionEntity,
      AuthRequestEntity,
      PromocodeEntity,
    ]),
  ],
  providers: [TelegramService, UserService, PromocodeService],
})
export class TelegramModule {}
