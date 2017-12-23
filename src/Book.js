import React, { Component } from 'react'

class Book extends Component{
    render(){
        return(
            <li key={this.props.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.image})` }}></div>
                            <div className="book-shelf-changer">
                                <select 
                                    onChange={(event)=>this.props.shelfChange(this.props.id, event.target.value)} 
                                    defaultValue={this.props.shelf} >
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading" >Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read" >Read</option>
                                        <option value="none">None</option>
                                </select>
                            </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.authors.map((author)=>author)}</div>       
                    
                </div>
            </li>
        )
    }
}
   
export default Book

/*
onChange={(event)=>this.handleSelectOnChange(event.target.value, book)}
*/