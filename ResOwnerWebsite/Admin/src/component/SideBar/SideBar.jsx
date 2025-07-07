import React from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="Sidebar"> 
      <div className="SideBar-options">
        <NavLink to='/add' className="SideBar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Item</p>
        </NavLink>
        <NavLink to="/List" className="SideBar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to="/Orders" className="SideBar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
