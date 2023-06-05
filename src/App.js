
import './App.css';
import {Layout} from 'antd';
import {AppRoutes} from './routes/AppRoutes';
import {MyMenu} from './components/navbar/MyMenu';
import {Navbar} from './components/navbar/Navbar';
// import { BrowserRouter } from 'react-router-dom';


const App = () => {
 return(
    // <BrowserRouter>  мой вариант
    <>
     <Layout>
        <Navbar/>
          <Layout> 
             <MyMenu />
             <Layout.Content>
                 <AppRoutes/>
             </Layout.Content>
         </Layout>
     </Layout>
     </>
    //  </BrowserRouter>
 )
}
export default App
