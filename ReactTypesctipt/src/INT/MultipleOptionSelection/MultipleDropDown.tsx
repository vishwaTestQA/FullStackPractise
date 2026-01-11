import React, { useEffect, useRef, useState } from 'react'
import './multi.css'

type Props<T, V extends string | number> = {
    items: T[],
    renderItem: (item: T) => React.ReactNode,
    onSelect: (v: T) => void,
    selectedItem: V[],
    keyNavigation: boolean
}

const MultipleDropDown = <T, V extends string | number>({items, onSelect, renderItem, selectedItem, keyNavigation=true}: Props<T, V>) => {
    const [openList, setOpenList] = useState(false)
    const triggerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLUListElement>(null)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)

    const handleDropDownOpen = () => {
       setOpenList(prev => !prev)
       dropdownRef.current?.focus()
    }

  const handleSelect = (e:  React.MouseEvent<HTMLUListElement>) => {
      onSelect(items[e.target.dataset.index])
  }

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if(e.key === "Enter" || e.key===" "){
         console.log("Enter")
         e.preventDefault();
         setOpenList(prev => !prev)
         setHighlightedIndex(-1)
      }
  }

  useEffect(() => {
    if(openList){
 dropdownRef.current?.focus()
    }
  },[openList])

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if(e.key === "ArrowDown"){
        e.preventDefault()
        console.log("arrowdown")
      setHighlightedIndex(ind => (ind+1) % items.length)
    }
     if(e.key === "ArrowUp"){
        e.preventDefault()
    //     console.log("arrowup")
    //     setHighlightedIndex(ind => {
    //     if(ind>0){
    //       return (ind-1) % items.length
    //     }else{
    //         return items.length-1
    //     }
    //   })
       setHighlightedIndex(ind => (ind-1+items.length) % items.length)
    }

    if(e.key === "Escape"){
        setHighlightedIndex(-1)
        setOpenList(false)
        triggerRef.current?.focus()
    }

    if(e.key === "Enter"){
        onSelect(items[highlightedIndex])
     }
  }
  
  return (
    <div >
        <label htmlFor='drp'>dropdown</label>
        <div tabIndex={0} className='menu-container' id ='drp'
             ref={triggerRef}
             onClick={handleDropDownOpen}
             onKeyDown={handleTriggerKeyDown}
             aria-expanded={openList}
           >{selectedItem.length === 0 ? "select options ": selectedItem.map(v => <span>{v}</span>)} </div>
       {openList &&
       <ul onClick={handleSelect} tabIndex={0} onKeyDown={handleListKeyDown} ref={dropdownRef}>
        {
            items.map((itm, i) => <li
                   key={i} 
                   data-index={i}
                   style={highlightedIndex === i ? {backgroundColor:"gray"}: {}} 
                   >{renderItem(itm)}</li>)
        }
       </ul>
       }
    </div>
  )
}

export default MultipleDropDown