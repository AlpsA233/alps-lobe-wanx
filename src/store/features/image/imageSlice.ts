import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ImageState {
  imageUrl: string;
}

const initialState: ImageState = {
  imageUrl: '',
};

export const imageSlice = createSlice({
  initialState,
  name: 'image',
  reducers: {
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setImageUrl } = imageSlice.actions;

export default imageSlice.reducer;
