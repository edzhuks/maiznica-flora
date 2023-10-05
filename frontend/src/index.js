import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './App.css'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cartReducer'

const store = configureStore({
  reducer: { cart: cartReducer },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
