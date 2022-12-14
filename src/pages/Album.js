import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
// import Loading from './Loading';

class Album extends React.Component {
  state = {
    musicsList: [],
    singerName: '',
    albumName: '',
    imgUrl: '',
  }

  componentDidMount() {
    this.getMusicList();
  }

  getMusicList = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({
      musicsList: songs.filter((song) => song.kind === 'song'),
      singerName: songs[0].artistName,
      albumName: songs[0].collectionName,
      imgUrl: songs[0].artworkUrl100,
    });
  }

  render() {
    const { musicsList, singerName, albumName, imgUrl } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ singerName }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
        <img src={ imgUrl } alt={ albumName } />
        { musicsList.map((music, index) => (
          <div key={ index }>
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              music={ music }
            />
          </div>
        )) }

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default Album;
