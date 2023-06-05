 import {Routes, Route} from 'react-router-dom';
 import {Home} from '../pages/Home';
 import {Formb09} from '../pages/Formb09';
 import {Formb10} from '../pages/Formb10';
 import {FormVps} from '../pages/FormVps';
 
const AppRoutes = () => {
    return(
           <Routes>
                 {/* // Home -должно бытьс заглавной Буквы - не ТЭГ, а элемент   */}
                <Route path='/' element={<Home/>}/> 
                <Route path='/fm1' element={<Formb09/>}/>
                <Route path='/fm2' element={<Formb10/>}/>
                <Route path='/fm3' element={<FormVps/>}/>
           </Routes>
    )  

}

export {AppRoutes};
