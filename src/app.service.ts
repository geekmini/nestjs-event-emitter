import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import Piscina from 'piscina';
import { resolve } from 'path';

// ! need to register as module provider
@Injectable()
export class AppService {
  // worker pool solve concurrent call issues.
  private fibWorker = new Piscina({
    filename: resolve(__dirname, 'fib.worker.js'),
  });

  // ! event handler cannot get the request context, since it cannot be request-scoped
  // unless we use native nodejs async storage to store the request object.
  // but it will brings more overhead.
  @OnEvent('order.created')
  async handleOrderCreated(data: any) {
    console.log({ inputDataOfEventHandler: data });
    console.time();
    const result = await this.fibWorker.run(30);
    console.timeEnd();
    console.log(result);
    console.log('order created handled');
  }
}
