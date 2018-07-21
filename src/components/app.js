import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./app.css";
import {app} from './firebase/firebase';

import Login from "./log/login";
import Logout from './log/logout';
import Register from "./register/register";
import Home from "./home/home";
import Filozof from './menu/filozof';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      kullanıcı_adı: '',
      email:''
    };
  }
  componentWillMount = () => {
    this.RemoveAuthListener = app.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({kullanıcı_adı:user.displayName});
        this.setState({email:user.email})
        this.setState({authenticated: true});

      } else {
        this.setState({authenticated:false})
      }
    })
  };
  componentWillUnmount= () => {
    this.RemoveAuthListener();
  };
  render(){
    if(this.state.authenticated === true){
      return(
        <BrowserRouter>
          <div>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path="/home/:id" render={(props)=>{
              return <Home 
              {...props}
              kullanıcı_adı={this.state.kullanıcı_adı}
              email={this.state.email}
              />
            }}/>
            <Route path="/filozoflar" component={Filozof} />
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register} />
          </div>
        </BrowserRouter>
        );
    }else{
      return(
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
      );}
}}

export default App;
