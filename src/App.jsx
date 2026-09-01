import NewBookForm from './components/NewBookForm.jsx';
import { useEffect, useState } from 'react';
import BookList from './components/BookList.jsx';
import { API_URL } from './api';
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
        const response = await fetch(`${API_URL}/api/books`, { method: 'GET' });
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

      const response = await fetch(`${API_URL}/api/books/${id}`, { method: 'DELETE' });

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
    fetch(`${API_URL}/api/books/${book.id}`, {
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

  return (
    <>
      <header className="app-header">
        <h1>DonaTeca</h1>
        <p className="subtitle">
          Gerencie sua coleção de livros
        </p>
        <p className="demo-notice">
          Projeto de demonstração para portfólio. Os livros cadastrados ficam visíveis para todos os visitantes.
        </p>
      </header>
      <NewBookForm
        setBooks={setBooks}
      />
      {isLoading ? (
        <div className="loading">Carregando livros...</div>
      ) : loadingError ? (
        <div className="loadingError">Não foi possível localizar os livros. Erro: {loadingError}</div>
      ) : (
        <BookList
          books={books}
          setBooks={setBooks}
          deleteBook={deleteBook}
          toggleReadStatus={toggleReadStatus}
          deletingBookId={deletingBookId} />
      )}
    </>
  );
}

export default App;
