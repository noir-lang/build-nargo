import { suite } from "uvu";
import * as assert from "uvu/assert";
import { cd } from "zx";
import "zx/globals";

const test = suite("nargo");

const nargoBinPath = path.join(process.cwd(), "noir/dist/");
const nargoBin = path.join(nargoBinPath, "nargo");

if (process.platform == "win32") {
  $.shell = "powershell";
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

test("prints version", async () => {
  const processOutput = (await $`${nargoBin} --version`).toString();
  assert.match(processOutput, /nargo\s\d{1,2}.\d{1,2}/);
});

test("reports a clean commit", async () => {
  const processOutput = (await $`${nargoBin} --version`).toString();
  assert.not.match(processOutput, /modified/)
});

test.run();
