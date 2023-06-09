import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FibWorkerHost } from './fibWorker.host';

// ! need to register as module provider
@Injectable()
export class AppService {
  constructor(private fibWorkerHost: FibWorkerHost) {}
  // ! event handler cannot get the request context, since it cannot be request-scoped
  // unless we use native nodejs async storage to store the request object.
  // but it will brings more overhead.
  @OnEvent('order.created')
  async handleOrderCreated(data: any) {
    console.log({ inputDataOfEventHandler: data });
    console.time();
    const result = await this.fibWorkerHost.run(30);
    console.timeEnd();
    console.log(result);
    console.log('order created handled');
  }
}
