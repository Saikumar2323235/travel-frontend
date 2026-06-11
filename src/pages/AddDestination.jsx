import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddDestination() {

 const navigate = useNavigate();

 const [formData, setFormData] = useState({
   name: "",
   country: "",
   image: "",
   description: ""
 });



 function handleChange(e) {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 }

 async function handleSubmit(e) {
   e.preventDefault();

   await api.post(
     "/destinations",
     formData
   );

   navigate("/destinations");
 }

 return (
<div className='form-container'>   
<form onSubmit={handleSubmit}>

     <input
       type="text"
       name="name"
       placeholder="Name"
       onChange={handleChange}
     />

     <input
       type="text"
       name="country"
       placeholder="Country"
       onChange={handleChange}
     />

     <input
       type="text"
       name="image"
       placeholder="Image URL"
       onChange={handleChange}
     />

     <textarea
       name="description"
       placeholder="Description"
       onChange={handleChange}
     />

     <button className='submit-btn'>
       Add Destination
     </button>

   </form>
</div>
 );
}

export default AddDestination;