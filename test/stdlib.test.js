import { suite } from "uvu";
import { cd } from "zx";
import { NARGO_BIN } from "./utils/nargo.js";
import "./utils/zx.js";

const test = suite("stdlib");

// Helps detect unresolved ProcessPromise.
let promiseResolved = false;
process.on("exit", () => {
  if (!promiseResolved) {
    console.error("Error: ProcessPromise never resolved.");
    process.exitCode = 1;
  }
});

test("promise resolved", async () => {
  await $`echo PromiseHelper`;
  promiseResolved = true;
});

test("nargo compiles using the stdlib successfully", async () => {
  await within(async () => {
    cd("./noir/crates/nargo/tests/test_data/struct_inputs");
    const command = `${NARGO_BIN} compile test`;

    await $`${command}`.nothrow();
  });
});

test.run();
