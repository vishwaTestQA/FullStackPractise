import React, { useEffect, useState } from 'react'
import TableReusable from './TableReusable'

type Headers={
   key:string,
   label:string
}[]

type Data = {
    userId:string,
    id: string,
    title:string,
    body:string
}[]



const TableData = () => {
     const [data, setData] = useState<Data>([])

    const headers = [
      {key:"userId", label:"USERID"},
      {key:"id", label:"ACTION", 
            render: (value,row)=> <button className='tbl-button' onClick={() => alert(row.title)}>View</button>
            },
      {key:"title", label:"TITLE"},
      {key:"body", label:"BODY"},
    ]

       useEffect(() => {
           fetch("https://jsonplaceholder.typicode.com/posts")
           .then(data => data.json())
            .then(data=> setData(data))
       },[])
    

  return (
    <TableReusable headers={headers} data={data} className="custom"/>
  )
}

export default TableData