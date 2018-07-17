import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchView from './SearchView'
import Book from './Book'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchingFor: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      });
    }

  updateBookNow(bookID, event) {
    let newListOfBooks = BooksAPI.update(bookID, event.target.value)
    let booksbooksbooks = newListOfBooks.then(BooksAPI.getAll().then((books) => {this.setState({books: books})}))
  }

  searchFunctionality(event){
    if (event.target.value !== '') {
      BooksAPI.search(event.target.value).then((results) => {
        if (results.error) {
          this.setState({ searchingFor: [] });
        }
        else if (results) {
          results.map(result => {
            if (result.shelf === undefined) {
              result.shelf = 'none';
            }
            if (result.imageLinks === undefined) {
              result.imageLinks = `url(https://dummyimage.com/128x193/292929/e3e3e3&text=No)`;
            }
            let filteredResults = this.state.books.forEach(book => {
              if (book.id === result.id) {
                result.shelf = book.shelf;
              }
            });
          });
          this.setState({ searchingFor: results });
        }
      });
    } else if (event.target.value === '') {
      this.setState({ searchingFor: [] });
    }
  }

  render() {
    let allBooks = this.state.books;
  	let currentlyReadingShelf = allBooks.filter((book) => {return book.shelf === 'currentlyReading'})
	let readBookShelf = allBooks.filter((book) => {return book.shelf === 'read'})
	let wantToReadShelf = allBooks.filter((book) => {return book.shelf === 'wantToRead'})
  	let searchBooks = this.state.searchingFor
  
    return (
    <div className="app">
      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
          <SearchView shelfName='Currently Reading' currentShelf={currentlyReadingShelf} updateShelf={this.updateBookNow.bind(this)} />
          <SearchView shelfName='Read' currentShelf={readBookShelf} updateShelf={this.updateBookNow.bind(this)} />
          <SearchView shelfName='Want To Read' currentShelf={wantToReadShelf} updateShelf={this.updateBookNow.bind(this)} />
        </div>
      )} />
      <Route path='/search' render={() => (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input className='inputClassTest' type="text" placeholder="Search by title or author" onChange={(event) => this.searchFunctionality(event)}/>

              { <ol className="books-grid">
                  {searchBooks.map((book) => (
                    <Book key={book.id} book={book} updateShelf={this.updateBookNow.bind(this)} />
                  ))}
                  </ol>
                  }
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      )}/>
    </div>
    )
  }
}

export default BooksApp
