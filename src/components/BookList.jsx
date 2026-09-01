import BookCard from './BookCard.jsx';

const BookList = ({ books, setBooks, deleteBook, toggleReadStatus, deletingBookId }) => {
    return (
      <>
        <ul className="books-list">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              deleteBook={() => deleteBook(book.id)}
              toggleReadStatus={() => toggleReadStatus(book)}
              setBooks={setBooks}
              deletingBookId={deletingBookId}
            />
          ))}
        </ul>
      </>
    );
  };

  export default BookList;