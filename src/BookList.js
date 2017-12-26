import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

const BookList = (props) => {

    const handleBookShelfChange = (bookId, newShelf) => {
        let bookChanged = props.books.find((book) => book.id === bookId)
        props.onUpdateBookShelf(bookChanged, newShelf);
    }

    return (
        <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book)=>
                            <Book 
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                authors={book.authors}
                                image={book.imageLinks.thumbnail}
                                shelf={book.shelf}
                                shelfChange={handleBookShelfChange}/>
                            )}
                </ol>
        </div>
    )
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
}

export default BookList