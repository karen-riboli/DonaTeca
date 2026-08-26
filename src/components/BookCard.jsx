import { useState } from 'react';
import EditBookForm from './EditBookForm';
import { FaPen, FaTrash, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import '/src/styles/BookCard.css';

const BookCard = ({ book, deleteBook, toggleReadStatus, setBooksList }) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="book-card">
      {isEditable ? (
        <>
          <EditBookForm
            book={book}
            setBooksList={setBooksList}
            setIsEditable={setIsEditable}
            goBack={() => setIsEditable(false)}
          />
        </>
      ) : (
        <>
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button className="read-status" onClick={toggleReadStatus}>
              {book.isRead ? <FaBookmark /> : <FaRegBookmark />}
              <span>{book.isRead ? 'Lido' : 'Não lido'}</span>
            </button>
          </div>
          <div className="book-actions">
            <button onClick={() => setIsEditable(true)}>
              <FaPen />
            </button>
            <button onClick={deleteBook}>
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookCard;
