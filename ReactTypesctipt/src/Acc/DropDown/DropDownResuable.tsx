import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './style.css'

type Props<T> = {
    items: T[],
    render: (item:T) => React.ReactNode
    setSelected: (item: T) => void,
    // getKey: (item: T, index:number) => React.Key
    getKey: (item: T) => React.Key,
    isOpen: boolean,
    className: (open: boolean) => string,
    setOpen:(v:boolean) => void,
    anchorRef: React.RefObject<HTMLButtonElement | null>
}

const DropDownReusable = <T,>({items, render, setSelected, anchorRef,  getKey, isOpen,setOpen, className, ...props}: Props<T>) => {

    const dropdownRef = useRef(null)
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [position, setPosition] = useState({top:0, left:0})

    useLayoutEffect(() => {
        console.log("loay")
        if(!isOpen || !anchorRef.current || !dropdownRef.current) return 
  
        const buttonRect = anchorRef.current.getBoundingClientRect();
        const dropdownHeight = dropdownRef.current?.offsetHeight;

        const spaceBelow = window.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;

        console.log(spaceBelow, spaceAbove)

        let top = buttonRect.bottom;    //usually we place this below the button
        const left = buttonRect.left;

        if(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight){
            top = buttonRect.top - dropdownHeight;
        }


        setPosition({top, left})

        // const observer = ResizeObserver(() => {
        //     const 
        // })

    },[])

      // Close on outside click
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if(isOpen && dropdownRef.current){
        const firstItem = dropdownRef.current?.querySelector(
    //    '[role="menuitem"]'
        '[role=option]'
        ) as HTMLElement | null;
        console.log(firstItem)
        firstItem?.focus()
      }

    document.addEventListener("mousedown", handleClose);
    return () => document.removeEventListener("mousedown", handleClose);
  }, [isOpen]);


    const handleClick = (e:React.MouseEvent<HTMLUListElement> | React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => {
        const target = e.target as HTMLElement
        const li = target.closest('li'); //when user clicks on span this will helps in getting the li closest to the span tag, usally even delages updwards
        if(!li) return
        
        // const value = li.dataset.value;
        // const label = li.textContent;
        const index = Number(li.dataset.index);
        setHighlightedIndex(index)
        setSelected(items[index]);
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
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : items.length-1)
            break
            
            case "Enter":
               setSelected(items[highlightedIndex])
               break
            default:
               console.log("down")
               break;   
       }
    }

  return (
    <div>
        <ul onClick={handleClick}  
          {...props}
          className={className(isOpen)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="listbox"
          style={{position:"absolute", top:position.top, left:position.left, zIndex:102,   background: "white",
                    border: "1px solid #ddd",
                    padding: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",}}
          ref={dropdownRef}
          >
        
           {items.map((itm, i) => 
             <li 
             /* key={render(itm)}   - wrong becz render(itm) returns react node but key accepts a value*/
                 key={getKey(itm)} 
                 data-index={i}
                 data-value={render(itm)}
                 className={highlightedIndex ===i ? 'highlighted li-lang': 'li-lang'}
                 role = 'option'
                 tabIndex={-1}
                 aria-selected={highlightedIndex === i}
                 >
              <span>{
             render(itm)
           }</span>
           </li>
        )}
        </ul>
    </div>
  )
}

export default DropDownReusable