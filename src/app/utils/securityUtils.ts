import { AUTHORITIES } from "../const/localStorageConst";

export function getAuthorities():string[]{
  const storedAuthorities = localStorage.getItem(AUTHORITIES);
  return storedAuthorities ? JSON.parse(storedAuthorities) : [];
}

export function isGranted(authorities: string[]):boolean{
  const value = getAuthorities().some((auth: String) => authorities.includes(auth.toString()));
  return value;
}
