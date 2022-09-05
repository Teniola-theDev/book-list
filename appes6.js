class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
  <td> ${book.title} </td>
  <td> ${book.author} </td>
  <td >${book.isbn} </td>
  <td > <a href="#" class='delete'>X</a> </td>
  `;
    list.appendChild(row);
  }

  /////////
  showAlert(msg, className) {
    // create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    container.insertBefore(div, form);

    setTimeout(function () {
      div.remove();
    }, 2000);
  }
  //////
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  deleteElement(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function (book, index) {
      console.log(index);
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', Store.displayBooks);
document.getElementById('book-form').addEventListener('submit', function (e) {
  //get form (dom) values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //instantiate book
  const book = new Book(title, author, isbn);
  const ui = new UI();

  e.preventDefault();

  if (author === '' || (title === '') | (isbn === '')) {
    // alert('enter a book');
    ui.showAlert('Ensure all values are correctly filled', 'error');
  } else {
    ui.showAlert('You have successfully entered a book. ', 'success');
    ui.addBookToList(book);
    ui.clearFields();
    Store.addBook(book);
  }
});

document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();

  ui.deleteElement(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Successfully Deleted.', 'success');

  e.preventDefault();
});
