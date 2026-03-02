import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './progressbar.css'

type Props = {
  language:string,
  percent: number,
  color: string
}

const Progressbar = ({language, percent, color}: Props) => {
    const divRef = useRef(null)
    const childRef = useRef(null)

    // const [childWidth, setChildWidth] = useState(0)
    // useLayoutEffect(() => {
    //    if(divRef.current && childRef.current){
    //     const totalWidth = divRef.current.style.width;
    //     const totalChildPercent = parseInt(totalWidth) * (percent/100);
    //     console.log("totalChildPercent", totalChildPercent)
    //     childRef.current.style.width = `${totalChildPercent}px`
    //    }
    // },[childRef, divRef, percent])

    const [animatedProgress, setAnimatedProgress] = useState(0)
    useEffect(() => {
         const timer =  setTimeout(() => setAnimatedProgress(percent),0)
         return () => clearTimeout(timer)
    },[percent])


  return (
    <>
    <div>{language}:</div>
    <div ref={divRef} style={{width: "700px",height:"40px", border:"0.5px solid"}}  className='outer-progress'>
        <div ref={childRef} 
             className='indeterminate-progress'
            //  style={{width:`${percent}%`, background:color, height:"100%"}}>
            //  style={{transform:`translate(${percent-100}%)`, background:color, height:"100%"}}>
             style={{transform:`translateX(${animatedProgress-100}%)`, background:color, height:"100%"}}
            //  style={{transform:`scaleX(${animatedProgress/100})`, background:color, height:"100%"}}
             role='progressbar'
             aria-valuenow={percent}
             aria-valuemax={100}
             aria-valuemin={0}
             >
            <div className='progressbar-text'>{animatedProgress}%</div>
        </div>
    </div>
    </>
  )
}

export default Progressbar