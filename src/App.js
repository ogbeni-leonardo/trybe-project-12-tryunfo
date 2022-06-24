import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

const defaultProps = {
  cardName: 'Nome da carta',
  cardDescription: 'Descrição da carta',
  cardAttr1: '12',
  cardAttr2: '34',
  cardAttr3: '56',
  cardAttr4: '90',
  cardAttr5: '12',
  cardAttr6: '76',
  cardImage: 'url-to-image',
  cardRare: 'raro',
  cardTrunfo: true,
  hasTrunfo: false,
  isSaveButtonDisabled: false,
  onInputChange: () => { },
  onSaveButtonClick: () => { },
};

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
  hasTrunfo,
  isSaveButtonDisabled,
  onInputChange,
  onSaveButtonClick,
} = defaultProps;

class App extends React.Component {
  render() {
    return (
      <div>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardAttr4={ cardAttr4 }
          cardAttr5={ cardAttr5 }
          cardAttr6={ cardAttr6 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ onInputChange }
          onSaveButtonClick={ onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardAttr4={ cardAttr4 }
          cardAttr5={ cardAttr5 }
          cardAttr6={ cardAttr6 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
