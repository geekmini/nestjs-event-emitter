import { parentPort } from 'worker_threads';

export function fib(num: number) {
  if (num <= 1) return 1;
  return fib(num - 1) + fib(num - 2);
}

parentPort.on('message', ({ n, id }) => {
  const result = fib(n);
  parentPort.postMessage({ result, id });
});
