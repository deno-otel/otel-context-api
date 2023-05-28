import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.177.1/testing/asserts.ts";
import { Context } from "./context.ts";

Deno.test("Context.createKey: returns a symbol", () => {
  const ctx = new Context();
  const key = ctx.createKey("test");
  assertEquals(typeof key, "symbol");
});

Deno.test("Context.createKey: returns a different symbol each time", () => {
  const ctx = new Context();
  const key1 = ctx.createKey("test");
  const key2 = ctx.createKey("test");
  assertNotEquals(key1, key2);
});

Deno.test("Context.getValue: returns undefined if key is not set", () => {
  const ctx = new Context();
  const key = ctx.createKey("test");
  assertEquals(ctx.getValue(key), undefined);
});

Deno.test("Context.getValue: returns the value set for the key", () => {
  const ctx = new Context();
  const key = ctx.createKey("test");
  const value = {};
  const ctx2 = ctx.setValue(key, value);
  assertEquals(ctx2.getValue(key), value);
});

Deno.test("Context.setValue: returns a new context", () => {
  const ctx = new Context();
  const key = ctx.createKey("test");
  const value = {};
  const ctx2 = ctx.setValue(key, value);
  assertNotEquals(ctx, ctx2);
});

Deno.test("Context.setValue: does not mutate the original context", () => {
  const ctx = new Context();
  const key = ctx.createKey("test");
  const value = {};
  ctx.setValue(key, value);
  assertEquals(ctx.getValue(key), undefined);
});

Deno.test("Context.setValue: retains previous values", () => {
  const ctx = new Context();
  const key1 = ctx.createKey("test1");
  const value1 = "a";
  const ctx2 = ctx.setValue(key1, value1);
  const key2 = ctx.createKey("test2");
  const value2 = "b";
  const ctx3 = ctx2.setValue(key2, value2);
  assertEquals(ctx3.getValue(key1), value1);
  assertEquals(ctx3.getValue(key2), value2);
});
