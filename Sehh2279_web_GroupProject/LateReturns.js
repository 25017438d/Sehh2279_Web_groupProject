document.addEventListener('DOMContentLoaded', function() {
    let lateReturnsData = [
        {
            id: 1,
            patron: 'David Miller',
            patronEmail: 'david.miller@example.com',
            patronPhone: '+15551234567',
            bookTitle: 'Cloud Cuckoo Land',
            dueDate: '2023-06-11',
            daysLate: 2,
            fine: 1.00,
            status: 'Unpaid'
        },
        {
            id: 2,
            patron: 'Emma Watson',
            patronEmail: 'emma.watson@example.com',
            patronPhone: '+15552345678',
            bookTitle: 'How to Win Friends and Influence People',
            dueDate: '2023-06-10',
            daysLate: 3,
            fine: 1.50,
            status: 'Unpaid'
        },
        {
            id: 3,
            patron: 'Sarah Johnson',
            patronEmail: 'sarah.johnson@example.com',
            patronPhone: '+15553456789',
            bookTitle: 'Harry Potter and the Philosophers Stone',
            dueDate: '2023-06-02',
            daysLate: 10,
            fine: 5.00,
            status: 'Partially Paid'
        },
        {
            id: 4,
            patron: 'Christopher Nolan',
            patronEmail: 'christopher.nolan@example.com',
            patronPhone: '+15554567890',
            bookTitle: 'Harlem Shuffle',
            dueDate: '2023-06-03',
            daysLate: 10,
            fine: 5.50,
            status: 'Unpaid'
        },
        {
            id: 5,
            patron: 'Barry Allen',
            patronEmail: 'barry.allen@example.com',
            patronPhone: '+15555678901',
            bookTitle: 'Thinking, Fast and Slow',
            dueDate: '2023-04-15',
            daysLate: 15,
            fine: 7.50,
            status: 'Paid'
        },  
        {
            id: 6,
            patron: 'Jessica Barth',
            patronEmail: 'jessica.bath@example.com',
            patronPhone: '+15556789012',
            bookTitle: 'Rich Dad Poor Dad',
            dueDate: '2023-06-08',
            daysLate: 3,
            fine: 2.50,
            status: 'Unpaid'
        },
        {
            id: 7,
            patron: 'Harry Wells',
            patronEmail: 'harry.wells@example.com',
            patronPhone: '+15557890123',
            bookTitle: 'H Is for Hawk',
            dueDate: '2023-06-09',
            daysLate: 4,
            fine: 2.00,
            status: 'Unpaid'
        },
        {
            id: 8,
            patron: 'Thomas Anderson',
            patronEmail: 'thomas.anderson@example.com',
            patronPhone: '+15558901234',
            bookTitle: 'Fever Pitch',
            dueDate: '2023-06-05',
            daysLate: 3,
            fine: 1.50,
            status: 'Partially Paid'
        },
        {
            id: 9,
            patron: 'Michael Brown',
            patronEmail: 'michael.brown@example.com',
            patronPhone: '+15559012345',
            bookTitle: 'Harry Potter and the Chamber of Secrets',
            dueDate: '2023-06-02',
            daysLate: 11,
            fine: 5.50,
            status: 'Unpaid'
        },
        {
            id: 10,
            patron: 'Olivia Parker',
            patronEmail: 'olivia.parker@example.com',
            patronPhone: '+15550123456',
            bookTitle: 'The 7 Habits of Highly Effective People	',
            dueDate: '2023-02-05',
            daysLate: 22,
            fine: 11.00,
            status: 'Paid'
        }
    ];

    // Initialize the table and modals
    const lateReturnsTable = document.getElementById('lateReturnsTable');
    const notificationModal = new bootstrap.Modal('#notificationModal');
    const paymentModal = new bootstrap.Modal('#paymentModal');
    let selectedPatronId = null;

    // Render the table
    function renderLateReturns() {
        const tbody = lateReturnsTable.tBodies[0];
        tbody.innerHTML = '';

        lateReturnsData.forEach(item => {
            const row = document.createElement('tr');
            row.className = item.daysLate > 7 ? 'table-danger' : 'table-warning';
            
            row.innerHTML = `
                <td>${item.patron}</td>
                <td>${item.bookTitle}</td>
                <td>${item.dueDate}</td>
                <td>${item.daysLate}</td>
                <td>$${item.fine.toFixed(2)}</td>
                <td>
                    <span class="badge ${getStatusBadgeClass(item.status)}">
                        ${item.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary notify-btn" data-id="${item.id}">
                        <i class="fas fa-bell"></i> Notify
                    </button>
                    <button class="btn btn-sm btn-outline-success ms-1 payment-btn" data-id="${item.id}">
                        <i class="fas fa-money-bill-wave"></i> Update Payment
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add fresh event listeners
        addEventListeners();
    }

    // Add event listeners
    function addEventListeners() {
        // Individual notification
        document.querySelectorAll('.notify-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                selectedPatronId = parseInt(this.getAttribute('data-id'));
                const item = lateReturnsData.find(item => item.id === selectedPatronId);
                if (item) {
                    // Populate modal
                    document.getElementById('notificationPatron').textContent = item.patron;
                    document.getElementById('notificationBook').textContent = item.bookTitle;
                    document.getElementById('notificationDueDate').textContent = item.dueDate;
                    document.getElementById('notificationFine').textContent = `$${item.fine.toFixed(2)}`;
                    document.getElementById('customMessage').value = 
                        `Dear ${item.patron.split(' ')[0]},\n\n` +
                        `This is a reminder that your book "${item.bookTitle}" is overdue.\n` +
                        `Due date: ${item.dueDate}\nFine amount: $${item.fine.toFixed(2)}\n\n` +
                        `Please return the book as soon as possible.\n\nThank you,\nThe Library`;
                    
                    // Show modal
                    notificationModal.show();
                }
            });
        });

        // Payment buttons
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                selectedPatronId = parseInt(this.getAttribute('data-id'));
                setupPaymentModal(selectedPatronId);
                paymentModal.show();
            });
        });
    }

    // Status badge styling
    function getStatusBadgeClass(status) {
        switch(status) {
            case 'Unpaid': return 'bg-danger';
            case 'Partially Paid': return 'bg-warning text-dark';
            case 'Paid': return 'bg-success';
            default: return 'bg-secondary';
        }
    }

    // Setup payment modal
    function setupPaymentModal(itemId) {
        const item = lateReturnsData.find(item => item.id === itemId);
        if (!item) return;
        
        document.getElementById('paymentPatron').textContent = item.patron;
        document.getElementById('paymentBook').textContent = item.bookTitle;
        document.getElementById('paymentDueDate').textContent = item.dueDate;
        document.getElementById('paymentFine').textContent = `$${item.fine.toFixed(2)}`;
        document.getElementById('paymentAmount').value = item.fine.toFixed(2);
        document.getElementById('paymentAmount').max = item.fine.toFixed(2);
        document.getElementById('paymentStatus').value = item.status;
    }

    
    document.getElementById('sendNotification').addEventListener('click', function() {
        const item = lateReturnsData.find(item => item.id === selectedPatronId);
        if (item) {
            const notificationType = document.getElementById('notificationType').value;
            const customMessage = document.getElementById('customMessage').value;
            
            console.log(`Notification sent to ${item.patron} via ${notificationType}`);
            console.log(`Message: ${customMessage}`);
            
            notificationModal.hide();
            showAlert('success', `Notification sent to ${item.patron}`);
        }
    });

    // Process payment
    document.getElementById('processPayment').addEventListener('click', function() {
        const item = lateReturnsData.find(item => item.id === selectedPatronId);
        if (!item) return;
        
        const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
        const newStatus = document.getElementById('paymentStatus').value;
        
        if (isNaN(paymentAmount)) {
            showAlert('danger', 'Please enter a valid number');
            return;
        }
        
        if (paymentAmount > item.fine) {
            showAlert('danger', `Amount cannot exceed $${item.fine.toFixed(2)}`);
            return;
        }
        
        if (newStatus === 'Paid' && paymentAmount < item.fine) {
            showAlert('warning', 'Status cannot be "Paid" with partial payment');
            return;
        }
        
        // Update record
        item.status = newStatus;
        if (newStatus === 'Paid') {
            item.fine = 0;
        } else {
            item.fine -= paymentAmount;
        }
        
        paymentModal.hide();
        renderLateReturns();
        showAlert('success', `Payment updated for ${item.patron}`);
    });

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

    // Bulk notifications
    document.getElementById('sendAllNotifications').addEventListener('click', function() {
        const itemsToNotify = lateReturnsData.filter(item => 
            item.status === 'Unpaid' || item.status === 'Partially Paid'
        );
        
        if (itemsToNotify.length === 0) {
            showAlert('info', 'No unpaid or partially paid overdue items found');
            return;
        }
        
        if (confirm(`Send notifications to all ${itemsToNotify.length} unpaid/partially paid patrons?`)) {
            itemsToNotify.forEach(item => {
                console.log(`Notified ${item.patron} about overdue book "${item.bookTitle}"`);
            });
            showAlert('success', `Notifications sent to ${itemsToNotify.length} patrons`);
        }
    });

    // Initial render
    renderLateReturns();
});