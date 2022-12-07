import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
import '../CSS/login.css';
// import { createUser } from '../services/userAPI';

class Login extends React.Component {
  isButtonDisabled = () => {
    const { userName } = this.props;
    const three = 3;
    if (userName.length < three) {
      return true;
    }
    return false;
  }

  render() {
    const { userName, loadingApi, loggedApi, handleChange, saveNameButton } = this.props;

    return (
      <div data-testid="page-login" className="page loginBody">
        <form>
          <h1> Login </h1>
          <label htmlFor="login-name-input" className="login">
            <input
              name="userName"
              type="text"
              data-testid="login-name-input"
              id="login-name-input"
              onChange={ handleChange }
              value={ userName }
              className="textInput"
              placeholder="User"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ this.isButtonDisabled() }
            onClick={ saveNameButton }
            className="buttonLogin"
          >
            Entrar
          </button>
        </form>
        <img src="https://theme.zdassets.com/theme_assets/9633455/9814df697eaf49815d7df109110815ff887b3457.png" alt="trybe" className="loginImg" />
        <div>
          { loadingApi && <Loading /> }
        </div>
        { loggedApi && <Redirect to="/search" /> }
      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string,
  loadingApi: PropTypes.bool,
  loggedApi: PropTypes.bool,
  handleChange: PropTypes.func,
  saveNameButton: PropTypes.func,
}.isRequired;

export default Login;
