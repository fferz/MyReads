import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input'


class BookSearch extends Component{
    state = {
        query: '',
        booksResult : [],
        booksFiled : [],
        error: false,
        errorLog: '',

    }

    getInitialState = () => {
        return this.state.booksResult;
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        this.setState({booksResult : []})
        this.getResults(this.state.query)
    }

    updateBookResult = (result) => {
        console.log('updateBookResult')
        let resultWithShelf = result.map((book) => {
            if (book.shelf === undefined){ book.shelf='none' }
            return book})
        this.setState({booksResult : resultWithShelf})
        console.log('bookResult nuevo', this.state.booksResult)
    }
    
    updateBookShelf = (book, newShelf) => {
        if (book && newShelf){
            BooksAPI.update(book, newShelf).then(bookResult => {
                this.setState({newShelf})
            })
        } 
    }

    updateErrorTrue = () => {
        this.setState({error : true})
        //this.setState({errorLog : e})
        //ver, no se si hacer con catch o no, capaz no hace falta, entonces no guardo errorLog..
    }

    updateErrorFalse = () => {
        this.setState({error : false})
        console.log('error', this.state.error)
        this.setState({ errorLog : ''})
    }


    getResults = (value) => {
        console.log('buscando', value)

        if (value){
            Promise.all([BooksAPI.getAll(), BooksAPI.search(value, 20)]).then((result)=>{
                this.getFinalResult(result)
                this.updateErrorFalse()
            }).catch((e) => this.updateErrorTrue(e))
        } 
    }

    getFinalResult = (result) => {
        let arr1 = result[0]
        let arr2 = result[1]
        let resultShelf = []
        let resultNoShelf = []

        //search results don't have shelf
        let arrShelf = arr1.find(( item ) => item.shelf === undefined)
        if (arrShelf !== undefined) {resultNoShelf = arr1, resultShelf = arr2}
        else {resultNoShelf = arr2, resultShelf = arr1}
        console.log('search results', resultNoShelf)

        //duplicates with shelf = books from getAll that match the query
        let resultShelfDuplicate = []
        resultShelf.forEach((book) => {let duplicate = resultNoShelf.find((item)=> (this.findISBN13(item) === this.findISBN13(book)))
                                        if (duplicate){resultShelfDuplicate.push(book)}})
        console.log('duplicate books with shelf', resultShelfDuplicate)
        
        //search result without duplicates
        let arr = resultNoShelf
        resultNoShelf.forEach((book) => {
            resultShelfDuplicate.forEach((item) => {
                if (this.findISBN13(book) === this.findISBN13(item)){
                    arr = arr.filter((b) => this.findISBN13(b) !== this.findISBN13(item))
                }
            })
        })

        let finalResult = resultShelfDuplicate.concat(arr)

        console.log('final result', finalResult)

        this.updateBookResult(finalResult)
    }

    findISBN13 = (book) => {
        let obj;
        obj = book.industryIdentifiers.find((indId) => indId.type === 'ISBN_13' )
        return obj.identifier;
    }


    

    
    
    render(){
        let showResults = null;
        if (this.state.query === ''){
            showResults = <div></div>}
        else if (this.state.error){
            showResults = <p>we could not find the book you are looking for :(</p>
        } else {
            showResults = <BookList books={this.state.booksResult} onUpdateBookShelf={this.updateBookShelf}/>
        }
        return(
            
            <div className="search-books">  
                <div className="search-books-bar">
                <div>
                    <Link className="close-search" to="/">Close</Link>
                </div>
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

