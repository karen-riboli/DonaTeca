import NewBookForm from './components/NewBookForm.jsx';
import SearchBar from './components/SearchBar.jsx';
import { useEffect, useState } from 'react';
import BookList from './components/BookList.jsx';
import { API_URL } from './api';
import '/src/styles/App.css';

function App() {
  const [books, setBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  const [deletingBookId, setDeletingBookId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoadingError(null);
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/books`, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Não foi possível carregar os livros.');
        }

        const data = await response.json();
        setBooks(
          data.books.map((book) => ({
            ...book,
            isRead: book.is_read,
          }))
        );
      } catch (error) {
        setLoadingError(error.message);
        console.error(error);
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

  const toggleReadStatus = async (book) => {
    const newValue = !book.isRead;

    const response = await fetch(`${API_URL}/api/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isRead: newValue,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar status do livro.');
    }

    setBooks((prevBooks) =>
      prevBooks.map((currentBook) => (currentBook.id === book.id ? { ...currentBook, isRead: newValue } : currentBook))
    );
  };

  const search = searchTerm.toLowerCase();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search) ||
    book.author.toLowerCase().includes(search)
  );

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
      {books.length > 0 && (
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      {isLoading ? (
        <div className="loading">Carregando livros...</div>
      ) : loadingError ? (
        <div className="loadingError">Não foi possível localizar os livros. Erro: {loadingError}</div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum livro cadastrado.</p>
          <p>Clique em "Adicionar Livro" para começar.</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum resultado para "{searchTerm}"</p>
        </div>
      ) : (
        <BookList
          books={filteredBooks}
          setBooks={setBooks}
          deleteBook={deleteBook}
          toggleReadStatus={toggleReadStatus}
          deletingBookId={deletingBookId} />
      )}
    </>
  );
}

export default App;
