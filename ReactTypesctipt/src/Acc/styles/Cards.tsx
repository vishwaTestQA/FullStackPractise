import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

type Props = {
  card: {id:number,
  title:string,
  desc:string}
}

const Cards = ({card}: Props) => {
    const textRef = useRef(null)
    const [hovered, setHovered] = useState<boolean>(false);
    const [isTruncated, setIsTruncated] = useState<boolean>(false);

//  const checkTruncation = useCallback(() => {
//     const el = textRef.current;
//     if (el) {
//         const isOverflowing = el.scrollHeight > el.clientHeight;
//         setIsTruncated(prev =>
//             prev !== isOverflowing ? isOverflowing : prev
//         );
//     }
// }, []);

//     useLayoutEffect(() => {
//        checkTruncation()
//         window.addEventListener('resize', checkTruncation)
//         // const observer = new ResizeObserver(() => {
//         //    checkTruncation()
//         // })

//         // observer.observe(el)

//         return () => {
//             window.removeEventListener('resize', checkTruncation)
//         }
// }, [card.text, checkTruncation]);


    useLayoutEffect(() => {
        const el = textRef.current
        if(!el) return 
        const observer = new ResizeObserver(() => {
           const overflow = el.scrollHeight > el.clientHeight;
           const {height} = el.getBoundingClientRect();
           console.log("height",height)
           if(overflow){
            setIsTruncated(overflow)
           }
        })

        observer.observe(el)
    
        return () => observer.disconnect(); 
        
},[]);

  return (
      <div className="cards">
       <div>
         <h3>{card.title}</h3>

         <div>
            <img src="#" alt="image" width="300px" height="300px"></img>
         </div>

         <div className='text-wrapper-tltp' 
                  onMouseEnter={() => isTruncated &&  setHovered(true)}  
                  onMouseLeave={() => isTruncated &&  setHovered(false)}>
            <p ref={textRef}>{card.desc}</p>
            {hovered &&
               <div className='tooltip-tltp' >
                <span >{card.desc}</span>
               </div>}
         </div>
       </div>
    </div>
  )
}

export default Cards