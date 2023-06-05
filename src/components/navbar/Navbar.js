import './Navbar.css'
import { Layout, Row, } from "antd";
import { useNavigate } from "react-router-dom";


function Navbar(){
    const navigate = useNavigate();
    const AppName_Click = () => {
        navigate('/');
    }

    return(
        <Layout.Header className='Layout_Header_style'>
            <Row justify="center" wrap="false">
                <span onClick={AppName_Click}>
                    Сайт
                </span>
            </Row>
        </Layout.Header>
    )
}
export {Navbar};
