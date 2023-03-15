import { parse } from "node:path";

export const NARGO_BIN = parse(process.env.NARGO_PATH) ?? "nargo";
