import React, { useState } from 'react'
import './style.css'

type Props = {
    items:{
        id: number,
        label: string,
        value:string
    }[],

    setSelected: () => void
}

const DropDown = ({items, setSelected}: Props) => {

    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleClick = (e:React.MouseEvent<HTMLUListElement> | React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => {
        const target = e.target as HTMLElement
        const li = target.closest('li'); //when user clicks on span this will helps in getting the li closest to the span tag, usally even delages updwards
        if(!li) return
        
        const value = li.dataset.value;
        const label = li.textContent;
        const index = Number(li.dataset.index);

        setHighlightedIndex(index)
        setSelected(index);
      console.log(e.target)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
       switch(e.key){
        case "ArrowDown": 
          e.preventDefault()
          setHighlightedIndex(prev => prev < items.length-1 ? prev + 1 : 0)
          break

          case "ArrowUp":
            e.preventDefault()
            setHighlightedIndex(prev => prev > 0 ? prev-1 : items.length-1)
            break
            
            case "Enter":
               setSelected(highlightedIndex)
               break
            default:
               console.log("down")
               break;   
       }
    }

  return (
    <div >
        <ul onClick={handleClick}  
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="listbox">
           {items.map((itm, i) => 
             <li key={itm.label} 
                 data-index={i}
                 data-value={itm.value}
                 className={highlightedIndex ===i ? 'highlighted li-lang': 'li-lang'}
                 role = 'option'
                 tabIndex={-1}
                 aria-selected={highlightedIndex === i}
                 >
              <span>{
             itm.value
           }</span>
           </li>
        )}
        </ul>
    </div>
  )
}

export default DropDown