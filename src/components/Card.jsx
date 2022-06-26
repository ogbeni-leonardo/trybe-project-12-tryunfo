import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Card.css';

export default class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    let cardType;
    if (cardRare === 'normal') cardType = 'normal';
    else if (cardRare === 'raro') cardType = 'rare';
    else cardType = 'legend';

    return (
      <div className="card">
        <div className={ `cardContent ${cardType}` }>
          <h1 data-testid="rare-card" className="type">{cardRare}</h1>

          <div
            className="imageContainer"
            style={ { backgroundImage: `url("${cardImage}")` } }
          >
            <img
              data-testid="image-card"
              src={ cardImage }
              alt={ cardName }
              className="image"
            />
            <h1 data-testid="name-card" className="name">{cardName}</h1>
            { cardTrunfo
              && (<p data-testid="trunfo-card" className="trunfoCard">Super Trunfo</p>) }
          </div>

          <div className="descriptionContainer">
            <p
              data-testid="description-card"
              className="description"
            >
              {cardDescription}
            </p>
          </div>

          <div className="attributes">
            <p
              data-testid="attr1-card"
              className="attribute"
            >
              <strong>Poder: </strong>
              {cardAttr1}
            </p>

            <p
              data-testid="attr2-card"
              className="attribute"
            >
              <strong>Combate: </strong>
              {cardAttr2}
            </p>

            <p
              data-testid="attr3-card"
              className="attribute"
            >
              <strong>Resistência: </strong>
              {cardAttr3}
            </p>
          </div>
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
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};
