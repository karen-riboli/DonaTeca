import NewBookForm from './components/NewBookForm.jsx';
import { useEffect, useState } from 'react';
import BookList from './components/BookList.jsx';
import '/src/styles/App.css';

function App() {
  const [books, setBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  const [deletingBookId, setDeletingBookId] = useState(null);

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
        setLoadingError
          (err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      setDeletingBookId(id);

      const response = await fetch(`/api/books/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error("Erro ao excluir livro");
      }

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== id)
      );

    } finally {
      setDeletingBookId(null);
    }
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

  if (loadingError) {
    return (
      <>
        <h1>DonaTeca</h1>
        <NewBookForm
          setBooks={setBooks}
        />
        <div className="loadingError">Não foi possível localizar os livros. Erro: {loadingError}</div>
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
        toggleReadStatus={toggleReadStatus}
        deletingBookId={deletingBookId}/>
    </>
  );
}

export default App;
