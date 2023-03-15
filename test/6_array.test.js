import { suite } from "uvu";
import * as assert from "uvu/assert";
import { cd } from "zx";
import "zx/globals";

const test = suite("nargo");

const nargoBinPath = path.join(process.cwd(), "noir/dist/");
const nargoBin = path.join(nargoBinPath, "nargo");

if (process.platform == "win32") {
  $.shell = 'powershell'
  $.prefix = '';
  $.postfix = '; exit $LastExitCode'
}

$.quote = (arg) => {
  return arg;
};

$.verbose = true;

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
    const command = `${nargoBin} check`;

    await $`${command}`.nothrow();
  });
});

test("nargo creates proof noir/test/test_data/6_array sucessfully", async () => {
  await within(async () => {
    cd("./noir/crates/nargo/tests/test_data/6_array");
    const command = `${nargoBin} prove 6_array`;

    await $`${command}`.nothrow();
  });
});

test("nargo verifies proof noir/test/test_data/6_array sucessfully", async () => {
  await within(async () => {
    cd("./noir/crates/nargo/tests/test_data/6_array");
    const command = `${nargoBin} verify 6_array`;

    await $`${command}`.nothrow();
  });
});

test.run();
