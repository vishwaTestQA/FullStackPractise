
import React, { useEffect, useMemo, useState } from 'react'


const FilterSearch = () => {
    const [data, setData] = useState([])
    const [text, setText] = useState("")

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json()).then(res => setData(res))
    },[]) 

    const filterData = useMemo(() => {
        if(!text.trim()) return []
        return data.filter(dt => dt.body.includes(text))
    }, [data, text])

    const handleClick = (e) => {
       const target = e.target as HTMLElement;
       const li = target.closest('li')
       setText(li.textContent)
    }

  return (
    <div>
        <input value={text} onChange={(e) => setText(e.target.value)} style={{display:'block'}}/>
        <div>{
            filterData.map((itm,i) => {
                return <li key={i} onClick={handleClick}>{itm.body}</li>
            })
        }</div>
    </div>
  )
}

export default FilterSearch