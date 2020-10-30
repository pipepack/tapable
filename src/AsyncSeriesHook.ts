// package
import { Aigle } from 'aigle';

export class AsyncSeriesHook<T> {
  private handlers: Array<(param: T) => Aigle<void>>;

  constructor() {
    this.handlers = [];
  }

  // extreme lite wrapper
  tapPromise(handler: (param: T) => Aigle<void>): void {
    this.handlers.push(handler);
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
