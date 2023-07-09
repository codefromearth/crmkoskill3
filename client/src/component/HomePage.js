
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FormTable from './FormTable';

import './HomePage.css'

export default function HomePage() {

//login user data
const getUserData= async()=>{
try{
  const res=await axios.post('/api/v1/user/getuserData',{},{
    headers:{
      Authorization:"Bearer " + localStorage.getItem("token"),
    }
  })
}catch(error)
{
//console.log(error)
}
}
useEffect(()=>{
  getUserData();
},[])



const handleSubmit=async(e)=>{
  e.preventDefault()
  const data=await axios.post('http://localhost:8080/api/v1/customer/post',formData)
  
 // console.log(data)
  if(data.data.success)
  {
    setAddSection(false)
    alert(data.data.message)
  }
  getFetchdata();
  setFormData({ name:"",
  email:"",
  phone:"",
  address:""})
}


const [dataList,setDataList]=useState([]);
const [editSection,setEditSection]=useState(false)

// fetchdata from database
const getFetchdata=async()=>{
  const data=await axios.get('/api/v1/customer')
  //console.log(data)
  if(data.data.success){
    setDataList(data.data.data)
   // console.log(dataList)
  }
  
}
useEffect(()=>{
  getFetchdata();
},[])

//handale delete function
const handleDelete=async(id)=>{
  const data=await axios.delete('/api/v1/customer/delete/'+id)
  {
    
    if(data.data.success)
    {
      getFetchdata()
      alert(data.data.message)
    }
  }
}

const [addSection ,setAddSection]=useState(false)
const [formData,setFormData]=useState({
  name:"",
  email:"",
  phone:"",
  address:""
})
const [formDataEdit,setFormDataEdit]=useState({
  name:"",
  email:"",
  phone:"",
  address:"",
  _id:'id'
})
const handleonChange=(e)=>{
  const {value,name}=e.target
  setFormData((prev)=>{
    return {
      ...prev,[name]:value
    }
  })
}
const handleUpdate=async(e)=>{
  e.preventDefault();
  const data=await axios.put('/api/v1/customer/put',formDataEdit)
  if(data.data.success){
    getFetchdata()
    alert(data.data.message)
  }
   setEditSection(false)
}
const handleEditonChange=async(e)=>{
  const {value,name}=e.target
  setFormDataEdit((prev)=>{
    return {
      ...prev,[name]:value
    }
  })
  
}
const handleEdit=(e)=>{
   
  setEditSection(true)
  setFormDataEdit(e)
 // console.log(formDataEdit)
}
//serch customer
const searchHandle = async (e) => {
 // console.log(e.target.value);
  let key = e.target.value;
  
  try {
   let data = await axios.get(`/api/v1/customer/search/${key}`);
    if (data.data.success) {
      setDataList(data.data.data);
      //getFetchdata();
      console.log(dataList);
    }
  } catch (error) {
   // console.log(error);
  }
};

//sort the data by name
const sortData=async()=>{
  const data=await axios.get('/api/v1/customer/sortData')
 // console.log(data)
  if(data.data.success){
    setDataList(data.data.data)
    //console.log(dataList)
  }

}

//  pagination part
// const [currentpage, setCurrentPage]=useState(1);
// const recordsperpage=5;
// const lastIndex=currentpage*recordsperpage;
// const firstindex=lastIndex-recordsperpage;
// const records=Data.slice(firstindex,lastIndex);
// const npage=math.ceil(Data.length/recordsperpage)
// const numbers=[...Array(npage+1).keys()].slice(1)

const logout=()=>{
    localStorage.clear();
    window.alert("you have logged out ")
    window.location.reload()
}

  return (
    <div className='main_container'>
      <nav className='navbar'>
        <div><h1>KoSkill CRM_App</h1>
        <button onClick={logout}>logOut</button>
        </div>
      </nav>


          <div className='container'>
          <div  className='upper_section'> 
            <button className='btn btn-add' onClick={()=>setAddSection(true)}>Add</button>
            <input type="text" className='search_box' placeholder='Search Customer Name' 
            onChange={searchHandle}
            />
            <button className='btn btn-sort' onClick={sortData}>Sort by Name</button>
            </div> 
            {
              addSection && 
              <FormTable 
               handleSubmit={handleSubmit}
               handleonChange={handleonChange}
               handleclose={()=>setAddSection(false)}
               rest={formData}
              />
             
            }
            {
              editSection && (
                <FormTable 
               handleSubmit={handleUpdate}
               handleonChange={handleEditonChange}
               handleclose={()=>setEditSection(false)}
               rest={formDataEdit}
              />
              )
            }


            <div className='tableContainer'>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dataList.map((e,i)=>{
                    return(
                       
              <tr key={i}> 
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>{e.address}</td>
                    <td><button className='btn btn-edit' onClick={()=>handleEdit(e)}>Edit</button>
                    <button className='btn btn-delete' onClick={()=>handleDelete(e._id)}>delete</button></td>

              </tr>

                    )  
                     
                    })
                  }
                </tbody>
              </table>

            </div>
           
          </div>

        {/* <nav >
          <ul className='pagination'>
            <li className='page_Item'>
              <a href='#' className='page_link' onClick={perPage}>prev</a>
            </li>
            {
              numbers.map((n,i)=>(
                <li className='page_Item'  key={i} >
                      <a href='#' className='page-item' onClick={changeCpage}>{n}</a>
                </li>
              ))
            }
             <li className='page_Item'>
              <a href='#' className='page_link' onClick={nextPage}>next</a>
            </li>
          </ul>
        </nav> */}

    </div>
  )
}

