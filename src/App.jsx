import NewBookForm from './components/NewBookForm.jsx';
import { useEffect, useState } from 'react';
import BookList from './components/BookList.jsx';
import '/src/styles/App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/books', { method: 'GET' });
        const data = await response.json();
        setBooks(
          data.books.map((book) => ({
            ...book,
            isRead: book.is_read,
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const deleteBook = (id) => {
    fetch(`/api/books/${id}`, { method: 'DELETE' }).then((res) => {
      if (res.ok) {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== id)
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
        setBooks((prev) =>
          prev.map((b) => (b.id === book.id ? { ...b, isRead: newValue } : b))
        );
      }
    });
  };

  if (isLoading) {
    return (
      <>
        <h1>DonaTeca</h1>
        <NewBookForm
          setBooks={setBooks}
        />
        <div className="loading">Carregando livros...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>DonaTeca</h1>
        <NewBookForm
          setBooks={setBooks}
        />
        <div className="error">Não foi possível localizar os livros. Erro: {error}</div>
      </>
    );
  }

  return (
    <>
      <h1>DonaTeca</h1>
      <NewBookForm
        setBooks={setBooks}
      />
      <BookList
        books={books}
        setBooks={setBooks}
        deleteBook={deleteBook}
        toggleReadStatus={toggleReadStatus} />
    </>
  );
}

export default App;
