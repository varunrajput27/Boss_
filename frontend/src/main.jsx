import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { AuthProvider } from "./context/AuthContext"; // adjust path as needed


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
     
     <AuthProvider>
   
      <App />
      </AuthProvider>
 
    </ShopContextProvider>
  </BrowserRouter>,
)
