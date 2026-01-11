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
import Options from './INT/DropDownWithKeyboard/Options'
import OptionsMultiple from './INT/MultipleOptionSelection/OptionsMultiple'
import DataConsumer from './INT/TableWithFilter/DataConsumer'


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
         <Routes>
            <Route path='modal' element={<ParentContainer/>}></Route>
            <Route path='dropdown' element={<Options/>}></Route>
            <Route path='multiDropDown' element={<OptionsMultiple/>}></Route>
            <Route path='table' element={<DataConsumer/>}></Route>
         </Routes>
      </BrowserRouter>
     {/* <Image/> */}
   </div>
}

export default App
