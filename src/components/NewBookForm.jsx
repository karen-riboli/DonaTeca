import BookForm from './BookForm.jsx';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const NewBookForm = ({ setBooks }) => {
  const [isActive, setIsActive] = useState(false);
  const [newBook, setNewBook] = useState({
    id: null,
    title: '',
    author: '',
    isRead: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((result) => {
        setBooks((prev) => [
          ...prev,
          {
            ...result.data[0],
            isRead: result.data[0].is_read,
          },
        ]);
        setNewBook({
          id: null,
          title: '',
          author: '',
          isRead: false,
        });
        setIsActive(false);
      })
      .catch((err) => {
        console.error('Failed to create book:', err);
      });
  };

  if (isActive) {
    return (
      <div className="book-form-card">
        <BookForm
          book={newBook}
          setBook={setNewBook}
          handleSubmit={handleSubmit}
          buttonText="Adicionar Livro"
          formTitle="Adicionar Livro"
          goBack={() => setIsActive(false)}
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
