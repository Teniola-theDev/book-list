//create Book and UI constructors

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
function UI() {}
//add prototypes to UI constructor instead of creating it in the UI function manually
UI.prototype.addBookToList = function (book) {
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
};
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};
//event listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
  //get form (dom) values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //instantiate book
  const book = new Book(title, author, isbn);
  const ui = new UI();
  ui.addBookToList(book);
  ui.clearFields();
  e.preventDefault();
});

console.log(UI);
