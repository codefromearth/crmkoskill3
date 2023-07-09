import React from 'react'
import './FormTable.css'
export default function FormTable({handleSubmit,handleonChange,handleclose,rest}) {
 return (
    <div className='addContainer'>
    <form  onSubmit={handleSubmit}>
      <div className='close-btn' onClick={handleclose}>X</div>
      <label htmlFor='name'>Name :</label>
      <input type='text' id="name"  name="name" onChange={handleonChange} value={rest.name}/>

      <label htmlFor='email'>Email :</label>
      <input type='text' id="email"  name="email"   onChange={handleonChange} value={rest.email}/>

      <label htmlFor='phone'>phone :</label>
      <input type='number' id="phone"  name="phone"  onChange={handleonChange} value={rest.phone}/>

      <label htmlFor='address'>Address :</label>
      <input type='text' id="address"  name="address"  onChange={handleonChange} value={rest.address}/>
      
       <button className='btn'>Submit</button>


    </form>
  </div>
  )
}
