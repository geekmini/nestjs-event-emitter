import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

// ! need to register as module provider
@Injectable()
export class AppService {
  // ! event handler cannot get the request context, since it cannot be request-scoped
  // unless we use native nodejs async storage to store the request object.
  // but it will brings more overhead.
  @OnEvent('order.created')
  async handleOrderCreated(data: any) {
    console.log({ inputDataOfEventHandler: data });
    console.time();
    const result = this.fib(60);
    console.timeEnd();
    console.log(result);
    console.log('order created handled');
  }

  private fib(num: number) {
    if (num <= 1) return 1;
    return this.fib(num - 1) + this.fib(num - 2);
  }
}
