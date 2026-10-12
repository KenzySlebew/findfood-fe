import type { ApiResponse, AuthResponse, User } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || '/api';

export const getStoredToken = (): string | null => {
  return localStorage.getItem('saji_auth_token');
};

export const setStoredToken = (token: string): void => {
  localStorage.setItem('saji_auth_token', token);
};

export const clearStoredAuth = (): void => {
  localStorage.removeItem('saji_auth_token');
  localStorage.removeItem('saji_user');
};

export const getStoredUser = (): User | null => {
  const data = localStorage.getItem('saji_user');
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const setStoredUser = (user: User): void => {
  localStorage.setItem('saji_user', JSON.stringify(user));
};

export const api = {
  async checkHealth(): Promise<ApiResponse<{ status: string; version: string }>> {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) {
      throw new Error(`Health check failed with status: ${res.status}`);
    }
    return res.json();
  },

  async login(payload: { email: string; password: string }): Promise<ApiResponse<AuthResponse>> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login gagal');
    }
    return data;
  },

  async register(payload: {
    email: string;
    password: string;
    name: string;
    role: 'CLIENT' | 'VENDOR';
    namaToko?: string;
    alamatToko?: string;
  }): Promise<ApiResponse<AuthResponse>> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Registrasi gagal');
    }
    return data;
  },

  async getMe(): Promise<ApiResponse<{ user: User }>> {
    const token = getStoredToken();
    if (!token) {
      throw new Error('Tidak ada token aktif');
    }

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Gagal memuat profil');
    }
    return data;
  },
};
