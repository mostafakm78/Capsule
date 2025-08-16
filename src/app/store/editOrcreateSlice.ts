import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type CapsuleData = {
  title: string;
  description: string;
  extra: string;
  color: string;
  image: string;
  category: string;
  status: string;
};

type editOrcreateCapsule = {
  mode: 'create' | 'edit';
  initialData: CapsuleData | null
}

const initialState: editOrcreateCapsule = {
  mode: 'create',
  initialData: {
    title: '',
    description: '',
    extra: '',
    color: '',
    image: '',
    category: '',
    status: '',
  },
};

const editOrcreateCapsuleSlice = createSlice({
  name: 'editOrcreateCapsule',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<'create' | 'edit'>) => {
      state.mode = action.payload;
    },
    setData: (state, action: PayloadAction<CapsuleData | null>) => {
      state.initialData = action.payload;
    },
  },
});

export const { setMode, setData } = editOrcreateCapsuleSlice.actions;
export default editOrcreateCapsuleSlice.reducer;
