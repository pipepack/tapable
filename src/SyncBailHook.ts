/**
 * @description - iterator function can return undefined or concerend
 */
export class SyncBailHook<T, R> {
  private handlers: Array<(param: T) => R | undefined>;

  constructor() {
    // store event callback
    this.handlers = [];
  }

  // extreme lite wrapper
  tap(handler: (param: T) => R | undefined): void {
    this.handlers.push(handler);
  }

  // execute registered sync handlers
  call(param: T): R | undefined {
    const handlers = this.handlers.slice();

    for (const handler of handlers) {
      const result = handler(param);

      if (result) {
        return result;
      }
    }

    return undefined;
  }
}
