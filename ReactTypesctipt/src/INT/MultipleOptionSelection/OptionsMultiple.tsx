import React, { useEffect, useState } from 'react'
import MultipleDropDown from './MultipleDropDown'

const options = [
    {id:1, label: "JS"},
    {id:2, label: "JAVA"},
    {id:3, label: "PYTHON"},
    {id:4, label: "CSharp"},
]

type Options = {
  id: number,
  label: string
}

const OptionsMultiple = () => {
  const [openList, setOpenList] = useState(false)
  const [selectedItem, setSelectedItem] = useState<String[]>([])


  const onSelect = (opt: Options) => {
      setSelectedItem(prev => {
        if(prev.includes(opt.label)){
          return prev.filter(v => v !== opt.label)
        }else{
          return [...prev, opt.label]
        }
      })
      console.log(selectedItem)
  }

  return (
    <div>
       {/* <div tabIndex={0} style={{width:"100px", height:"20px",border:"1px solid"}} onClick={handleList} >{selectedItem}</div> */}
       <MultipleDropDown items={options} renderItem={(item) => item.label} selectedItem={selectedItem} onSelect= {onSelect} keyNavigation={false}/>
    </div>
  )
}

export default OptionsMultiple