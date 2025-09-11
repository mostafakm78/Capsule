import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authStepOneSlice {
  step: number;
  pendingEmail: string;
}

const initialState: authStepOneSlice = {
  step: 1,
  pendingEmail: '',
};

const authStepOneSlice = createSlice({
  name: 'authStepOne',
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

export const { setStep, setPendingEmail } = authStepOneSlice.actions;
export default authStepOneSlice.reducer;
