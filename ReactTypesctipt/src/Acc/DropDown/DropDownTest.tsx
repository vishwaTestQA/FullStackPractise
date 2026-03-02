import React, { useEffect, useRef, useState } from 'react'

    const items = [
        {id:1, label: "JAVASCRIPT", value:"javascript"},
        {id:2, label: "JAVA", value:"java"},
        {id:3, label: "DOTNET", value:".net"},
        {id:4, label: "PYTHON", value:"python"},
    ]

const DropDownTest = () => {
    
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
    const [selected, setSelected] = useState<number>(-1)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const ulRef = useRef(null)
    const btnRef = useRef(null)

    const handleOpen = () => {
        setIsOpen(prev => !prev)
    }

    const handleClick = (e) => {
       const target = e.target as HTMLElement
       const li = target.closest('li')
       const index = li?.dataset.index;
       setHighlightedIndex(index)
       setSelected(items[index].label);
    }

    const handleKeyDown = (e) => {
        switch(e.key){
            case "ArrowDown":
                e.preventDefault()
                setHighlightedIndex(prev => prev < items.length-1 ? prev+1 : 0)
                break;
            case "ArrowUp":
                e.preventDefault()
                setHighlightedIndex(prev => prev === 0 ? items.length-1 : prev-1)
                break;    

            case "Enter":
                e.preventDefault()
                setSelected(items[highlightedIndex].label)
                break;
            default:
                return    
        }
    }

    useEffect(() => {
       if(!isOpen) return

       const handleClose = (e:React.MouseEvent) => {
         if(ulRef.current && !ulRef.current.contains(e.target as Node) && !btnRef.current.contains(e.target as Node)){
            setIsOpen(false)
         }
       }
     
       if(isOpen && ulRef.current){
       const firstItem = ulRef?.current?.querySelector('[role=option]') as HTMLLIElement
       firstItem.focus();
       console.log(firstItem)
       }

       window.addEventListener('mousedown', handleClose)

       return () => {
        window.removeEventListener('mousedown', handleClose)
       }

    },[isOpen])

  return (
    <div ref={btnRef}>
     <button onClick={handleOpen} style={{display:'block', height:"50px"}}>click</button>   
     {isOpen && <ul 
     ref={ulRef}
     onClick={handleClick}
    tabIndex={0}
    onKeyDown={handleKeyDown}
    role='listbox'
    >
      {
        items.map((itm,indx) => {
            return <li key={indx}
                      data-index = {indx}
                      role='option'
                    //   className={highlightedIndex === i ? "l"}
                    tabIndex={-1}
                    style={highlightedIndex === indx ? {backgroundColor:'grey'} : {}}
                      >
                {itm.value}
            </li>
        })
      }
    </ul>
  } 
    {selected!==-1 && <p>{selected}</p>}
    </div>
  )
}

export default DropDownTest