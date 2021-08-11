export const TOKEN_KEY = '&app-token';
export const USER_ID = '&user-id';
export const USER_NAME = '&user-name';

export const login = (token: String) => { localStorage.setItem(TOKEN_KEY, token.toString()); }
export const logout = () => { localStorage.clear(); }

export const setUserId = (id: Number) => { localStorage.setItem(USER_ID, id.toString()); }
export const getUserId = () => { localStorage.getItem(USER_ID); }

export const setUserName = (userName: Number) => { localStorage.setItem(USER_NAME, userName.toString()); }
export const getUserName = () => { localStorage.getItem(USER_NAME); }
