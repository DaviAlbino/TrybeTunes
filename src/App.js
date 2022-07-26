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
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  state = {
    userName: '',
    loadingApi: false,
    loggedApi: false,
    singerName: '',
    artistResultsList: [],
    singerInput: '',
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

  getSearchButton = () => {
    const { singerName } = this.state;

    this.setState({
      loadingApi: true,
    }, async () => {
      const artistResults = await searchAlbumsAPI(singerName);
      this.setState({
        loadingApi: false,
        artistResultsList: artistResults,
        singerInput: singerName,
        singerName: '',
        loggedApi: true,
      });
    });
  }

  render() {
    const {
      userName,
      loadingApi,
      loggedApi,
      singerName,
      artistResultsList,
      singerInput,
    } = this.state;
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
                  getSearchButton={ this.getSearchButton }
                  artistResultsList={ artistResultsList }
                  loadingApi={ loadingApi }
                  loggedApi={ loggedApi }
                  singerInput={ singerInput }
                />) }
              />
              <Route
                path="/album/:id"
                exact
                render={ (props) => <Album { ...props } id="id" /> }
              />
              <Route path="/favorites" exact render={ () => <Favorites /> } />
              <Route path="/profile" exact component={ Profile } />
              <Route
                path="/profile/edit"
                exact
                component={ ProfileEdit }
              />
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
