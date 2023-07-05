import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {IItem} from '../interfaces/interfaces';

interface IInitialState {
  items: IItem[];
}

const initialState: IInitialState = {items: []};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setProds: (state, action: PayloadAction<IItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const selectProds = (state: RootState) => state.basket;
export const selectProdsCount = (state: RootState) => state.basket.items.length; // Всего позиций в корзине
// стоимость всех товаров в корзине
export const selectProdsSum = (state: RootState) =>
  state.basket.items.reduce((acc, el) => acc + el.price * el.quantity, 0);
// Всего товаров в корзине
export const selectProdsAmount = (state: RootState) => state.basket.items.reduce((acc, el) => acc + el.quantity, 0);

export const {setProds} = basketSlice.actions;
