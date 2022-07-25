import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Search extends React.Component {
  isButtonDisabled = () => {
    const { singerName } = this.props;
    const TWO = 2;
    if (singerName.length < TWO) {
      return true;
    }
    return false;
  }

  render() {
    const { singerName, handleChange } = this.props;
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
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  singerName: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;

export default Search;
