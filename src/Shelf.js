import React from 'react'
import PropTypes from 'prop-types';
import BookList from './BookList'


const Shelf = (props) => {

    const updateBookShelf = (book, newShelf) => {
        props.onChangeShelf(book, newShelf);
    }

    return(
            <div> 
                <div className="bookshelf">
                    <h2 className="bookshlef-title">{props.shelfTitle}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            <BookList
                                books={props.books} 
                                onUpdateBookShelf={updateBookShelf} />
                        </ol>
                    </div>
                </div>
            </div>
        )
}

Shelf.propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default Shelf;
