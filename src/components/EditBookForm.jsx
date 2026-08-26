import BookForm from './BookForm.jsx';
import { useState } from 'react';

const EditBookForm = ({ book, setBooksList, setIsEditable }) => {
  const [editedBook, setEditedBook] = useState(book);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/books/${editedBook.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedBook),
    })
      .then((res) => res.json())
      .then((updatedBook) => {
        setBooksList((prev) =>
          prev.map((b) =>
            b.id === updatedBook[0].id
              ? {
                  ...updatedBook[0],
                  isRead: updatedBook[0].is_read,
                }
              : b
          )
        );
      })
      .then(() => setIsEditable(false))
      .catch((err) => {
        console.error('Failed to edit book:', err);
      });
  };

  return (
    <BookForm
      book={editedBook}
      setBook={setEditedBook}
      handleSubmit={handleSubmit}
      buttonText="Salvar Alterações"
      formTitle="Editar livro"
      goBack={() => setIsEditable(false)}
    />
  );
};

export default EditBookForm;
