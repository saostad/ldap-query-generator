import dotenv from "dotenv";
dotenv.config();
import { createLogger, writeLog } from "fast-node-logger";
import type { User } from "../generated/interfaces/index";
import { QueryGenerator } from "./index";

export async function main() {
  const logger = await createLogger({
    level: "trace",
    prettyPrint: { colorize: true, translateTime: " yyyy-mm-dd HH:MM:ss" },
  });

  const generator = new QueryGenerator<User>();
  const query = generator
    .select(["*"])
    .where({ field: "mobile", criteria: "404*" })
    .whereAnd({ field: "memberOf", criteria: "admin*" })
    .whereAnd({ field: "info", criteria: "my-info" })
    .whereOr({ field: "mail", criteria: "*@domain.com" })
    .whereOr({ field: "homePostalAddress", criteria: "*Georgia" })
    .whereNot({ field: "middleName", criteria: "joe" })
    .orderBy({ field: "msDS-NcType", order: "asc" })
    .toString();
  console.log(`File: app.ts,`, `Line: 22 => `, query);
}

main().catch((err: Error) => {
  writeLog(err, { level: "error", stdout: true });
});
