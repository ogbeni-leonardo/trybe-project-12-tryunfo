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
      /* cardAttr4,
      cardAttr5,
      cardAttr6, */
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div className={ styles.card }>
        <h1 data-testid="name-card" className={ styles.name }>{cardName}</h1>

        <div
          className={ styles.imageContainer }
          style={ { backgroundImage: `url("${cardImage}")` } }
        >
          <img
            data-testid="image-card"
            src={ cardImage }
            alt={ cardName }
            className={ styles.image }
          />
        </div>

        <div className={ styles.infos }>
          <p data-testid="description-card">
            <strong>Descrição: </strong>
            {cardDescription}
          </p>
          <p data-testid="attr1-card">
            <strong>Inteligência: </strong>
            {cardAttr1}
          </p>
          <p data-testid="attr2-card">
            <strong>Força: </strong>
            {cardAttr2}
          </p>
          <p data-testid="attr3-card">
            <strong>Velocidade: </strong>
            {cardAttr3}
          </p>
          {/* <p data-testid="attr4-card">
            <strong>Resistência: </strong>
            {cardAttr4}
          </p>
          <p data-testid="attr5-card">
            <strong>Poder: </strong>
            {cardAttr5}
          </p>
          <p data-testid="attr6-card">
            <strong>Habilidades em combate: </strong>
            {cardAttr6}
          </p> */}

          <p data-testid="rare-card">{cardRare}</p>
          { cardTrunfo && (<p data-testid="trunfo-card">Super Trunfo</p>) }
        </div>
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
  /* cardAttr4: PropTypes.string.isRequired,
  cardAttr5: PropTypes.string.isRequired,
  cardAttr6: PropTypes.string.isRequired, */
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};
