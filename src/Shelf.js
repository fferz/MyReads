import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BookList from './BookList'

class Shelf extends Component{
    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }
    updateBookShelf = (book, newShelf) => {
        this.props.onChangeShelf(book, newShelf);
    }
    
     render(){
        return(
            <div> 
                <div className="bookshelf">
                    <h2 className="bookshlef-title">{this.props.shelfTitle}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            <BookList
                                books={this.props.books} 
                                onUpdateBookShelf={this.updateBookShelf} />
                        </ol>
                    </div>
                </div>
            </div>
        )
     }
}

export default Shelf;
