import React, { useEffect, useRef, useState } from 'react'

type Props<T> = {
    items: T[],
    renderItem: (item: T) => React.ReactNode,
    onSelect: (v: string) => void,
    selectedItem: string,
    keyNavigation?: boolean
}

const DropDownInt = <T,>({items, renderItem, onSelect, selectedItem, keyNavigation=true}: Props<T>) => {

  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [openList, setOpenList] = useState<boolean>(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const handleList = () => {
     setOpenList(prev => !prev)
  }

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
     if(!keyNavigation) return
     if(e.key === "Enter" || e.key === "ArrowDown"){
       e.preventDefault();
       handleList()
     }
  }

  useEffect(() => {
     if(!keyNavigation) return
    if(openList){
      listRef.current?.focus()
      setHighlightedIndex(0)
    } 
  },[openList])


  const handleKeyDown = (e: React.KeyboardEventHandler<HTMLElement>) => {
      if(!keyNavigation) return
      if(!openList) return
      
      if(e.key === 'ArrowDown'){
        console.log('ArrowDown')
        setHighlightedIndex(prev => (prev + 1) % items.length)
      }

        if(e.key === 'ArrowUp'){
        setHighlightedIndex(prev => (prev - 1 + items.length) % items.length)
      }

      if(e.key === 'Enter'){
        onSelect(items[highlightedIndex]['label'])
        setOpenList(false)
        triggerRef.current?.focus()
      }
    }

    const handleSelect = (e: React.ChangeEvent<HTMLButtonElement>) => {
      console.log(e.target.tagName , e.target.dataset.index)
       if(e.target.tagName === 'LI' || e.target.tagName === "A") {
          onSelect(items[e.target.dataset.index]?.label)
          setOpenList(false)
          triggerRef.current?.focus()
       }
    }

  return (
    <div>
      {/*  */}
  <div tabIndex={0} ref={triggerRef} className='dropdown' onClick={handleList} onKeyDown={handleTriggerKeyDown}>
      {selectedItem || 'select'}
  </div>
  {openList &&
    <div style={{width:"200px", height:"100px"}}> {/* if we give display:flex here then full dropdown box move */}
       <ul ref={listRef} tabIndex={0} role='listbox' style={{listStyleType:'none', boxShadow:"2px 3px 4px rgba(0,0,0,0.5)"}} onKeyDown={handleKeyDown} onClick={handleSelect}>
          {items.length > 0 && items.map((itm, i) => (
            <li key={(i)} data-index={i} style={highlightedIndex === i ? {backgroundColor: 'gray'}:{}}>
                <a data-index={i} href='#'>{renderItem(itm)}</a>
            </li>
          ))}
          </ul>
     </div>
     }
    </div>
  )
}

export default DropDownInt