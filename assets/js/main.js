import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AppState, {defaultState} from './AppState'
import AppRoot from './AppRoot'

// Create store to hold application state
let store = createStore(AppState, defaultState);

// Render root of App
let appRoot = document.getElementById('app-root');

if( appRoot != null && typeof appRoot != 'undefined' ) 
    ReactDOM.render(
        <Provider store={store}>
            <AppRoot />
        </Provider>,
        appRoot
    );