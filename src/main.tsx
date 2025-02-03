import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { Provider } from 'react-redux'
import {store} from './store'
import AppRouter from './app/AppRouter';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>

    </Provider>
  </StrictMode>,
)
