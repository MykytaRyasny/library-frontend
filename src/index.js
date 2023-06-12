import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import LoginForm from "./humanResources/LoginForm";
import MainPage from "./humanResources/MainPage";
import ListBooks from "./humanResources/ListBooks";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewBook from "./humanResources/NewBook";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App/>}></Route>
            <Route path="login" element={<LoginForm/>}></Route>
            <Route path="main" element={<MainPage/>}></Route>
            <Route path="books" element={<ListBooks/>}></Route>
            <Route path="newbook" element={<NewBook/>}></Route>
        </Routes>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
