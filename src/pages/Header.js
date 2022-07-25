import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
    state = {
      loadingApi: true,
      userName: '',
    }

    componentDidMount() {
      this.handleUserName();
    }

    handleUserName = async () => {
      const userResponse = await getUser();
      this.setState({
        userName: userResponse.name,
        loadingApi: false,
      });
    };

    render() {
      const { loadingApi, userName } = this.state;

      return (
        <header data-testid="header-component">
          { loadingApi ? <Loading /> : (
            <h3 data-testid="header-user-name">
              { userName }
            </h3>
          )}
        </header>
      );
    }
}

Header.propTypes = {
  userName: PropTypes.string,
  loadingApi: PropTypes.bool,
  loggedApi: PropTypes.bool,
  handleChange: PropTypes.func,
  saveNameButton: PropTypes.func,
}.isRequired;

export default Header;
