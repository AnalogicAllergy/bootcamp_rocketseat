import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from './styles/global';
import Routes from './routes';
import Header from './components/Header';
import history from './services/history';
// redux
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <GlobalStyle />
        <ToastContainer />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
