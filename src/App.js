import React from 'react';
import './App.css';

import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ...this.initialState(),
      cardTrunfo: false,
      hasTrunfo: false,
      allSavedCards: [],
    };
  }

  initialState = () => ({
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'Normal',
    isSaveButtonDisabled: true,
  })

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type !== 'checkbox') ? target.value : target.checked;

    this.setState({
      [name]: value,
    }, () => this.validateEntries());
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

  onSaveButtonClick = (event) => {
    event.preventDefault();

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
    } = this.state;

    if (cardTrunfo) this.setState({ hasTrunfo: cardTrunfo });

    this.setState((previous) => ({
      allSavedCards: [...previous.allSavedCards, {
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
    }));

    this.setState(this.initialState);
  }

  removeCard = (name) => {
    this.setState((previous) => ({
      allSavedCards: previous.allSavedCards.filter(({ cardName }) => cardName !== name),
    }));

    this.setState((previous) => ({
      hasTrunfo: previous.allSavedCards.some(({ hasTrunfo }) => hasTrunfo),
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
      allSavedCards,
    } = this.state;

    return (
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
        <div>

          { allSavedCards.map((card, index) => (
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
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
