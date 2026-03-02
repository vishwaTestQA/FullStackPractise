
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'

const headers = [
    {key:"id", label:"ID"},
    {key:"name", label:"NAME"},
    {key:"email", label:"EMAIL"},
    {key:"body", label:"BODY"},
    {key:"postId", label:"POSTID"},
]

const SortMultipleRows = () => {
    const [data, setData] = useState([])
    const [sortConfig, setSortConfig] = useState([{key:"id", direction:"desc"}])

    useEffect(() => {
       async function getPosts(){
         const res = await axios.get("https://jsonplaceholder.typicode.com/comments")
         setData(res.data);
        }
        getPosts() 
    },[])

    const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
        // const target = e.target as HTMLElement;
        // const {name} = target.closest('th');
        // const {name} = target
        const name = (e.currentTarget as HTMLButtonElement).name;
        console.log(name)

        setSortConfig(prev => {
            const isExist = prev.find(ob => ob.key === name);

                 if(!isExist){
                    console.log("if not exist add the obj", [...prev, {key:name, direction:"desc"}])
                     return [...prev, {key:name, direction:"desc"}]
                }
               return prev.map(obj => {
                 return obj.key === name 
                        //  ? obj.direction === "asc" ? {...obj, direction:"desc"} : {...obj, direction:"asc"}
                        ?{
                            ...obj, direction: obj.direction === 'asc'? "desc" : 'asc'
                        }
                         : obj
                })
            })
    }

    console.log("sortConfig",sortConfig)

    const sortedData = useMemo(() => {
        return [...data].sort((a,b) => {
             for(const {key, direction} of sortConfig){
                const aVal = a[key];
                const bVal = b[key];

                if(aVal === bVal) continue

                if(typeof aVal === 'number'){
                  return direction === 'asc' 
                       ? aVal - bVal : bVal - aVal
                }
                // return direction === 'asc'
                //        ? String(aVal).localeCompare(bVal)
                //        : String(bVal).localeCompare(aVal)
                const result = String(aVal).localeCompare(String(bVal));
                return direction === 'asc' ? result : -result;

             }
             return 0
        })
    },[data, sortConfig])

console.log("sorteddata", sortedData)

  return (
    <div>
        <table>
            <thead>
                <tr>
                   {
                    headers.map(hd => {
                        return <th> 
                        <button name={hd.key} style={{display:"inline", height:"20px"}} onClick={handleSort}>click</button>
                        {hd.label}  
                        </th>
                    })
                   }
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row, indx) => <tr>
                    {
                        headers.map((hd, indx) => <td>{row[hd.key]}</td>)
                    }
                </tr>)}
            </tbody>
        </table>
    </div>
  )
}

export default SortMultipleRows