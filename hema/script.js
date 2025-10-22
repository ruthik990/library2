// Default books
const defaultBooks = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Drama" },
  { title: "1984", author: "George Orwell", category: "Dystopian" },
];

// Load books from localStorage or defaults
let books = JSON.parse(localStorage.getItem("books")) || defaultBooks;

// ===== Utility =====
function hideAll() {
  document.querySelectorAll('.home, .login, .user-page, .dashboard, .admin-books')
    .forEach(section => section.style.display = 'none');
}

// ===== Navigation =====
function showLogin() {
  hideAll();
  document.getElementById('login').style.display = 'block';
}

function showUser() {
  hideAll();
  document.getElementById('userPage').style.display = 'block';
  updateCategoryFilter();
  renderUserBooks(books);
}

function goHome() {
  hideAll();
  document.getElementById('home').style.display = 'block';
}

function logout() {
  hideAll();
  document.getElementById('home').style.display = 'block';
  alert("Logged out successfully!");
}

function openBookList() {
  hideAll();
  document.getElementById('adminBooks').style.display = 'block';
  renderAdminBooks();
}

function backToDashboard() {
  hideAll();
  document.getElementById('dashboard').style.display = 'block';
}

// ===== Login =====
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === "admin@library.com" && password === "admin123") {
    alert("Login successful!");
    hideAll();
    document.getElementById('dashboard').style.display = 'block';
  } else {
    alert("Invalid credentials!");
  }
}

// ===== Add & Delete Books =====
function addBook() {
  const title = document.getElementById('bookTitle').value.trim();
  const author = document.getElementById('bookAuthor').value.trim();
  const category = document.getElementById('bookCategory').value.trim();

  if (title === "" || author === "" || category === "") {
    alert("Please fill all fields!");
    return;
  }

  books.push({ title, author, category });
  localStorage.setItem("books", JSON.stringify(books));

  document.getElementById('bookTitle').value = "";
  document.getElementById('bookAuthor').value = "";
  document.getElementById('bookCategory').value = "";

  alert("Book added successfully!");
}

function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    renderAdminBooks();
  }
}

// ===== Render Books =====
function renderAdminBooks() {
  const list = document.getElementById('adminBookList');
  list.innerHTML = '';
  books.forEach((book, index) => {
    list.innerHTML += `
      <div class="book">
        <h4>${book.title}</h4>
        <p>${book.author}</p>
        <p><b>Category:</b> ${book.category}</p>
        <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
      </div>
    `;
  });
}

function renderUserBooks(filteredBooks) {
  const list = document.getElementById('bookList');
  list.innerHTML = '';
  filteredBooks.forEach(book => {
    list.innerHTML += `
      <div class="book">
        <h4>${book.title}</h4>
        <p>${book.author}</p>
        <p><b>${book.category}</b></p>
      </div>
    `;
  });
}

// ===== Category Filter =====
function updateCategoryFilter() {
  const select = document.getElementById('filterCategory');
  select.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(books.map(b => b.category))];
  categories.forEach(cat => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

function filterByCategory() {
  const selected = document.getElementById('filterCategory').value;
  if (selected === "all") {
    renderUserBooks(books);
  } else {
    const filtered = books.filter(b => b.category === selected);
    renderUserBooks(filtered);
  }
}
