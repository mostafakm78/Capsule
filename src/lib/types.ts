export type LinkProps = {
  link: string;
  title: string;
};

export type Visibility = 'private' | 'public';
export type Lock = 'none' | 'timed';

// ========= Capsule =========
export interface Access {
  visibility: Visibility;
  lock: Lock;
  unlockAt?: string | null;
}

export interface CategoryItem {
  createdAt: string;
  group: string;
  isActive: boolean;
  key: string;
  order: number;
  title: string;
  updatedAt: string;
  _id: string;
}

export interface CreateCapsule {
  title?: string | null;
  description?: string | null;
  access?: Access;
  categoryItem?: string | null;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
  color?: 'default' | 'red' | 'green' | 'blue' | 'yellow';
  avatar?: string | null;
  extra?: string | null;
}

export interface Capsule {
  _id?: string;
  owner?: UserSafe;
  title?: string | null;
  description?: string | null;
  access?: Access;
  categoryItem?: string | null;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
  color?: 'default' | 'red' | 'green' | 'blue' | 'yellow';
  avatar?: string | null;
  extra?: string | null;
}

// ========= User (Safe) =========
export interface UserSafe {
  _id: string;
  email: string;
  role: 'user' | 'admin';
  isBanned: boolean;
  flag: 'none' | 'sus' | 'review' | 'violation';
  name?: string;
  avatar?: string;
  bio?: string;
  createdAt?: string; // ISO
  updatedAt?: string; // ISO
}

// ========= Pagination =========
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export type CapsuleFilters =
  | {
      owner?: string;
      'access.visibility'?: Visibility;
      'access.lock'?: Lock;
    }
  | Record<string, unknown>;

// ========= Response =========
export interface GetCapsulesResponse {
  items: Capsule[];
  pagination: Pagination;
  sort: 'newest' | 'oldest';
  filters: CapsuleFilters;
}

export type dashboardCreateCapsuleTab = 'info' | 'tags' | 'status';

export type dashboardCreateCapsuleCategories = {
  title: string;
  items: string[];
};

export type dashboardCreateCapsuleColorOption = {
  id: string;
  colorCode: string;
};

export type ServerFieldError = { field: string; message: string };
export type ApiError = { data?: ServerFieldError[] | string; message?: string };
