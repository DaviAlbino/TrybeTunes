import React from 'react';
import Header from './Header';
import MusicCard from './MusicCard';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    favoritesSongsList: [],
  }

  componentDidMount = () => {

  }

  // getFavoriteList = async () => {
  //   const myFavorites = await getFavoriteSongs();
  // }

  render() {
    const { favoritesSongsList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1> Favorites </h1>
        { favoritesSongsList.map((song, index) => (
          <div key={ index }>
            <MusicCard
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              music={ song }
            />

          </div>
        )) }
      </div>
    );
  }
}

export default Favorites;
