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
  })
  .whereNot({
    field: "userAccountControl",
    action: "extensible",
    criteria: "2",
    extensibleConfig: {
      dn: false,
      ignoreField: false,
      matchingRuleId: "1.2.840.113556.1.4.803",
    },
  })
  .whereRaw("&(cn=3)(dn=*)")
  .whereRaw("phone=*11");

console.log(query.toString());
```

Output:

```
(&(mobile=404*999*)(&(memberOf=admin*))(&(memberOf=*office))(&(badPwdCount<=2))(&(info~=my-info))(|(mail=*))(|(homePostalAddress=Georgia))(!(delivContLength>=6))(!(:dn:1.2.840.113556.1.4.1941:=joe))(!(userAccountControl:1.2.840.113556.1.4.803:=2))(&(cn=3)(dn=*))(phone=*11))
```

### Note:

to generate interfaces from ldap schema, use [ldap-schema-ts-generator](https://www.npmjs.com/package/ldap-schema-ts-generator)

### Api Documentations

API documentation [API Website](https://saostad.github.io/ldap-query-generator/modules/_index_.html)

## TODO

- [ ] LDAP Search Filters [RFC4515](https://tools.ietf.org/html/rfc4515)
  - [x] where
  - [x] whereAnd
  - [x] whereOr
  - [x] whereNot
  - [x] select
  - [x] toString
  - [x] whereRaw
  - [ ] Absence of attribute (!(attribute=_)) , e.g. (!proxyAddresses=_)
  - [ ] Filter boolean attributes the consideration of the upper/ lower case will be crucial. The use of TRUE or FALSE is absolutely necessary for filtering such booleans.
  - [ ] Special characters: characters ( ) & | = ! > < ~ \* / \ play a special role for the declaration of LDAP filters.
  - [ ] Hex Numbers
  - [ ] Binary Values
  - [ ] Filtering for Bit Fields
  - [ ] Filtering with Ambiguous Name Resolution (ANR)
- [ ] LDAP Search Filter Validator
  - [ ] No quotation marks Comparative strings do NOT appear in quotation marks. A filter for the displayName 'Philipp Foeckeler' would read as follows: (displayName=Philipp Foeckeler)
  - [ ] correct parentheses
  - [ ] you can't use wildcards in LDAP filters for attributes containing LDAP distinguished names (attributes with DN-string syntax / ADSI attribute data type ADSTYPE_DN_STRING = 1). The same applies for ADS: Filters in which DN attributes are searched with wildcards do not work. the following filter won't work!
        (distinguishedName=\*,ou=Sydney,dc=cerrotorre,dc=org)

## Inspired By:

- [PHP LdapTools](http://www.phpldaptools.com/tutorials/Building-LDAP-Queries/)
- [knex.js](http://knexjs.org/)
- [ldap.js](http://ldapjs.org/filters.html)
- [Adldap2](https://github.com/Adldap2/Adldap2)

### Useful Resources

- [ldapexplorer](http://www.ldapexplorer.com/en/manual/109010000-ldap-filter-syntax.htm)
