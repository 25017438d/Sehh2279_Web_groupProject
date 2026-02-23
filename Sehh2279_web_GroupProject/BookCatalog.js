document.addEventListener('DOMContentLoaded', function() {
    // Sample book data
    let books = [
        { id: 1, title: 'Harry Potter and the Philosophers Stone', author: 'J.K. Rowling', isbn: '9781408855652', genre: 'fiction', status: 'available' },
        { id: 2, title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', isbn: '9781408855669', genre: 'fiction', status: 'checked-out' },
        { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genre: 'fiction', status: 'checked-out' },
        { id: 4, title: '1984', author: 'George Orwell', isbn: '9780451524935', genre: 'fiction', status: 'reserved' },
        { id: 5, title: 'The Midnight Library', author: 'Matt Haig', isbn: '9780525559498', genre: 'fiction', status: 'checked-out' },
        { id: 6, title: 'Cloud Cuckoo Land', author: 'Anthony Doerr', isbn: '9780008478650', genre: 'fiction', status: 'checked-out' },
        { id: 7, title: 'Project Hail Mary', author: 'Andy Weir', isbn: '9780593135228', genre: 'fiction', status: 'reserved' },
        { id: 8, title: 'Harlem Shuffle', author: 'Colson Whitehead', isbn: '9780385545136', genre: 'fiction', status: 'checked-out' },
        { id: 9, title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', isbn: '9780671027032', genre: 'non-fiction', status: 'checked-out' },
        { id: 10, title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', isbn: '9780061120084', genre: 'non-fiction', status: 'available' },
        { id: 11, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', isbn: '9781612680019', genre: 'non-fiction', status: 'checked-out' },
        { id: 12, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '9780374533557', genre: 'non-fiction', status: 'reserved' },
        { id: 13, title: 'H Is for Hawk"', author: 'Macdonald, Helen', isbn: '9780802124739', genre: 'non-fiction', status: 'checked-out' },
        { id: 14, title: 'Blink : The Power of Thinking Without Thinking', author: 'Gladwell, Malcolm', isbn: '9780316010665', genre: 'non-fiction', status: 'available' },
        { id: 15, title: 'Fever Pitch', author: 'Hornby, Nick', isbn: '9781573226882', genre: 'non-fiction', status: 'available' },
        { id: 16, title: 'Life on the Mississippi', author: 'Twain, Mark', isbn: '9780451531209', genre: 'non-fiction', status: 'available' },
    ];

    // DOM Elements
    const booksTable = document.getElementById('booksTable');
    const searchInput = document.getElementById('searchInput');
    const filterStatus = document.getElementById('filterStatus');
    const filterGenre = document.getElementById('filterGenre');
    const clearSearch = document.getElementById('clearSearch');
    const pagination = document.getElementById('pagination');
    const addBookForm = document.getElementById('addBookForm');
    const editBookForm = document.getElementById('editBookForm');
    const saveBookBtn = document.getElementById('saveBook');
    const updateBookBtn = document.getElementById('updateBook');
    const confirmDeleteBtn = document.getElementById('confirmDelete');

    // Pagination variables
    const rowsPerPage = 5;
    let currentPage = 1;

    // Initialize the page
    renderBooks();
    setupEventListeners();

    // Render books table
    function renderBooks(filteredBooks = books) {
        const tbody = booksTable.tBodies[0];
        tbody.innerHTML = '';

        // Calculate pagination
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

        if (paginatedBooks.length === 0) {
            const row = tbody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 6;
            cell.className = 'text-center py-4 text-muted';
            cell.textContent = 'No books found matching your criteria';
            return;
        }

        paginatedBooks.forEach(book => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${formatGenre(book.genre)}</td>
                <td><span class="badge ${getStatusClass(book.status)}">${formatStatus(book.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary action-btn edit-btn" data-id="${book.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger action-btn delete-btn" data-id="${book.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        renderPagination(filteredBooks.length);
    }

    // Format genre for display
    function formatGenre(genre) {
        return genre.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join('-');
    }

    // Format status for display
    function formatStatus(status) {
        return status.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    // Get status badge class
    function getStatusClass(status) {
        switch(status) {
            case 'available': return 'badge-available';
            case 'checked-out': return 'badge-checked-out';
            case 'reserved': return 'badge-reserved';
            default: return 'badge-secondary';
        }
    }

    // Render pagination
    function renderPagination(totalItems) {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(totalItems / rowsPerPage);

        if (totalPages <= 1) return;

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#">Previous</a>`;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderBooks(getFilteredBooks());
            }
        });
        pagination.appendChild(prevLi);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageLi = document.createElement('li');
            pageLi.className = `page-item ${currentPage === i ? 'active' : ''}`;
            pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageLi.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderBooks(getFilteredBooks());
            });
            pagination.appendChild(pageLi);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                renderBooks(getFilteredBooks());
            }
        });
        pagination.appendChild(nextLi);
    }

    // Get filtered books based on search and filters
    function getFilteredBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusFilter = filterStatus.value;
        const genreFilter = filterGenre.value;

        return books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                                book.author.toLowerCase().includes(searchTerm) ||
                                book.isbn.includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
            const matchesGenre = genreFilter === 'all' || book.genre === genreFilter;

            return matchesSearch && matchesStatus && matchesGenre;
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search and filter events
        searchInput.addEventListener('input', () => {
            currentPage = 1;
            renderBooks(getFilteredBooks());
        });

        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            currentPage = 1;
            renderBooks(getFilteredBooks());
        });

        filterStatus.addEventListener('change', () => {
            currentPage = 1;
            renderBooks(getFilteredBooks());
        });

        filterGenre.addEventListener('change', () => {
            currentPage = 1;
            renderBooks(getFilteredBooks());
        });

        // Add book
        saveBookBtn.addEventListener('click', addBook);

        // Edit book
        updateBookBtn.addEventListener('click', updateBook);

        // Delete book
        confirmDeleteBtn.addEventListener('click', deleteBook);

        // Edit and Delete buttons (delegated)
        booksTable.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-btn');
            const deleteBtn = e.target.closest('.delete-btn');

            if (editBtn) {
                const bookId = parseInt(editBtn.dataset.id);
                openEditModal(bookId);
            }

            if (deleteBtn) {
                const bookId = parseInt(deleteBtn.dataset.id);
                openDeleteModal(bookId);
            }
        });
    }

    // Add new book
    function addBook() {
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1,
            title: document.getElementById('bookTitle').value,
            author: document.getElementById('bookAuthor').value,
            isbn: document.getElementById('bookIsbn').value,
            genre: document.getElementById('bookGenre').value,
            status: document.getElementById('bookStatus').value
        };

        books.push(newBook);
        renderBooks(getFilteredBooks());
        bootstrap.Modal.getInstance(document.getElementById('addBookModal')).hide();
        addBookForm.reset();
        showAlert('success', 'Book added successfully!');
    }

    // Open edit modal
    function openEditModal(bookId) {
        const book = books.find(book => book.id === bookId);
        if (!book) return;

        document.getElementById('editBookId').value = book.id;
        document.getElementById('editBookTitle').value = book.title;
        document.getElementById('editBookAuthor').value = book.author;
        document.getElementById('editBookIsbn').value = book.isbn;
        document.getElementById('editBookGenre').value = book.genre;
        document.getElementById('editBookStatus').value = book.status;

        new bootstrap.Modal(document.getElementById('editBookModal')).show();
    }

    // Update book
    function updateBook() {
        const bookId = parseInt(document.getElementById('editBookId').value);
        const bookIndex = books.findIndex(book => book.id === bookId);

        if (bookIndex === -1) return;

        books[bookIndex] = {
            id: bookId,
            title: document.getElementById('editBookTitle').value,
            author: document.getElementById('editBookAuthor').value,
            isbn: document.getElementById('editBookIsbn').value,
            genre: document.getElementById('editBookGenre').value,
            status: document.getElementById('editBookStatus').value
        };

        renderBooks(getFilteredBooks());
        bootstrap.Modal.getInstance(document.getElementById('editBookModal')).hide();
        showAlert('success', 'Book updated successfully!');
    }

    // Open delete confirmation modal
    function openDeleteModal(bookId) {
        const book = books.find(book => book.id === bookId);
        if (!book) return;

        document.getElementById('bookToDelete').textContent = `${book.title} by ${book.author}`;
        confirmDeleteBtn.dataset.id = bookId;
        new bootstrap.Modal(document.getElementById('confirmDeleteModal')).show();
    }

    // Delete book
    function deleteBook() {
        const bookId = parseInt(this.dataset.id);
        books = books.filter(book => book.id !== bookId);
        
        renderBooks(getFilteredBooks());
        bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')).hide();
        showAlert('success', 'Book deleted successfully!');
    }

    // Show alert message
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
        alertDiv.style.zIndex = '1100';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
});