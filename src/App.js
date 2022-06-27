import React from 'react';

import styles from './App.module.css';
import Form from './components/Form';
import Card from './components/Card';
import SearchArea from './components/SearchArea';

import defaultCards from './data';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ...this.initialState(),
      hasTrunfo: false,
      allCards: { saved: [], default: [...defaultCards] },
      searchFilter: '',
      rareFilter: 'todas',
      trunfoFilter: false,
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

    if (cardTrunfo) this.setState({ hasTrunfo: true });

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
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardDescription,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      allCards,
      searchFilter,
      rareFilter,
      trunfoFilter,
    } = this.state;

    return (
      <div className={ styles.content }>
        <section className={ styles.newCardArea }>
          <Form
            cardName={ cardName }
            cardImage={ cardImage }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardRare={ cardRare }
            cardDescription={ cardDescription }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <hr />
          <Card
            cardName={ cardName }
            cardImage={ cardImage }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardRare={ cardRare }
            cardDescription={ cardDescription }
            cardTrunfo={ cardTrunfo }
          />
        </section>

        <SearchArea
          searchFilter={ searchFilter }
          rareFilter={ rareFilter }
          trunfoFilter={ trunfoFilter }
          onInputChange={ this.onInputChange }
        />

        <div className={ styles.cards }>
          { allCards.saved
            .filter((card) => ((!trunfoFilter && card.cardName.toLowerCase()
              .includes(searchFilter.toLowerCase())) || trunfoFilter))
            .filter((card) => (
              ((card.cardRare === rareFilter || rareFilter === 'todas') && !trunfoFilter)
              || trunfoFilter))
            .filter((card) => ((trunfoFilter && card.cardTrunfo) || !trunfoFilter))
            .map((card, index) => (
              <div key={ index } className={ styles.savedCards }>
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
                  className={ styles.deleteButton }
                  data-testid="delete-button"
                  onClick={ () => this.removeCard(card.cardName) }
                  type="button"
                >
                  Excluir
                </button>
              </div>)) }

          { allCards.default
            .filter((card) => ((!trunfoFilter && card.cardName.toLowerCase()
              .includes(searchFilter.toLowerCase())) || trunfoFilter))
            .filter((card) => (
              ((card.cardRare === rareFilter || rareFilter === 'todas') && !trunfoFilter)
              || trunfoFilter))
            .filter((card) => ((trunfoFilter && card.cardTrunfo) || !trunfoFilter))
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
        <footer className={ styles.footer }>
          Projeto desenvolvido por Leonardo C Araújo &ndash; 26/06/2022.
        </footer>
      </div>
    );
  }
}

export default App;
