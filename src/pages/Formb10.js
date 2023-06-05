import React, {useState, useEffect} from "react";
import { Input, Modal, Form, Button, Space, notification, Select, InputNumber } from "antd"; //Table,
import { ExclamationCircleFilled } from '@ant-design/icons'; //PoweroffOutlined
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
 
const { confirm } = Modal;
 
const column_debit = [
  {
    headerName: 'Поле 1',
    dataIndex: 'sk',    
    field: 'sk',
    key: 'sk',
    width: 150,
    resizable: true
  },
  {
    headerName: 'Поле 2',
    dataIndex: 'sl',
    field: 'sl',
    key: 'sl',
    width: 150,
    resizable: true
  },
  {
    headerName: 'Поле 3', 
    dataIndex: 'sm',
    field: 'sm',
    key: 'sm',
    width: 200,
    resizable: true
  },
 
  {
    headerName: 'Поле 4', 
    dataIndex: 'sn',
    field: 'sn',
    key: 'sn',
    width: 200,
    resizable: true
  },
]
 
function Formb10() {
 
  const showDeleteConfirm = () => {
    confirm({
      title: 'Вы действительно хотите удалить запись?',
      icon: <ExclamationCircleFilled />,
      content: 'Подтвердите удаление',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        del_zak()
      },
      onCancel() {
        console.log('Удаление отменено');
      },
    });
  };
 
  
  const [form_zak] = Form.useForm();
  const [zakazchik, setzakazchik] = useState();  
  const [formZakVisible, setformZakVisible] = useState(false);
  const [key_record, setkey_record] = useState();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (text_mess) => {
    api.success({
      message: text_mess,
      placement: 'bottomRight'
    });
  };  
 
  
  const getZakaz = async () => {
    const response = await axios.get('zakaz');
    return response;
  }
 
  const insertZakaz = async (e) => {
    const response = await axios.post('zakaz/ins', {skv: e.skv, przn: e.przn, koefd: e.koefd, sdebit: e.sdebit});
    return response;
  }
 
  const updateZakaz = async (e) => {
    const response = await axios.post('zakaz/upd', {skv: e.skv, przn: e.przn, koefd: e.koefd, sdebit: e.sdebit, id_skv: key_record});
    return response;
  }
 
  const deleteZakaz = async (e) => {
    const response = await axios.post('zakaz/del', {id_skv: e});
    return response;
  }
 
  const save_zak = async (record) => {
    if (key_record===true) {
       await insertZakaz(record);
       openNotification('Запись в справочник успешно добавлена ');
      }
    else {
      await updateZakaz(record);
      openNotification('Запись в справочнике успешно изменена');
      }
    //key_record===true ? (await insertZakaz(record)):(await updateZakaz(record));
    await getZakaz().then(response => setzakazchik(response.data))
    setformZakVisible(false);
  }
 
  const add_zak_close= () => {
    setformZakVisible(false);
  };
 
  const click_open_zak = (e) => {    
    setkey_record(e.data.key)
    form_zak.setFieldsValue(
      {
        sk:   e.data.sk,
        sl:   e.data.sl,
        sm:   e.data.sm,        
        sn:   e.data.sn,        
      })
      setformZakVisible(true);  
  }
 
  const new_zak= () => {
    setkey_record(true);
    form_zak.setFieldsValue(
      {
        sk:  null,
        sl:  null,
        sm:  null,        
        sn:  null,        
      })
    setformZakVisible(true);
  };
 
  const del_zak= async () => {
    await deleteZakaz(key_record);
    await getZakaz().then(response => setzakazchik(response.data));
    openNotification('Запись из справочника успешно удалена');
    setformZakVisible(false);  
  }
 
  useEffect(() => {
      getZakaz().then(response => setzakazchik(response.data))
    }, []);
 

  const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

  const onChange = (value: number) => {
      console.log('changed', value);
    };
    

    // const [loadings, setLoadings] = useState<boolean[]>([]);
    const [loadings, setLoadings] = useState(true);

    const enterLoading = (index: number) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
  
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 6000);
    };


  return(
      <div>
        {contextHolder}
        <Space wrap>
             
          <span style={{display: 'inline-block', margin: '0 0.5rem'}}> Месяц </span> 

          <Select
            defaultValue=" "
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: '1',  label: 'январь' },
              { value: '2',  label: 'февраль' },
              { value: '3',  label: 'март' },
              { value: '4',  label: 'апрель' },
              { value: '5',  label: 'май' },
              { value: '6',  label: 'июнь' },
              { value: '7',  label: 'июль' },
              { value: '8',  label: 'авуст' },
              { value: '9',  label: 'сентябрь' },
              { value: '10',  label: 'октябрь' },
              { value: '11',  label: 'ноябрь' },
              { value: '12',  label: 'декабрь' },
            ]}
          />
          <span style={{display: 'inline-block', margin: '0 0.5rem'}}> Год </span> 
          <InputNumber min={1999} max={2050} defaultValue={2022} onChange={onChange} />
         
          <Button onClick={new_zak}>Добавить</Button>


          <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
               Начать новый месяц!
          </Button>
{/* 
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Click me!

        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[2]}
          onClick={() => enterLoading(2)}
        />
 */}




         
         
          </Space>
           <div className="ag-theme-alpine" style={{width: 1000, height: '85vh'}}>

             {/* <Table
              columns={column_zakaz}
              dataSource={zakazchik}
              pagination={false}
              onRow={(record, rowIndex) => {return {onDoubleClick:(event) =>{click_open_zak(record)}  };}}
              size="small"
            />  */}
 
              <AgGridReact
                rowData={zakazchik}
                columnDefs={column_debit}
                //animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection={'single'}
                onRowDoubleClicked={click_open_zak.bind(this)}
              />
           </div>
             <Modal open={formZakVisible}  maskClosable={false} footer={null} closable={false}>
             <Form form={form_zak} onFinish={save_zak} >
               <Form.Item label='Поле 1' name="sk">
               <Input/>                  
               </Form.Item>
               <Form.Item label="Поле 2" name="sl">
               <Input/>  
               </Form.Item>
               <Form.Item label="Поле 3" name="sm">
               <Input/>  
               </Form.Item>
               <Form.Item label="Поле 4" name="sn">
               <Input/>  
               </Form.Item> 
            <Button htmlType='submit' >Сохранить</Button>
            <Button onClick={showDeleteConfirm} >Удалить</Button>
            <Button onClick={add_zak_close}>Отмена</Button>                
          </Form>
        </Modal>
      </div>
    );
}
 
