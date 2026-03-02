import React from 'react'
import "./Table.css"
import clsx from 'clsx'

type Headers<T> = {
    key: keyof T,
    label:string,
    render?: (value:keyof T , row:T) => React.ReactNode
}
type Props<T> = {
   data: T[],
   headers: Headers<T>[],
   className: string
}

const TableReusable = <T,>({headers, data, className}: Props<T>) => {
  return (
    <div>
        <table className={clsx("default", className)}>
            <thead>
            <tr>
                {headers.map((hd,i) =>
                <th key={i}>
                    {hd.label}
                </th>
            )}
            </tr>
            </thead>
            <tbody>
                {
                  data.map((row, i) =>
                  <tr key={i}>
                    {
                    // Object.keys(row).map(k => <td>{row[k]}</td>) 
                    headers.map((hd,i) => <td key={i}>{
                         hd.render ?
                         hd.render(row[hd.key], row)
                         : String(row[hd.key])
                        }</td>) 
                    }
                   
                </tr>
                )
                }
             
            </tbody>
        </table>
    </div>
  )
}

export default TableReusable


//Object.keys(row).map(k => <td>{row[k]}</td>)
    // TypeScript error here:

    // k is string
    // row[k] is unsafe
    // Because k is not guaranteed to be keyof T