export type LinkProps = {
  link: string;
  title: string;
};

export interface User {
  createdAt: string | null; // در JSON معمولاً تاریخ به‌صورت string میاد
  name?: string | null;
  email: string | null;
  role: 'admin' | 'user' | null;
  flag: 'none' | 'sus' | 'review' | 'violation' | null;
  about?: string | null;
  birthday?: string | null;
  education?: string | null;
  avatar?: string | null;
  updatedAt: string | null;
  id: string | null;
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
