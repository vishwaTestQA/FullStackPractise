import { useEffect, useState } from 'react'



const SelectDD = () => {
    const [skill, setSkills] = useState<string>('')

    // useEffect(() => {
        
    // },[skill])

  return (
    <div>
        <label>Choose skills</label>
        <select value={skill} onChange={(e)=> setSkills(e.target.value)}>
            <option value="">Select</option>
            <option value="js">javascript</option>
            <option value="java">java</option>
            <option value="python">python</option>
            <option value="reactjs">reactjs</option>
        </select>
    </div>
  )
}

export default SelectDD