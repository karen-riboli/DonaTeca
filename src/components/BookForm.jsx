import '/src/styles/BookForm.css';
import { FaBook, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const BookForm = ({
  book,
  setBook,
  handleSubmit,
  buttonText,
  formTitle,
  goBack
}) => {
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setBook((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isFormValid = book.title.trim() && book.author.trim();

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
          required
        />
      </label>
      <label className="read-checkbox">
        <input
          type="checkbox"
          name="isRead"
          checked={book.isRead}
          onChange={handleChange}
        />
        {book.isRead ? <FaBookmark /> : <FaRegBookmark />}
        <span>{book.isRead ? 'Lido' : 'Não Lido'}</span>
      </label>
      <button type="submit" className="button-primary" disabled={!isFormValid}>{buttonText}</button>
      <button type="button" onClick={goBack} className="button-back">Voltar</button>
    </form>
  );
};

export default BookForm;
