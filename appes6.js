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
    console.log(row);
  }

  showAlert(msg, className) {
    // create div
    console.log('no book entered');
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    console.log(div);
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    container.insertBefore(div, form);

    setTimeout(function () {
      div.remove();
    }, 2000);
  }
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

// EVENT LISTENERS
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
  }
});

document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();
  console.log('clicked');
  ui.deleteElement(e.target);
  ui.showAlert('Successfully Deleted.', 'success');
  e.preventDefault();
});
