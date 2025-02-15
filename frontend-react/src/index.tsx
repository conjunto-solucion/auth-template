import React from "react"
import ReactDOMClient from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

const root = document.getElementById('root')!

ReactDOMClient.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)