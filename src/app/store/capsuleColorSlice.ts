import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorProps {
  id: string;
  colorCode: string;
}

const initialState: ColorProps = {
  id: 'default',
  colorCode: 'bg-white dark:bg-slate-900',
};

const capsuleColorSlice = createSlice({
  name: 'capsuleColor',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.colorCode = action.payload;
    },
  },
});

export const { setColor } = capsuleColorSlice.actions;
export default capsuleColorSlice.reducer;
