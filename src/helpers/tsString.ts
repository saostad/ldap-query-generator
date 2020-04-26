import { Query, WhereInput } from "../index";
import {
  equal,
  substrings,
  present,
  lessOrEqual,
  greaterOrEqual,
  extensible,
  approxMatch,
  endWith,
  startWith,
} from "./criteria";
import { writeLog } from "fast-node-logger";

function whereClausesToString({
  field,
  criteria,
  action,
  extensibleConfig,
}: WhereInput) {
  writeLog(`whereClausesToString()`, { level: "trace" });
  if (action === "equal") {
    return equal({ field: field as string, criteria });
  }
  if (action === "startWith") {
    return startWith({ field: field as string, criteria });
  }
  if (action === "endWith") {
    return endWith({ field: field as string, criteria });
  }
  if (action === "approxMatch") {
    return approxMatch({ field: field as string, criteria });
  }
  if (action === "greaterOrEqual") {
    return greaterOrEqual({ field: field as string, criteria });
  }
  if (action === "lessOrEqual") {
    return lessOrEqual({ field: field as string, criteria });
  }
  if (action === "present") {
    return present({ field: field as string });
  }
  if (action === "substrings") {
    return substrings({ field: field as string, criteria });
  }
  if (action === "extensible") {
    return extensible({
      field: extensibleConfig?.ignoreField ? undefined : (field as string),
      criteria,
      dn: extensibleConfig?.dn,
      matchingRuleId: extensibleConfig?.matchingRuleId,
    });
  }
}

/** generate ldap representation of query */
export function toString(query: Query): string {
  writeLog(`toString()`, { level: "trace" });
  const result: string[] = [];

  if (query.where) {
    result.push(`(${whereClausesToString(query.where)})`);
  }

  if (query.whereAnd.length > 0) {
    result.push(
      `(&${query.whereAnd
        .map((el) => `(${whereClausesToString(el)})`)
        .join("")})`,
    );
  }

  if (query.whereOr.length > 0) {
    result.push(
      `(|${query.whereOr
        .map((el) => `(${whereClausesToString(el)})`)
        .join("")})`,
    );
  }

  if (query.whereNot.length > 0) {
    result.push(
      `(!${query.whereNot
        .map((el) => `(${whereClausesToString(el)})`)
        .join("")})`,
    );
  }

  if (query.whereRaw.length > 0) {
    result.push(`${query.whereRaw.map((el) => `(${el})`).join("")}`);
  }

  const all = result.join("");
  return `(&${all})`;
}
