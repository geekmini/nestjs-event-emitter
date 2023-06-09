import { Controller, Get } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AppController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Get()
  hello(): boolean {
    // No documents in the code
    // - need go to nestjs doc site
    // - read the source code ...
    // ! fire and forget
    const handled = this.eventEmitter.emit(
      'order.created',
      'hello first event',
    );

    // eventEmitter return whether an event is processed or not
    return handled;
  }

  @Get('/welcome')
  welcome(): string {
    return 'welcome to event emitter demo';
  }
}
