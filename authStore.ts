import { create } from 'zustand';
import { AuthState, LoginCredentials, RegistrationData, User } from '../types/auth';

// Simulated database for demo purposes
const DEMO_USERS = new Map<string, User>();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (credentials: LoginCredentials) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo: auto-login with any credentials
    const user = {
      id: crypto.randomUUID(),
      role: credentials.role,
      name: 'Demo User',
      email: 'demo@example.com',
    };

    set({ user, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  register: async (data: RegistrationData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = {
      id: crypto.randomUUID(),
      role: data.role,
      name: data.name,
      email: data.email,
    };

    DEMO_USERS.set(user.id, user);
    set({ user, isAuthenticated: true });
  },
}));