import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
import '../CSS/login.css';
import trybeImage from '../images/trybe.png';
import tunesImage from '../images/tunes.png';
import headset from '../images/Group 3.png';
// import lines1 from '../images/Group 5.png';
// import lines2 from '../images/Group 6.png';
// import elipse from '../images/Ellipse 4.png';
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
        {/* <img src={ lines1 } alt="trybe" className="lines1" />
        <img src={ lines2 } alt="trybe" className="lines2" />
        <img src={ elipse } alt="trybe" className="elipse" /> */}
        <form className="login-form-page">
          <div className="all-icons">
            <div className="icon1-div">
              <img src={ trybeImage } alt="trybe" className="loginImg1" />
              <img src={ tunesImage } alt="trybe" className="loginImg2" />
            </div>
            <div className="icon2-div">
              <img src={ headset } alt="trybe" className="headset" />
            </div>
          </div>

          <label htmlFor="login-name-input" className="login">
            <input
              name="userName"
              type="text"
              data-testid="login-name-input"
              id="login-name-input"
              onChange={ handleChange }
              value={ userName }
              className="textInput"
              placeholder="qual é o seu nome?"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ this.isButtonDisabled() }
            onClick={ saveNameButton }
            className="buttonLogin"
          >
            ENTRAR
          </button>
        </form>
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
