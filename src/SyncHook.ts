/**
 * @description - sync hook wrapper
 */
export class SyncHook<T> {
  private handlers: Array<(param: T) => void>;

  constructor() {
    // store event callback
    this.handlers = [];
  }

  // extreme lite wrapper
  tap(handler: (param: T) => void): void {
    this.handlers.push(handler);
  }

  // execute registered sync handlers
  call(param: T): void {
    this.handlers.slice().forEach((handler) => handler(param));
  }
}
