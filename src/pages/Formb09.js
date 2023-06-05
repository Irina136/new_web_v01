import React, {useState, useEffect} from "react";
import { Input, Modal, Form, Button, Space, notification, Select, InputNumber } from "antd"; //Table,
import { ExclamationCircleFilled } from '@ant-design/icons';  //PoweroffOutlined
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
 
const { confirm } = Modal;
 
const column_debit = [
  {
    headerName: 'Поле 1',
    dataIndex: 'numbsk',    
    field: 'numbsk',
    key: 'numbsk',
    width: 150,
    resizable: true
  },
  {
    headerName: 'Поле 2',
    dataIndex: 'numbpk',
    field: 'numbpk',
    key: 'numbpk',
    width: 150,
    resizable: true
  },
  {
    headerName: 'Поле 3 ', 
    dataIndex: 'debit_dp',
    field: 'debit_dp',
    key: 'debit_dp',
    width: 200,
    resizable: true
  },
   {
    headerName: 'Поле 4 ', 
    dataIndex: 'koef_debit',
    field: 'koef_debit',
    key: 'koef_debit',
    width: 200,
    resizable: true
  },
  {
    headerName: 'Поле 5 ', 
    dataIndex: 'gg',
    field: 'gg',
    key: 'gg',
    width: 100,
    resizable: true
  },
  {
    headerName: 'Поле 6 ', 
    dataIndex: 'mm',
    field: 'mm',
    key: 'mm',
    width: 100,
    resizable: true
  },

]
 
function Formb09() {
 
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
  const [koefdeb, setkoefdeb] = useState();  
  const [formZakVisible, setformZakVisible] = useState(false);
  const [key_record, setkey_record] = useState();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (text_mess) => {
    api.success({
      message: text_mess,
      placement: 'bottomRight'
    });
  };  
 
  
  // const getZakaz = async () => {
  //   const response = await axios.get('zakaz');
  //   return response;
  // }

  //'http://localhost:3001/sdcasdfasdfasdfasdfasddf222');
 
 //просмотр
  // const getZakaz = async () => {
  //   const response = await axios.get('koefd');
  //   return response;
  // }
 
  
  // const getKoefdeb = async () => {
  //   const response = await axios.get('http://localhost:3001/debit');
  //   return response;
  // }

// const getZakaz = async () => {
  //   const response = await axios.get('http://localhost:3001/koefd');
  //   return response;
  // }



   //просмотр работает
  const getKoefdeb = async () => {
    const response = await axios.get('http://localhost:3001/debit');
    return response;
  }


  // //просмотр
  // const getKoefdeb = async (e) => {
  //   const response = await axios.get('http://localhost:3001/debit',{gg: e.gg, mm: e.mm} );
  //   return response;
  // }


  // //просмотр
  // const getKoefdeb = async (e) => {
  //   const response = await axios.get('http://localhost:3001/debit', {gg: e.gg, mm: e.mm} );
  //   return response;
  // }



// добавить
  const insertZakaz = async (e) => {
    const response = await axios.post('zakaz/ins', {pl: e.pl, pm: e.pm,pn: e.pn, pp: e.pp});
    return response;
  }


 // обновить
  const updateZakaz = async (e) => {
    const response = await axios.post('zakaz/upd', {pl: e.pl, pm: e.pm,pn: e.pn, pp: e.pp, id_skv: key_record});
    return response;
  }

 // удалить
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
    await getKoefdeb().then(response => setkoefdeb(response.data))
    setformZakVisible(false);
  }
 
  const add_zak_close= () => {
    setformZakVisible(false);
  };
 
  // форма ввода данных
  const click_open_zak = (e) => {    
    setkey_record(e.data.key)
    form_zak.setFieldsValue(
      {
        numbsk:      e.data.numbsk,
        numbpk:      e.data.numbpk,
        debit_dp:    e.data.debit_dp,        
        koef_debit:  e.data.koef_debit,        
      })
      setformZakVisible(true);  
  }
 
  const new_zak= () => {
    setkey_record(true);
    form_zak.setFieldsValue(
      {
        numbsk:     null,
        numbpk:     null,
        debit_dp:   null,        
        koef_debit: null,        
      })
    setformZakVisible(true);
  };
 
  const del_zak= async () => {
    await deleteZakaz(key_record);
    await getKoefdeb().then(response => setkoefdeb(response.data));
    openNotification('Запись из справочника успешно удалена');
    setformZakVisible(false);  
  }
 


  useEffect(() => {
    getKoefdeb().then(response => setkoefdeb(response.data))
    }, []);
 

  //УКПГ
  const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
 // год
  const onChange = (value: number) => {
      console.log('changed', value);
    };
    
 // кнопка добавить новый месяц

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
        
         <Select
            defaultValue=" "
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: '1',   label: 'Участок 1' },
              { value: '2',   label: 'Участок 2' },
              { value: '3',   label: 'Участок 3' },
              //{ value: '',   label: 'Disabled', disabled: true },
            ]}
          />
          <span style={{display: 'inline-block', margin: '0 0.5rem'}}> Месяц </span> 

          <Select
            defaultValue=" "
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: '1',   label: 'январь' },
              { value: '2',   label: 'февраль' },
              { value: '3',   label: 'март' },
              { value: '4',   label: 'апрель' },
              { value: '5',   label: 'май' },
              { value: '6',   label: 'июнь' },
              { value: '7',   label: 'июль' },
              { value: '8',   label: 'авуст' },
              { value: '9',   label: 'сентябрь' },
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

             {/* <Table  таблица antd пример
              columns={column_zakaz}
              dataSource={zakazchik}
              pagination={false}
              onRow={(record, rowIndex) => {return {onDoubleClick:(event) =>{click_open_zak(record)}  };}}
              size="small"
            />  */}
 
              <AgGridReact
                rowData={koefdeb}
                columnDefs={column_debit}
                //animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection={'single'}
                onRowDoubleClicked={click_open_zak.bind(this)}
              />
           </div>
             <Modal open={formZakVisible}  maskClosable={false} footer={null} closable={false}>
             <Form form={form_zak} onFinish={save_zak} >
               <Form.Item label='Поле 1' name="numbsk">
               <Input/>                  
               </Form.Item>
               <Form.Item label="Поле 2" name="numbpk">
               <Input/>  
               </Form.Item>
               <Form.Item label="Поле 3" name="debit_dp">
               <Input/>  
               </Form.Item>
               <Form.Item label="Поле 4" name="koef_debit">
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
 
