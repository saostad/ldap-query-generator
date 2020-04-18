# LDAP query generator

Writing LDAP queries is hard!
this is a tool to generate LDAP operations defined in [RFC 4511](https://tools.ietf.org/html/rfc4511)

## AS Easy AS

```ts
import { QueryGenerator } from "ldap-query-generator";

/** User Fields */
interface User {}

/** You can use it with or without generic type */
const qGen = new QueryGenerator<User>();
const { query } = qGen
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
  });

console.log(query.toString());
```

Output:

```
(&(mobile=404*999*)(&(memberOf=admin*)(memberOf=*office)(badPwdCount<=2)(info~=my-info))(|(mail=*)(homePostalAddress=Georgia))(!(delivContLength>=6)(:dn:1.2.840.113556.1.4.1941:=joe)))
```

### Note:

to auto-generate interface types from schema use [ldap-schema-ts-generator](https://www.npmjs.com/package/ldap-schema-ts-generator)

### Api Documentations

for full API documentation look at [API Website](https://saostad.github.io/ldap-query-generator/modules/_index_.html)

## TODO

- [ ] Search Filters [RFC4515](https://tools.ietf.org/html/rfc4515)
  - [x] where
  - [x] whereAnd
  - [x] whereOr
  - [x] whereNot
  - [x] select
  - [x] toString
  - [ ] whereRaw
- [ ] Validate ldap search filters

## Inspired By:

- [PHP LdapTools](http://www.phpldaptools.com/tutorials/Building-LDAP-Queries/)
- [knex.js](http://knexjs.org/)
- [ldap.js](http://ldapjs.org/filters.html)
- [Adldap2](https://github.com/Adldap2/Adldap2)
