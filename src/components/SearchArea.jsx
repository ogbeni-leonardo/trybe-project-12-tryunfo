import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';

import styles from './SearchArea.module.css';

export default class SearchArea extends Component {
  constructor() {
    super();

    this.state = {
      inputDisabled: false,
      selectDisabled: false,
    };
  }

  onCheck = (event, callback) => {
    this.setState({
      inputDisabled: event.target.checked,
      selectDisabled: event.target.checked,
    });

    callback(event);
  }

  render() {
    const {
      searchFilter,
      rareFilter,
      trunfoFilter,
      onInputChange,
    } = this.props;

    const { inputDisabled, selectDisabled } = this.state;

    return (
      <div className={ styles.searchArea }>
        <h1 className={ styles.searchTitle }>Filtro de Pesquisa</h1>

        <div className={ styles.inputArea }>
          <input
            className={ styles.inputSearch }
            data-testid="name-filter"
            disabled={ inputDisabled }
            name="searchFilter"
            onChange={ onInputChange }
            placeholder="Digite o nome da carta"
            type="text"
            value={ searchFilter }
          />
          <BiSearchAlt className={ styles.searchIcon } />
        </div>

        <div className="filters">
          <select
            data-testid="rare-filter"
            name="rareFilter"
            value={ rareFilter }
            onChange={ onInputChange }
            disabled={ selectDisabled }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
            <option value="todas">Todas</option>
          </select>
          <label htmlFor="trunfoFilter">
            <input
              data-testid="trunfo-filter"
              id="trunfoFilter"
              name="trunfoFilter"
              onChange={ (event) => this.onCheck(event, onInputChange) }
              type="checkbox"
              value={ trunfoFilter }
            />
            Super Trunfo
          </label>
        </div>
      </div>
    );
  }
}

SearchArea.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  rareFilter: PropTypes.string.isRequired,
  trunfoFilter: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
