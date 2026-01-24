import './App.css'
import FormSelectLocalStorage from './DropDown/FormSelectLocalStorage'
import Header from './DropDown/Header'
import ScrollComponent from './DropDown/ScrollComponent'
import SelectDD from './DropDown/SelectDD'
import { SelectWithoutSelect } from './DropDown/SelectWithoutSelect'
// import Image from './Forms/Components/EnterpriseComp/ui/dragon/image'
import UIComponentsEnterprise from './Forms/Components/EnterpriseComp/UIComponentsEnterprise'
import FormsMainPage from './Forms/FormsMainPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Modal from './INT/Modal/Modal'
import ParentContainer from './INT/Modal/ParentContainer'
import DropDownInt from './INT/DropDownWithKeyboard/DropDownInt'
// import Options from './INT/DropDownWithKeyboard/Options'
// import OptionsMultiple from './INT/MultipleOptionSelection/OptionsMultiple'
// import DataConsumer from './INT/TableWithFilter/DataConsumer'
import { lazy, Suspense, useEffect } from 'react'
import NetworkProvider, { useNetwork } from './INT/context/NetworkContext'
import { attachNetworkInterceptor } from './INT/Axios/networkInterceptors'
import NetworkBanner from './INT/Network/NetworkBanner'
import ApiErrorBanner from './INT/Network/ApiErrorBanner'
import CSSStyles from './INT/cssStyling/CSSStyles'

const DataConsumer = lazy(() => import ("./INT/TableWithFilter/DataConsumer"))
const Options = lazy(() => import("./INT/DropDownWithKeyboard/Options"))
const OptionsMultiple = lazy(() => import("./INT/MultipleOptionSelection/OptionsMultiple"))

const NetworkBootstrap = () => {
   const {markOnline, markOffline, handleApiError} = useNetwork();
  useEffect(() => {
      attachNetworkInterceptor(handleApiError)
   },[])

   return null;
}

function App() { 

   return <div>
    <FormsMainPage/>
     {/* <p>ui</p> */}
     {/* <UIComponentsEnterprise/> */}

     {/* <Header/>
     <SelectDD/>
     <FormSelectLocalStorage/>
     <SelectWithoutSelect/>
     <ScrollComponent/> */}

      <BrowserRouter>
        <NetworkProvider>
         <NetworkBootstrap/>
         <NetworkBanner/>
         <ApiErrorBanner/>
         <Suspense fallback="Loading...">
    
         <Routes>
            <Route path='modal' element={<ParentContainer/>}></Route>
            <Route path='dropdown' element={<Options/>}></Route>
            <Route path='multiDropDown' element={<OptionsMultiple/>}></Route>
            <Route path='table' element={<DataConsumer/>}></Route>
            <Route path="css" element={<CSSStyles/>}/>
         </Routes>
        
      </Suspense>
       </NetworkProvider>
      </BrowserRouter>
     {/* <Image/> */}
   </div>
}

export default App
