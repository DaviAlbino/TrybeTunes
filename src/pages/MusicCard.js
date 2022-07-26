import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react/cjs/react.production.min';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
    state ={
      loadingApi: false,
      checked: false,
    }

    componentDidMount = () => {
      this.handleFavovites();
    }

    getFavorite = async () => {
      const { music } = this.props;
      this.setState({
        loadingApi: true,
      });

      await addSong(music);
      this.setState({
        loadingApi: false,
      });
    }

    deleteFavorite = async () => {
      const { music } = this.props;
      this.setState({ loadingApi: true });
      await removeSong(music);
      this.setState({ loadingApi: false });
    }

    handleCheck = ({ target }) => {
      const { checked } = target;
      if (checked) {
        this.setState({ checked }, this.getFavorite);
      } else {
        this.setState({ checked }, this.deleteFavorite);
      }
    };

    handleFavovites = async () => {
      const { music } = this.props;
      const myFavorites = await getFavoriteSongs();
      const favoritesCheck = myFavorites
        .some((favorite) => favorite.trackId === music.trackId);
      this.setState({
        checked: favoritesCheck,
      });
    }

    render() {
      const { loadingApi, checked } = this.state;
      const { trackName, previewUrl, music } = this.props;
      const { trackId } = music;
      return (
        <div>
          { loadingApi && <Loading />}
          <h5>{ trackName }</h5>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>

          <label htmlFor="favorite">
            Favorita
            <input
              name="favorite"
              type="checkbox"
              onChange={ this.handleCheck }
              data-testid={ `checkbox-music-${trackId}` }
              checked={ checked }
            />

          </label>
        </div>
      );
    }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.func,
}.isRequired;

export default MusicCard;
