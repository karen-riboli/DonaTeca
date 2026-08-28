import BookForm from './BookForm.jsx';
import { useState } from 'react';

const EditBookForm = ({ book, setBooks, setIsEditable }) => {
  const [editedBook, setEditedBook] = useState(book);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaveError(null);
      setIsSaving(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      throw new Error('Testing save error'); 

      const response = await fetch(`/api/books/${editedBook.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBook),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar livro');
      }

      const updatedBook = await response.json();
      setBooks((prev) =>
          prev.map((b) =>
            b.id === updatedBook[0].id
              ? {
                  ...updatedBook[0],
                  isRead: updatedBook[0].is_read,
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
