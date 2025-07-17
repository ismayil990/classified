import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';
import store from '../redux/store.js';
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    toastClassName="bg-green-600 text-white rounded-[7px]"
  />
  <Provider store={store}>
     <App />
     </Provider>
    </BrowserRouter>
)
