import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  step: number;
  email: string;
}

const initialState: AuthState = {
  step: 1,
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setStep, setEmail } = authSlice.actions;
export default authSlice.reducer;
