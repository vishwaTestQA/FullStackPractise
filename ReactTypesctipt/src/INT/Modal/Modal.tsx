import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

type Props = {
    children: React.ReactNode,
    onClose: () => void,
    isOpen: boolean
}

const Modal = ({children, isOpen, onClose}: Props) => {
  useEffect(() =>{
    if(!isOpen) return

    const handleKey = (e: React.KeyboardEvent<HTMLElement>) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", handleKey)
  })
  //backgroundColor:'white'
  return (
     ReactDOM.createPortal(
         <div className='backdrop' onClick={onClose} 
                    style={{position: 'fixed', inset:0, zIndex:999, border:"solid",display:"grid", placeContent:"center"}}>

            <button onClick={onClose}>X</button>

            <div className="modal" onClick={e => e.stopPropagation()} 
                   style={{width:"300px", height:"300px",boxShadow:"2px 4px 5px", overflow:"hidden"}}>
              {children}
            </div>
         </div>,
         document.getElementById("modal-root") as HTMLElement
     )
  )
}

export default Modal