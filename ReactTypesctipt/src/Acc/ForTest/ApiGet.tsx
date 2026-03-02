import React, { useEffect, useState } from 'react'


const ApiGet = () => {

      const [data, setData] = useState<Data>([])

       useEffect(() => {
               fetch("https://jsonplaceholder.typicode.com/posts")
               .then(data => data.json())
                .then(data=> setData(data))
           },[])

  return (
    <div>
{
    data.map(dt => <li role="listitem" name={dt.title}>{dt.title}</li>)
}
    </div>
  )
}

export default ApiGet