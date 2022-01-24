import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
 
const Card = ({ book }: {book: any}) => {
  
  // remove encoding errors
  book.description = book.description.replaceAll("�", "");

  return (
  <div>
    <h1>{book.name}2 </h1>
    <p>{book.description}</p>
    <hr />
    <p>{book.rating}/5</p>
  </div>
  );
}
 
function App() {
 
  // Grab a list of movies
  useEffect(() => {
    fetch('https://8080--bookshop-wip-stable--benpotter.stable.cdr.dev/v1/books')
      .then(response => response.json())
      .then(data => setCards(data));
  }, [])
 
  const [cards, setCards] = useState([])
 
  return (
    <div className="App">
      {cards.map((item: any, index) => {
        return <Card key={index} book={item} />
      })}
    </div>
  );
}
 
export default App;