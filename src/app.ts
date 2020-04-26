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

  const qGen = new QueryGenerator<User>({ logger });
  const { query } = qGen
    .select(["USNIntersite", "aCSPolicyName", "accountNameHistory"])
    .where({ field: "mobile", action: "substrings", criteria: "404*999*" })
    .whereAnd({ field: "memberOf", action: "startWith", criteria: "admin" })
    .whereAnd({ field: "memberOf", action: "endWith", criteria: "office" })
    .whereAnd({ field: "badPwdCount", action: "lessOrEqual", criteria: "2" })
    .whereAnd({ field: "info", action: "approxMatch", criteria: "my-info" })
    .whereOr({ field: "mail", action: "present", criteria: "*@domain.com" })
    .whereOr({
      field: "homePostalAddress",
      action: "substrings",
      criteria: "Georgia",
    })
    .whereNot({
      field: "delivContLength",
      action: "greaterOrEqual",
      criteria: "6",
    })
    .whereNot({
      field: "middleName",
      action: "extensible",
      criteria: "joe",
      extensibleConfig: {
        dn: true,
        ignoreField: true,
        matchingRuleId: "1.2.840.113556.1.4.1941",
      },
    });

  console.log(`File: app.ts,`, `Line: 22 => `, query.toString());

  const qGen2 = new QueryGenerator({ logger });
  const { query: query2 } = qGen2
    .select(["USNIntersite", "aCSPolicyName", "accountNameHistory"])
    .where({ field: "mobile", action: "substrings", criteria: "404*999*" })
    .whereAnd({ field: "memberOf", action: "startWith", criteria: "admin" })
    .whereAnd({ field: "memberOf", action: "endWith", criteria: "office" })
    .whereAnd({ field: "badPwdCount", action: "lessOrEqual", criteria: "2" })
    .whereAnd({ field: "info", action: "approxMatch", criteria: "my-info" })
    .whereOr({ field: "mail", action: "present", criteria: "*@domain.com" })
    .whereOr({
      field: "homePostalAddress",
      action: "substrings",
      criteria: "Georgia",
    })
    .whereNot({
      field: "delivContLength",
      action: "greaterOrEqual",
      criteria: "6",
    })
    .whereNot({
      field: "middleName",
      action: "extensible",
      criteria: "joe",
      extensibleConfig: {
        dn: true,
        ignoreField: true,
        matchingRuleId: "1.2.840.113556.1.4.1941",
      },
    });

  console.log(`File: app.ts,`, `Line: 22 => `, query2.toString());
}

main().catch((err: Error) => {
  writeLog(err, { level: "error", stdout: true });
});
