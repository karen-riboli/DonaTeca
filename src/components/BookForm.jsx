import { useEffect } from 'react'
import '/src/styles/BookForm.css';
import { FaBook, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const BookForm = ({
  book,
  setBook,
  handleSubmit,
  buttonText,
  formTitle,
  goBack,
  isSaving = false,
  saveError = null
}) => {
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setBook((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isFormValid = book.title?.trim() && book.author?.trim();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && !isSaving) {
        goBack();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () =>
      window.removeEventListener('keydown', handleEscape);
  }, [goBack, isSaving]);

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>
        <FaBook />
        {formTitle}
      </h2>
      <label className="book-form-field">
        Título
        <input
          type="text"
          name="title"
          placeholder="O Pequeno Príncipe"
          value={book.title} // Binds input value to state
          onChange={handleChange} // Updates state on keystroke
          disabled={isSaving}
          required
        />
      </label>
      <label className="book-form-field">
        Autor
        <input
          type="text"
          name="author"
          placeholder="Antoine de Saint-Exupéry"
          value={book.author} // Binds input value to state
          onChange={handleChange} // Updates state on keystroke
          disabled={isSaving}
          required
        />
      </label>
      <label className="read-checkbox">
        <input
          type="checkbox"
          name="isRead"
          checked={book.isRead}
          onChange={handleChange}
          disabled={isSaving}
        />
        {book.isRead ? <FaBookmark /> : <FaRegBookmark />}
        <span>{book.isRead ? 'Lido' : 'Não Lido'}</span>
      </label>
      <button type="submit" className="button-primary" disabled={!isFormValid || isSaving}>{buttonText}</button>
      <button type="button" onClick={goBack} className="button-back" disabled={isSaving}>Voltar</button>
      {saveError && (
        <p className="form-error">
          {saveError}
        </p>
      )}
    </form>
  );
};

export default BookForm;
