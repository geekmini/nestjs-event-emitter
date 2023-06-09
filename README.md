

## When to user in-memory Event Emitter?

The event emitter follows the Fire-And-Forget pattern which originated from weapon system. e.g. missile launch.

One important thing we need to notion here is that, after we launch the missile, it's gonna be destroyed finally, thus we truly don't care about the missile state after all. The only thing we care about is **whether the missile hit the target**.



## Key things to remember
- always use `async` for event handler
  - [Sync handler is blocking operation](https://nodejs.dev/en/api/v19/events/#asynchronous-vs-synchronous)
  - [Async handler lead to an unhandled rejection](https://nodejs.dev/en/api/v19/events/#asynchronous-vs-synchronous)
- If things in handler is critical, we also need to consider about **how to handler errors in handler** [stackoverflow](https://stackoverflow.com/questions/38881170/when-should-i-use-eventemitter#answer-70733222)