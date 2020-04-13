import dotenv from "dotenv";
dotenv.config();
import { createLogger, writeLog } from "fast-node-logger";
import type { User } from "../generated/interfaces/index";
import { Generator } from "./index";

export async function main() {
  const logger = await createLogger({
    level: "trace",
    prettyPrint: { colorize: true, translateTime: " yyyy-mm-dd HH:MM:ss" },
  });

  const generator = new Generator<User>();
  generator
    .where({ field: "mobile", criteria: "404*" })
    .whereAnd({ field: "memberOf", criteria: "admin*" })
    .orderBy({ field: "msDS-NcType", order: "asc" })
    .whereNot({ field: "middleName", criteria: "joe" })
    .whereAnd({ field: "msCOM-UserLink", criteria: "" })
    .toString();

  console.log(`File: app.ts,`, `Line: 21 => `);
}

main().catch((err: Error) => {
  writeLog(err, { level: "error" });
});
