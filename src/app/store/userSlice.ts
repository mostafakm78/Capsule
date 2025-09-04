import { User } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  createdAt: null,
  name: null,
  email: null,
  role: null,
  flag: null,
  about: null,
  birthday: null,
  education: null,
  avatar: null,
  updatedAt: null,
  id: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ست‌کردن کل یوزر (مثلاً بعد از login یا /me)
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload; // جایگزین کل استیت
    },
    // ریست به حالت اولیه (logout)
    clearUser: () => initialState,

    // ست‌کردن فیلدهای تکی
    setRole: (state, action: PayloadAction<'admin' | 'user' | null>) => {
      state.role = action.payload;
    },
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string | null | undefined>) => {
      state.name = action.payload ?? null;
    },
    setAvatar: (state, action: PayloadAction<string | null | undefined>) => {
      state.avatar = action.payload ?? null;
    },
    setFlag: (state, action: PayloadAction<'none' | 'sus' | 'review' | 'violation' | null>) => {
      state.flag = action.payload ?? null;
    },
    setId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload ?? null;
    },
    setCreatedAt: (state, action: PayloadAction<string | null>) => {
      state.createdAt = action.payload ?? null;
    },
    setUpdatedAt: (state, action: PayloadAction<string | null>) => {
      state.updatedAt = action.payload ?? null;
    },
    setBirthday: (state, action: PayloadAction<string | null>) => {
      state.birthday = action.payload ?? null;
    },
    setEducation: (state, action: PayloadAction<string | null>) => {
      state.education = action.payload ?? null;
    },
    setAbout: (state, action: PayloadAction<string | null>) => {
      state.about = action.payload ?? null;
    },
  },
});

export const { setUser, clearUser, setRole, setEmail, setName, setAvatar, setFlag, setId, setCreatedAt, setUpdatedAt, setBirthday, setEducation, setAbout } = authSlice.actions;
export default authSlice.reducer;
