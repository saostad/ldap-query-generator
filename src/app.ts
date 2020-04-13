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
    .select(["otherMobile", "ou", "pager"])
    .where({ field: "mobile", criteria: "404*" })
    .whereAnd({ field: "memberOf", criteria: "admin*" })
    .whereOr({ field: "homePostalAddress", criteria: "*Georgia" })
    .whereNot({ field: "middleName", criteria: "joe" })
    .orderBy({ field: "msDS-NcType", order: "asc" })
    .toString();
}

main().catch((err: Error) => {
  writeLog(err, { level: "error", stdout: true });
});
