import { ACCESS_TOKEN_KEY } from '@/constants/storage';

export const tokenStorage = {
  get() {
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) ?? sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
  },
  set(token: string, remember = true) {
    if (remember) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      return;
    }

    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
