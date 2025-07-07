import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import SideBar from './component/sideBar/sideBAr'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer, toast } from 'react-toastify';
import {jwtDecode} from "jwt-decode"


const App = () => {

  const [resID, setResId] = useState("paopaolllll")
  const url = "http://localhost:5000"

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tokenFromURL = params.get("token")
    console.log(tokenFromURL)
    const token = tokenFromURL || localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded.name) {
          setResId(decoded.name)
          console.log("resID here:" , decoded.name)
          localStorage.setItem("token", token)  

          if (tokenFromURL) {
          window.history.replaceState({}, document.title, "/")
          }
        }else{
          console.log("no resID yet or it is paopao")
        }
      } catch (err) {
        console.error("Invalid token:", err)
      }
    }
  }, [])

  return (
    <div>
      <ToastContainer/>
      <div className='app-content'>
        <SideBar/>
        <Routes>
          <Route  path="/add" element={<Add url={url} resID={resID}/>}/>
          <Route  path="/list" element={<List url={url} resID={resID}/>}/>
          <Route  path="/orders" element={<Orders url={url} resID={resID}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
