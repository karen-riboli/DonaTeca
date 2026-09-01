import BookForm from './BookForm.jsx';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { API_URL } from '../api';

const NewBookForm = ({ setBooks }) => {
  const [isActive, setIsActive] = useState(false);
  const [newBook, setNewBook] = useState({
    id: null,
    title: '',
    author: '',
    isRead: false,
  });

  const [isAdding, setIsAdding] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaveError(null);
      setIsAdding(true);
      
      const response = await fetch(`${API_URL}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar livro');
      }

      const book = await response.json();
      setBooks((prev) => [
        ...prev,
        {
          ...book.data[0],
          isRead: book.data[0].is_read,
        },
      ]);
      setNewBook({
        id: null,
        title: '',
        author: '',
        isRead: false,
      });
      setIsActive(false);
    } catch (error) {
      setSaveError('Não foi possível salvar as alterações.');
      console.error(error);      
    } finally {
      setIsAdding(false);
    }
  };

  if (isActive) {
    return (
      <div className="book-form-card">
        <BookForm
          book={newBook}
          setBook={setNewBook}
          handleSubmit={handleSubmit}
          buttonText={isAdding ? 'Adicionando livro' : 'Adicionar livro'}
          formTitle="Adicionar Livro"
          goBack={() => setIsActive(false)}
          isSaving={isAdding}
          saveError={saveError}
        />
      </div>
    );
  }

  return (
    <div className="book-form-card book-form-activate" onClick={() => setIsActive(true)}>
      <h2>
        <FaPlus />
        Adicionar Livro
      </h2>
    </div>
  );
};

export default NewBookForm;
