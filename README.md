# LDAP query generator

Writing LDAP queries is hard!
this is a tool to generate LDAP operations defined in [RFC 4511](https://tools.ietf.org/html/rfc4511)

## AS Easy AS

```ts
import { Generator } from "ldap-query-generator";

const generator = new Generator<User>();

generator
  .select(["otherMobile", "ou", "pager"])
  .where({ field: "mobile", criteria: "404*" })
  .whereAnd({ field: "memberOf", criteria: "admin*" })
  .whereOr({ field: "homePostalAddress", criteria: "*Georgia" })
  .whereNot({ field: "middleName", criteria: "joe" })
  .orderBy({ field: "msDS-NcType", order: "asc" })
  .toString();
```

## TODO

- [ ] Search Filters [RFC4515](https://tools.ietf.org/html/rfc4515)
- [ ] Modify Operation
- [ ] Add Operation
- [ ] Delete Operation
- [ ] Modify DN Operation
- [ ] Compare Operation

## Inspired By:

- [PHP LdapTools](http://www.phpldaptools.com/tutorials/Building-LDAP-Queries/)
- [KNEX.JS](http://knexjs.org/)
- [ldap.js](http://ldapjs.org/filters.html)
