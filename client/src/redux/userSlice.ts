import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import type {RootState} from './store';

interface IInitialState {
  id: number | null;
  email: string | null;
  isAuth: boolean;
  isAdmin: boolean;
}

interface IRegistration {
  email: string;
  id: number;
  role: 'USER' | 'ADMIN';
}

const initialState: IInitialState = {
  id: null,
  email: null,
  isAuth: false,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{token: string}>) => {
      const {token} = action.payload;

      const user = jwtDecode(token) as IRegistration;

      localStorage.setItem('token', token);

      state.id = user.id;
      state.email = user.email;
      state.isAuth = true;
      state.isAdmin = user.role === 'ADMIN';
    },
    logout: () => {
      localStorage.removeItem('token');

      return initialState;
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const {login, logout} = userSlice.actions;
