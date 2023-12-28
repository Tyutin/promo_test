import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import postgresConfig from '../dataSource/dataSource.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TelegramModule } from './telegram/telegram.module';
import { PromocodeModule } from './promocode/promocode.module';
import { AuthSecretMiddleware } from './user/middlewares/authSecret.middleware';
import { UserMiddleware } from './user/middlewares/user.middleware';
import { IsAdminMiddleware } from './user/middlewares/IsAdmin.middleware';
import { IsAffiliateMiddleware } from './user/middlewares/IsAffiliate.middleware';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TelegramModule,
    PromocodeModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        AuthSecretMiddleware,
        UserMiddleware,
        IsAdminMiddleware,
        IsAffiliateMiddleware,
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
