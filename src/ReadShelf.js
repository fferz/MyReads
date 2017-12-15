import React, { Component } from 'react'

class ReadShelf extends Component{
    handleSelectOnChange = (value, book) => {
        this.props.onChangeShelf(value, book.id);
        console.log('shelf', value);
    }
     render(){
        return(
            <div> 
                <div className="bookshelf">
                    <h2 className="bookshlef-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.map((book, index)=>
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={(event)=>this.handleSelectOnChange(event.target.value, book)} defaultValue='read' >
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading" >Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read" >Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors.map((author)=>author)}</div>       
                                        
                                    </div>
                                </li>)}
                        </ol>
                    </div>
                </div>
            </div>
        )
     }
}

export default ReadShelf;
