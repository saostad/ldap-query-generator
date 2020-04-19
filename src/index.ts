import type { Logger } from "fast-node-logger";
import { toString } from "./helpers/tsString";
import { CriteriaActions } from "./helpers/criteria";

export interface Query {
  attributes?: SelectInput[];
  where?: WhereInput;
  whereAnd: WhereInput[];
  whereOr: WhereInput[];
  whereRaw: WhereInput[];
  whereNot: WhereInput[];
  toString: () => string;
}

export interface WhereInput<T = any> {
  field: string | keyof T;
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
}

interface GeneratorInput {
  logger?: Logger;
}

type SelectInput<T = any> = string | keyof T;

export class QueryGenerator<T = any> {
  public query!: Query;
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
    this.logger?.warn(`sorry, whereRaw function doesn't implemented yet!`);
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

  /** return attributes */
  public select(fields: Array<SelectInput<T>>) {
    this.logger?.trace(`select()`);
    this.query.attributes = this.query.attributes?.concat(fields);
    return this;
  }
}
