import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import './App.css';
import Form from './components/Form';
import Card from './components/Card';

import defaultCards from './data';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ...this.initialState(),
      hasTrunfo: false,
      search: '',
      allCards: { saved: [], default: [...defaultCards] },
      rareFilter: 'todas',
    };
  }

  initialState = () => ({
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
  })

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type !== 'checkbox') ? target.value : target.checked;

    this.setState({ [name]: value }, () => this.validateEntries());
  }

  validateEntries = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;

    const hasValidTextInputs = [
      cardName,
      cardDescription,
      cardImage,
      cardRare,
    ].every(({ length }) => length > 0);

    const MIN_VALUE = 0;
    const MAX_VALUE = 90;
    const MAX_TOTAL = 210;

    const hasValidAttributes = [
      cardAttr1,
      cardAttr2,
      cardAttr3,
    ].every((value) => {
      const valueToInt = parseInt(value, 10);
      return (valueToInt >= MIN_VALUE && valueToInt <= MAX_VALUE);
    });

    const hasValidTotal = parseInt(cardAttr1, 10)
      + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10) <= MAX_TOTAL;

    this.setState({ isSaveButtonDisabled: !(hasValidTextInputs
      && hasValidAttributes && hasValidTotal) });
  }

  onSaveButtonClick = () => {
    const {
      cardName,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardDescription,
      cardTrunfo,
      hasTrunfo,
    } = this.state;

    if (cardTrunfo) this.setState({ hasTrunfo: cardTrunfo });

    this.setState((previous) => ({
      allCards: { saved: [...previous.allCards.saved, {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
        hasTrunfo,
      }],
      default: [...previous.allCards.default] },
    }));

    this.setState(this.initialState);
  }

  removeCard = (name) => {
    this.setState((previous) => ({
      allCards: {
        saved: [...previous.allCards.saved.filter(({ cardName }) => (cardName !== name))],
        default: [...previous.allCards.default],
      } }));

    this.setState((previous) => ({
      hasTrunfo: previous.allCards.saved.some(({ hasTrunfo }) => hasTrunfo),
    }));
  }

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
      search,
      allCards,
      rareFilter,
    } = this.state;

    return (
      <div className="content">
        <div className="newCard">
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <hr />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </div>

        <div className="searchArea">
          <h1 className="searchTitle">Filtro de Pesquisa</h1>
          <div className="inputArea">
            <input
              type="text"
              data-testid="name-filter"
              className="search"
              placeholder="Digite o nome da carta"
              value={ search }
              onChange={ ({ target }) => this.setState({ search: target.value }) }
            />
            <BiSearchAlt className="searchIcon" />
          </div>
          <div className="filters">
            <select
              data-testid="rare-filter"
              value={ rareFilter }
              onChange={ ({ target }) => this.setState({ rareFilter: target.value }) }
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
              <option value="todas">Todas</option>
            </select>
          </div>
        </div>

        <div className="savedCards">
          { allCards.saved
            .filter((card) => (card.cardName.toLowerCase()
              .includes(search.toLowerCase())))
            .filter((card) => (card.cardRare === rareFilter || rareFilter === 'todas'))
            .map((card, index) => (
              <div key={ index }>
                <Card
                  cardName={ card.cardName }
                  cardDescription={ card.cardDescription }
                  cardAttr1={ card.cardAttr1 }
                  cardAttr2={ card.cardAttr2 }
                  cardAttr3={ card.cardAttr3 }
                  cardImage={ card.cardImage }
                  cardRare={ card.cardRare }
                  cardTrunfo={ card.cardTrunfo }
                />
                <button
                  type="button"
                  data-testid="delete-button"
                  onClick={ () => this.removeCard(card.cardName) }
                >
                  Excluir
                </button>
              </div>)) }

          { allCards.default
            .filter((card) => (card.cardName.toLowerCase()
              .includes(search.toLowerCase())))
            .filter((card) => (card.cardRare === rareFilter || rareFilter === 'todas'))
            .map((card, index) => (
              <Card
                key={ index }
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />)) }
        </div>
      </div>
    );
  }
}

export default App;
