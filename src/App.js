import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Album from './pages/Album';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    userName: '',
    loadingApi: false,
    loggedApi: false,
    singerName: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
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
    const { userName, loadingApi, loggedApi, singerName } = this.state;
    return (
      <>
        <div>
          <BrowserRouter>
            <Switch>
              <Route
                path="/"
                exact
                render={ () => (<Login
                  handleChange={ this.handleChange }
                  saveNameButton={ this.saveNameButton }
                  userName={ userName }
                  loadingApi={ loadingApi }
                  loggedApi={ loggedApi }
                />) }
              />
              <Route
                path="/search"
                exact
                render={ () => (<Search
                  singerName={ singerName }
                  handleChange={ this.handleChange }
                />) }
              />
              <Route path="/album/:id" exact render={ () => <Album /> } />
              <Route path="/favorites" exact render={ () => <Favorites /> } />
              <Route path="/profile" exact render={ () => <Profile /> } />
              <Route path="/profile/edit" exact render={ () => <ProfileEdit /> } />
              <Route path="/search" exact render={ () => <Search /> } />
              <Route path="*" component={ NotFound } />
            </Switch>
          </BrowserRouter>
        </div>
        <p>TrybeTunes</p>

      </>
    );
  }
}

export default App;
