import { parse } from "node:path";

export const NARGO_BIN = process.env.NARGO_PATH ? parse(process.env.NARGO_PATH) : "nargo";
