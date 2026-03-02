import React, { useEffect, useState } from 'react'


const PAGE_NO = 1;
const ITEMS_PER_PAGE = 8;

const PaginateSimple = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json()).then(res => setData(res))
    },[]) 

    

  return (
    <div>
        {
            data.map(dt => <p key={dt.id} style={{counterReset: 'number'}}>{dt.body}</p>)
        }
    </div>
  )
}

export default PaginateSimple