import React from 'react';
import ReactDOM from 'react-dom';
import MatrioshtsApp from './components/MatrioshtsApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


ReactDOM.render(<MatrioshtsApp/>,document.getElementById('app'));


