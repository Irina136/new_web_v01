import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
// const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

const items_menu = [
    getItem('Меню ','sub1', null, [
         getItem('Форма_В09',  'sub1_1'),
         getItem('Форма_В10',  'sub1_2'),
         getItem('Форма_В11',  'sub1_3'),
        //  getItem('Рапорт',     'sub1_4')
    ]),

    // getItem('Рапорт по попутной нефти','2'),
    // getItem('НСИ','nsi1',null, [
    //     getItem('Заказчики','nsi1_1')
    // ]),

];

function MyMenu(){
    const navigate = useNavigate();
    const onClick_menu = (e) => {
        // console.log(e.key);   
        // Рапорт по газу
         //e.key==='sub1' && navigate('/');
         e.key==='sub1_1' && navigate('/fm1');
         e.key==='sub1_2' && navigate('/fm2');
         e.key==='sub1_3' && navigate('/fm3');
         //e.key==='sub1_3' && navigate('/fm3');
 
        // e.key==='2' && navigate('/set');
        // e.key==='nsi1_1' && navigate('/spr_zak');
        //e.key==='6' && navigate('/show');
      }  
    return(
        <Layout.Sider>
            <Menu
                //theme="light"//dark"
                style={{ height: '90vh'}}
                mode="inline"
                //mode="vertical"
               // defaultSelectedKeys={['1']}
                items={items_menu}
                onClick={onClick_menu}
            />
        </Layout.Sider>
    )
}

export {MyMenu};

