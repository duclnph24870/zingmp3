import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react'
import IntlProviderWrapper from './hoc/IntlProviderWrapper'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <IntlProviderWrapper>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </IntlProviderWrapper>
  </Provider>
)
