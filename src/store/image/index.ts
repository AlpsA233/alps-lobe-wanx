import { configureStore } from '@reduxjs/toolkit';

import imageReducer from '@/store/features/image/imageSlice';

// 假设imageStore是一个简单的状态管理器，用于存储和更新图片URL
const useImageStore = configureStore({
  reducer: {
    image: imageReducer,
  },
});

export default useImageStore;

export type RootState = ReturnType<typeof useImageStore.getState>;
export type AppDispatch = typeof useImageStore.dispatch;
