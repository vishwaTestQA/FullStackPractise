// import Button from './ui/ButtonStyledComponent/Button'

import { Button } from "./ui/ButtonCVA/Button"


const UIComponentsEnterprise = () => {
  return (
    <div>
        {/* <Button variant='primary' size='md' disabled={true} loading={false}>Submit</Button> */}

        {/* cva */}
        <Button intent={'primary'}>primary</Button>
        <Button intent={'secondary'}>secondary</Button>
        <Button intent={'outline'} size={'small'}>danger</Button>
        <Button intent={'outline'} size={'small'}>danger</Button>
    </div>
  )
}

export default UIComponentsEnterprise