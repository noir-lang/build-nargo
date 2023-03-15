import { suite } from "uvu";
import { cd } from "zx";
import { NARGO_BIN } from "./utils/nargo.js";
import "./utils/zx.js";

const test = suite("nargo");

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

test("nargo builds noir/test/test_data/6_array sucessfully", async () => {
  await within(async () => {
    cd("./noir/crates/nargo/tests/test_data/6_array");
    const command = `${NARGO_BIN} check`;

    await $`${command}`.nothrow();
  });
});

test("nargo creates proof noir/test/test_data/6_array sucessfully", async () => {
  await within(async () => {
    cd("./noir/crates/nargo/tests/test_data/6_array");
    const command = `${NARGO_BIN} prove 6_array`;

    await $`${command}`.nothrow();
  });
});

test("nargo verifies proof noir/test/test_data/6_array sucessfully", async () => {
  await within(async () => {
    cd("./noir/crates/nargo/tests/test_data/6_array");
    const command = `${NARGO_BIN} verify 6_array`;

    await $`${command}`.nothrow();
  });
});

test.run();
