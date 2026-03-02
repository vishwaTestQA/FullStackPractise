import React, { useState } from 'react'
import "./FlexBox.css"
import { Repeat } from '@mui/icons-material'
import { Tooltip } from '@mui/material';

const FlexBox = () => {

  const [hovered, setHovered] = useState<number>(-1);

  const p = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste officiis, nobis, voluptatum dicta totam, ut perspiciatis accusantium repellendus porro inventore magnam. Sequi quasi magni aut nisi aliquam enim dolorum nemo."
  const cardsData = [
  {id:1,title:"Heading", desc:p.repeat(20)},
  {id:2, title:"Heading2", desc:"Description of the image ......"},
  {id:3, title:"Heading3", desc:"Description of the image ......"}
]

console.log(hovered);

  return (
    <div className='container'>
       { cardsData.map(dt => <div className="cards">
       <div>
         <h3>{dt.title}</h3>
         <div>
            <img src="#" alt="image" width="300px" height="300px"></img>
         </div>
         <div className='text-wrapper' onMouseEnter={() => setHovered(dt.id)}>
            <p>{dt.desc}</p>
            {hovered === dt.id &&
               (<div className='tooltip' 
                //    onMouseEnter={() => setHovered(dt.id)}  
                   onMouseLeave={() => setHovered(-1)}>
                <span >{dt.desc}</span></div>) }
                {/* <div className="tooltip">
                {dt.desc}
                </div> */}
             {/* <Tooltip title={dt.desc} arrow> */}
            {/* </Tooltip> */}
         </div>
       </div>
    </div>
)}
    </div>
  )
}

export default FlexBox