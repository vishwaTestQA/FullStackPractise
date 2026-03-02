import React, { useEffect, useState } from 'react'
import TableReusable from '../Table/TableReusable'


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



// const Paginate = () => {
//      const [data, setData] = useState<Data>([])

//     const headers = [
//       {key:"userId", label:"USERID"},
//       {key:"id", label:"ACTION", 
//             render: (value,row)=> <button onClick={() => alert(row.title)}>View</button>
//             },
//       {key:"title", label:"TITLE"},
//       {key:"body", label:"BODY"},
//     ]

//        useEffect(() => {
//            fetch("https://jsonplaceholder.typicode.com/posts")
//            .then(data => data.json())
//             .then(data=> setData(data))
//        },[])

//         const [startIndx, setStartIndex] = useState(0)
//         // const [endIndex, setEndIndex] = useState(8)

//     const handleNext = () => {
//       if(data.length > (startIndx+8)){
//         setStartIndex(prev => prev + 8)
//         // setEndIndex(prev => prev + 8)
//       }
//     }

//     const handleBack = () => {
//       if(startIndx > 0){
//         setStartIndex(prev => prev - 8)
//         // setEndIndex(prev => prev - 8)
//       }
//     }


//   return (
//     <div>
//     <TableReusable headers={headers} data={data.slice(startIndx, startIndx+8)}/>
//     {startIndx > 0 ? <button onClick={handleBack}>Back</button> : null}
//     {(startIndx+8) < data.length ? <button onClick={handleNext}>Next</button>: null}
//     </div>
//   )
// }

// export default Paginate


const Paginate = () => {
     const [data, setData] = useState<Data>([])
     const ITEMS_PER_PAGE = 38;

    const headers = [
      {key:"userId", label:"USERID"},
      {key:"id", label:"ACTION", render: (value, row)=> <button onClick={() => alert(row.title)}>View</button>},
      {key:"title", label:"TITLE"},
      {key:"body", label:"BODY"},
    ]

       useEffect(() => {
           fetch("https://jsonplaceholder.typicode.com/posts")
           .then(data => data.json())
            .then(data=> setData(data))
       },[])

        const [page, setPage] = useState(1)
        const totalPage = Math.ceil(data.length/ITEMS_PER_PAGE)

    const handleNext = () => {
        setPage(page + 1)
    }

    const handleBack = () => {
        setPage(page - 1)
    }

    const paginateData =  data.slice(     //data.slice(0,8)  data.slice(8,16)
        (page - 1) * ITEMS_PER_PAGE,
        (page) * ITEMS_PER_PAGE
    )


  return (
    <div>
    <div>    
    <TableReusable headers={headers} data={paginateData}/>
    </div>
    <span>{page}</span>
    <button onClick={handleBack} disabled={page === 1}>Back</button>
    <button onClick={handleNext} disabled={page === totalPage}>Next</button>
    </div>
  )
}

export default Paginate