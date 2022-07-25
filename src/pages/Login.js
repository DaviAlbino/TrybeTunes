import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    userName: '',
    loadingApi: false,
    loggedApi: false,
  };

  // const { history } = this.props;

  handleChange = ({ target }) => {
    this.setState({
      userName: target.value,
    });
  }

  isButtonDisabled = () => {
    const { userName } = this.state;
    const three = 3;
    if (userName.length < three) {
      return true;
    }
    return false;
  }

  saveNameButton = (event) => {
    event.preventDefault();
    const { userName } = this.state;

    this.setState({
      loadingApi: true,
    }, async () => {
      await createUser({ name: userName });
      this.setState({
        loadingApi: false,
        userName: '',
        loggedApi: true,
      });
    });
  }

  render() {
    const { userName, loadingApi, loggedApi } = this.state;

    return (
      <div data-testid="page-login">
        <h1> Login </h1>
        <form>
          <label htmlFor="login-name-input">
            <input
              type="text"
              data-testid="login-name-input"
              id="login-name-input"
              onChange={ this.handleChange }
              value={ userName }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ this.isButtonDisabled() }
            onClick={ this.saveNameButton }
          >
            Entrar
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

export default Login;
