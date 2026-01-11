import { Directions } from '@mui/icons-material'
import React, { useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from 'react'
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

// type SortKey<T extends string = string> = {
//     key: T,
//     direction: "asc" | "desc"
// }

type SortKey<T> = {
    key: keyof T,
    direction: "asc" | "desc"
}

type PendingAction = "filter" | "sort" | null;

const DataTableWithSingleSort = <T extends Record<string, any>>({data, header}: Props<T>) => {

    const[query, setQuery] = useState<Record<string, string>>({})
    const deferredQuery = useDeferredValue(query)
    const [isPending, startTransition] = useTransition();
    const [pendingAction, setPendingAction] = useState<PendingAction>(null);

    const [sortkeys, setSortkeys] = useState<SortKey<T>>({key:'id', direction:'desc'})
    // const [sortkeys, setSortkeys] = useState<{key?:string, direction?:string}[]>([])

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;    //name == headerName and value === searchvalue

        setPendingAction("filter");
        startTransition(() => {
         setQuery(prev => ({...prev, [name]:value}))
        })
       
    }

    console.log("query",query)
    console.log("deferred",deferredQuery)
    
    const handleSortKey = (e:React.MouseEvent<HTMLButtonElement>) => {
       const key = e.currentTarget.dataset.key as keyof T;
       setPendingAction("sort") 
       startTransition(() =>{
       setSortkeys((prev) => {
         return prev?.key === key 
            ? {key, direction: prev.direction === 'asc' ? 'desc' : 'asc'}
            : {key, direction: 'asc'}
       })
       })
         
    }

    // const dataFiltered = useMemo(() => {
    const dataFiltered = () => {
        let res = data.filter((obj: T)=> {         //res is array of objects
           const keys =  Object.keys(deferredQuery);
           return keys.every(k => {
             if(deferredQuery[k] === "")return true;
             return String(obj[k]).toLocaleLowerCase().includes(String(deferredQuery[k]).toLocaleLowerCase())
           })
        })

         //sorting
         if (!sortkeys) return res;
         const {key, direction} = sortkeys;
             return [...res].sort((a,b) => {
                const aVal = a[key];     // no need to type here becz we defined the key as keyof T
                const bVal = (b as Record<string, any>)[key];

                if (aVal === bVal) return 0;

                if(typeof aVal === 'number'){
                    return direction === 'asc' ? aVal - bVal : bVal - aVal
                }

                return direction === 'asc' 
                     ? String(aVal).localeCompare(String(bVal))
                     : String(bVal).localeCompare(String(aVal))
         })
        // return res.length === 0 ? data : res
    // },[deferredQuery, sortkeys, data])
    }

    useEffect(() => {
        dataFiltered()
    }, [data, query, sortkeys])

    // console.log(filteredData)

    // <SortIconComponent<T> sortKeys={sortkeys} headerKey={hd.key}/>
    console.log(sortkeys)

  return (
    <div>
          
        <table>
            <thead style={{width: "100%"}}>
                <tr>{
                  header.map((hd,i) => <th key={i}>{hd.header}
                    {/* name={String(hd.key)}   name expects a string, but hd.key is keyof T. */}
                   <input name={String(hd.key)} onChange={handleQuery}/>
                   <button data-key={hd.key} onClick={handleSortKey}><SortIconComponent<T> sortKeys={sortkeys} headerKey={hd.key}/></button>
                   </th>)
                }</tr>
            </thead>
            <tbody>
                {
                    data.length === 0
                        ? <tr><td colSpan={header.length}>No data found</td></tr>
                        :  isPending ? <tr><td colSpan={header.length}>{pendingAction==="filter" ? "Filtering..." : "sorting..."}</td></tr>  
                             : dataFiltered().map((dt) => ( 
                           <tr>{header.map(hd => <td>{dt[hd.key]}</td>)}</tr>
                        ))

                }
            </tbody>
        </table>
    </div>
  )
}

export default DataTableWithSingleSort