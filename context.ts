import { getLogger } from "https://deno.land/std@0.177.1/log/mod.ts";
import { ContextAPI } from "./context-api.ts";

export class Context implements ContextAPI {
  private _logger = getLogger("otel-context");
  protected _values: Record<symbol, unknown> = {};

  static fromContext(ctx: Context): Context {
    const newContext = new Context();
    newContext._values = { ...ctx._values };

    return newContext;
  }

  createKey(debugName: string): symbol {
    this._logger.debug(`Context.createKey(${debugName})`);
    return Symbol();
  }

  getValue(key: symbol): unknown {
    this._logger.debug(`Context.getValue(${String(key)})`);
    return this._values[key];
  }

  setValue(key: symbol, value: unknown): Context {
    this._logger.debug(`Context.setValue(${String(key)}, ${String(value)})`);
    const ctx = Context.fromContext(this);
    ctx._values[key] = value;
    return ctx;
  }
}
