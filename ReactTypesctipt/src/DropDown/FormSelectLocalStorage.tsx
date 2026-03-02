import React, { useEffect, useRef, useState } from 'react'

type Props = {
    
}

const FormSelectLocalStorage = () => {
    const hydrationFlag = useRef(false)
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        age:'',
        role:''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{   //e is an object not array
         const {name, value} = e.target;
         setFormData(prev => ({
            ...prev,
            [name]: value
         }))
    }

    useEffect(()=>{
           const storedData =  window.localStorage.getItem("form");
           storedData && setFormData(JSON.parse(storedData)) 
           hydrationFlag.current = true
        },[])

    useEffect(() =>{
        if(!hydrationFlag.current)
        window.localStorage.setItem("form", JSON.stringify(formData))
    },[formData, hydrationFlag.current])

  return (
    <div>
        <form>
        <label>Name</label>    
        <input type="text" name='name' value={formData.name} onChange={handleChange}/>
        <label>Email</label>    
        <input type="text" name='email' value={formData.email} onChange={handleChange}/>
        <label>Age</label>    
        <input type="number" name='age' value={formData.age} onChange={handleChange}/>

         <label>Choose role</label>
        <select name='role' value={formData.role} onChange={handleChange}>
            <option value="">Select</option>
            <option value="js">javascript</option>
            <option value="java">java</option>
            <option value="python">python</option>
            <option value="reactjs">reactjs</option>
        </select>
        </form>
    </div>
  )
}

export default FormSelectLocalStorage