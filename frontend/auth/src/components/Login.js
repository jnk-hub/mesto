import React from 'react';
import InfoTooltip from './InfoTooltip.js';
import { login } from "../utils/api.js";

import "../blocks/auth-form/auth-form.css"

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  function closeInfoToolTipPopup() {
    setIsInfoToolTipOpen(false);
  }

  function onLogin({ email, password }) {
    login(email, password)
      .then((res) => {
        dispatchEvent(new CustomEvent("jwt-change", { detail: res.token }));
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onLogin(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Вход</h3>
          <label className="auth-form__input">
            <input type="text" name="name" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value)} required />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required />
          </label>
        </div>
        <button className="auth-form__button" type="submit">Войти</button>
      </form>

      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={closeInfoToolTipPopup}
        status={tooltipStatus}
      />
    </div>
  )
}

export default Login;
