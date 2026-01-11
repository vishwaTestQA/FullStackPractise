import { useEffect, useState } from 'react'
import Modal from './Modal'
import ChildInsideModal from './ChildInsideModal'


type Props = {

}

const ParentContainer = () => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(()=>{
    
  },[])

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div style={
         {width:"100%", 
          height: "100%",
        }}>Body

        <button onClick={() => setIsOpen(prev => !prev)}>open modal</button>
        {
          isOpen && <Modal isOpen={isOpen} onClose={handleClose}>{<ChildInsideModal/>}</Modal>
        }
        </div>
  )
}

export default ParentContainer