// package
import { Aigle } from 'aigle';

export class AsyncSeriesHook<T> {
  private handlers: Array<(param: T) => Promise<void>>;

  constructor() {
    this.handlers = [];
  }

  // extreme lite wrapper
  tapPromise(worker: (param: T) => Promise<void>): void {
    this.handlers.push(worker);
  }

  // execute registered worker seriesly
  call(param: T): Aigle<void[]> {
    // convert into PromiseCallback<void>
    const handlers = this.handlers
      .slice()
      .map((handler) => () => handler(param));

    return Aigle.series(handlers);
  }
}
