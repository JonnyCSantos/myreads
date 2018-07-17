import React, {Component} from 'react';
import './App.css'

class SearchView extends Component {

    render() {
     return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
        {this.props.currentShelf.map((book) => (
         <Book key={book.id} book={book} updateShelf={this.props.updateShelf} />
        ))}
        </ol>
      </div>
      </div>
     )
    }
  }

  export default SearchView