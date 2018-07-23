import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchView from './SearchView'
import Category from './Category'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

const categories = [
  {
      "title": "Currently Reading", 
      "id": "currentlyReading"
  },
  {
      "title": "Want to Read", 
      "id": "wantToRead"
  },
  {
      "title": "Read", 
      "id": "read"
  }
]

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      });
    }

  changeCategory = (book, shelf) => {
    if (this.state.books) {
        BooksAPI.update(book,shelf).then(() => {
            book.shelf = shelf;
            this.setState(state => ({
              books: state.books.filter(b => b.id !== book.id).concat([book])
            }))
        })
    }
  }

  render() {
    const {books} = this.state
  
    return (
    <div className="app">
      <Route exact path='/' render={() => (
        <div>
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div>
            <Category                                
                onChangeCategory={this.changeCategory}
                books={books}
                categories={categories}
            />
          </div>
          <div className="open-search">
            <Link to="/search" className="search">Add a book</Link>
          </div>
        </div>  
      )} />
      <Route path='/search' render={() => (
        <div>
          <SearchView
              onChangeCategory={this.changeCategory}
              books = {this.state.filteredBooks}
          />
        </div>
      )}/>
        

    </div>
    )
  }
}

export default BooksApp
