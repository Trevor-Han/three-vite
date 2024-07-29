
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from '../src/store/index.ts'
import { RouterBeforeEach } from '@/router/RouterBeforEach.tsx'
import { StrictMode } from 'react'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouterBeforeEach>
          <App></App>
        </RouterBeforeEach>
      </BrowserRouter>

    </Provider>
  </StrictMode>

)
