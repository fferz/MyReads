import React from 'react'
import { Link } from 'react-router-dom'
import { Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReadingShelf from './CurrentlyReadingShelf'
import WantToReadShelf from './WantToReadShelf'
import ReadShelf from './ReadShelf'
import BookSearch from './BookSearch'


//Shelfs container
class BooksApp extends React.Component {
  state = {
    books : [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books : books})
    })
  }

  isTheBook(book, id){
    return book.id === id;
  }

  changeShelf = (newShelf, bookId) => {
    //here we don't mutate state
    let bookArray = this.state.books.slice();
    let bookObject = bookArray.find((book)=>{
      return book.id === bookId});
    bookObject.shelf = newShelf;
    this.setState(bookObject);
    this.updateServer(bookObject, newShelf)
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
                      <CurrentlyReadingShelf 
                        books={this.state.books.filter((book)=> book.shelf === 'currentlyReading')}
                        onChangeShelf={this.changeShelf}/>
                      <WantToReadShelf 
                        books={this.state.books.filter((book)=> book.shelf === 'wantToRead')}
                        onChangeShelf={this.changeShelf} />
                      <ReadShelf 
                        books={this.state.books.filter((book)=> book.shelf === 'read')}
                        onChangeShelf={this.changeShelf}/>   
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
              selectedBooks={this.state.books}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp

/* 

<div className="list-books"> 
    <div className="list-books-title">
        <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
        <CurrentlyReadingShelf 
          books={this.state.books.filter((book)=> book.shelf === 'currentlyReading')}
          onChangeShelf={this.changeShelf}/>
        <WantToReadShelf 
          books={this.state.books.filter((book)=> book.shelf === 'wantToRead')}
          onChangeShelf={this.changeShelf} />
        <ReadShelf 
          books={this.state.books.filter((book)=> book.shelf === 'read')}
          onChangeShelf={this.changeShelf}/>   
    </div>
    <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
    </div>
</div>


*/

/*
<div className="app"> 
        <BookSearch 
          selectedBooks={this.state.books}/>
        
      </div>
      */
