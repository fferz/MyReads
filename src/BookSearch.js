import React, { Component } from 'react'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

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
        console.log('va la query al state', query);
        this.setState({ query: query.trim() })
        this.getResults(this.state.query)
    }

    updateBookResult = (result) => {
        this.setState({booksResult : result})
        console.log('update state', this.state.booksResult)
    }

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
        BooksAPI.search(value, 20).then((result)=>{
            this.updateBookResult(result)
            this.updateErrorFalse()
        }).catch(e => this.updateErrorTrue(e))
        
        
    }
    
    render(){
        let showResults = null;
        if (this.state.error){
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
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event)=>this.updateQuery(event.target.value)}/>
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

