import { grey } from '@mui/material/colors'
import React, { useState } from 'react'
import img from './react.svg'

type Props = {
    list: {label:string, value:string}[]
}

export const SelectWithoutSelect = () => {
     const options=[
        { label: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis in dolore, at deleniti sed, quisquam earum sint vero eos, unde blanditiis dolores eveniet. Placeat eaque ex, quia id quasi unde. ', value: 'admin' },
        { label: 'blanditiis dolores eveniet. Placeat eaque ex, quia id quasi unde.', value: 'user' },
        { label: 'Manager manager', value: 'manager' }
      ]

  return (
     <DropDown list={options}/>
  )
}

const DropDown = (options: Props) => {
     const {list} = options;
     const [open, setOpen] = useState(false)
     const [dropDownValues, setDropDownValues] = useState<string[]>([])

     const handleClick = (e: React.MouseEventHandler<HTMLUListElement> | React.ChangeEvent<HTMLInputElement>) => {
        //  e.target as HTMLLIElement
        console.log(e.target.dataset.value)
        console.log(e.target.tagName)

        if(e.target.tagName === 'INPUT'){
            setDropDownValues(prev => 
                 prev.includes(e.target.dataset.value)
                 ? prev.filter(v => v !== e.target.dataset.value) 
                 : [...prev, e.target.dataset.value])
        }
        else if (e.target.tagName === 'LI'){
            console.log(e.target.dataset.testid)
           setDropDownValues(prev=> [...prev, e.target.dataset.value])
        }
     }

     return(
     <div>
        <div>
            <button onClick={() => setOpen(prev => !prev)}>Dropdown
            </button>
            {open && 
               <ul 
                style={{listStyleType: 'square', textAlign:'left', listStyleImage: `url(${img})`,
                width:'200px', backgroundColor:"gray", listStylePosition: "outside"}}
                onClick={handleClick}
                >
                {
                    list.map((opt, i) => (
                      <li 
                      data-value={opt.label}
                      data-testid = {i}
                      style={{listStyleType:'square', backgroundColor:'white', width:'50%', margin:'auto',
                        //   lineHeight: 1.5, maxHeight:'3rem',
                          display: '-webkit-box', WebkitBoxOrient:'vertical', WebkitLineClamp: 3, overflow: 'hidden'
                      }} 
                      key={opt.value}>
                        {opt.label}
                        <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer'
              }}/>
                      <input type='checkbox'
                          checked={dropDownValues.includes(opt.label)}
                          data-value = {opt.label}
                          onChange={handleClick}
                         />
                     
                      </li>
                    ))
                }
            </ul>}
            <p></p>
            <div>{JSON.stringify(dropDownValues)}</div>
        </div>
    </div>
    )
}

