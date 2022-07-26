import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Header from './Header';

class Profile extends React.Component {
  state = {
    loadingApi: false,
    infos: [],
  }

  componentDidMount() {
    this.getInfos();
  }

  getInfos = async () => {
    this.setState({ loadingApi: true });
    const newInfos = await getUser();
    this.setState({
      infos: newInfos,
      loadingApi: false,
    });
  }

  render() {
    const { infos, loadingApi } = this.state;
    const { name, email, image, description } = infos;
    return (
      <div>
        <Header />
        {loadingApi ? <Loading /> : (
          <div data-testid="page-profile">
            <div data-testid="card-profile">
              <img src={ image } alt={ name } data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
              <p>{ name }</p>
              <p>{ email }</p>
              <p>{ description }</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
