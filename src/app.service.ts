import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

// ! need to register as module provider
@Injectable()
export class AppService {
  // ! event handler cannot get the request context, since it cannot be request-scoped
  // unless we use native nodejs async storage to store the request object.
  // but it will brings more overhead.
  @OnEvent('order.created')
  handleOrderCreated(data: any) {
    console.log({ data });
    console.log('order created handled');

    // ! it will cause server down
    // ! event exception filter doesn't work on this case
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
