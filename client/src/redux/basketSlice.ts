import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialState: IProduct[] = [];

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setProds: (state, action: PayloadAction<IProduct[]>) => {
      state = action.payload;
    },
  },
});

export const selectProds = (state: RootState) => state.basket;
export const selectProdsCount = (state: RootState) => state.basket.length; // Всего позиций в корзине
// стоимость всех товаров в корзине
export const selectProdsSum = (state: RootState) => state.basket.reduce((acc, el) => acc + el.price * el.quantity, 0);
// Всего товаров в корзине
export const selectProdsAmount = (state: RootState) => state.basket.reduce((acc, el) => acc + el.quantity, 0);

export const {setProds} = basketSlice.actions;
