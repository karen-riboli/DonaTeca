import BookForm from './BookForm.jsx';
import { useState } from 'react';
import { API_URL } from '../api';

const EditBookForm = ({ book, setBooks, setIsEditable }) => {
  const [editedBook, setEditedBook] = useState(book);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaveError(null);
      setIsSaving(true);

      const response = await fetch(`${API_URL}/api/books/${editedBook.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBook),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      const updatedBook = data.books[0];
      setBooks((prev) =>
          prev.map((b) =>
            b.id === updatedBook.id
              ? {
                  ...updatedBook,
                  isRead: updatedBook.is_read,
                }
              : b
          )
        );
        
        setIsEditable(false);
    } catch (error) {
      setSaveError('Não foi possível salvar as alterações.');
      console.error(error);
    } finally {

      setIsSaving(false);
    }
  };

  return (
    <BookForm
      book={editedBook}
      setBook={setEditedBook}
      handleSubmit={handleSubmit}
      buttonText={isSaving ? 'Salvando...' : 'Salvar Alterações'}
      formTitle="Editar livro"
      goBack={() => setIsEditable(false)}
      isSaving={isSaving}
      saveError={saveError}
    />
  );
};

export default EditBookForm;
