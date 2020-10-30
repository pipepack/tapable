/**
 * @description - suits example
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { Aigle } from 'aigle';
// internal
import {
  SyncHook,
  HookMap,
  AsyncSeriesHook,
  AsyncParallelHook,
  SyncBailHook,
} from '../src';

describe('SyncHook', () => {
  // sync handler execute with the same parameter, without interactive data
  it('should call method once', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();
    const hook = new SyncHook();

    hook.tap(fn1);
    hook.tap(fn2);
    hook.tap(fn3);

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();
    expect(fn3).not.toHaveBeenCalled();

    hook.call(100);

    expect(fn1).toHaveBeenCalledWith(100);
    expect(fn2).toHaveBeenCalledWith(100);
    expect(fn3).toHaveBeenCalledWith(100);
  });

  it('should bailout when return', () => {
    const hook = new SyncBailHook<void, string>();
    const fn = jest.fn();

    fn.mockReturnValueOnce(undefined)
      .mockReturnValueOnce('hello world')
      .mockReturnValueOnce('The Town');

    hook.tap(fn);
    hook.tap(fn);
    hook.tap(fn);

    expect(hook.call()).toEqual('hello world');
  });
});

describe('HookMap', () => {
  it('should cache creation', () => {
    const hookMap = new HookMap(() => new SyncHook<void>());
    const hook1 = hookMap.for('initial');

    expect(hookMap.for('initial')).toEqual(hook1);
  });
});

describe('AysncHooks', () => {
  jest.useFakeTimers();

  it('should call handler series and async', () => {
    const hook = new AsyncSeriesHook<void>();

    const fn1 = jest.fn<Aigle<void>, undefined>(() => Aigle.delay(100));
    const fn2 = jest.fn<Aigle<void>, undefined>(() => Aigle.delay(200));

    hook.tapPromise(fn1);
    hook.tapPromise(fn2);

    const promise = hook.call();

    jest.advanceTimersByTime(90);

    expect(fn1).toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(fn2).toHaveBeenCalled();
    expect(promise.isFulfilled()).toEqual(false);

    jest.advanceTimersByTime(210);

    expect(promise.isFulfilled()).toEqual(true);
  });

  it('should call handler parallel and async', () => {
    const hook = new AsyncParallelHook<void>({
      concurrency: 3,
    });

    const fn1 = jest.fn<Aigle<void>, undefined>(() => Aigle.delay(100));
    const fn2 = jest.fn<Aigle<void>, undefined>(() => Aigle.delay(200));

    hook.tapPromise(fn1);
    hook.tapPromise(fn2);

    const promise = hook.call();

    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(promise.isFulfilled()).toEqual(false);

    jest.advanceTimersByTime(210);

    expect(promise.isFulfilled()).toEqual(true);
  });
});
