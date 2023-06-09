import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception.filter';
import { FibWorkerHost } from './fibWorker.host';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    FibWorkerHost,
  ],
})
export class AppModule {}
