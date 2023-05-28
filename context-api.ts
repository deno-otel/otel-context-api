export interface ContextAPI {
  createKey(debugName: string): symbol;
  getValue(key: symbol): unknown;
  setValue(key: symbol, value: unknown): ContextAPI;
}
