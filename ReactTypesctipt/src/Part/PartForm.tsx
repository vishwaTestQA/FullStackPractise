import React, { useEffect, useRef, useState } from 'react'
import dataFromJson from './data.json'

// type Props = {
  
// }

const PartForm = () => {
    const [data, setData] = useState(dataFromJson)
    const [started, setStarted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [canStart, setCanStart] = useState(false)

    const startTheActivity = (id) => {
       const activity = data.activities.find(itms => itms.id === id)
       if(!activity?.canStart){
        setError("cannot start form")
       }
       const res =  canStartTheActivity(activity?.startDateTime, activity?.endDateTime)
       if(!res){
         setError("time lapsed");
         setStarted(false);
         return
       }
       setStarted(true); 
    }

    const canStartTheActivity = (start, end) => {
       if(Date.now() <= new Date(end).getTime()){
         return true
       }
    }

  return (
    <div>
      {
        data.activities.map(act => {
            return <div>
                <span>{act.title}</span>
                <span>{act.description}</span>
                {act.canStart ? <button onClick={() => startTheActivity(act.id)}>start</button> : null}
            </div>
        })
      }

      {started ? <p>started the activity</p> : null}
      {error? error: null}
    </div>
  )
}

export default PartForm