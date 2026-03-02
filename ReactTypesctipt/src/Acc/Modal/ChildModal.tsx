import React, { useEffect, useState } from 'react'


const ChildModal = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(data => data.json())
         .then(data=> setData(data))
    },[])

  return (
    <div>
        {
               <div>
                <span>{data[0]?.userId}</span>
                <span>{data[0]?.title}</span>
                <span>{data[0]?.body}</span>
                </div>
        }
    </div>

  )
}

export default ChildModal