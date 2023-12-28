import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import {
  AuthRequestEntity,
  SessionEntity,
  UserEntity,
} from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      UserEntity,
      SessionEntity,
      AuthRequestEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, UserService],
})
export class OrderModule {}
