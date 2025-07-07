import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url, resID}) => {

  const [menu,setMenu] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/list`, { params: { resID } });
      if (response.data.success) {
        setMenu(response.data.data);
      } else {
        toast.error("Failed to fetch menu items");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };


  const removeFood = async(foodID) =>{
    const response = await axios.delete(`${url}/api/menu/delete`, {data: {id:foodID}})
    if(response.data.success){
      toast.success(response.data.message)
      await fetchList()
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='lsit add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {menu.map((item, index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
            </div>
        )
        })}
      </div>
    </div>
  )
}


export default List
