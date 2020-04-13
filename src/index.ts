type QueryLevel = "base" | "one" | "sub";

interface OrderByInput<T = {}> {
  field: keyof T;
  order: "desc" | "asc";
}

interface Query {
  returnFields?: string[];
  where?: WhereInput;
  whereAnd: WhereInput[];
  whereOr: WhereInput[];
  whereRaw: WhereInput[];
  whereNot: WhereInput[];
  orderBy: OrderByInput[];
}

interface WhereInput<T = any> {
  field: keyof T;
  criteria: string;
}

interface QueryInput {
  queryLevel?: QueryLevel;
}

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
    };
  }

  public toString() {
    console.log(`File: index.ts,`, `Line: 43 => `, this.query);
  }

  /** (cn=foo) */
  public where(input: WhereInput<T>) {
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

  /**  */
  public orderBy({ field, order }: OrderByInput<T>) {
    return this;
  }

  public del() {
    return this;
  }

  public add() {
    return this;
  }
}
