import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ElementJSX from "./component/ElementJSX";
import Element from "./component/Element";
import Demo from "./component/Demo";
import List from "./animal/List";
import Create from "./animal/Create";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
        {/*<ElementJSX/>*/}
        {/*<Element/>*/}
        {/*<Demo/>*/}
        {/*<ListStudent/>*/}
        {/*<CreateStudent/>*/}
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
