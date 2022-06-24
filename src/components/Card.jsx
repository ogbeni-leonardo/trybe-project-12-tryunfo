import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Card.module.css';

export default class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardAttr4,
      cardAttr5,
      cardAttr6,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div className={ styles.card }>
        <h1 data-testid="name-card">{cardName}</h1>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p data-testid="description-card">{cardDescription}</p>
        <p data-testid="attr1-card">{cardAttr1}</p>
        <p data-testid="attr2-card">{cardAttr2}</p>
        <p data-testid="attr3-card">{cardAttr3}</p>
        <p data-testid="attr4-card">{cardAttr4}</p>
        <p data-testid="attr5-card">{cardAttr5}</p>
        <p data-testid="attr6-card">{cardAttr6}</p>
        <p data-testid="rare-card">{cardRare}</p>
        { cardTrunfo && (<p data-testid="trunfo-card">Super Trunfo</p>) }
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardAttr4: PropTypes.string.isRequired,
  cardAttr5: PropTypes.string.isRequired,
  cardAttr6: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};
