import { Capsule } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type editOrcreateCapsule = {
  mode: 'create' | 'edit';
  id?: string;
  capsule: Capsule | null;
};

const initialState: editOrcreateCapsule = {
  mode: 'create',
  capsule: null,
};

const editOrcreateCapsuleSlice = createSlice({
  name: 'editOrcreateCapsule',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<'create' | 'edit'>) => {
      state.mode = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setCapsule(state, action: PayloadAction<Partial<Capsule>>) {
      state.capsule = { ...(state.capsule ?? {}), ...action.payload };
    },
    resetCapsule() {
      return initialState;
    },
  },
});

export const { setMode, setId, setCapsule, resetCapsule } = editOrcreateCapsuleSlice.actions;
export default editOrcreateCapsuleSlice.reducer;
