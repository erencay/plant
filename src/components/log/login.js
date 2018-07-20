import React from "react";
import "./login.css";
import { Redirect , Link} from "react-router-dom";
import {app , facebookProvider} from "../firebase/firebase";
import { Toaster, Intent} from '@blueprintjs/core';
import firebase from '../firebase/firebase';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
       redirect: 'login',
    }
  }
  /* ======== FACEBOOK ILE BAGLANTI ======== */
  authWithFacebook = () => {
    app.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if(error){
          this.toaster.show({ intent: Intent.DANGER , message: 'Unable to sign in with facebook'})
        } else {
          this.setState({redirect: 'home'});
        }
      })
  };
  /* ======== EMAIL ILE BAGLANTI ======== */
  authWithPassword = (event) => {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const username = this.usernameInput.value;

    app.auth().fetchSignInMethodsForEmail(email)
    .then((providers) => {
      //if(providers.length === 0) {
      /* ======== KAYIT OLMAMIŞ İSE ========= */ 
      //return app.auth().createUserWithEmailAndPassword(email, password);}
      if(providers.indexOf('password') === -1) {
      /* ======== FACEBOOK İLE BAĞLANMIŞ İSE ========= */
      alert('Lütfen farklı yollardan bağlanmayı deneyin') 
       } else if (providers.indexOf('password') !== 0){
      /* ======== EĞER KAYIT OLMUŞ İSE ========= */ 
      return app.auth().signInWithEmailAndPassword(email, password);
       }}).then((user) => {
      if (user) {
        /*firebase.database().ref(`users/${user.user.uid}`).set({
          username: username,
          password:password,
          email:email
        });*/
        user.user.updateProfile({
          displayName: username,
        })
        console.log(firebase.auth().currentUser);
        this.setState({redirect:'home'})
        }
    }).catch((error) => {
      this.toaster.show({ intent: Intent.DANGER, message: error.message})
    })
    

  };
  render(){
    /* ======== BAGLANTI BAŞARILI İSE YÖNLENDİR ======== */
    const sayi = '/home/'+Math.floor(Math.random() * 4);
    if(this.state.redirect === 'home'){
      return <Redirect to={sayi} />
    }
  return (
    <div className="login-page">
      <div className="welcome-div">
        <p className="welcome-p">Hoşgeldin!</p>
        <p className="info-p">
          Üyeliğini oluşturup felsefi konularda
          fikirlerini paylaşmaya hazır mısın?
        </p>
      </div>
      {/* ======== FORM ELEMANLARI ======== */}
      <div className="form">
        <form className="login-form">
          <input type="email" placeholder="Email"
                 ref={(input) =>
                 {
                   this.emailInput = input
                 }}/>
          <input type="password" placeholder="Şifre"
                 ref={(input) =>
                 {
                   this.passwordInput = input
                 }} />
          <input type="text" placeholder="Kullanıcı Adı"
                 ref={(input) =>
                 {
                   this.usernameInput = input
                 }} />
          <button type='button' onClick={(event) =>
          {this.authWithPassword(event)}}
                  ref={(form) => {this.loginForm = form}}>GİRİŞ YAP
          </button>
          <Toaster ref={(element) => {this.toaster = element}} />
          <button type='button' className='fb' onClick={this.authWithFacebook}>Facebook ile bağlan</button>
          <p className="message">
            Henüz Kayıt Olmadınız mı?
            <Link to="/register">
              <label className="register-label">Kayıt Ol</label>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );}
};
export default Login;
