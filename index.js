// This file (index.js) will now only contain the logic specific to the homepage,
// such as hero slideshow, gallery, events, and form handling.
// The main initialization is handled by main.js

// Hero Slideshow functionality
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    slides.forEach(slide => slide.classList.remove('active'));
    slides[0].classList.add('active');

    console.log('Hero slideshow initialized');

    function showNextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(showNextSlide, 5000);
}

// Dynamic Events Loading
function loadDynamicEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;

    // Check if djjaiData is available (from admin panel)
    if (typeof djjaiData !== 'undefined') {
        const upcomingEvents = djjaiData.getUpcomingEvents(3);

        if (upcomingEvents.length === 0) {
            eventsContainer.innerHTML = `<div class="event-item"><div class="event-info" style="text-align: center; width: 100%;"><p>New events will be announced soon. Stay tuned!</p></div></div>`;
            return;
        }

        eventsContainer.innerHTML = upcomingEvents.map(event => {
            const date = new Date(event.date);
            const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const day = date.getDate();

            return `
                <div class="event-item">
                    <div class="event-date">
                        <span class="month">${month}</span>
                        <span class="day">${day}</span>
                    </div>
                    <div class="event-info">
                        <h3>${event.title}</h3>
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <p><i class="fas fa-clock"></i> ${djjaiData.formatTime(event.time)}</p>
                        ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
                    </div>
                    <div class="event-action">
                        <button class="btn btn-secondary" onclick="showEventDetails('${event.id}')">Details</button>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        // Fallback to static events if admin data is not available
        const activeTours = [
            { id: 'soundwave', date: '2025-08-15', title: 'SoundWave Festival', location: 'New York, USA', venue: 'Central Park SummerStage' },
            { id: 'elysium', date: '2025-09-02', title: 'Club Elysium', location: 'Berlin, Germany', venue: 'Elysium Underground' },
            { id: 'jungle', date: '2025-10-21', title: 'Electric Jungle', location: 'Tokyo, Japan', venue: 'Tokyo Dome City Hall' }
        ];

        if (activeTours.length === 0) {
            eventsContainer.innerHTML = `<div class="event-item"><div class="event-info" style="text-align: center; width: 100%;"><p>New events will be announced soon. Stay tuned!</p></div></div>`;
            return;
        }

        eventsContainer.innerHTML = activeTours.map(tour => {
            const date = new Date(tour.date);
            const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const day = date.getDate();

            return `
                <div class="event-item">
                    <div class="event-date">
                        <span class="month">${month}</span>
                        <span class="day">${day}</span>
                    </div>
                    <div class="event-info">
                        <h3>${tour.title}</h3>
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${tour.location}</p>
                        <p>${tour.venue}</p>
                    </div>
                    <div class="event-action">
                        <button class="btn btn-secondary" onclick="alert('Event details for ${tour.title} would open in a modal.')">Details</button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Show event details function
function showEventDetails(eventId) {
    if (typeof djjaiData !== 'undefined') {
        const event = djjaiData.getEvent(eventId);
        if (event) {
            const formattedDate = djjaiData.formatDate(event.date);
            const formattedTime = djjaiData.formatTime(event.time);

            alert(`Event Details:\n\nTitle: ${event.title}\nDate: ${formattedDate}\nTime: ${formattedTime}\nLocation: ${event.location}\n\nDescription: ${event.description || 'No description available'}`);
        }
    }
}

// Gallery Modal functionality
function initGallery() {
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalImageTitle = document.getElementById('modalImageTitle');
    const modalImageDescription = document.getElementById('modalImageDescription');
    const closeGalleryModal = document.getElementById('closeGalleryModal');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');

    if (!galleryModal) return;

    let currentImageIndex = 0;
    let galleryImages = [];

    const galleryContainers = document.querySelectorAll('.gallery-clickable');
    if (galleryContainers.length === 0) return;

    galleryImages = Array.from(galleryContainers).map(container => ({
        src: container.getAttribute('data-image'),
        title: container.getAttribute('data-title'),
        description: container.getAttribute('data-description')
    }));

    galleryContainers.forEach((container, index) => {
        container.addEventListener('click', () => openGalleryModal(index));
    });

    function openGalleryModal(index) {
        currentImageIndex = index;
        updateModalImage();
        galleryModal.classList.remove('hidden');
    }

    function closeGalleryModalFunc() {
        galleryModal.classList.add('hidden');
    }

    function updateModalImage() {
        const image = galleryImages[currentImageIndex];
        modalImage.src = image.src;
        modalImageTitle.textContent = image.title;
        modalImageDescription.textContent = image.description;
    }

    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateModalImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateModalImage();
    }

    closeGalleryModal.addEventListener('click', closeGalleryModalFunc);
    prevImageBtn.addEventListener('click', showPreviousImage);
    nextImageBtn.addEventListener('click', showNextImage);
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) closeGalleryModalFunc();
    });
    document.addEventListener('keydown', (e) => {
        if (galleryModal.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeGalleryModalFunc();
        if (e.key === 'ArrowLeft') showPreviousImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
}

// Form package pre-selection
function setupFormPackageSelection() {
    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageType = button.getAttribute('data-package');
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                const djPackageSelect = document.getElementById('dj-package');
                if (djPackageSelect && packageType) {
                    djPackageSelect.value = packageType;
                }
            }, 500);
        });
    });
}

// Contact Form Submission
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
        contactForm.reset();
    });
}