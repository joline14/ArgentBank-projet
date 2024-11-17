import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Redux/Store/Store.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    <App/>
   </Provider>
  </StrictMode>,
)
