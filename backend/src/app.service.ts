import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(request: Request): string {
    if (process.env.sas) {
      console.log(request);
    }
    return 'Hello World!';
  }
}
