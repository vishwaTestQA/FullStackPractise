import { useState } from 'react'
import './Forms.css'

const ToggleButton = () => {
    const [toggle, setToggle] = useState(false);
    console.log(toggle)
    const style = {
       
    }

  return (
    // <div className='btn'>
    //     <label>
    //     <input 
    //        type='checkbox' 
    //        checked= {toggle}
    //        className= {toggle ? 'togglBtn btn-on' : 'togglBtn btn-off'}  
    //        onChange={(e) => setToggle(e.target.checked)}
    //        />
    //       {toggle ? 'ON': 'OFF'}</label>
           
    // </div>

    //slider
       <div >
        <label className='switch'>
        <input 
           type='checkbox' 
           checked= {toggle}
           className= {toggle ? 'togglBtn btn-on' : 'togglBtn btn-off'}  
           onChange={(e) => setToggle(e.target.checked)}
           />
          <span className='slider'></span>
          </label>      
    </div>
  )
}

export default ToggleButton