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
      <section className={ styles.filtersArea }>
        <h1 className={ styles.filtersTitle }>Filtro de Pesquisa</h1>

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

        <div className={ styles.optionsArea }>
          <label htmlFor="cardType" className={ styles.selectLabel }>
            Filtrar por tipo:
            <select
              data-testid="rare-filter"
              disabled={ selectDisabled }
              id="cardType"
              name="rareFilter"
              onChange={ onInputChange }
              value={ rareFilter }
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
          </label>

          <label htmlFor="trunfoFilter" className={ styles.trunfoCheck }>
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
      </section>
    );
  }
}

SearchArea.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  rareFilter: PropTypes.string.isRequired,
  trunfoFilter: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
