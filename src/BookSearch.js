import React, { Component } from 'react'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input'

class BookSearch extends Component{
    state = {
        query: '',
        booksResult : [],
        error: false,
        errorLog: ''
    }

    getInitialState = () => {
        return this.state.booksResult;
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        this.getResults(this.state.query)
        this.setState({booksResult : []})
    }

    updateBookResult = (result) => {
        //console.log('bookResult sin borrar', this.state.booksResult)
        //this.setState({booksResult : []})
        //console.log('bookResult borrado', this.state.booksResult)
        this.setState({booksResult : result})
        console.log('bookResult nuevo', this.state.booksResult)
        console.log('error log', this.state.errorLog)
    }
    /*
    compareBooksLists = (result) => {
        let booksOnShelves = this.props.selectedBooks;
        let bookOnResult;
        let booksMatchResult = []
        let booksMatchShelf = []
        booksOnShelves.forEach((book) => {
            bookOnResult = result.find((item) => (this.findISBN13(item) === this.findISBN13(book)))
            if (bookOnResult) {
                //matching books
                booksMatchResult = bookOnResult.concat(booksMatchResult); //books in result list
                booksMatchShelf = book.concat(booksMatchShelf) //books already in shelves that match the search
                console.log('booksMatchResult', booksMatchResult)
                console.log('booksMatchShelf', booksMatchShelf)
            }})
        if (bookOnResult.length) { 
            console.log('bookOnResult.length', bookOnResult.length)
            this.mergeBooksLists(booksMatchResult, booksMatchShelf, result) 
        } else { 
            this.updateBookResult(result) 
        }
    }

    mergeBooksLists = (booksMatchResult, booksMatchShelf, result) => {
        //delete books in result
        booksMatchResult.forEach((item)=> {
            let arr1
            arr1 = result.filter((b) => b.id !== item.id )
            result = arr1
        })
        console.log('result', result)
        //add books in shelves
        result = booksMatchShelf.concat(result);
        this.updateBookResult(result); 
        console.log('result with books on shelves', result)

    }

    findISBN13 = (book) => {
        let obj;
        obj = book.industryIdentifiers.find((indId) => indId.type === 'ISBN_13' )
        return obj.identifier;
    }
    */

    updateErrorTrue = (e) => {
        this.setState({error : true})
        this.setState({errorLog : e})
    }

    updateErrorFalse = () => {
        this.setState({error : false})
        console.log('error', this.state.error)
        this.setState({ errorLog : ''})
    }

    getResults = (value) => {
        console.log('buscando', value)
        if (value){
            BooksAPI.search(value, 20).then((result)=>{
            this.updateBookResult(result)
            this.updateErrorFalse()
        }).catch(e => this.updateErrorTrue(e))
        }
        
        
        
    }
    
    render(){
        let showResults = null;
        if (this.state.query === ''){
            showResults = <div></div>}
        else if (this.state.error){
            showResults = <p>we could not find the book you are looking for :(</p>
        } else {
            showResults = <BookList books={this.state.booksResult}/>
        }
        return(
            
            <div className="search-books">  
                <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <DebounceInput 
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.query}
                            debounceTimeout={300}
                            onChange={(event)=> this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showResults}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch

