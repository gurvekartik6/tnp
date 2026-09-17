const USER_KEY='tnp_user';
export const DEAN_EMAIL='dean@sggs.ac.in';
export function setDeanSession(data:{user:{email:string;role:'dean'}}){localStorage.setItem(USER_KEY,JSON.stringify(data.user));}
export function clearDeanSession(){localStorage.removeItem(USER_KEY);}
export function deanLogout(){clearDeanSession();}
export function isDeanAuthenticated(){try{return Boolean(JSON.parse(localStorage.getItem(USER_KEY)||'null')?.role==='dean')}catch{return false}}
