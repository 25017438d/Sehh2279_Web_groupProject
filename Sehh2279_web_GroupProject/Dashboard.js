document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initActivityChart();
    initCategoryChart();

    // In a real app, you would fetch this data from an API
    updateDashboardStats();

    // Simulate updating stats periodically
    setInterval(updateDashboardStats, 30000);
});

function updateDashboardStats() {
    // Simulate fetching data
    const stats = {
        totalBooks: Math.floor(Math.random() * 500) + 1000,
        availableBooks: Math.floor(Math.random() * 400) + 700,
        checkedOutBooks: Math.floor(Math.random() * 200) + 200,
        overdueBooks: Math.floor(Math.random() * 20) + 30
    };

    // Update the UI
    document.getElementById('totalBooks').textContent = stats.totalBooks.toLocaleString();
    document.getElementById('availableBooks').textContent = stats.availableBooks.toLocaleString();
    document.getElementById('checkedOutBooks').textContent = stats.checkedOutBooks.toLocaleString();
    document.getElementById('overdueBooks').textContent = stats.overdueBooks.toLocaleString();
}

function initActivityChart() {
    const ctx = document.getElementById('activityChart').getContext('2d');
    const activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Books Checked Out',
                    data: [120, 190, 170, 210, 240, 230, 250, 210, 180, 200, 220, 260],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'Books Returned',
                    data: [90, 150, 140, 180, 200, 210, 230, 190, 160, 180, 190, 220],
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 2,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function initCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Fiction', 'Non-Fiction', 'Science', 'Biography', 'Other'],
            datasets: [{
                data: [35, 25, 15, 15, 10],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(149, 165, 166, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            },
            cutout: '70%'
        }
    });
}

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