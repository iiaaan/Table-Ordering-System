import React from 'react'
import Navbar from './component/Navbar/Navbar'
import SideBar from './component/sideBar/sideBAr'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {

  const url = "http://localhost:5000"

  return (
    <div>
      <ToastContainer/>
      <div className='app-content'>
        <SideBar/>
        <Routes>
          <Route  path="/add" element={<Add url={url} resID={"paopao"}/>}/>
          <Route  path="/list" element={<List url={url} resID={"paopao"}/>}/>
          <Route  path="/orders" element={<Orders url={url} resID={"paopao"}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
