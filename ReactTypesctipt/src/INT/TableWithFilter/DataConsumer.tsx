import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
import DataTableWithSingleSort from './DataTableWithSingleSort'
import { axiosApi } from '../Axios/networkInterceptors'

type Headers = {
    key:string,
    label: string
}

type CommentsData = {
    postId: string,
    id: string,
    name: string,
    email:String
}


const DataConsumer = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<CommentsData[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController();  //wrong way of instantiation new AbortController;

        const fetchComments = async() => {
            try {
                setLoading(true)
                // const resp:Response = await fetch("https://jsonplaceholder.typicode.com/commen", {signal: controller.signal})
                
                // if(!resp.ok){
                //     throw new Error (`HTTP error: ${resp.status}`)
                // }
                
                // const data: CommentsData[] = await resp.json() 
                //  setData(data)

                const resp: CommentsData[] = await axiosApi.get("https://jsonplaceholder.typicode.com/comments", 
                                                                         {signal: controller.signal})
                setData(resp)

            } catch (error) {
                if(error instanceof DOMException && error.name === "AbortError") return;
                setError((error as Error).message)
            }finally{
                setLoading(false)
            }
          }

            fetchComments()

            return () => controller.abort();  
      
    },[])

   const header = [
    {key:"postId", header:"POSTID"},
    {key:"id", header:"ID"},
    {key:"name", header:"NAME"},
    {key:"email", header:"EMAIL"},
   ]

  return (
    <div>
        {/* <DataTable<CommentsData> data={data} header={header}/> */}
        <DataTableWithSingleSort<CommentsData> data={data} header={header}/>
    </div>
  )
}

export default DataConsumer