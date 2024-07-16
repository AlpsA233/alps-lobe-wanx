import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../image';

export const useImageDispatch: () => AppDispatch = useDispatch;

export const useImageSelecter: TypedUseSelectorHook<RootState> = useSelector;
