import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSuperpowers } from 'react-icons/fa';
import { GiSwordsPower, GiNinjaHeroicStance } from 'react-icons/gi';
import { RiImageAddLine } from 'react-icons/ri';
import { BiRename } from 'react-icons/bi';

import './Form.css';

export default class Form extends Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form className="form">
        <h1 className="formTitle">Crie uma nova carta</h1>
        <label htmlFor="name" className="cardName">
          <BiRename className="icon nameIcon" />
          <input
            type="text"
            id="name"
            name="cardName"
            data-testid="name-input"
            placeholder="Digite o nome da carta"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="image" className="addImage">
          <RiImageAddLine className="icon imageIcon" />
          <input
            type="text"
            id="image"
            data-testid="image-input"
            name="cardImage"
            placeholder="URL da imagem..."
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="power" className="addAttribute addPower">
          <FaSuperpowers className="icon powerIcon" />
          <span>Poder:</span>
          <input
            type="number"
            id="power"
            data-testid="attr1-input"
            max={ 90 }
            min={ 0 }
            name="cardAttr1"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="combat" className="addAttribute addCombat">
          <GiSwordsPower className="icon combatIcon" />
          <span>Combate:</span>
          <input
            type="number"
            id="combat"
            data-testid="attr2-input"
            max={ 90 }
            min={ 0 }
            name="cardAttr2"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="durability" className="addAttribute addDurability">
          <GiNinjaHeroicStance className="icon durabilityIcon" />
          <span>Resistência:</span>
          <input
            type="number"
            id="durability"
            data-testid="attr3-input"
            max={ 90 }
            min={ 0 }
            name="cardAttr3"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="type" className="cardType">
          <span>Tipo da carta:</span>
          <select
            id="type"
            data-testid="rare-input"
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>

        <label htmlFor="description" className="descriptionArea">
          <span>Descrição:</span>
          <textarea
            data-testid="description-input"
            name="cardDescription"
            placeholder="Dê uma descrição a este personagem..."
            value={ cardDescription }
            onChange={ onInputChange }
          >
            Nada ainda...
          </textarea>
        </label>

        { !hasTrunfo ? (
          <label htmlFor="trunfo" className="trunfo">
            <input
              type="checkbox"
              id="trunfo"
              data-testid="trunfo-input"
              name="cardTrunfo"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
            Esta carta é um super trunfo.
          </label>
        ) : <p className="hasTrunfo">Você já tem um Super Trunfo em seu baralho.</p>}

        <button
          type="button"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          className="formButton"
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
