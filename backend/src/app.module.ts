import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextAuthModule } from './next-auth/next-auth.module';
import postgresConfig from '../dataSource/dataSource.config';
import { AuthSecretMiddleware } from './next-auth/middlewares/authSecret.middleware';
import { ConfigModule } from '@nestjs/config';
import { UserMiddleware } from './next-auth/middlewares/user.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresConfig),
    NextAuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthSecretMiddleware, UserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
