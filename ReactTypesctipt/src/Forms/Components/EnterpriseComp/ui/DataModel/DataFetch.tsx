import React, { useEffect, useState } from 'react'
import DataModel, { type Column } from './DataTable'

type Comments = {
   postId: number,
   id: number,
   name: string,
   email: string,
   body: string
}

const DataFetch = () => {
    const [data, setData] = useState<Comments[]>([])

    const columns: Column<Comments>[] = [
    {key: 'postId', header:'POST ID'},
    {key: 'id', header:'ID'},
    {key: 'name', header:'NAME'},
    {key: 'email', header:'EMAIL', render: (value, row, rowIndex) => <a href={`mailTo:${value}`}>{value}</a>},
    {key: 'body', header:'BODY'}
]

    useEffect(() => {
        const fetchData = async()=>{
            fetch("https://jsonplaceholder.typicode.com/comments")
             .then((res) => res.json())
             .then((res: Comments[]) => setData(res))
        }
         
        fetchData()
    },[])

    const calculateRowSpan = (colValue: string| number) => {
        
    }

  return (

    <div>  
        {/* <DataModel<Comments> columns={columns} data={data} testId={'table'}
               variant={'bordered'} stickyHeader={true} density={'compact'}/> */}
        <DataModel<Comments> columns={columns} data={data} testId={'table'}
               variant={'bordered'} stickyHeader={true} density={'compact'}
               hoverable={true} calculateRowSpan={}/>
    </div>  
  )
}

export default DataFetch