import React from 'react'
import img from "./cosmos.jpg"

type Props = {}

const ImagesTest = () => {
    
  return (
    <div style={{width:"300px", maxHeight:"500px",border:"solid", overflow:"hidden"}}>
        <img src={img} alt="random" width="700" height="700" 
             style={{width:"100%", height:"auto",objectFit:'cover', display:"block"}}
            //    srcSet="image-400.jpg 400w, image-800.jpg 800w"
            // srcSet={`${img} 400w, ${img} 800w, ${img} 1200w`}
            //    sizes="(max-width: 768px) 100vw, 33vw"
             />
    </div>
  )
}

export default ImagesTest