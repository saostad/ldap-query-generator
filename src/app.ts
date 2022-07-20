import dotenv from "dotenv";
dotenv.config();
import { createLogger, writeLog } from "fast-node-logger";
import { QueryGenerator } from "./index";

export async function main() {
  const logger = await createLogger({
    level: "trace",
  });

  // const qGen = new QueryGenerator({ logger });
  // const { query } = qGen
  //   .select(["cn"])
  //   .where({
  //     field: "userPrincipalName",
  //     action: "substrings",
  //     criteria: "sostad*",
  //   })
  //   .whereAnd({ field: "objectClass", action: "equal", criteria: "user" })
  //   .whereOr({ field: "objectClass", action: "equal", criteria: "person" })
  //   .whereNot({ field: "objectClass", action: "equal", criteria: "computer" })
  //   .whereNot({ field: "objectClass", action: "equal", criteria: "group" });

  // const queryString = query.toString();

  // // validation
  // (function queryValidate(str: string) {
  //   let result = "";
  //   /* Wrap the input in parens if it was not already */
  //   if (str.charAt(0) !== '(') {
  //     result = `(${str})`;
  //   }
  //   const end = result.length;

  //   console.log(`File: app.ts,`, `Line: 34 => `, result)

  // })(queryString)

  const qGen2 = new QueryGenerator({ logger });
  const { query } = qGen2
    .select(["USNIntersite", "aCSPolicyName"])
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
    })
    .whereNot({
      field: "userAccountControl",
      action: "extensible",
      criteria: "2",
      extensibleConfig: {
        dn: false,
        ignoreField: false,
        matchingRuleId: "1.2.840.113556.1.4.803",
      },
    })
    .whereRaw("&(cn=3)(dn=*)")
    .whereRaw("phone=*11");

  console.log(`File: app.ts,`, `Line: 22 => `, query.toString());

  // const qGen2 = new QueryGenerator({ logger });
  // const { query: query2 } = qGen2
  //   .select(["USNIntersite", "aCSPolicyName", "accountNameHistory"])
  //   .where({ field: "mobile", action: "substrings", criteria: "404*999*" })
  //   .whereAnd({ field: "memberOf", action: "startWith", criteria: "admin" })
  //   .whereAnd({ field: "memberOf", action: "endWith", criteria: "office" })
  //   .whereAnd({ field: "badPwdCount", action: "lessOrEqual", criteria: "2" })
  //   .whereAnd({ field: "info", action: "approxMatch", criteria: "my-info" })
  //   .whereOr({ field: "mail", action: "present", criteria: "*@domain.com" })
  //   .whereOr({
  //     field: "homePostalAddress",
  //     action: "substrings",
  //     criteria: "Georgia",
  //   })
  //   .whereNot({
  //     field: "delivContLength",
  //     action: "greaterOrEqual",
  //     criteria: "6",
  //   })
  //   .whereNot({
  //     field: "middleName",
  //     action: "extensible",
  //     criteria: "joe",
  //     extensibleConfig: {
  //       dn: true,
  //       ignoreField: true,
  //       matchingRuleId: "1.2.840.113556.1.4.1941",
  //     },
  //   })
  //   .whereRaw("&(cn=3)(dn=*)")
  //   .whereRaw("phone=*11");

  // console.log(`File: app.ts,`, `Line: 22 => `, query2.toString());
}

main().catch((err: Error) => {
  writeLog(err, { level: "error", stdout: true });
});
