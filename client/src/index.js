import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App';

import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"

import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'; // to store userdata in their local storage

const persistConfiguration = {
    key: "root",
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfiguration, authReducer); //Information we'd like to store in user local storage


const reduxStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

const root  = createRoot(document.getElementById('root') )

// Render app to root
root.render(
    <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistStore(reduxStore)}>
            <App/>
        </PersistGate>
    </Provider>
    
    );