import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import { store, StoreContext } from './stores/store';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <StoreContext.Provider value={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreContext.Provider>,
    document.getElementById('app'));