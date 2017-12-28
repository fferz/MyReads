import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input'
import PropTypes from 'prop-types';

class BookSearch extends Component{
    state = {
        query: '',
        booksResult : [],
        error: false,
        errorLog: '',
    }

    static propTypes = {
        selectedBooks: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        this.setState({booksResult : []})
        this.getResults(query.trim())
    }

    updateBookResult = (result) => {
        let resultWithShelf = result.map((book) => {
            if (book.shelf === undefined){ book.shelf='none' }
            return book})
        this.setState({booksResult : resultWithShelf})
    }
    
    
    updateBookShelf = (book, newShelf) => {
        this.props.onChangeShelf(book, newShelf)
    }

    updateErrorTrue = () => {
        this.setState({error : true})
    }

    updateErrorFalse = () => {
        this.setState({error : false})
        this.setState({ errorLog : ''})
    }

    //I'm trying to make it work with response.ok
    getResults = (value) => {
        if (value){
            BooksAPI.search(value,20).then((result) => {
                let finalResult = this.getFinalResult(result)
                this.updateBookResult(finalResult)
                this.updateErrorFalse()
            }).catch((e) => { 
                this.updateErrorTrue(e)
                console.log('fetch error:', e.message) })
        }
    }

    getFinalResult = (result) => {
        let searchResult = result 
        console.log('result', result)
        let getAllResult = this.props.selectedBooks 

        //duplicates with shelf = books from getAll that match the query
        let getAllResultDuplicates = []
        getAllResult.forEach((book) => {
            let duplicate = searchResult.find((item)=> (this.findISBN13(item) === this.findISBN13(book)))
            if (duplicate){getAllResultDuplicates.push(book)}})

        //search result without duplicates
        let arr = searchResult
        searchResult.forEach((book) => {
            getAllResultDuplicates.forEach((item) => {
                if (this.findISBN13(book) === this.findISBN13(item)){
                    arr = arr.filter((b) => this.findISBN13(b) !== this.findISBN13(item))
                }
            })
        })
        
        let finalResult = getAllResultDuplicates.concat(arr)
        return finalResult
    }

    findISBN13 = (book) => {
        let obj;
        let objId = 0;
        obj = book.industryIdentifiers.find((indId) => indId.type === 'ISBN_13' )
        obj ? objId = obj.identifier : objId = book.industryIdentifiers[0].identifier
        return objId
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

