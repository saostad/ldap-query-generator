type QueryLevel = "base" | "one" | "sub";

interface OrderByInput<T = any> {
  field: keyof T;
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
  field: keyof T;
  /**
   * - '*' retrieve all objects with attribute
   * - '!*' retrieve all objects do not have attribute
   */
  criteria: string;
}

interface QueryInput {
  queryLevel?: QueryLevel;
}

type SelectInput<T = any> = keyof T;

export class Generator<T = any> {
  private queryLevel!: QueryLevel;
  private query!: Query;

  constructor(options?: QueryInput) {
    this.queryLevel = options?.queryLevel ?? "base";
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
  public toString() {
    console.log(`File: index.ts,`, `Line: 43 => `, this.query);
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
    this.query.orderBy?.push(input);
    return this;
  }

  /** number of records */
  public limit(input: number) {
    this.query.limit = input;
    return this;
  }

  public del() {
    return this;
  }

  public add() {
    return this;
  }
}
