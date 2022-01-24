import React, { useEffect, useState } from 'react';
import './App.css';

// Card stuff
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {

  if (!process.env.REACT_APP_BACKEND_URL) {
    console.error("Missing $REACT_APP_BACKEND_URL environment variable")
  }

  const getBooks = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/books`)
      .then(response => response.json())
      .then(data => setCards(data))
      .catch((err) => {
        console.error("error fetching books", err)
      });
  }

  const deleteBook = (id: string) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/books/${id}`, { method: 'DELETE' })
      .then(() => {
        let newCards = cards;
        setCards(newCards.filter((book: any) => book.id !== id));
      }).catch((err) => {
        console.error("error deleting book", err)
      });;
  }

  // Grab a list of movies
  useEffect(() => {
    getBooks();
  }, [])

  const [cards, setCards] = useState([])

  return (
    <div className="App">
      {cards.map((book: any, index) => {
        return <Box key={index} sx={{ m: 2, maxWidth: "500px" }}>
          <Card variant="outlined">
            <CardContent>
              <Rating
                name="simple-controlled"
                value={book.rating}
                readOnly={true}
              />
              <Typography variant="h5" component="div">
                {book.name}
              </Typography>
              <Typography variant="body2">
                {book.description.replaceAll("�", "")}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" sx={{ marginLeft: "auto" }} onClick={() => deleteBook(book.id)}>Delete</Button>
            </CardActions>
          </Card>
        </Box>
      })}
    </div >
  );
}

export default App;