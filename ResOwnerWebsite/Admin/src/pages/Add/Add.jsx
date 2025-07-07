import React, { useEffect, useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url,resID}) => {

  const[image, setImage] = useState(false)
  const[data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"",
  })


  const [addOns, setAddOns] = useState([{ key: "", value: "" }]);
  const handleAddOnChange = (index, field, newValue) => {
  const updated = [...addOns];
  updated[index][field] = newValue;
  setAddOns(updated);
  };


  const handleAddAddOn = () => {
    setAddOns([...addOns, { key: "", value: "" }]);
  };

  const handleRemoveAddOn = (index) => {
    const updated = [...addOns];
    updated.splice(index, 1);
    setAddOns(updated);
  };


  const onChangeHandler = (event)=>{
    const name= event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}))
  }

  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    formData.append("resID", resID)
    formData.append("addOns", JSON.stringify(addOns));
    const response = await axios.post(`${url}/api/menu/add`, formData)

    if(response.data.success){
      setData({name:"",
        description:"",
        price:"",
        category:"",})
        setImage(false)
        toast.success(response.data.message)
    }
    else{
        toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>upload image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col" >
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>

    <div className="add-addons flex-col">
      <p>Add-ons</p>
      {addOns.map((addOn, index) => (
        <div key={index} className="flex-row">
        <input
          type="text"
          placeholder="Add-on name"
          value={addOn.key}
          onChange={(e) => handleAddOnChange(index, "key", e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={addOn.value}
          onChange={(e) => handleAddOnChange(index, "value", e.target.value)}
        />
        <button type="button" onClick={() => handleRemoveAddOn(index)}>✕</button>
    </div>
      ))}
    <button type="button" onClick={handleAddAddOn}>+ Add Add-on</button>
    </div>


        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
          <button type='submit' className='add-btn'>Add</button>
        </div>


        
      </form>
    </div>
  )
}

export default Add
