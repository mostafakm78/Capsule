import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  step: number;
  pendingEmail: string;
}

const initialState: AuthState = {
  step: 1,
  pendingEmail: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setPendingEmail: (state, action: PayloadAction<string>) => {
      state.pendingEmail = action.payload;
    },
  },
});

export const { setStep, setPendingEmail } = authSlice.actions;
export default authSlice.reducer;
