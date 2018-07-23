import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import BooksApp from './App';

class SearchView extends Component {
    state = {
        query: '',
        filteredBooks: []
    }

    updateQuery = (query) => {
        this.setState({query})
            if(query){
                BooksAPI.search(query)
                    .then((books) => { 
                        if(books.error) {
                            console.log('Erro!');
                            this.setState({filteredBooks: []})
                        } else {
                            console.log('Sem erro')
                            console.log(books)
                            
                            const {booksApp} = this.state
                            
                            this.setState({
                                filteredBooks: books.filter(b => {
                                    if (b.id === booksApp.id) {
                                        this.setState(b.shelf = booksApp.shelf)
                                    }else {
                                        this.setState(b.shelf = 'none')
                                    }
                                }
                                )
                            });
                        }
                    }
            )
        }
    }
    
    render() {
        
        const {onChangeCategory} = this.props
        const {query, filteredBooks} = this.state
        
        return (
            <div>
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <form>
                    <div className="search-books-input-wrapper">
                        <input type='text' placeholder='Search books by title or author' value={query} 
                        onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </form>
            </div>
           {filteredBooks.length!==0 && (
                <div className="search-books-results">
                    <div className="search-books">
                        <ol className="books-grid">
                            {filteredBooks.map((book) => (  
                                <li key={book.id}>
                                    <Book
                                        onChangeCategory={onChangeCategory}
                                        book = {book}
                                    />
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
            {(filteredBooks.length===0 && query.length!==0) && (
            <div className="search-results">
                 {`No book found`}
             </div>
            )}
            </div> 
        )
    }
}

export default SearchView