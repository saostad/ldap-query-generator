import { Query } from "..";

/** ldap representation of query */
export function toString(query: Query): string {
  const result: string[] = [];

  if (query.where) {
    result.push(`(${String(query.where.field)}=${query.where.criteria})`);
  }

  if (query.whereAnd.length > 0) {
    result.push(
      `(&${query.whereAnd
        .map((el) => `(${el.field as string}=${el.criteria})`)
        .join("")})`,
    );
  }

  if (query.whereOr.length > 0) {
    result.push(
      `(|${query.whereOr
        .map((el) => `(${el.field as string}=${el.criteria})`)
        .join("")})`,
    );
  }

  if (query.whereNot.length > 0) {
    result.push(
      `(!${query.whereNot
        .map((el) => `(${el.field as string}=${el.criteria})`)
        .join("")})`,
    );
  }

  const all = result.join("");
  return `(&${all})`;
}
