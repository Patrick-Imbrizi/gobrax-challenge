import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Driver from './pages/Driver/Driver.jsx'
import Vehicle from './pages/Vehicle/Vehicle.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/driver",
    element: <Driver />,
  },
  {
    path: "/vehicle",
    element: <Vehicle />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
