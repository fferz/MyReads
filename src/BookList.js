import React, { Component } from 'react'
import Book from './Book'


class BookList extends Component{
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
                                    defaultValue='none'/>
                                )}
                    </ol>
            </div>
        )
    }

}

export default BookList