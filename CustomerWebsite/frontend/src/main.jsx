import { createRoot } from 'react-dom/client'
import './index.css'
import ContextProvider from './context/context.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './context/CartContext.jsx';
import TableProvider from './context/TableContext.jsx';
import DisplayProvider from './context/DisplayContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TableProvider>
      <CartProvider>
        <DisplayProvider>
          <App />
        </DisplayProvider>
      </CartProvider>
    </TableProvider>
  </BrowserRouter>
)
