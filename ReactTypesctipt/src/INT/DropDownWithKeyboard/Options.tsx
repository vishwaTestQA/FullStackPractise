import React, { useEffect, useState } from 'react'
import DropDownInt from './DropDownInt'

const options = [
    {id:1, label: "JS"},
    {id:2, label: "JAVA"},
    {id:3, label: "PYTHON"},
    {id:4, label: "CSharp"},
]

const Options = () => {
  const [openList, setOpenList] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string>('')


  const onSelect = (val: string) => {
      setSelectedItem(val)
  }

  return (
    <div>
       {/* <div tabIndex={0} style={{width:"100px", height:"20px",border:"1px solid"}} onClick={handleList} >{selectedItem}</div> */}
       <DropDownInt items={options} renderItem={(item) => item.label} selectedItem={selectedItem} onSelect= {onSelect} keyNavigation={false}/>
    </div>
  )
}

export default Options