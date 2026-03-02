import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

type Props = {
   children: React.ReactNode,
   onClose: () => void,
   isOpen: boolean
}

const ModalReusable = ({children, onClose,isOpen}: Props) => {
    // const handleClick = (e: React.KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => {
    //     setOpen(false)
    // }

    useEffect(() => {
      if(!isOpen) return   //most important
      const handleKey = (e: React.KeyboardEvent<HTMLElement>) => e.key === "Escape" && onClose()
      window.addEventListener("keydown", handleKey)
      document.body.style.overflow = 'hidden'
    //   document.querySelector('body').style.overflow = 'hidden';
    //   document.querySelector('#root').style.filter = 'blur(10px)';

      return () => {
      window.removeEventListener("keydown", handleKey);
        //    document.querySelector('body').style.overflow = 'auto';
        document.body.style.overflow = 'auto'
        //    document.querySelector('#root').style.filter = 'none';
      }
    },[isOpen, onClose])

    if (!isOpen) return null;

   return (
    ReactDOM.createPortal(   
    <div
    onClick={() => onClose()}
    role="dialog"
    aria-modal="true"
    style={{ position:'fixed',inset:0, display:'grid',placeContent:'center', zIndex:999, border:"solid", backdropFilter:"blur(10px)"}}>
      <div onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: 20,
          borderRadius: 8,
        }}
        > 
       <button onClick={() => onClose()}>X</button> 
       {children}
      </div> 
    </div>,
    document.getElementById('modal-root') as HTMLElement
    )
)
}

export default ModalReusable