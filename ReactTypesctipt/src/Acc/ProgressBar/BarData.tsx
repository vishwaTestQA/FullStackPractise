import React from 'react'
import Progressbar from './Progressbar'


const languages = [
    {key:"java", percent: 60, color:"red"},
    {key:"javasctip", percent: 80, color:"blue"},
    {key:"dotnet", percent: 50, color:"yellow"},
    {key:"python", percent: 70, color:"orange"},
]

const BarData = () => {
  return (
    <div>
        {
         languages.map(obj => <Progressbar key={obj.key} language={obj.key} percent={obj.percent} color={obj.color}/>)
        }
        
    </div>
  )
}

export default BarData