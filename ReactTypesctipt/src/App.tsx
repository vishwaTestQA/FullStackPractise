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
import PartForm from './Part/PartForm'
import LanguageOptions from './Acc/DropDown/LanguageOptions'
import TableData from './Acc/Table/TableData'
import Paginate from './Acc/Pagination/Paginate'
import FlexBox from './Acc/styles/FlexBox'
import Tooltip from './Acc/styles/Tooltip'
import Gridbox from './Acc/GridBox/Gridbox'
import ParentModal from './Acc/Modal/ParentModal'
import ApiCallWithHook from './Acc/Debounce/ApiCallWithHook'
import PaymentForm from './Acc/Payment/PaymentForm'
import ImagesTest from './Acc/Image/ImagesTest'
import VirtuvalizedList from './Acc/Virtuvalization/VirtuvalizedList'
import OTPResuable from './Acc/OTP/OTPResuable'
import OTPContainer from './Acc/OTP/OTPContainer'
import DropDownTest from './Acc/DropDown/DropDownTest'
import FilterSearch from './Acc/Interview/FilterSearch'
import SortMultipleRows from './Acc/TableSort/SortMultipleRows'
import PaginateSimple from './Acc/Pagination/PaginateSimple'
import Progressbar from './Acc/ProgressBar/Progressbar'
import BarData from './Acc/ProgressBar/BarData'
import FormValidations from './Acc/Forms/InputForm/FormValidations'
import FormWithRef from './Acc/Forms/FormWithRef'
import Sanitization from './Acc/Forms/Sanitization'
import Tootltip from './Acc/F/Tootltip'

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
    {/* <FormsMainPage/> */}
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


            {/* Acc */}
            <Route path='startForm' element={<PartForm/>}></Route>


            <Route path="langopts" element={<LanguageOptions/>}></Route>
            <Route path="modalPops" element={<ParentModal/>}></Route>
            <Route path="tableReuse" element={<TableData/>}></Route>
            <Route path="paginatetable" element={<Paginate/>}></Route>


            <Route path="flexbox" element={<FlexBox/>}></Route>
            <Route path="flextooltip" element={<Tooltip/>}></Route>
            <Route path="gridbox" element={<Gridbox/>}></Route>
            <Route path="apicall" element={<ApiCallWithHook/>}></Route>



             {/* <StripeProvide */}
             <Route path="payment" element={<PaymentForm orderId={123}/>}></Route>
             <Route path="imgTest" element={<ImagesTest/>}></Route>
             <Route path="virtuvalize" element={<VirtuvalizedList/>}></Route>
             <Route path="otp" element={<OTPContainer/>}></Route>

             <Route path='drpTest' element={<DropDownTest/>}/>
             <Route path='filterbody' element={<FilterSearch/>}/>
             <Route path='sortMultiRow' element={<SortMultipleRows/>}/>
             <Route path='paginateSimple' element={<PaginateSimple/>}/>
             <Route path='progress' element={<BarData/>}/>

             <Route path='formvalidation' element={<FormValidations/>}/>
             <Route path='formWithRef' element={<FormWithRef/>}/>
             <Route path='sanitize' element={<Sanitization/>}/>


              <Route path='tooltipbasic' element={<Tootltip/>}/>
            

            
         </Routes>
        
      </Suspense>
       </NetworkProvider>
      </BrowserRouter>
     {/* <Image/> */}
   </div>
}

export default App
