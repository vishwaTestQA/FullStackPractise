import React, { useEffect, useLayoutEffect, useState } from 'react'

type Props = {
    postId:number;
    id:number;
    name: string;
    email: string;
    body:string
}[]

const VirtuvalizedList = () => {
    const [data, setData] = useState<Props[]>();
    useLayoutEffect(() =>{
        const fetchComments = async()=>{
             fetch("https://jsonplaceholder.typicode.com/comments")
                 .then(res => res.json())
                 .then(res => setData(res))
        }

        fetchComments()
    },[])
  return (
    <div>
        {
           data && data.map(dt=> (
                <div>
                    <span>{dt.id}</span>
                    <span>{dt.email}</span>
                    <span>{dt.body}</span>
                    <span>{dt.name}</span>
                </div>
            ))
        }
    </div>
  )
}

export default VirtuvalizedList