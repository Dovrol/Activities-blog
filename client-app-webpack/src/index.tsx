import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import { store, StoreContext } from './stores/store';
import { Router } from 'react-router-dom';
import './components/layout/styles.css'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <Router history={history}>
            <App />
        </Router>
    </StoreContext.Provider>,
    document.getElementById('app'));