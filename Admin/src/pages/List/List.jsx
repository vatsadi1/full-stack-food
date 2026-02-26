import React, { useEffect, useState } from 'react'
import axios from "axios"
import './List.css'
import { toast } from 'react-toastify'
function List({url}) {
  const [list, setlist] = useState([])
   

  const fecthlist = async ()=>{
const response = await axios.get(`${url}/api/food/list`)


if(response.data.success){
  setlist(response.data.data)
}else{
 toast.error("erroe");
 
}
  }

  useEffect(()=>{
    fecthlist();
  },[])

const removeFood = async(foodid)=>{
const response = await axios.post(`${url}/api/food/remove`,{id:foodid})
// wait for fetclist rerender to load ui  and remove food item
await fecthlist()
if(response.data.success){
  toast.success(response.data.message)
}else{
  toast.error("error")
}
}
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className='list-table'>
        <div className='list-table-formate title'>
          <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b>Action</b>
        </div>
        {list.map((item,index)=>{
return(
  <div key={index} className='list-table-formate'>
    <img src={`${url}/images/`+item.image} alt=''/>
    <p>{item.name}</p>
     <p>{item.category}</p>
      <p>${item.price}</p>
      <p onClick={()=>removeFood(item._id)}className='cursor'>X</p>
       
    </div>
)
        })}
      </div>
    </div>
  )
}

export default List
