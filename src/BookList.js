import React, { Component } from 'react'
import Book from './Book'


class BookList extends Component{

    handleBookShelfChange = (bookId, newShelf) => {
        let bookChanged = this.props.books.find((book) => book.id === bookId)
        this.props.onUpdateBookShelf(bookChanged, newShelf);
        console.log('BookList - shelf', newShelf, 'book', bookChanged, 'bookId', bookId);
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