export {Formb09}
 




// <div>
//  <Modal open ></>

// </div>

// class Formb09 extends React.Component{
//   state ={
//     select: '',
//     yearText: '',
//     firstName:'',
//     selectgp: '',
      
//   }

  
//   handleChange =(event) => {
//     this.setState({[event.target.name]: event.target.value}) 
// }

// //   // handleCheckboxChange =(event) => {
// //   //   this.setState({[event.target.name]: event.target.checked}) 
// // }

// // firstName,
// render () {
//  const {select, yearText,  selectgp}=this.state;
//   return  <div>
//        <span style={{display: 'inline-block', margin: '0 0.5rem'}}> Месяц </span> 
     
//      {/* <label> */}
//      {/* Месяц */}
//          <select name="select" value={select} onChange={this.handleChange}>
//           <option value="" disabled> </option>
//           <option value="1">январь</option>
//           <option value="2">февраль</option>
//           <option value="3">март</option>
//           <option value="3">апрель</option>
//           <option value="3">май</option>
//           <option value="3">июнь</option>
//           <option value="3">июль</option>
//           <option value="3">август</option>
//           <option value="3">октябрь</option>
//           <option value="3">ноябрь</option>
//           <option value="3">декабрь</option>
//          </select> 
//          {/* </label> */}

//          <span style={{display: 'inline-block', margin: '0 0.5rem'}}>  </span> 
//         {/* <br/> */}

//         <span style={{display: 'inline-block', margin: '0 0.5rem'}}> Год </span> 

//         {/* <label>
//           Год */}
//         <input 
//           type="text"
//           name="yearText"
//           placeholder=" "
//           // placeholder="yearText1"
//           value={yearText}
//           onChange={this.handleChange}
//         />
//         {/* </label>  */}

