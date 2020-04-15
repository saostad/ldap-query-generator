# LDAP query generator

Writing LDAP queries is hard!
this is a tool to generate LDAP operations defined in [RFC 4511](https://tools.ietf.org/html/rfc4511)

## AS Easy AS

```ts
import { Generator } from "ldap-query-generator";

const generator = new Generator<User>();

const generator = new Generator<User>();
const query = generator
  .select(["otherMobile", "ou", "pager"])
  .where({ field: "mobile", criteria: "404*" })
  .whereAnd({ field: "memberOf", criteria: "admin*" })
  .whereAnd({ field: "info", criteria: "my-info" })
  .whereOr({ field: "mail", criteria: "*@domain.com" })
  .whereOr({ field: "homePostalAddress", criteria: "*Georgia" })
  .whereNot({ field: "middleName", criteria: "joe" })
  .orderBy({ field: "msDS-NcType", order: "asc" })
  .toString();

console.log(query);
```

Output:

```
(&(mobile=404*)(&(memberOf=admin*)(info=my-info))(|(mail=*@domain.com)(homePostalAddress=*Georgia))(!(middleName=joe)))
```

## TODO

- [ ] Search Filters [RFC4515](https://tools.ietf.org/html/rfc4515)
- [ ] Modify Operation
- [ ] Add Operation
- [ ] Delete Operation
- [ ] Modify DN Operation
- [ ] Compare Operation
- [ ] Validate ldap search filters
- [ ] add trace logs in all functions

## Inspired By:

- [PHP LdapTools](http://www.phpldaptools.com/tutorials/Building-LDAP-Queries/)
- [knex.js](http://knexjs.org/)
- [ldap.js](http://ldapjs.org/filters.html)
- [Adldap2](https://github.com/Adldap2/Adldap2)
