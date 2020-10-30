// package
import { Aigle } from 'aigle';
// internal
import { AsyncParallelHookOptions } from './tapable.interface';

// execute with maximum concurrency, without care about return
export class AsyncParallelHook<T> {
  private options: AsyncParallelHookOptions;

  private handlers: Array<(param: T) => Promise<void>>;

  constructor(options: AsyncParallelHookOptions) {
    // limit concurrency
    this.options = options;

    // store event callback
    this.handlers = [];
  }

  // extreme lite wrapper
  tapPromise(handler: (param: T) => Promise<void>): void {
    this.handlers.push(handler);
  }

  // execute registered worker seriesly
  call(param: T): Aigle<void[]> {
    // convert into PromiseCallback<void>
    const handlers = this.handlers
      .slice()
      .map((handler) => () => handler(param));

    return Aigle.parallelLimit(handlers, this.options.concurrency);
  }
}
