import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import '../CSS/search.css';

class Search extends React.Component {
  isButtonDisabled = () => {
    const {
      singerName,
    } = this.props;
    const TWO = 2;
    if (singerName.length < TWO) {
      return true;
    }
    return false;
  }

  render() {
    const {
      singerName,
      handleChange,
      getSearchButton,
      artistResultsList,
      loadingApi,
      singerInput,
    } = this.props;
    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        <form className="searchForm">
          <label htmlFor="search-artist-input" className="search">
            <input
              name="singerName"
              onChange={ handleChange }
              value={ singerName }
              data-testid="search-artist-input"
              id="search-artist-input"
              placeholder="Artista"
              className="inputArtist"
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ this.isButtonDisabled() }
            onClick={ getSearchButton }
            className="searchButton"
          >
            Search
          </button>
        </form>
        { artistResultsList.length === 0
          ? <h4 className="results">Album not found</h4>
          : <h4 className="results">{ `Resultado de álbuns de: ${singerInput}` }</h4>}
        { loadingApi ? <Loading /> : artistResultsList.map((artist, index) => (
          <div key={ index } className="album">
            <Link
              to={ `/album/${artist.collectionId}` }
              data-testid={ `link-to-album-${artist.collectionId}` }
              className="detailsLink"
            >
              <img
                src={ artist.artworkUrl100 }
                alt={ artist.artistName }
                className="cover"
              />
              <h3>{ artist.collectionName }</h3>
              <h4>{ artist.artistName }</h4>
            </Link>
          </div>
        )) }
      </div>
    );
  }
}

Search.propTypes = {
  singerName: PropTypes.string,
  handleChange: PropTypes.func,
  getSearchButton: PropTypes.func,
}.isRequired;

export default Search;
