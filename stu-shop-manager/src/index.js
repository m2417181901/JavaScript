import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd'
import './index.css';
import App from './App'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {mainRoutes} from './routes'
import PageNotFound from './pages/PageNotFound';
import { Provider } from 'react-redux';
import store from "./store/index";
ReactDOM.render(
<Provider store={store}>
<Router>
  <Routes>
    <Route path='/admin/*' element={<App />} />
    {
      mainRoutes.map(route => {
        return <Route key={route.path} path={route.path} element={<route.element></route.element>}  />
      })
    }
    <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
  </Routes>
</Router>
</Provider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
