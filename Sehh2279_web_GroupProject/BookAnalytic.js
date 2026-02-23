document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart
    const ctx = document.getElementById('borrowingChart').getContext('2d');
    const borrowingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Books Borrowed',
                data: [120, 190, 170, 210, 240, 230, 250, 210, 180, 200, 220, 260],
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Popular books data
    const popularBooksData = {
        'month': [
            { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', loans: 42 },
            { title: 'Harlem Shuffle', author: 'Colson Whitehead', loans: 38 },
            { title: 'The Midnight Library', author: 'Matt Haig', loans: 35 },
            { title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', loans: 31 },
            { title: 'Cloud Cuckoo Land', author: 'Anthony Doerr', loans: 28 }
        ],
        'last-month': [
            { title: 'Project Hail Mary', author: 'Andy Weir', loans: 45 },
            { title: 'The Midnight Library', author: 'Matt Haig', loans: 39 },
            { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', loans: 32 },
            { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', loans: 29 },
            { title: 'Blink : The Power of Thinking Without Thinking', author: 'Gladwell, Malcolm', loans: 26 }
        ],
        'year': [
            { title: 'Life on the Mississippi', author: 'Twain, Mark', loans: 210 },
            { title: 'Harry Potter and the Philosophers Stone', author: 'J.K. Rowling', loans: 195 },
            { title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', loans: 182 },
            { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', loans: 175 },
            { title: 'The Midnight Library', author: 'Matt Haig', loans: 168 }
        ],
        'all': [
            { title: 'Harry Potter and the Philosophers Stone', author: 'J.K. Rowling', loans: 842 },
            { title: '1984', author: 'George Orwell', loans: 798 },
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', loans: 765 },
            { title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', loans: 732 },
            { title: 'The Midnight Library', author: 'Matt Haig', loans: 698 }
        ]
    };

    // Initialize popular books
    updatePopularBooks('month');

    // Popular books filter event listener
    document.getElementById('popularBooksFilter').addEventListener('change', function() {
        updatePopularBooks(this.value);
    });

    // Update popular books list
    function updatePopularBooks(timePeriod) {
        const popularBooksList = document.getElementById('popularBooksList');
        popularBooksList.innerHTML = '';
        
        popularBooksData[timePeriod].forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            bookItem.innerHTML = `
                <div>
                    <h6 class="mb-1">${book.title}</h6>
                    <small class="text-muted">${book.author}</small>
                </div>
                <span class="badge bg-primary rounded-pill">${book.loans} loans</span>
            `;
            popularBooksList.appendChild(bookItem);
        });
    }

    // Pagination variables
    const recordsPerPage = 5;
    let currentPage = 1;
    let currentSort = 'date-desc';
    
    // Store the original table data
    const table = document.getElementById('borrowingTable');
    let tableData = Array.from(table.tBodies[0].rows).map(row => ({
        title: row.cells[0].textContent,
        author: row.cells[1].textContent,
        patron: row.cells[2].textContent,
        checkoutDate: row.cells[3].textContent,
        dueDate: row.cells[4].textContent,
        status: row.cells[5].innerHTML,
        actions: row.cells[6].innerHTML,
        dateValue: new Date(row.cells[3].textContent)
    }));

    // Initialize pagination
    initPagination();

    // Sorting functionality
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentSort = this.dataset.sort;
            sortAndPaginateTable(currentSort, currentPage);
        });
    });

    // Pagination event listeners
    document.getElementById('prevPage').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            sortAndPaginateTable(currentSort, currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', function(e) {
        e.preventDefault();
        const searchQuery = document.querySelector('.search-box input').value.toLowerCase();
        const filteredData = tableData.filter(item => {
            const title = item.title.toLowerCase();
            const author = item.author.toLowerCase();
            return title.includes(searchQuery) || author.includes(searchQuery);
        });
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            sortAndPaginateTable(currentSort, currentPage);
        }
    });

    // Search input event listener
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        currentPage = 1; // Reset to page 1 on search
        sortAndPaginateTable(currentSort, currentPage);
    });

    // Sort table function
    function sortTable(data, sortType) {
        let sortedData = [...data];
        
        switch(sortType) {
            case 'date-desc':
                sortedData.sort((a, b) => b.dateValue - a.dateValue);
                break;
            case 'date-asc':
                sortedData.sort((a, b) => a.dateValue - b.dateValue);
                break;
            case 'title-asc':
                sortedData.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                sortedData.sort((a, b) => b.dateValue - a.dateValue);
        }
        
        return sortedData;
    }

    // Paginate data function
    function paginateData(data, page, perPage) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return data.slice(start, end);
    }

    // Update pagination controls
    function updatePaginationControls(totalRecords, currentPage) {
        const totalPages = Math.ceil(totalRecords / recordsPerPage);
        const paginationContainer = document.querySelector('.pagination');
        
        // Clear existing page numbers (except prev/next)
        const pageItems = paginationContainer.querySelectorAll('li:not(#prevPage):not(#nextPage)');
        pageItems.forEach(item => item.remove());
        
        // Add page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
            pageItem.innerHTML = `<a class="page-link page-number" href="#" data-page="${i}">${i}</a>`;
            paginationContainer.insertBefore(pageItem, document.getElementById('nextPage'));
            
            // Add click event
            pageItem.querySelector('.page-number').addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = parseInt(this.dataset.page);
                sortAndPaginateTable(currentSort, currentPage);
            });
        }
        
        // Update previous/next buttons
        document.getElementById('prevPage').classList.toggle('disabled', currentPage === 1);
        document.getElementById('nextPage').classList.toggle('disabled', currentPage === totalPages);
    }

    // Sort, filter, and paginate table
    function sortAndPaginateTable(sortType, page) {
        const searchQuery = document.querySelector('.search-box input').value.toLowerCase();
        
        // Filter the data based on title or author
        let filteredData = tableData.filter(item => {
            const title = item.title.toLowerCase();
            const author = item.author.toLowerCase();
            return title.includes(searchQuery) || author.includes(searchQuery);
        });
        
        // Sort the filtered data
        let sortedData = sortTable(filteredData, sortType);
        
        // Paginate the sorted data
        const paginatedData = paginateData(sortedData, page, recordsPerPage);
        
        // Update the table
        const tbody = table.tBodies[0];
        tbody.innerHTML = '';
        paginatedData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.author}</td>
                <td>${item.patron}</td>
                <td>${item.checkoutDate}</td>
                <td>${item.dueDate}</td>
                <td>${item.status}</td>
                <td>${item.actions}</td>
            `;
            tbody.appendChild(row);
        });
        
        // Update pagination controls based on filtered data
        updatePaginationControls(filteredData.length, page);
    }

    // Initialize pagination controls
    function initPagination() {
        const totalPages = Math.ceil(tableData.length / recordsPerPage);
        const paginationContainer = document.querySelector('.pagination');
        
        // Clear existing page numbers (except prev/next)
        const pageItems = paginationContainer.querySelectorAll('li:not(#prevPage):not(#nextPage)');
        pageItems.forEach(item => item.remove());
        
        // Add page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === 1 ? 'active' : ''}`;
            pageItem.innerHTML = `<a class="page-link page-number" href="#" data-page="${i}">${i}</a>`;
            paginationContainer.insertBefore(pageItem, document.getElementById('nextPage'));
            
            // Add click event
            pageItem.querySelector('.page-number').addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = parseInt(this.dataset.page);
                sortAndPaginateTable(currentSort, currentPage);
            });
        }
        
        // Initial update of controls
        updatePaginationControls(tableData.length, currentPage);
    }

    // Initial sort and pagination
    sortAndPaginateTable(currentSort, currentPage);

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth < 768) {
            // Mobile adjustments
        } else {
            // Desktop adjustments
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});
