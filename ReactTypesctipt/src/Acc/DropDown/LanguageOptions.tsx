import React, { useRef, useState } from 'react'
import DropDown from './DropDown'
import DropDownReusable from './DropDownResuable'

const LanguageOptions = () => {
    const [selected, setSelected] = useState<number>(-1)
    const [open1, setOpen1] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const buttonRef1 = useRef<HTMLButtonElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const items = [
        {id:1, label: "JAVASCRIPT", value:"javascript"},
        {id:2, label: "JAVA", value:"java"},
        {id:3, label: "DOTNET", value:".net"},
        {id:4, label: "PYTHON", value:"python"},
    ]


   
    const str = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui eveniet similique ab quaerat? Iste eius sint pariatur animi temporibus esse. Aut eius quo consequuntur a dolores quod corrupti fugiat minima!"
  return (
    <div className='lang'>
    {/* <DropDown items={items} setSelected={setSelected}></DropDown> */}
    { <button ref={buttonRef1} className="btn-langopts" onClick={() => setOpen1(prev => !prev)}>Click dropdown</button>}
    {open1 && <DropDownReusable items={items} render={(item) => item.value} setSelected={setSelected} getKey={(item) => item.id} isOpen={open1} setOpen={setOpen1} anchorRef={buttonRef1} className={(open) => open ? "dropdown open" : "dropdown"}/>}
    <p>{str.repeat(20)}</p>
    
    <div className='drp-container'>
    { <button ref={buttonRef} className="btn-langopts" onClick={() => setOpen(prev => !prev)}>Click dropdown</button>}
    {open && <DropDownReusable items={items} render={(item) => item.value} setSelected={setSelected} getKey={(item) => item.id} isOpen={open} setOpen={setOpen} anchorRef={buttonRef} className={(open) => open ? "dropdown open" : "dropdown"}/>}
    </div>
    {selected > -1 ? <p>{items[selected].value}</p> : null}
    <div>
        <span>CLS content</span>
    </div>

    </div>
  )
}

export default LanguageOptions