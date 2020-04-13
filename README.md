# LDAP query generator

Writing LDAP queries is hard!
this is a tool to generate LDAP operations defined in [RFC 4511](https://tools.ietf.org/html/rfc4511)

## AS Easy AS

```ts
const generator = new Generator<User>();
generator
  .where({ field: "mobile", criteria: "404*" })
  .whereAnd({ field: "memberOf", criteria: "admin*" })
  .orderBy({ field: "msDS-NcType", order: "asc" })
  .whereNot({ field: "middleName", criteria: "joe" })
  .whereAnd({ field: "msCOM-UserLink", criteria: "*foo" })
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
