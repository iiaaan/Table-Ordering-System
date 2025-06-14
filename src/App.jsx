import Navbar from './component/Navbar/Navbar.jsx'
import Header from './component/Header/Header.jsx'
import FoodDisplay from './component/FoodDisplay/FoodDisplay.jsx'
import Cart from './component/Cart/Cart.jsx'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react'
import { Context } from './context/context.jsx'
import { TableContext } from './context/TableContext.jsx'

function App() {
    const { restaurantId, tableId } = useContext(TableContext);

    /*
    if (!restaurantId || !tableId) {
        return <div className='missingTableId'>Invalid access, Please scan the QR code on your table again.</div>;
    }
    */

    return(
        <div className="app">
            <Header/>
            <Navbar/>
            <div className="main-content">
                <Routes>
                    <Route path='/' element={<FoodDisplay/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                </Routes>
            </div>
            <ToastContainer autoClose={800}/>
        </div>
    )
}

export default App
