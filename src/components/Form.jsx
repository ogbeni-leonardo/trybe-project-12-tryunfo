import React, { Component } from 'react';
import './Form.module.css';

export default class Form extends Component {
  render() {
    return (
      <form>
        <h1>Adicione uma nova carta</h1>
        <label htmlFor="name">
          Nome da carta:
          <input type="text" id="name" data-testid="name-input" />
        </label>

        <label htmlFor="description">
          Descrição:
          <textarea data-testid="description-input" value="" readOnly>
            Nada aqui ainda....
          </textarea>
        </label>

        <label htmlFor="intelligence">
          Inteligência:
          <input type="number" id="intelligence" data-testid="attr1-input" />
        </label>

        <label htmlFor="strength">
          Força:
          <input type="number" id="strength" data-testid="attr2-input" />
        </label>

        <label htmlFor="speed">
          Velocidade:
          <input type="number" id="speed" data-testid="attr3-input" />
        </label>

        <label htmlFor="durability">
          Resistência:
          <input type="number" id="durability" data-testid="attr4-input" />
        </label>

        <label htmlFor="power">
          Poder:
          <input type="number" id="power" data-testid="attr5-input" />
        </label>

        <label htmlFor="combat">
          Habilidade em combate:
          <input type="number" id="combat" data-testid="attr6-input" />
        </label>

        <label htmlFor="image">
          URL da imagem:
          <input type="text" id="image" data-testid="image-input" />
        </label>

        <label htmlFor="type">
          <select id="type" data-testid="rare-input">
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo">
          <input type="checkbox" id="trunfo" data-testid="trunfo-input" />
          Esta carta é um super trunfo.
        </label>

        <button type="button" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}
