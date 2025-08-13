import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorProps {
  id: string;
  colorCode: string;
  capsuleDate: string | undefined;
}

const initialState: ColorProps = {
  id: 'default',
  colorCode: 'bg-white dark:bg-slate-900',
  capsuleDate: '',
};

const capsuleSettingSlice = createSlice({
  name: 'capsuleSetting',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.colorCode = action.payload;
    },
    setDateCapsule: (state, action: PayloadAction<string>) => {
      state.capsuleDate = action.payload;
    },
  },
});

export const { setColor, setDateCapsule } = capsuleSettingSlice.actions;
export default capsuleSettingSlice.reducer;
