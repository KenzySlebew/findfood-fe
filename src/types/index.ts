export type Role = 'SUPER_ADMIN' | 'VENDOR' | 'CLIENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  vendor?: VendorProfile | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface VendorProfile {
  id: string;
  userId: string;
  namaToko: string;
  alamat?: string | null;
  nomorTelepon?: string | null;
  statusVerifikasi: 'PENDING' | 'APPROVED' | 'REJECTED';
  ratingRataRata: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'bento' | 'healthy' | 'nusantara' | 'western';
  description: string;
  price: number;
  rating: number;
  calories: number;
  image: string;
  tag?: string;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
}
