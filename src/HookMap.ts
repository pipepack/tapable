interface HookFactory<T> {
  (key?: string): T;
}

// T means specific hook
export class HookMap<T> {
  private hookFactory: HookFactory<T>;

  private hookStore: Map<string, T>;

  constructor(hookFactory: HookFactory<T>) {
    this.hookFactory = hookFactory;
    this.hookStore = new Map();
  }

  for(type: string): T {
    return this.hookStore.get(type) || this.create(type);
  }

  // create and store new hook
  create(type: string): T {
    // create new hook
    const hook = this.hookFactory(type);

    // store new hook
    this.hookStore.set(type, hook);

    return hook;
  }
}
