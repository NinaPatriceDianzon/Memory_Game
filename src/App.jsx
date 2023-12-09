import React, { useState, useEffect } from 'react';
import './App.css';

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const generateCards = () => {
  const symbols = ['🍎', '🍌', '🍒', '🍓', '🍍', '🍇', '🍉', '🍋'];
  const cards = [...symbols, ...symbols];
  return shuffleArray(cards);
};

const App = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedPairs((prev) => [...prev, cards[firstIndex]]);
      }
      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index)) {
      setFlippedIndices((prev) => [...prev, index]);
    }
  };

  const isCardFlipped = (index) => {
    return flippedIndices.includes(index) || matchedPairs.includes(cards[index]);
  };

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${isCardFlipped(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {isCardFlipped(index) ? card : '?'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
