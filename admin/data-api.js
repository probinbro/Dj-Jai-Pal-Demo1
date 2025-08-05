// Data API for DJ JAI Website
// This file provides functions to load data from the admin panel into the main website

class DJJaiDataAPI {
    constructor() {
        this.events = [];
        this.gallery = { images: [], videos: [] };
        this.loadData();
    }

    // Load data from localStorage (saved by admin panel)
    loadData() {
        try {
            const eventsData = localStorage.getItem('djjai_events');
            const galleryData = localStorage.getItem('djjai_gallery');

            if (eventsData) {
                this.events = JSON.parse(eventsData);
            }

            if (galleryData) {
                this.gallery = JSON.parse(galleryData);
            }
        } catch (error) {
            console.error('Error loading data from admin panel:', error);
            this.loadDefaultData();
        }
    }

    // Load default data if no admin data exists
    loadDefaultData() {
        this.events = [
            {
                id: '1',
                title: 'Wedding Reception',
                date: '2024-12-15',
                time: '19:00',
                location: 'Grand Ballroom, City Hotel',
                description: 'An elegant wedding reception with live DJ performance',
                image: './Asstes/event1.jpg'
            },
            {
                id: '2',
                title: 'Corporate Party',
                date: '2024-12-20',
                time: '20:00',
                location: 'Business Center Downtown',
                description: 'Year-end corporate celebration with DJ entertainment',
                image: './Asstes/event2.jpg'
            },
            {
                id: '3',
                title: 'Birthday Bash',
                date: '2024-12-25',
                time: '18:30',
                location: 'Private Venue',
                description: 'Special birthday celebration with custom playlist',
                image: './Asstes/event3.jpg'
            }
        ];

        this.gallery = {
            images: [
                {
                    id: '1',
                    title: 'Wedding Setup',
                    url: './Asstes/gallery1.jpg',
                    description: 'Professional DJ setup at wedding venue',
                    type: 'image'
                },
                {
                    id: '2',
                    title: 'Corporate Event',
                    url: './Asstes/gallery2.jpg',
                    description: 'DJ performance at corporate party',
                    type: 'image'
                },
                {
                    id: '3',
                    title: 'Party Night',
                    url: './Asstes/gallery3.jpg',
                    description: 'Energetic party atmosphere',
                    type: 'image'
                },
                {
                    id: '4',
                    title: 'Sound Equipment',
                    url: './Asstes/gallery4.jpg',
                    description: 'Professional sound equipment setup',
                    type: 'image'
                },
                {
                    id: '5',
                    title: 'Lighting Setup',
                    url: './Asstes/gallery5.jpg',
                    description: 'Dynamic lighting for events',
                    type: 'image'
                },
                {
                    id: '6',
                    title: 'Dance Floor',
                    url: './Asstes/gallery6.jpg',
                    description: 'Packed dance floor at event',
                    type: 'image'
                }
            ],
            videos: [
                {
                    id: '1',
                    title: 'Wedding Highlight',
                    url: './Asstes/video1.mp4',
                    description: 'Highlights from a recent wedding performance',
                    type: 'video'
                },
                {
                    id: '2',
                    title: 'Corporate Event Mix',
                    url: './Asstes/video2.mp4',
                    description: 'Live mixing at corporate event',
                    type: 'video'
                }
            ]
        };
    }

    // Get all events
    getEvents() {
        return this.events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Get upcoming events
    getUpcomingEvents(limit = null) {
        const now = new Date();
        const upcoming = this.events.filter(event => new Date(event.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        return limit ? upcoming.slice(0, limit) : upcoming;
    }

    // Get past events
    getPastEvents(limit = null) {
        const now = new Date();
        const past = this.events.filter(event => new Date(event.date) < now)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        return limit ? past.slice(0, limit) : past;
    }

    // Get event by ID
    getEvent(id) {
        return this.events.find(event => event.id === id);
    }

    // Get all gallery images
    getGalleryImages() {
        return this.gallery.images;
    }

    // Get all gallery videos
    getGalleryVideos() {
        return this.gallery.videos;
    }

    // Get all gallery items
    getAllGalleryItems() {
        return [...this.gallery.images, ...this.gallery.videos];
    }

    // Get gallery item by ID
    getGalleryItem(id) {
        const allItems = this.getAllGalleryItems();
        return allItems.find(item => item.id === id);
    }

    // Format date for display
    formatDate(dateString) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Format time for display
    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Check if data is fresh (updated in last 5 seconds)
    isDataFresh() {
        const lastUpdate = localStorage.getItem('djjai_last_update');
        if (!lastUpdate) return false;

        const now = new Date().getTime();
        const updateTime = parseInt(lastUpdate);
        return (now - updateTime) < 5000; // 5 seconds
    }

    // Refresh data from localStorage
    refreshData() {
        this.loadData();
    }

    // Generate HTML for events
    generateEventsHTML() {
        const upcomingEvents = this.getUpcomingEvents(3);

        if (upcomingEvents.length === 0) {
            return `
                <div class="no-events">
                    <h3>No Upcoming Events</h3>
                    <p>Check back soon for new events!</p>
                </div>
            `;
        }

        return upcomingEvents.map(event => `
            <div class="event-card" data-aos="fade-up">
                <div class="event-image">
                    <img src="${event.image || './Asstes/default-event.jpg'}" alt="${event.title}" 
                         onerror="this.src='./Asstes/default-event.jpg'">
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <div class="event-details">
                        <p><i class="fas fa-calendar"></i> ${this.formatDate(event.date)}</p>
                        <p><i class="fas fa-clock"></i> ${this.formatTime(event.time)}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    </div>
                    <p class="event-description">${event.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Generate HTML for gallery
    generateGalleryHTML(type = 'all', limit = null) {
        let items = [];

        switch (type) {
            case 'images':
                items = this.getGalleryImages();
                break;
            case 'videos':
                items = this.getGalleryVideos();
                break;
            default:
                items = this.getAllGalleryItems();
        }

        if (limit) {
            items = items.slice(0, limit);
        }

        if (items.length === 0) {
            return `
                <div class="no-gallery">
                    <h3>No Gallery Items</h3>
                    <p>Gallery content will be added soon!</p>
                </div>
            `;
        }

        return items.map(item => {
            if (item.type === 'image') {
                return `
                    <div class="gallery-item" data-aos="fade-up">
                        <img src="${item.url}" alt="${item.title}" 
                             onerror="this.src='./Asstes/default-gallery.jpg'">
                        <div class="gallery-overlay">
                            <h4>${item.title}</h4>
                            ${item.description ? `<p>${item.description}</p>` : ''}
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="gallery-item video-item" data-aos="fade-up">
                        <video controls>
                            <source src="${item.url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="gallery-overlay">
                            <h4>${item.title}</h4>
                            ${item.description ? `<p>${item.description}</p>` : ''}
                        </div>
                    </div>
                `;
            }
        }).join('');
    }
}

// Create global instance
const djjaiData = new DJJaiDataAPI();

// Auto-refresh data every 10 seconds when on the website
setInterval(() => {
    if (window.location.pathname.includes('admin')) return; // Don't auto-refresh in admin panel
    djjaiData.refreshData();
}, 10000);
