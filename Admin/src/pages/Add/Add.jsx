import React, { useState } from 'react'
import axios from "axios"
import './Add.css'
import { assets} from '../../assets/assets'
import { toast } from 'react-toastify'

function Add({url}) {

  
  const [image,setimage]=useState(false)

  const [Data,setData]=useState({
    name:"",
    description:"",
    category:"Salad",
    price:""
  })

  const onHandlerChange=(event)=>{
const name = event.target.name;
const value = event.target.value;

//This is called a functional state update


/*Clear & Detailed Explanation of:
setData(Data => ({ ...Data, [name]: value }));

This line is extremely important in React when updating object-based state, especially in forms.
Let’s break it down in the cleanest possible way:

🧩 1. setData(...)

This updates your React state.

But instead of writing:

setData({ ... })


you are using:

setData(Data => (...))


This is called a functional state update.

Why use functional updates?

Because React may batch updates.
Using Data => (...) guarantees you ALWAYS get the latest, correct state.

🧩 2. Data => (...)

Here, Data is the previous state value.

Just like:

(prevState) => (...)

🧩 3. { ...Data } (spread operator)

This copies the entire old object into a new one.

Example:

If previous state is:

{
  name: "Apple",
  description: "",
  category: "",
  price: ""
}


Then:

{ ...Data }


Creates a clone of the object.

This ensures no old values are erased.

🧩 4. [name]: value (dynamic key)

This is the most important part.

name is the name of the input that changed.

value is what the user typed.

If name = "price" and value = "120"
Then this becomes:

price: "120"


So React updates only that specific field.

🧩 5. The final returned object
({ ...Data, [name]: value })


This means:

Take all old fields (...Data)

Overwrite ONLY the field that changed ([name]: value)

No other field is touched. */

setData(Data=>({...Data,[name]:value}))

}


const onSubmitHandler = async(event)=>{
event.preventDefault();
const formData=new FormData();
formData.append("name",Data.name)
formData.append("description",Data.description)
formData.append("price",Data.price)
formData.append("category",Data.category)
formData.append("image",image)

/*Sending Data to Backend with Axios

const response = await axios.post(`${url}/api/food/add`, formData);
Key points:
formData is sent as the body.
Axios automatically sets:
Content-Type: multipart/form-data
If your backend is configured correctly, it will read both text + image. */

const response = await axios.post(`${url}/api/food/add`,formData)
if(response.data.success){
setData({
    name:"",
    description:"",
    category:"Salad",
    price:""
  })
  setimage(false)
  toast.success(response.data.message)
}else{
  toast.error(response.data.message)
}

}

return (
    <div className='add'>
        <form  className='flex-col' onSubmit={onSubmitHandler}>
            
                <div className='add-img-upload  flex-col'>
                  <p>Upload Image</p>
                  <label htmlFor='image'>
                    <img src={image ?URL.createObjectURL(image):assets.upload_area} alt='Upload Area' />
                  </label>
                  <input onChange={(e)=>setimage(e.target.files[0])} type='file' id='image' hidden required />
                </div>

<div className='add-product-name flex-col'>
    <p>Product Name</p>
    <input onChange={onHandlerChange} value={Data.name}type='text' name='name' placeholder='Type here'></input>
</div>
<div className='add-product-description flex-col'>

    <p>Product Description</p>
    <textarea onChange={onHandlerChange} value={Data.description}name='description' rows="6" placeholder='Write Content Here' required></textarea>
</div>
<div className='add-category-price'>
    <div className='add-category flex-col'>
        <p>Category</p>
        <select onChange={onHandlerChange} value={Data.category} name='category'>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
            </select>
</div>
    <div className='add-price flex-col'>
        <p>Product Price</p>
        <input onChange={onHandlerChange} value={Data.price} type='number' name='price' placeholder='₹120'></input>
    </div>
</div>
    <button type='submit' className='add-btn'>ADD</button>
    
        </form>
      
    </div>
  )
}

export default Add
