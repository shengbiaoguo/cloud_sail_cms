import { create } from 'zustand';
import type { CurrentAdminUser, LoginPayload } from '@/types/auth';
import { authApi } from '@/api/modules/auth';
import { tokenStorage } from '@/utils/storage';

interface AuthState {
  token: string | null;
  currentUser: CurrentAdminUser | null;
  initialized: boolean;
  loginLoading: boolean;
  bootstrap: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: tokenStorage.get(),
  currentUser: null,
  initialized: false,
  loginLoading: false,
  async bootstrap() {
    const token = tokenStorage.get();
    if (!token) {
      set({ initialized: true, currentUser: null, token: null });
      return;
    }

    try {
      const currentUser = await authApi.getCurrentUser({ skipErrorToast: true });
      set({ currentUser, token, initialized: true });
    } catch {
      tokenStorage.clear();
      set({ currentUser: null, token: null, initialized: true });
    }
  },
  async login(payload) {
    set({ loginLoading: true });
    try {
      const result = await authApi.login(payload);
      tokenStorage.set(result.accessToken);
      set({
        token: result.accessToken,
        currentUser: result.user,
        initialized: true,
      });
    } finally {
      set({ loginLoading: false });
    }
  },
  logout() {
    tokenStorage.clear();
    set({ token: null, currentUser: null, initialized: true });
  },
}));
