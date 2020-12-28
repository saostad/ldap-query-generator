export type CriteriaActions =
  | "equal"
  | "approxMatch"
  | "substrings"
  | "greaterOrEqual"
  | "lessOrEqual"
  | "present"
  | "extensible"
  | "startWith"
  | "endWith";

type CriteriaActionsFnInput = {
  field: string;
  criteria: string;
};
/** equalityMatch */
export function equal({ field, criteria }: CriteriaActionsFnInput) {
  if (criteria.includes("*")) {
    throw new Error(
      `equal action can't accept criteria ${criteria}. you should use substring if you want to use * in criteria.`,
    );
  }
  return `${field}=${criteria}`;
}

/** (cn=jo*) */
export function startWith({ field, criteria }: CriteriaActionsFnInput) {
  return `${field}=${criteria}*`;
}

/** (cn=j*o) */
export function endWith({ field, criteria }: CriteriaActionsFnInput) {
  return `${field}=*${criteria}`;
}

/** @description The string representation of an ApproxMatch filter is constructed as follows:
 * An open parenthesis The attribute description (potentially including attribute options) A tilde character An equal sign The value to compare (aka the assertion value) A close parenthesis.
 * @example
 * (givenName~=John)
 * /% to match entries with givenName values of either John or Jon.
 * @note doesn't work with Microsoft Active Directory. Active Directory supports the approxMatch filter clause of [RFC2251] section 4.5.1. However, it is implemented identically to equalityMatch; for example, the filter is true if the values are equal. No approximation is performed. Filter clauses of the form "(X=Y)" and "(X~=Y)" can be freely substituted for each other.
 * @note Although it seems like a significant oversight or omission, the LDAP specifications do not make any provision for ApproxMatch matching Rules. A number of individual LDAP Server Implementations provide this capability anyway so that it may be possible to configure the approximate match behavior on a per-attribute basis, but the inconsistency of approximate matching capabilities between server implementations makes approximate matching something that is often avoided in LDAP-enabled applications.
 */
export function approxMatch({ field, criteria }: CriteriaActionsFnInput) {
  return `${field}~=${criteria}`;
}

/**
 *  "(cn=ab*def*mno*stu*yz)"
 * contains a subInitial component of "ab", subAny components of
 * "def", "mno", and "stu", and a subFinal component of "yz".
 */
export function substrings({ field, criteria }: CriteriaActionsFnInput) {
  return `${field}=${criteria}`;
}

export function greaterOrEqual({ field, criteria }: CriteriaActionsFnInput) {
  return `${field}>=${criteria}`;
}

export function lessOrEqual({ field, criteria }: CriteriaActionsFnInput) {
  return `${field}<=${criteria}`;
}

type PresentFnInput = {
  field: string;
};
/** field exist */
export function present({ field }: PresentFnInput) {
  return `${field}=*`;
}

type ExtensibleFnInput = {
  field?: string;
  dn?: boolean;
  matchingRuleId?: string;
  criteria: string;
};
/**
 * [More info](https://ldapwiki.com/wiki/ExtensibleMatch)
 * @example
 * (cn:1.2.3.4.5:=Fred Flintstone)
 * (sn:dn:2.4.6.8.10:=Barney Rubble)
 * (o:dn:=Ace Industry)
 * (:dn:2.4.6.8.10:=Dino)
 */
export function extensible({
  field,
  dn,
  matchingRuleId,
  criteria,
}: ExtensibleFnInput) {
  return `${field ?? ""}${dn ? ":dn" : ""}:${
    matchingRuleId ?? ""
  }:=${criteria}`;
}
