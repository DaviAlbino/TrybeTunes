import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Album from './pages/Album';

class App extends React.Component {
  render() {
    return (
      <>
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact render={ () => <Login /> } />
              <Route path="/search" exact render={ () => <Search /> } />
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