//         {/* <input 
//             type="text"
//             name="firstName"
//             placeholder="firstName"
//             value={firstName}
//             onChange={this.handleChange}
//           /> */}
//          <span style={{display: 'inline-block', margin: '0 0.5rem'}}> УКПГ </span> 
//        {/* <label>
//            УКПГ */}
//         <select name="selectgp" value={selectgp} onChange={this.handleChange}>
//           <option value="" disabled> </option>
//           <option value="1">ГП1АС</option>
//          
//            </select> 
//           {/* </label> */}
//         {/* <br/> */}
     
//    </div>
// }
// }


// вариант
// export const Formb09 = () => (
//    <h1> Page B09</h1>


// import React,{useState, useEffect} from 'react'
// import {Table, Input, Modal, Form, Button, Space, notification }  from 'antd';
// import { ExclamationCircleFilled } from '@ant-design/icons';
// import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
// import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
 
// const { confirm } = Modal;
 
// const column_zakaz = [
//   {
//     //title: 'Наименование',
//     headerName: 'Наименование',
//     dataIndex: 'nam',    
//     field: 'nam',
//     key: 'nam',
//     width: 150,
//     resizable: true
//   },
//   {
//     //title: 'Полное наименование',
//     headerName: 'Полное наименование',
//     dataIndex: 'nam_full',
//     field: 'nam_full',
//     key: 'nam_full',
//     width: 400,
//     resizable: true
//   },
//   {
//     //title: 'Адрес',
//     headerName: 'Адрес',
//     dataIndex: 'adres',
//     field: 'adres',
//     key: 'adres',
//     width: 400,
//     resizable: true
//   },
// ]
 
// function Formb09() {
 
//   const showDeleteConfirm = () => {
//     confirm({
//       title: 'Вы действительно зотите удалить запись?',
//       icon: <ExclamationCircleFilled />,
//       content: 'Подтвердите удаление',
//       okText: 'Да',
//       okType: 'danger',
//       cancelText: 'Нет',
//       onOk() {
//         del_zak()
//       },
//       onCancel() {
//         console.log('Удаление отменено');
//       },
//     });
//   };
 
//   const [form_zak] = Form.useForm();
//   const [zakazchik, setzakazchik] = useState();  
//   const [formZakVisible, setformZakVisible] = useState(false);
//   const [key_record, setkey_record] = useState();
//   const [api, contextHolder] = notification.useNotification();
//   const openNotification = (text_mess) => {
//     api.success({
//       message: text_mess,
//       placement: 'bottomRight'
//     });
//   };  
 
//   const getZakaz = async () => {
//     const response = await axios.get('zakaz');
//     return response;
//   }
 
//   const insertZakaz = async (e) => {
//     const response = await axios.post('zakaz/ins', {nam: e.nam, adres: e.adres, nam_full: e.nam_full});
//     return response;
//   }
 
//   const updateZakaz = async (e) => {
//     const response = await axios.post('zakaz/upd', {nam: e.nam, adres: e.adres, nam_full: e.nam_full, id_zakaz: key_record});
//     return response;
//   }
 
//   const deleteZakaz = async (e) => {
//     const response = await axios.post('zakaz/del', {id_zakaz: e});
//     return response;
//   }
 
//   const save_zak = async (record) => {
//     if (key_record===true) {
//        await insertZakaz(record);
//        openNotification('Запись в справочник успешно добавлена ');
//       }
//     else {
//       await updateZakaz(record);
//       openNotification('Запись в справочнике успешно изменена');
//       }
//     //key_record===true ? (await insertZakaz(record)):(await updateZakaz(record));
//     await getZakaz().then(response => setzakazchik(response.data))
//     setformZakVisible(false);
//   }
 
//   const add_zak_close= () => {
//     setformZakVisible(false);
//   };
 
//   const click_open_zak = (e) => {    
//     setkey_record(e.data.key)
//     form_zak.setFieldsValue(
//       {
//         nam:      e.data.nam,
//         nam_full: e.data.nam_full,
//         adres:    e.data.adres,        
//       })
//       setformZakVisible(true);  
//   }
 
//   const new_zak= () => {
//     setkey_record(true);
//     form_zak.setFieldsValue(
//       {
//         nam:      null,
//         nam_full: null,
//         adres:    null,        
//       })
//     setformZakVisible(true);
//   };
 
//   const del_zak= async () => {
//     await deleteZakaz(key_record);
//     await getZakaz().then(response => setzakazchik(response.data));
//     openNotification('Запись из справочника успешно удалена');
//     setformZakVisible(false);  
//   }
 
