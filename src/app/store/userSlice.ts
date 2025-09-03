// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface User {
//   name: string;
//   email: string;
//   password: string;
//   role: 'admin' | 'user';
//   isBanned: boolean;
//   flag: 'none' | 'sus' | 'review' | 'violation';
//   about?: string;
//   refreshToken?: string;
//   OTP: string;
//   otpExpiration: Date | null;
//   birthday?: string;
//   education?: string;
//   avatar?: string;
//   otpRequestTime: Date;
//   isOTPValid: () => boolean;
// }

// const initialState: AuthState = {
//   step: 1,
//   email: '',
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setStep: (state, action: PayloadAction<number>) => {
//       state.step = action.payload;
//     },
//     setEmail: (state, action: PayloadAction<string>) => {
//       state.email = action.payload;
//     },
//   },
// });

// export const { setStep, setEmail } = authSlice.actions;
// export default authSlice.reducer;
