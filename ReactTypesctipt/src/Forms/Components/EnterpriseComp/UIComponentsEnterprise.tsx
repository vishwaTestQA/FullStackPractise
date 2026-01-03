// import Button from './ui/ButtonStyledComponent/Button'

import { Button } from "./ui/ButtonCVA/Button"
import DataFetch from "./ui/DataModel/DataFetch"
import DataModel from "./ui/DataModel/DataTable"
import Input from "./ui/InputCVA/Input"


const UIComponentsEnterprise = () => {
  return (
    <div>
        {/* <Button variant='primary' size='md' disabled={true} loading={false}>Submit</Button> */}

        {/* cva */}
        {/* <Button intent={'primary'}>primary</Button>
        <Button intent={'secondary'}>secondary</Button>
        <Button intent={'outline'} size={'small'}>danger</Button>
        <Button intent={'outline'} size={'small'}>danger</Button> */}

        <Input label="some" size='md' variant='default'/>
        <Input label="some" size='md' variant='default' error='Error'/>


<DataFetch />
        
    </div>
  )
}

export default UIComponentsEnterprise