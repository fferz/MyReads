import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

class BookList extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBookShelf: PropTypes.func.isRequired
    }

    handleBookShelfChange = (bookId, newShelf) => {
        let bookChanged = this.props.books.find((book) => book.id === bookId)
        this.props.onUpdateBookShelf(bookChanged, newShelf);
    }

    render(){
        return(
            <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book)=>
                                <Book 
                                    key={book.id}
                                    id={book.id}
                                    title={book.title}
                                    authors={book.authors}
                                    image={book.imageLinks.thumbnail}
                                    shelf={book.shelf}
                                    shelfChange={this.handleBookShelfChange}/>
                                )}
                    </ol>
            </div>
        )
    }

}

export default BookList