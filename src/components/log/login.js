import React from "react";
import "./login.css";
import { Redirect , Link} from "react-router-dom";
import {app , facebookProvider} from "../firebase/firebase";
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
          alert('Tekrar deneyiniz...');
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

    if(email === null || password === null || username === null){
      alert('Lütfen gerekli alanları doldurun');
    }

    app.auth().fetchSignInMethodsForEmail(email)
    .then((providers) => {
      if(providers.length === 0) {
      /* ======== KAYIT OLMAMIŞ İSE ========= */ 
        alert('Giriş yapmadan önce kayıt olmalısınız...')}
      else if(providers.indexOf('password') === -1) {
      /* ======== FACEBOOK İLE BAĞLANMIŞ İSE ========= */
      alert('Lütfen farklı yollardan bağlanmayı deneyin') 
       } else{
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
      alert('Lütfen tekrar deneyin...');
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

        {/* ========== HOŞGELDİN YAZISI ========= */}

        <div className="welcome-div">
          <p className="welcome-p">Hoşgeldin!</p>
          <p className="info-p">
            Üyeliğini oluşturup felsefi konularda
            fikirlerini paylaşmaya hazır mısın?
          </p>
        </div>

        {/* ======== FORM ELEMANLARI ======== */}

        <div className="form">
          <form className="login-form" onSubmit={this.authWithPassword}>

            <input 
              type="password" 
              placeholder="Şifre"
              onSubmit={(value) => {
                value = '';
              }} 
              required
              ref={(input) =>
                {
                  this.passwordInput = input
                }} 
            />
            <input 
              type="text" 
              placeholder="Kullanıcı Adı"
              required
              ref={(input) =>
                {
                  this.usernameInput = input
                }}
            />
            <input 
              type="email"
              required
              placeholder="Email"
              ref={(input) =>
                {
                  this.emailInput = input
                }}
            />

            <button 
              type='button' 
              onClick={(event) =>
                {this.authWithPassword(event)}}
              ref={(form) => 
                {this.loginForm = form}}>
                GİRİŞ YAP
            </button>

            <p> VEYA </p>

            <button 
              type='button'
              className='fb' 
              onClick={this.authWithFacebook}>
              Facebook ile bağlan
            </button>

            <p 
              className="message">
              Henüz Kayıt Olmadınız mı?
              <Link to="/register">
                <label className="relog-link">Kayıt Ol</label>
              </Link>
            </p>

          </form>
        </div>
      </div>
    );}
};
export default Login;
