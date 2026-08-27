import BookCard from './components/BookCard.jsx';

const BookList = ({ books, setBooks, deleteBook, toggleReadStatus }) => {
    return (
      <>
        {books.length === 0 && (
          <div className="empty-state">
            <p>Nenhum livro cadastrado.</p>
            <p>Clique em "Adicionar Livro" para começar.</p>
          </div>
        )}
        <ul className="books-list">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              deleteBook={() => deleteBook(book.id)}
              toggleReadStatus={() => toggleReadStatus(book)}
              setBooks={setBooks}
            />
          ))}
        </ul>
      </>
    );
  };

  export default BookList;