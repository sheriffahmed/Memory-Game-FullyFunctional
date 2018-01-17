import React from "react";
import { render } from "react-dom";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const CARD_BACK_IMG = "https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/back.png";
const APPLE_IMG = "https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/apple.png";
const CLOVER_IMG = "https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/clover.png";
const STAR_IMG = "https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/star.png";
const KEY_IMG = "https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/key.png";

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
  }

  render() {
    const { id, img, type, selected, onSelect } = this.props;
  
    return (
      <div
        style={{
          display: 'inline',
          paddingRight: 10,
          paddingBottom: 5
        }}
        id={id}
        onClick={() => {
          onSelect(id, type)
        }}
      >
        {selected ?
          <img
            src={img}
            name={id}
            alt="id"
          />
          :
          <img
            src={CARD_BACK_IMG}
            name="back"
            alt="back"
          />
        }
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: shuffle([
        {
          "id": "apple-1",
          "img": APPLE_IMG,
          "type": "apple"
        },
        {
          "id": "apple-2",
          "img": APPLE_IMG,
          "type": "apple"
        },
        {
          "id": "clover-1",
          "img": CLOVER_IMG,
          "type": "clover"
        },
        {
          "id": "clover-2",
          "img": CLOVER_IMG,
          "type": "clover"
          
        },
        {
          "id": "start-1",
          "img": STAR_IMG,
          "type": "star"
        },
        {
          "id": "start-2",
          "img": STAR_IMG,
          "type": "star"
        },
        {
          "id": "key-1",
          "img": KEY_IMG,
          "type": "key"
        },
        {
          "id": "key-2",
          "img": KEY_IMG,
          "type": "key"
        }
      ]),
      selected: {},
      matchedTypes: {},
      winningMatches: 4,
      numMatches: 0,
      statusMessage: '',
      timeoutId: 0
    };
  }

  shuffleCards = () => {
    this.setState({
      cards: shuffle([...this.state.cards])
    });
  };

  onSelectCard = (id, type) => {
    const { 
      selected: oldSelected,
      matchedTypes,
      numMatches: oldNumMatches,
      winningMatches,
      timeoutId
    } = this.state;

    const oldSelectedIds = Object.keys(oldSelected);
    let selected = null;
    if (oldSelectedIds.length === 2) {
        clearTimeout(timeoutId);
        selected = { [id]: type };
    } else {
      selected = { ...oldSelected, [id]: type };
    }
    this.setState({ selected })

    const selectedIds = Object.keys(selected);
    if (selectedIds.length !== 2) {
      return;
    }

    const firstSelectionType = selected[selectedIds[0]];
    const secondSelectionType = selected[selectedIds[1]];
  
    if (firstSelectionType === secondSelectionType) {
      const numMatches = oldNumMatches + 1;
      this.setState({
        matchedTypes: {
          ...matchedTypes,
          [firstSelectionType]: true,
        },
        selected: {},
        numMatches
      });
      if (numMatches === winningMatches) {
        this.setState({
          statusMessage: 'You Win!'
        });
      }
    } else {
      this.resetSelected(500);
    }
  }

  resetSelected = (ms) => {
    const timeoutId = setTimeout(() => {
      this.setState({
        selected: {}
      })
    }, ms);
    this.setState({
      timeoutId
    })
  }

  reset = () => {
    this.setState({
      statusMessage: '',
      matchedTypes: {},
      selected: {},
      numMatches: 0      
    });
    this.shuffleCards();
  }

  render() {
    const { cards, selected, matchedTypes, statusMessage } = this.state;
    return (
      <div>
        <h1>Memory Game</h1>
        <div id="board" style={{width:'300px'}}>
          {cards.map(({ id, img, type }) => 
            <Card
              id={id}
              img={img}
              type={type}
              onSelect={this.onSelectCard}
              selected={selected[id] || matchedTypes[type]}
            />
          )}
        </div>
        <button onClick={this.reset}>Start/Reset</button>
        <br />
        <p>{statusMessage}</p>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
