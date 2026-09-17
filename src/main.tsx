import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';
import './styles.css';
import './final-ui.css';
import './production-ui.css';
import { applyTheme, getTheme } from './lib/theme';
import App from './App';

// Apply the persisted theme before React paints the UI to prevent a light/dark flash.
applyTheme(getTheme());
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
