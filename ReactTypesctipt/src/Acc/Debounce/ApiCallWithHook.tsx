import axios from 'axios'
import React, { useEffect, useState } from 'react'

type PostType = {
    userId: string,
    title:string,
    id:number,
    body:string
}[]

const ApiCallWithHook = () => {

    
    
    console.log("prints")
    const [data, setData] = useState<PostType[]>([])

    useEffect(() => {
        // let isMounted = true;
         const controller = new AbortController();  
        const fetchPosts = async()=> {
         
        try {
            const resp = await axios.get<PostType[]>("https://jsonplaceholder.typicode.com/posts", {signal: controller.signal})
            // const resp = await axios.get<PostType[]>("https://jsonplaceholder.typicode.com/posts")
            // if(isMounted)
           setData(resp.data)
        } catch (error) {
            console.log(error)
        }
     
    }
      fetchPosts()

      return () => {
        // isMounted=false
        controller.abort()
    }
    },[])

  return (
    <div>
        {data.map(dt=> <p key={dt.id}>{dt.title}</p>)}
    </div>
  )
}

export default ApiCallWithHook