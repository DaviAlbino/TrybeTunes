import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    loadingApi: false,
    disabledButton: true,
    name: '',
    email: '',
    description: '',
    image: '',
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    this.setState({ loadingApi: true });
    const infoResult = await getUser();
    this.setState({
      loadingApi: false,
      name: infoResult.name,
      email: infoResult.email,
      description: infoResult.description,
      image: infoResult.image,
    }, this.validateButton);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  validateButton = () => {
    const { name, email, description, image } = this.state;
    if (
      name.length > 0
      && email.length > 0
      && description.length > 0
      && image.length > 0
    ) {
      this.setState({ disabledButton: false });
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    this.setState({ loadingApi: true });
    const newUser = {
      name,
      email,
      image,
      description,
    };

    updateUser(newUser);
    this.setState({ loadingApi: false });
    history.push('/profile');
  }

  render() {
    const {
      loadingApi,
      disabledButton,
      name,
      email,
      description,
      image,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />

        <h1>Editar perfil</h1>
        { loadingApi && <Loading /> }
        <form>
          <label htmlFor="edit-input-name">
            Nome:
            <input
              data-testid="edit-input-name"
              id="edit-input-name"
              name="name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="edit-input-email">
            Email:
            <input
              data-testid="edit-input-email"
              id="edit-input-email"
              name="email"
              type="text"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="edit-input-description">
            Descrição:
            <input
              data-testid="edit-input-description"
              id="edit-input-description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              type="text"
            />
          </label>
          <label htmlFor="edit-input-image">
            Foto do Perfil:
            <input
              data-testid="edit-input-image"
              id="edit-input-image"
              name="image"
              value={ image }
              onChange={ this.handleChange }
              type="text"
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ disabledButton }
            data-testid="edit-button-save"
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default ProfileEdit;
