import { Context, ContextAPI } from "./mod.ts";

/**
 * This is a convenience class for building a context.
 */
export class ContextBuilder {
  private _values: { key: symbol; value: unknown }[] = [];
  private initialCtx: ContextAPI | undefined;

  /**
   * A Builder can be instantiated directly, which allows you to build a Context from nothing
   */
  constructor() {}

  /**
   * A Builder can be instantiated from an existing Context, which allows you to build a Context from an existing Context
   */
  static fromContext(ctx: ContextAPI) {
    const builder = new ContextBuilder();
    builder.initialCtx = ctx;
    return builder;
  }

  /**
   * Adds a key/value pair to the Context being built
   */
  addValue(key: symbol, value: unknown) {
    this._values.push({ key, value });
  }

  /**
   * Builds and returns a Context from the key/value pairs that have been added to the Builder
   */
  build() {
    return this._values.reduce((ctx, kv) => {
      return ctx.setValue(kv.key, kv.value);
    }, this.initialCtx ?? new Context());
  }
}
