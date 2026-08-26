import NewBookForm from './components/NewBookForm.jsx';
import { useEffect, useState } from 'react';
import BookCard from './components/BookCard.jsx';
import '/src/styles/App.css';

function App() {
  const [booksList, setBooksList] = useState([]);
  const [book, setBook] = useState({
    id: null,
    title: '',
    author: '',
    isRead: false,
  });

  useEffect(() => {
    fetch('/api/books', { method: 'GET' })
      .then((res) => res.json())
      .then((data) =>
        setBooksList(
          data.books.map((book) => ({
            ...book,
            isRead: book.is_read,
          }))
        )
      );
  }, []);

  const deleteBook = (id) => {
    fetch(`/api/books/${id}`, { method: 'DELETE' }).then((res) => {
      if (res.ok) {
        setBooksList((prevBooksList) =>
          prevBooksList.filter((book) => book.id !== id)
        );
      }
    });
  };

  const toggleReadStatus = (book) => {
    const newValue = !book.isRead;
    fetch(`/api/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isRead: newValue,
      }),
    }).then((res) => {
      if (res.ok) {
        setBooksList((prev) =>
          prev.map((b) => (b.id === book.id ? { ...b, isRead: newValue } : b))
        );
      }
    });
  };
  return (
    <>
      <h1>DonaTeca</h1>
        <NewBookForm
          book={book}
          setBook={setBook}
          setBooksList={setBooksList}
        />
      <ul className="books-list">
        {booksList.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            deleteBook={() => deleteBook(book.id)}
            toggleReadStatus={() => toggleReadStatus(book)}
            setBooksList={setBooksList}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
