import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './tooltip.css'

const languages = ["js", 'java', 'python', 'dotnet']

const Tootltip = () => {
    const [drp1, setDrp1] = useState(false)
    const [drp2, setDrp2] = useState(false)

    const [position, setPosistion] = useState({
        top:0,
        left:0
    })


    const drpRef1 = useRef(null)
    const drpRef2 = useRef(null)
    const buttonRef = useRef(null)

    const handleDrp1 = (val) => {
        if(val === "drp1"){
            setDrp1(prev => !prev)
        }else{
            setDrp2(prev => !prev)
        }
        
    }

    useLayoutEffect(() => {
        if(!drp2 || !drpRef2.current || !buttonRef.current) return

        //   const observer = new ResizeObserver(() => {

        function calculate(){
             const rect = buttonRef.current.getBoundingClientRect()    //top and bottom is used to see where its present
             const dropDownHeight = drpRef2.current.scrollHeight;    //75px  
             const spaceBelow = window.innerHeight - rect.bottom;    //791-769 =>  22px

            // console.log(window.innerHeight,dropDownHeight, rect)

            // console.log(drpRef2.current.getBoundingClientRect())
            if( spaceBelow < dropDownHeight){
                setPosistion({top:-dropDownHeight, left:0})
            }else{
                setPosistion({ top: rect.height, left: 0 });
            }

        }

        calculate()
          
                
        // })

        window.addEventListener("resize", calculate)

        return () => window.removeEventListener("resize", calculate)



        // observer.observe(drpRef2.current)

        // return () => {
        //     observer.unobserve(drpRef2.current); 
        //     observer.disconnect()
        // }
   
    },[drp2])

    const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis reiciendis, odit quo officiis, vitae modi nostrum beatae veniam cupiditate repellendus aperiam, delectus recusandae fugiat officia! Soluta temporibus sit voluptates explicabo."
  return (
    <div className='tooltip-container'>
      
        <button onClick={() => handleDrp1("drp1")}>Drpdwn 1</button>
       
        <div ref={drpRef1} className='drp1-container drp'>
        {drp1 &&
            <ul className='ul-drp'>
            {languages.map((itm, ind)=> <li 
                 key={ind}
                 >
                 {itm}
            </li>
            )}
            </ul>
             
        }
         </div>
      

        <p>{content.repeat(20)}</p>
        
        <div style={{position: "relative"}}>
        <button ref={buttonRef}  onClick={() => handleDrp1("drp2")}>DrpDwn 2</button>
     
        {drp2 &&
           <div ref ={drpRef2} className='drp2-container drp' style={{top: position.top, left: position.left}}>
            <ul>
             {languages.map((itm, ind)=> <li key={ind}>
                 {itm}
            </li>)}  
            </ul> 
            </div>
        }
        </div>
        

        {/* <div className='test'>
            position of the div
        </div> */}
    </div>
  )
}

export default Tootltip