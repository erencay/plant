import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="screen">
      <div className="login-page">
        <div className="welcome-div">
          <p className="welcome-p">Hoşgeldin!</p>
          <p className="info-p">
            Üyeliğini oluşturup felsefi konularda fikirlerini paylaşmaya
            hazır mısın?
          </p>
        </div>
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="Kullanıcı Adı" />
            <input type="password" placeholder="Şifre" />
            <input type="email" placeholder="E-mail" />
            <Link to="/">
              <button>kayıt ol</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
