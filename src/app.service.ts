import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Helloo  from Shamba assistant-ai !!!!';
  }
}