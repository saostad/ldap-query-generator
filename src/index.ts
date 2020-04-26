import type { Logger } from "fast-node-logger";
import { toString } from "./helpers/tsString";
import { CriteriaActions } from "./helpers/criteria";

export type Query<T = any> = {
  /** selected attributes to return */
  attributes?: SelectInput<T>[];
  /** one time only */
  where?: WhereInput;
  /** can be use multiple time */
  whereAnd: WhereInput[];
  /** can be use multiple time */
  whereOr: WhereInput[];
  /** can be use multiple time */
  whereRaw: WhereInput[];
  /** can be use multiple time */
  whereNot: WhereInput[];
  /** generate ldap filter */
  toString: () => string;
};

export type WhereInput<T = any> = {
  field: Extract<keyof T, string>;
  /**
   * - '*' retrieve all objects with attribute
   * - '!*' retrieve all objects do not have attribute
   */
  criteria: string;
  action: CriteriaActions;
  extensibleConfig?: {
    ignoreField?: boolean;
    dn?: boolean;
    matchingRuleId?: string;
  };
};

type GeneratorInput = {
  /** instance of logger compatible with pino */
  logger?: Logger;
};

type SelectInput<T = any> = Extract<keyof T, string> | "*";

/** query generator instance */
export class QueryGenerator<T = any> {
  public query!: Query<T>;
  private logger?: Logger;

  constructor(options?: GeneratorInput) {
    this.logger = options?.logger;

    this.query = {
      where: undefined,
      whereAnd: [],
      whereNot: [],
      whereRaw: [],
      whereOr: [],
      attributes: [],
      toString: () => toString(this.query),
    };
  }

  /** (cn=foo) */
  public where(input: WhereInput<T>) {
    this.logger?.trace(`where()`);
    if (this.query?.where) {
      throw new Error(
        `where can be one time use! use whereAnd, whereOr or whereNot instead`,
      );
    }
    this.query.where = input;
    return this;
  }

  /** whatever you decide! */
  public whereRaw(input: WhereInput<T>) {
    this.logger?.trace(`whereRaw()`);
    this.query.whereRaw?.push(input);
    return this;
  }

  /** (&(cn=foo)(sn=bar)) */
  public whereAnd(input: WhereInput<T>) {
    this.logger?.trace(`whereAnd()`);
    this.query.whereAnd?.push(input);
    return this;
  }

  /** (|(cn=foo)(sn=bar)) */
  public whereOr(input: WhereInput<T>) {
    this.logger?.trace(`whereOr()`);
    this.query.whereOr?.push(input);
    return this;
  }

  /** (!(cn=foo)) */
  public whereNot(input: WhereInput<T>) {
    this.logger?.trace(`whereNot()`);
    this.query.whereNot?.push(input);
    return this;
  }

  /** select return attributes
   * - put ["*"] for select all available attributes */
  public select(fields: Array<SelectInput<T>>) {
    this.logger?.trace(`select()`);
    this.query.attributes = this.query.attributes?.concat(fields);
    return this;
  }
}
