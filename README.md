

## Why we need to use `in-memory` Event Emitter?

The event emitter follows the Fire-And-Forget pattern which originated from weapon system. e.g. missile launch.

One important thing we need to notion here is that, after we launch the missile, it's gonna be destroyed finally, thus we truly don't care about the missile state after all. The only thing we care about is **whether the missile hit the target**.

Let's first see **2** **cases** if error happens in error handler using event emitter of Nest.JS

### Sync Event Handler
- `The EventEmitter calls all listeners synchronously in the order in which they were registered.` from [node.js](https://nodejs.dev/en/api/v19/events/#asynchronous-vs-synchronous)
- Whether the call is sync or async, long-running task will block the whole application after all. So I don't agree with this. [stackoverflow](https://stackoverflow.com/questions/38881170/when-should-i-use-eventemitter#answer-70733222)

### Async Event Handler
- it will lead to unhandled exceptions and we need extra code to deal with this case [node.js](https://nodejs.dev/en/api/v19/events/#capture-rejections-of-promises)
- if we don't deal with it, it will cause the server down (serve failure)
- this kind of failure cannot be caught by **any** Nest.js Exception Filter.
- **Nest Event Emitter itself doesn't provide any error handler for a event emitter instance, but this is recommended by node.js.** [As a best practice, listeners should always be added for the 'error' events.](https://nodejs.dev/en/api/v19/events/#error-events)
- The only way to deal with this is by node itself method.
```typescript
process.on('unhandledRejection', (err) => {
  console.log(err);
});

process.on('uncaughtException', (err) => {
  console.log(err);
});
```
- for long-running block operations, it's no matter it's sync or async in event handler.
- for io instance task, it's better to use async！

## Conclusion
- **Don't use Nest.js Event Emitter, it's not complete.**
- In Most cases, I don't see the pros over cons of event emitter. Even it can do the **decouple** thing, it makes the development flow even more **anti-human** and make **it hard to debug**.
- Even with in-memory event emitter, there is **neither retry mechanism nor message queue as buffer**. I quite don't understand what's the point of using event emitter in memory!
- If you are **stubborn enough** and till need event emitter, just use node.js native one.


**DON'T RECOMMEND USE IN-MEMORY EVENT EMITTER IN BACKEND**