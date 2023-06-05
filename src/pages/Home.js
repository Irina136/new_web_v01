import React from "react";

//  вариант
export const Home = () => (
   <h1> Главная страница 
      {/* <br/>
      <h2> "Расчет" </h2>  */}
   </h1>
)

//  class Home extends React.Component{
//    state ={
//       firstName: '',
//       email: '',
//    }
//   handleChange =(event) => {

//    //  this.setState({firstName: event.target.value}) это статчески
//    //          делаем динамически

//         this.setState({[event.target.name]: event.target.value}) 
   
//   }
//     render () {
//      const {firstName, email}=this.state;
//       return <div>
//          <input 
//             type="text"
//             name="firstName"
//             placeholder="firstName"
//             value={firstName}
//             onChange={this.handleChange}
//           />
//          <input 
//             type="email"
//             name="email"
//             placeholder="email"
//             value={email}
//             onChange={this.handleChange}
//           />

//        </div>
//     }
//  }
//  export {Home};

 