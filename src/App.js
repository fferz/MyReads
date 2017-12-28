import React from 'react'
import { Link } from 'react-router-dom'
import { Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import Shelf from './Shelf'

//Shelfs container
class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books : books})
    })
  }

  isTheBook(book, id){
    return book.id === id;
  }

changeBookShelf = (book, newShelf) => {
    //here we don't mutate state
    let bookUpdated = book
    bookUpdated.shelf = newShelf
    let isBook = this.state.books.find((item) => item.id === book.id)
    //if the book is in state.books => setState(bookUpdated), else add new book to state.books
    isBook ? this.setState(bookUpdated) : this.setState({books : this.state.books.concat(bookUpdated)})
    this.updateServer(book, newShelf)
  }; 

  updateServer = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="list-books"> 
          <Route exact path="/" render={() => (
              <div>
                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                      <Shelf 
                        shelfTitle='Currently Reading'
                        books={this.state.books.filter((book)=> book.shelf === 'currentlyReading')}
                        onChangeShelf={this.changeBookShelf} />
                      <Shelf 
                        shelfTitle='Want to read'
                        books={this.state.books.filter((book)=> book.shelf === 'wantToRead')}
                        onChangeShelf={this.changeBookShelf} />
                      <Shelf 
                        shelfTitle='Read'
                        books={this.state.books.filter((book)=> book.shelf === 'read')}
                        onChangeShelf={this.changeBookShelf} />
                  </div>
                  <div className="open-search">
                      <Link 
                        to="/search"
                        >Add a book
                      </Link>
                  </div>
              </div>
          )}/>
          <Route path="/search" render={() => (
            <BookSearch 
              selectedBooks={this.state.books}
              onChangeShelf={this.changeBookShelf}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
