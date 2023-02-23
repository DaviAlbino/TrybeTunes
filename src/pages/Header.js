import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import trybeImage from '../images/trybe.png';
import tunesImage from '../images/tunes.png';
import headset from '../images/Group 3.png';
import '../CSS/header.css';

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
        <header data-testid="header-component" className="header-tunes">
          <div className="all-icons">
            <div className="icon1-div">
              <img src={ trybeImage } alt="trybe" className="loginImg1" />
              <img src={ tunesImage } alt="trybe" className="loginImg2" />
            </div>
            <div className="icon2-div">
              <img src={ headset } alt="trybe" className="headset" />
            </div>
          </div>
          <div className="menu-options">
            <Link to="/search" data-testid="link-to-search">Search</Link>
            { '    ' }
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            { '    ' }
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </div>
          { loadingApi ? <Loading /> : (
            <h3 data-testid="header-user-name" className="header-user-name">
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
