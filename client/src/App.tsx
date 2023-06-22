import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {theme} from './styles/theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}></ThemeProvider>;
    </Provider>
  );
}

export default App;
