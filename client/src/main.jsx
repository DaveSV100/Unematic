import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Layout from './Components/Layout/Layout.jsx'
import { ColorSchemeProvider } from './Context/ColorSchemeProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorSchemeProvider>
      <Layout>
        <App />
      </Layout>
    </ColorSchemeProvider>
  </React.StrictMode>,
)

