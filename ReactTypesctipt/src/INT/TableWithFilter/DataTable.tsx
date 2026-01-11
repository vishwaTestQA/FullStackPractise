import { Directions } from '@mui/icons-material'
import React, { useMemo, useRef, useState } from 'react'
import SortIconComponent from './SortIconComponent'

type Headers<T> = {
    key: keyof T,
    // label: string               //supose here we give a wrong key then we get error
    header: string
}

type Props<T> = {
   data: T[],
   header: Headers<T>[]
} 

type SortKey<T extends string = string> = {
    key: T,
    direction: "asc" | "desc"
}

// type SortKey<T> = {
//     key: keyof T,
//     direction: "asc" | "desc"
// }

const DataTable = <T extends Record<string, any>>({data, header}: Props<T>) => {

    // const[query, setQuery] = useState({
    //     postId:"",
    //     id:"",
    //     name:"",
    //     email:"",
    // })

    const[query, setQuery] = useState<Record<string, string>>({})

    const [sortkeys, setSortkeys] = useState<SortKey<T>[]>([])
    // const [sortkeys, setSortkeys] = useState<{key?:string, direction?:string}[]>([])

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;    //name == headerName and value === searchvalue
        setQuery(prev => ({...prev, [name]:value}))
    }

    console.log(query)
    
    const handleSortKey = (e:React.MouseEvent<HTMLButtonElement>) => {
       const {key} = e.currentTarget.dataset;

       setSortkeys(prev => {
        const existing = prev.some(s => s.key === key)
        if(existing){
            return prev.map(obj => {
              if(obj.key === key){
                return {...obj, direction: obj.direction === 'asc' ? 'desc' : 'asc'}
              }else{
                return {...obj}
              }
            })
        }
           return [...prev, {key, direction:"asc"}]
       })
    }

    const dataFiltered = useMemo(() => {
        let res = data.filter((obj: T)=> {         //res is array of objects
           const keys =  Object.keys(query);
           return keys.every(k => {
             if(query[k] === "")return true;
             return String(obj[k]).toLocaleLowerCase().includes(String(query[k]).toLocaleLowerCase())
           })
        })

         //sorting
         if (sortkeys.length === 0) return res;
             return [...res].sort((a,b) => {
               for(const {key, direction} of sortkeys){   //eac obj has {key:"postId", direction:"asc"}
                const aVal = (a as Record<string, any>)[key];
                const bVal = (b as Record<string, any>)[key];

                if (aVal === bVal) return 0;

                if(typeof aVal === 'number'){
                    return direction === 'asc' ? aVal - bVal : bVal - aVal
                }

                return direction === 'asc' 
                     ? String(aVal).localeCompare(String(bVal))
                     : String(bVal).localeCompare(String(aVal))
            }
            return 0;
         })
        // return res.length === 0 ? data : res
    },[query, sortkeys, data])

    // console.log(filteredData)

    // <SortIconComponent<T> sortKeys={sortkeys} headerKey={hd.key}/>
  return (
    <div>
          
        <table>
            <thead style={{width: "100%"}}>
                <tr>{
                  header.map((hd,i) => <th key={i}>{hd.header}
                    {/* name={String(hd.key)}   name expects a string, but hd.key is keyof T. */}
                   <input name={String(hd.key)} onChange={handleQuery}/>
                   <span><button data-key={hd.key} onClick={handleSortKey}>^</button></span>
                   </th>)
                }</tr>
            </thead>
            <tbody>
                {
                     data.length === 0
                        ? <tr><td colSpan={header.length}>No data found</td></tr>
                        : dataFiltered.map((dt) => ( 
                            <tr>{header.map(hd => <td>{dt[hd.key]}</td>)}</tr>
                        ))

                }
            </tbody>
        </table>
    </div>
  )
}

export default DataTable