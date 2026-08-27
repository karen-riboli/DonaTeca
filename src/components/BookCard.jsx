import { useState } from 'react';
import EditBookForm from './EditBookForm';
import { FaPen, FaTrash, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import '/src/styles/BookCard.css';

const BookCard = ({ book, deleteBook, toggleReadStatus, setBooks }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);

  return (
    <div className="book-card">
      {isEditable ? (
        <>
          <EditBookForm
            book={book}
            setBooks={setBooks}
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
            <button onClick={()=>setDeleteWarning(true)}>
              <FaTrash />
            </button>
          </div>
        </>
      )}
        {deleteWarning && (
          <>
          <div className="card-overlay" />
          <div className="delete-confirmation">
            <h3>Tem certeza que deseja excluir o livro "{book.title}"?</h3>
            <p>⚠️ Esta ação não poderá ser desfeita</p>
            <div className="delete-confirmation-buttons">
            <button className="cancel-button" onClick={()=>setDeleteWarning(false)}>Cancelar</button>
            <button className="delete-button" onClick={deleteBook}>Excluir</button>
            </div>
          </div>
          </>
        )}      
    </div>
  );
};

export default BookCard;
