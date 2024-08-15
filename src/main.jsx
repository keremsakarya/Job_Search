import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./assets/styles/style.scss"
import { Provider } from 'react-redux'
import store from './app/store.js'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    <ToastContainer />
  </StrictMode>,
)
