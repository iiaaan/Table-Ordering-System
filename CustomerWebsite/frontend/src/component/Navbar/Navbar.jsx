import React, { useContext } from 'react'
import basketIcon from '../../frontend_assets/basket_icon.png';
import "./Navbar.css"
import { useNavigate,Link } from 'react-router-dom'
import { DisplayContext } from '../../context/DisplayContext';


const Navbar = () => {
    
    const navigate = useNavigate()
    const {setCurrentCategory,currentCategory} = useContext(DisplayContext)

  return (
    <div className='navbar'>
      <div className="categories">
        <ul>
            <li onClick={()=>{setCurrentCategory(""); navigate("/")}} className={currentCategory===""?"active":""}>All</li>
            <li onClick={()=>{setCurrentCategory("Salad"); navigate("/")}} className={currentCategory==="Salad"?"active":""}>Salad</li>
            <li onClick={()=>{setCurrentCategory("Rolls"); navigate("/")}} className={currentCategory==="Rolls"?"active":""}>Rolls</li>
            <li onClick={()=>{setCurrentCategory("Deserts"); navigate("/")}} className={currentCategory==="Deserts"?"active":""}>Deserts</li>
            <li onClick={()=>{setCurrentCategory("Sandwich"); navigate("/")}} className={currentCategory==="Sandwich"?"active":""}>Sandwich</li>
            <li onClick={()=>{setCurrentCategory("Cake"); navigate("/")}} className={currentCategory==="Cake"?"active":""}>Cake</li>
            <li onClick={()=>{setCurrentCategory("Pure Veg"); navigate("/")}} className={currentCategory==="Pure Veg"?"active":""}>Pure Veg</li>
            <li onClick={()=>{setCurrentCategory("Pasta"); navigate("/")}} className={currentCategory==="Pasta"?"active":""}>Pasta</li>
            <li onClick={()=>{setCurrentCategory("Noodles"); navigate("/")}} className={currentCategory==="Noodles"?"active":""}>Noodles</li>
        </ul>
      </div>
      <div className='cart'><Link to={"/cart"}><img src={basketIcon} alt="" /></Link></div>
    </div>
  )
}

export default Navbar
