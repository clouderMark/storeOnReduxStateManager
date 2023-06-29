import React from 'react';
import {CssBaseline} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
