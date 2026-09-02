import { useState } from 'react';
import EditBookForm from './EditBookForm';
import { FaPen, FaTrash, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import '/src/styles/BookCard.css';

const BookCard = ({ book, deleteBook, toggleReadStatus, setBooks, deletingBookId }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);

  const [deleteError, setDeleteError] = useState(null);
  const [statusUpdateError, setStatusUpdateError] = useState(null);

  const isDeleting = deletingBookId === book.id;
  
  const handleDelete = async () => {
    try {
      setDeleteError(null);
      await deleteBook(book.id);
    } catch (error) {
      setDeleteError('Não foi possível excluir o livro.');
      console.error(error);
    }
  }

  const handleUpdate = async () => {
    try {
      setStatusUpdateError(null);
      await toggleReadStatus();
    } catch (error) {
      setStatusUpdateError(error.message);
      console.error(error);
    }
  }

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
            <button className="read-status" onClick={handleUpdate}>
              {book.isRead ? <FaBookmark /> : <FaRegBookmark />}
              <span>{book.isRead ? 'Lido' : 'Não lido'}</span>
            </button>
            {statusUpdateError && <p className="status-update-error">{statusUpdateError}</p>}
          </div>
          <div className="book-actions">
            <button onClick={() => setIsEditable(true)}>
              <FaPen />
            </button>
            <button
              onClick={() => {
                setDeleteError(null);
                setDeleteWarning(true)
              }}>
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
              <button className="cancel-button" onClick={() => setDeleteWarning(false)}>Cancelar</button>
              <button className="delete-button" onClick={handleDelete} disabled={isDeleting}>{isDeleting ? 'Excluindo...' : 'Excluir'}</button>
            </div>
            {deleteError && (
              <p className="delete-error">
                {deleteError}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookCard;
