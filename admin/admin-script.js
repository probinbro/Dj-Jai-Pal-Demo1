// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentUser = null;
        this.events = [];
        this.galleryItems = { images: [], videos: [] };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadData();
        this.hideLoading();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });

        // Add event button
        document.getElementById('add-event-btn').addEventListener('click', () => {
            this.showEventModal();
        });

        // Add gallery buttons
        document.getElementById('add-image-btn').addEventListener('click', () => {
            this.showGalleryModal('image');
        });

        document.getElementById('add-video-btn').addEventListener('click', () => {
            this.showGalleryModal('video');
        });

        // Event form
        document.getElementById('event-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEventSubmit();
        });

        // Gallery form
        document.getElementById('gallery-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleGallerySubmit();
        });

        // Change password form
        document.getElementById('change-password-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePasswordChange();
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Close modals on background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });
    }

    // Authentication
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('login-error');

        // Simple authentication (in production, use proper backend authentication)
        if (username === 'admin' && password === 'djjai123') {
            this.currentUser = username;
            this.showDashboard();
            errorDiv.style.display = 'none';
        } else {
            errorDiv.textContent = 'Invalid username or password';
            errorDiv.style.display = 'block';
        }
    }

    handleLogout() {
        this.currentUser = null;
        this.showLogin();
    }

    showLogin() {
        document.getElementById('login-modal').classList.add('active');
        document.getElementById('admin-dashboard').classList.remove('active');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    showDashboard() {
        document.getElementById('login-modal').classList.remove('active');
        document.getElementById('admin-dashboard').classList.add('active');
        document.getElementById('admin-username').textContent = `Welcome, ${this.currentUser}`;
    }

    // Tab Management
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    // Events Management
    showEventModal(eventData = null) {
        const modal = document.getElementById('event-modal');
        const form = document.getElementById('event-form');
        const title = document.getElementById('event-modal-title');

        if (eventData) {
            title.textContent = 'Edit Event';
            this.populateEventForm(eventData);
        } else {
            title.textContent = 'Add New Event';
            form.reset();
            document.getElementById('event-id').value = '';
        }

        modal.classList.add('active');
    }

    populateEventForm(eventData) {
        document.getElementById('event-id').value = eventData.id;
        document.getElementById('event-title').value = eventData.title;
        document.getElementById('event-date').value = eventData.date;
        document.getElementById('event-time').value = eventData.time;
        document.getElementById('event-location').value = eventData.location;
        document.getElementById('event-description').value = eventData.description;
        document.getElementById('event-image').value = eventData.image || '';
    }

    handleEventSubmit() {
        const formData = new FormData(document.getElementById('event-form'));
        const eventData = {
            id: formData.get('event-id') || Date.now().toString(),
            title: formData.get('event-title'),
            date: formData.get('event-date'),
            time: formData.get('event-time'),
            location: formData.get('event-location'),
            description: formData.get('event-description'),
            image: formData.get('event-image')
        };

        if (formData.get('event-id')) {
            // Update existing event
            const index = this.events.findIndex(e => e.id === eventData.id);
            if (index !== -1) {
                this.events[index] = eventData;
            }
        } else {
            // Add new event
            this.events.push(eventData);
        }

        this.saveData();
        this.renderEvents();
        this.closeModals();
        this.showSuccessMessage('Event saved successfully!');
    }

    deleteEvent(eventId) {
        if (confirm('Are you sure you want to delete this event?')) {
            this.events = this.events.filter(e => e.id !== eventId);
            this.saveData();
            this.renderEvents();
            this.showSuccessMessage('Event deleted successfully!');
        }
    }

    renderEvents() {
        const container = document.getElementById('events-container');

        if (this.events.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar"></i>
                    <h3>No Events Yet</h3>
                    <p>Click "Add New Event" to create your first event.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.events.map(event => `
            <div class="event-item">
                <div class="event-info">
                    <h4 class="event-title">${event.title}</h4>
                    <div class="event-details">
                        <i class="fas fa-calendar"></i> ${this.formatDate(event.date)} at ${event.time}<br>
                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                    </div>
                </div>
                <div class="event-actions">
                    <button class="btn btn-sm btn-secondary" onclick="adminPanel.showEventModal(${JSON.stringify(event).replace(/"/g, '&quot;')})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteEvent('${event.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Gallery Management
    showGalleryModal(type, itemData = null) {
        const modal = document.getElementById('gallery-modal');
        const form = document.getElementById('gallery-form');
        const title = document.getElementById('gallery-modal-title');

        document.getElementById('gallery-type').value = type;

        if (itemData) {
            title.textContent = `Edit ${type === 'image' ? 'Image' : 'Video'}`;
            this.populateGalleryForm(itemData);
        } else {
            title.textContent = `Add ${type === 'image' ? 'Image' : 'Video'}`;
            form.reset();
            document.getElementById('gallery-id').value = '';
            document.getElementById('gallery-type').value = type;
        }

        modal.classList.add('active');
    }

    populateGalleryForm(itemData) {
        document.getElementById('gallery-id').value = itemData.id;
        document.getElementById('gallery-title').value = itemData.title;
        document.getElementById('gallery-url').value = itemData.url;
        document.getElementById('gallery-description').value = itemData.description || '';
    }

    handleGallerySubmit() {
        const formData = new FormData(document.getElementById('gallery-form'));
        const type = formData.get('gallery-type');
        const itemData = {
            id: formData.get('gallery-id') || Date.now().toString(),
            title: formData.get('gallery-title'),
            url: formData.get('gallery-url'),
            description: formData.get('gallery-description'),
            type: type
        };

        const collection = type === 'image' ? 'images' : 'videos';

        if (formData.get('gallery-id')) {
            // Update existing item
            const index = this.galleryItems[collection].findIndex(item => item.id === itemData.id);
            if (index !== -1) {
                this.galleryItems[collection][index] = itemData;
            }
        } else {
            // Add new item
            this.galleryItems[collection].push(itemData);
        }

        this.saveData();
        this.renderGallery();
        this.closeModals();
        this.showSuccessMessage('Gallery item saved successfully!');
    }

    deleteGalleryItem(type, itemId) {
        if (confirm('Are you sure you want to delete this item?')) {
            const collection = type === 'image' ? 'images' : 'videos';
            this.galleryItems[collection] = this.galleryItems[collection].filter(item => item.id !== itemId);
            this.saveData();
            this.renderGallery();
            this.showSuccessMessage('Gallery item deleted successfully!');
        }
    }

    renderGallery() {
        this.renderGallerySection('images');
        this.renderGallerySection('videos');
    }

    renderGallerySection(type) {
        const container = document.getElementById(`${type}-container`);
        const items = this.galleryItems[type];

        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-${type === 'images' ? 'image' : 'video'}"></i>
                    <h3>No ${type} Yet</h3>
                    <p>Click "Add ${type === 'images' ? 'Image' : 'Video'}" to add your first ${type === 'images' ? 'image' : 'video'}.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="gallery-grid-item">
                ${type === 'images'
                ? `<img src="${item.url}" alt="${item.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmMWYxZjEiLz48dGV4dCB4PSIxMDAiIHk9Ijc1IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='">`
                : `<video src="${item.url}" controls style="width: 100%; height: 150px;"></video>`
            }
                <div class="gallery-grid-item-info">
                    <h5 class="gallery-grid-item-title">${item.title}</h5>
                    <div class="gallery-grid-item-actions">
                        <button class="btn btn-sm btn-secondary" onclick="adminPanel.showGalleryModal('${type === 'images' ? 'image' : 'video'}', ${JSON.stringify(item).replace(/"/g, '&quot;')})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteGalleryItem('${type === 'images' ? 'image' : 'video'}', '${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Settings
    handlePasswordChange() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (currentPassword !== 'djjai123') {
            this.showErrorMessage('Current password is incorrect');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showErrorMessage('New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            this.showErrorMessage('New password must be at least 6 characters');
            return;
        }

        // In a real application, you would send this to a backend
        this.showSuccessMessage('Password changed successfully!');
        document.getElementById('change-password-form').reset();
    }

    // Data Management
    loadData() {
        try {
            const eventsData = localStorage.getItem('djjai_events');
            const galleryData = localStorage.getItem('djjai_gallery');

            if (eventsData) {
                this.events = JSON.parse(eventsData);
            }

            if (galleryData) {
                this.galleryItems = JSON.parse(galleryData);
            }

            this.renderEvents();
            this.renderGallery();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    saveData() {
        try {
            localStorage.setItem('djjai_events', JSON.stringify(this.events));
            localStorage.setItem('djjai_gallery', JSON.stringify(this.galleryItems));
        } catch (error) {
            console.error('Error saving data:', error);
            this.showErrorMessage('Error saving data');
        }
    }

    // Utility functions
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    showSuccessMessage(message) {
        // Create a temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message show';
        successDiv.textContent = message;
        successDiv.style.position = 'fixed';
        successDiv.style.top = '20px';
        successDiv.style.right = '20px';
        successDiv.style.background = '#16a34a';
        successDiv.style.color = 'white';
        successDiv.style.padding = '1rem 1.5rem';
        successDiv.style.borderRadius = '6px';
        successDiv.style.zIndex = '1001';
        successDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    showErrorMessage(message) {
        // Create a temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message show';
        errorDiv.textContent = message;
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '20px';
        errorDiv.style.right = '20px';
        errorDiv.style.background = '#dc2626';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '1rem 1.5rem';
        errorDiv.style.borderRadius = '6px';
        errorDiv.style.zIndex = '1001';
        errorDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

        document.body.appendChild(errorDiv);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // Export data for the main website
    exportDataForWebsite() {
        return {
            events: this.events,
            gallery: this.galleryItems
        };
    }
}

// Initialize the admin panel
const adminPanel = new AdminPanel();

// Make it available globally for onclick handlers
window.adminPanel = adminPanel;
