import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

// ! need to register as module provider
@Injectable()
export class AppService {
  // ! event handler cannot get the request context, since it cannot be request-scoped
  // unless we use native nodejs async storage to store the request object.
  // but it will brings more overhead.
  @OnEvent('order.created')
  handleOrderCreated() {
    console.log('create order side effect');
  }
}