//   useEffect(() => {
//       getZakaz().then(response => setzakazchik(response.data))
//     }, []);
 
//   return(
//       <div>
//         {contextHolder}
//         <Space wrap>
//           <Button onClick={new_zak}>Добавить</Button>
//           </Space>
//            <div className="ag-theme-alpine" style={{width: 1000, height: '85vh'}}>
//              {/* <Table
//               columns={column_zakaz}
//               dataSource={zakazchik}
//               pagination={false}
//               onRow={(record, rowIndex) => {return {onDoubleClick:(event) =>{click_open_zak(record)}  };}}
//               size="small"
//             />  */}
 
//               <AgGridReact
//                 rowData={zakazchik}
//                 columnDefs={column_zakaz}
//                 //animateRows={true} // Optional - set to 'true' to have rows animate when sorted
//                 rowSelection={'single'}
//                 onRowDoubleClicked={click_open_zak.bind(this)}
//               />
 
//           </div>
 
//         <Modal open={formZakVisible}  maskClosable={false} footer={null} closable={false}>
//           <Form form={form_zak} onFinish={save_zak} >
//             <Form.Item label='Наименование' name="nam">
//               <Input/>                  
//             </Form.Item>
//             <Form.Item label="Полное наименование" name="nam_full">
//               <Input/>  
//             </Form.Item>
//             <Form.Item label="Адрес" name="adres">
//               <Input/>  
//             </Form.Item>
//             <Button htmlType='submit' >Сохранить</Button>
//             <Button onClick={showDeleteConfirm} >Удалить</Button>
//             <Button onClick={add_zak_close}>Отмена</Button>                
//           </Form>
//         </Modal>
//       </div>
//     );
// }
 
// export {Formb09}
 




// <div>
//  <Modal open ></>

// </div>

// class Formb09 extends React.Component{
//   state ={
//     select: '',
//     yearText: '',
//     firstName:'',
//     selectgp: '',
      
//   }

  
//   handleChange =(event) => {
//     this.setState({[event.target.name]: event.target.value}) 
// }

// //   // handleCheckboxChange =(event) => {
// //   //   this.setState({[event.target.name]: event.target.checked}) 
// // }

// // firstName,
// render () {
//  const {select, yearText,  selectgp}=this.state;
//   return  <div>
//        <span style={{display: 'inline-block', margin: '0 0.5rem'}}> Месяц </span> 
     
//      {/* <label> */}
//      {/* Месяц */}
//          <select name="select" value={select} onChange={this.handleChange}>
//           <option value="" disabled> </option>
//           <option value="1">январь</option>
//           <option value="2">февраль</option>
//           <option value="3">март</option>
//           <option value="3">апрель</option>
//           <option value="3">май</option>
//           <option value="3">июнь</option>
//           <option value="3">июль</option>
//           <option value="3">август</option>
//           <option value="3">октябрь</option>
//           <option value="3">ноябрь</option>
//           <option value="3">декабрь</option>
//          </select> 
//          {/* </label> */}

//          <span style={{display: 'inline-block', margin: '0 0.5rem'}}>  </span> 
//         {/* <br/> */}

//         <span style={{display: 'inline-block', margin: '0 0.5rem'}}> Год </span> 

//         {/* <label>
//           Год */}
//         <input 
//           type="text"
//           name="yearText"
//           placeholder=" "
//           // placeholder="yearText1"
//           value={yearText}
//           onChange={this.handleChange}
//         />
//         {/* </label>  */}

//         {/* <input 
//             type="text"
//             name="firstName"
//             placeholder="firstName"
//             value={firstName}
//             onChange={this.handleChange}
//           /> */}
//          <span style={{display: 'inline-block', margin: '0 0.5rem'}}> УКПГ </span> 
//        {/* <label>
//            УКПГ */}
//         <select name="selectgp" value={selectgp} onChange={this.handleChange}>
//           <option value="" disabled> </option>
//           <option value="1">ГП1АС</option>
//        
//            </select> 
//           {/* </label> */}
//         {/* <br/> */}
     
//    </div>
// }
// }
// export {Formb09};

// // //  вариант работает
// //  export const FormVps = () => (
// //    <h1> Страница </h1>
// // )

