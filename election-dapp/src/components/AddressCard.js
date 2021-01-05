import React from 'react'

const AddressCard =(props)=>{
return(
    <div class=' p-3 '>
    <div class="card card-sm bg-primary text-white text-left col-sm-5 pr-2 ">
<div class="pt-2 "><p><b>My Address :</b><b class='Address-color'>   {props.account}</b></p></div>
   </div>
   </div>
)
}

export default AddressCard