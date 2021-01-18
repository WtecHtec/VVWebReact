import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import 'antd/dist/antd.css';
import 'grapesjs/dist/css/grapes.min.css';
import '@/grapesview-them.css';
import '@/App.css';
import '@/views/main/main.css'
import '@/views/index/index.css'
import '@/views/login/login.css'


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
