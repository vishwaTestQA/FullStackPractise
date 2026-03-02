import React, { useState } from 'react'
import ModalReusable from './ModalReusable'
import ChildModal from './ChildModal'

const ParentModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(true)
    }

    const handleClose = () =>{
        setIsOpen(false)
    }

    const pVar = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eum tempore possimus temporibus aut libero. Dolor consequatur unde quae nemo molestiae facilis error reprehenderit officia. Vero necessitatibus nemo provident laudantium!"
  return (
    <div>
        <button onClick={handleClick}>Clik to open modal</button>
    {isOpen ? 
    <ModalReusable onClose={handleClose} isOpen={isOpen}>
        {<ChildModal/>}
    </ModalReusable>
    : null
}
    <p>{pVar.repeat(20)}</p>
    </div>
  )
}

export default ParentModal