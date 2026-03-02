import React, { useState } from 'react'
import "./FlexBox.css"
import Cards from './Cards';


const Tooltip = () => {
  const p = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste officiis, nobis, voluptatum dicta totam, ut perspiciatis accusantium repellendus porro inventore magnam. Sequi quasi magni aut nisi aliquam enim dolorum nemo."
  const cardsData = [
  {id:1,title:"Heading", desc:p.repeat(1)},
  {id:2, title:"Heading2", desc:"Description of the image ......"},
  {id:3, title:"Heading3", desc:"Description of the image ......"}
]

  return (
    <div className='container'>
       { cardsData.map(dt =>
          <Cards key={dt.id} card={dt}/>
        )}
    </div>
  )
}

export default Tooltip