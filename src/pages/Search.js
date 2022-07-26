import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';

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
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              name="singerName"
              onChange={ handleChange }
              value={ singerName }
              data-testid="search-artist-input"
              id="search-artist-input"
              placeholder="Nome do Artista"
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ this.isButtonDisabled() }
            onClick={ getSearchButton }
          >
            Procurar
          </button>
        </form>
        { artistResultsList.length === 0
          ? <h4>Nenhum álbum foi encontrado</h4>
          : <h4>{ `Resultado de álbuns de: ${singerInput}` }</h4>}
        { loadingApi ? <Loading /> : artistResultsList.map((artist, index) => (
          <div key={ index }>
            <Link
              to={ `/album/${artist.collectionId}` }
              data-testid={ `link-to-album-${artist.collectionId}` }
            >
              <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
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