export {Formb10}
 


// import React from "react";

// class Formb10 extends React.Component{
//    state ={
//      select: '',
//      yearText: '',
//     //  firstName:'',
//     //  selectgp: '',
//    }
//     handleChange =(event) => {
//      this.setState({[event.target.name]: event.target.value}) 
//  }
 

//  //   // handleCheckboxChange =(event) => {
//  //   //   this.setState({[event.target.name]: event.target.checked}) 
//  // }
 
//  // firstName,
//  render () {
//   const {select, yearText}=this.state;
//    return  <div>
//         <span style={{display: 'inline-block', margin: '0 0.5rem'}}> Месяц </span> 
      
//       {/* <label> */}
//       {/* Месяц */}
//           <select name="select" value={select} onChange={this.handleChange}>
//            <option value="" disabled> </option>
//            <option value="1">январь</option>
//            <option value="2">февраль</option>
//            <option value="3">март</option>
//            <option value="3">апрель</option>
//            <option value="3">май</option>
//            <option value="3">июнь</option>
//            <option value="3">июль</option>
//            <option value="3">август</option>
//            <option value="3">октябрь</option>
//            <option value="3">ноябрь</option>
//            <option value="3">декабрь</option>
//           </select> 
//           {/* </label> */}
 
//           <span style={{display: 'inline-block', margin: '0 0.5rem'}}>  </span> 
//          {/* <br/> */}
 
//          <span style={{display: 'inline-block', margin: '0 0.5rem'}}> Год </span> 
 
//          {/* <label>
//            Год */}
//          <input 
//            type="text"
//            name="yearText"
//            placeholder=" "
//            // placeholder="yearText1"
//            value={yearText}
//            onChange={this.handleChange}
//          />
//          {/* </label>  */}
 
//          {/* <input 
//              type="text"
//              name="firstName"
//              placeholder="firstName"
//              value={firstName}
//              onChange={this.handleChange}
//            /> */}
//           {/* <span style={{display: 'inline-block', margin: '0 0.5rem'}}> УКПГ </span>  */}
//         {/* <label>
//             УКПГ */}
//          {/* <select name="selectgp" value={selectgp} onChange={this.handleChange}>
//            <option value="" disabled> </option>
//            <option value="1">ГП1АС</option>
//            <option value="1">ГП1</option>
//            <option value="2">ГП2</option>
//            <option value="3">ГП3</option>
//            <option value="3">ГП4</option>
//            <option value="3">ГП5</option>
//            <option value="3">ГП6</option>
//            <option value="3">ГП7</option>
//            <option value="3">ГП8</option>
//            <option value="3">ГП9</option>
//            <option value="3">ГП10</option>
//            <option value="3">ГП11</option>
//            <option value="3">ГП12</option>
//            <option value="3">ГП13</option>
//            <option value="3">ГП15</option>
//            <option value="3">ГП16</option>
//             </select>  */}
//            {/* </label> */}
//          {/* <br/> */}
      
//     </div>
//  }
//  }
//  export {Formb10};
 



// //  class Formb10 extends React.Component{
// //    state ={
// //       firstName: '',
// //       email: '',
// //       message: '',
// //       select: '',
// //       subscription: false,
// //       gender: 'male'
// //    }

// //    handleChange =(event) => {
// //         this.setState({[event.target.name]: event.target.value}) 
// //   }

// //   handleCheckboxChange =(event) => {
// //    this.setState({[event.target.name]: event.target.checked}) 
// // }


// //   render () {
// //      const {firstName, email, message, select, subscription, gender}=this.state;
// //       return  <div>
// //          <input 
// //             type="text"
// //             name="firstName"
// //             placeholder="firstName"
// //             value={firstName}
// //             onChange={this.handleChange}
// //           />
// //          <input 
// //             type="email"
// //             name="email"
// //             placeholder="email"
// //             value={email}
// //             onChange={this.handleChange}
// //           />
// //           <br/>
// //             <textarea name="message" value={message} onChange={this.handleChange}/>
// //           <br/>
// //             <select name="select" value={select} onChange={this.handleChange}>
// //              <option value="" disabled> </option>
// //              <option value="1">1</option>
// //              <option value="2">2</option>
// //              <option value="3">3</option>
// //             </select> 
// //             <br/>
// //             <label>
// //             <input 
// //                type="checkbox" 
// //                name="subscription" 
// //                checked={subscription} 
// //                onChange={this.handleCheckboxChange}
// //             />
// //             Subscription1 наименование
// //           </label>
// //          <br/>

// //          <input type="radio" name="gender" value="male"  onChange={this.handleChange}
// //             checked={gender === "male"}  />   Male 

// //          <input type="radio" name="gender" value="female" onChange={this.handleChange}
// //             checked={gender === "female"}  />   Female
                    
// //        </div>
// //     }
// //  }
// //  export {Formb10};
