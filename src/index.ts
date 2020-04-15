import type { Logger } from "pino";

type Scope = "base" | "one" | "sub";

interface OrderByInput<T = any> {
  field: keyof T | string;
  order: "desc" | "asc";
}

interface Query {
  select?: SelectInput[];
  where?: WhereInput;
  whereAnd: WhereInput[];
  whereOr: WhereInput[];
  whereRaw: WhereInput[];
  whereNot: WhereInput[];
  orderBy: OrderByInput[];
  limit: number;
}

interface WhereInput<T = any> {
  field: keyof T | string;
  /**
   * - '*' retrieve all objects with attribute
   * - '!*' retrieve all objects do not have attribute
   */
  criteria: string;
}

interface GeneratorInput {
  scope?: Scope;
  page?: boolean;
  pageSize?: number;
  logger?: Logger;
}

type SelectInput<T = any> = keyof T | string;

export class Generator<T = any> {
  private scope!: Scope;
  private query!: Query;
  private logger?: Logger;

  constructor(options?: GeneratorInput) {
    this.logger = options?.logger;
    this.scope = options?.scope ?? "base";
    this.query = {
      orderBy: [],
      whereAnd: [],
      whereNot: [],
      whereRaw: [],
      whereOr: [],
      select: [],
      limit: 0,
    };
  }

  /** ldap representation of query */
  public toString(): string {
    const result: string[] = [];

    if (this.query.where) {
      result.push(
        `(${String(this.query.where.field)}=${this.query.where.criteria})`,
      );
    }

    if (this.query.whereAnd.length > 0) {
      result.push(
        `(&${this.query.whereAnd
          .map((el) => `(${el.field as string}=${el.criteria})`)
          .join("")})`,
      );
    }

    if (this.query.whereOr.length > 0) {
      result.push(
        `(|${this.query.whereOr
          .map((el) => `(${el.field as string}=${el.criteria})`)
          .join("")})`,
      );
    }

    if (this.query.whereNot.length > 0) {
      result.push(
        `(!${this.query.whereNot
          .map((el) => `(${el.field as string}=${el.criteria})`)
          .join("")})`,
      );
    }

    const all = result.join("");
    return `(&${all})`;
  }

  /** (cn=foo) */
  public where(input: WhereInput<T>) {
    if (this.query.where) {
      throw new Error(
        `where can be one time use! use whereAnd, whereOr or whereNot instead`,
      );
    }
    this.query.where = input;
    return this;
  }

  /** whatever you decide! */
  public whereRaw(input: WhereInput<T>) {
    this.logger?.warn(`sorry, whereRaw function doesn't implemented yet!`);
    this.query.whereRaw?.push(input);
    return this;
  }

  /** (&(cn=foo)(sn=bar)) */
  public whereAnd(input: WhereInput<T>) {
    this.query.whereAnd?.push(input);
    return this;
  }

  /** (|(cn=foo)(sn=bar)) */
  public whereOr(input: WhereInput<T>) {
    this.query.whereOr?.push(input);
    return this;
  }

  /** (!(cn=foo)) */
  public whereNot(input: WhereInput<T>) {
    this.query.whereNot?.push(input);
    return this;
  }

  /** return attributes */
  public select(fields: SelectInput<T>[]) {
    this.query.select = this.query.select?.concat(fields);
    return this;
  }

  /** sort result */
  public orderBy(input: OrderByInput<T>) {
    this.logger?.warn(`sorry, orderBy function doesn't implemented yet!`);
    this.query.orderBy?.push(input);
    return this;
  }

  /** number of records */
  public limit(input: number) {
    this.logger?.warn(`sorry, limit function doesn't implemented yet!`);
    this.query.limit = input;
    return this;
  }

  public del() {
    this.logger?.warn(`sorry, del function doesn't implemented yet!`);
    return this;
  }

  public add() {
    this.logger?.warn(`sorry, add function doesn't implemented yet!`);
    return this;
  }
}
