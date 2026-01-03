import React from 'react'
import './DataTable.css'
import { type VariantProps } from 'class-variance-authority'
import { tableCVA } from './DataTable.cva'


export type Column<T> = {
    key: keyof T,
    header:string,
    render?: (value: T[keyof T], row: T, rowIndex: number) => React.ReactNode
}

type Props<T> = {
    columns: Column<T>[]
    data : T[]
    testId : string,
    calculateRowSpan: (colValue: string | number) => number
} & VariantProps<typeof tableCVA>


const DataTable = <T,>({data, columns, testId='data-table', variant, stickyHeader, density, hoverable, calculateRowSpan}: Props<T>) => {  //js pa
  return (
    <div>
        <table data-testId={testId} className={tableCVA({variant, stickyHeader, density,hoverable})}>
            <thead>
                <tr>
                {
                   columns.map((c) => <th key={String(c.key)}>{c.header}</th>)
                }
                </tr>
            </thead>
            <tbody>
                {
                    data.length > 0 ? data.map((row, rowIndex) => {
                      return <tr key={rowIndex} >
                         {
                            columns.map(col =>{      //postId, id, name, 
                              const cellValue = row[col.key]
                              const key = col.key;
                             return <td>{col.render
                                ? col.render(cellValue, row, rowIndex)
                                : String(cellValue)
                                }</td>
                            }
                            )
                        }
                      </tr>
                    })
                    : <tr>
                        <td colSpan={columns.length}>No data found</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
  )
}

export default DataTable