// Dynamic Navbar Component
class DynamicNavbar {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.render();
        this.initializeEvents();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop();

        if (page === '' || page === 'index.html') return 'home';
        if (page === 'gallery.html') return 'gallery';
        if (page === 'services.html') return 'services';
        return 'home';
    }

    getNavbarHTML() {
        return `
            <nav class="navbar" id="navbar">
                <div class="nav-content">
                    <a href="index.html" class="nav-brand">
                        <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt="DJ JAI Logo"
                            onerror="this.onerror=null;this.src='https://placehold.co/50x50/121212/FFFFFF?text=JAI';">
                        <span class="logo-text">JAI</span>
                    </a>

                    <div class="nav-links">
                        <a href="index.html" ${this.currentPage === 'home' ? 'class="active"' : ''}>Home</a>
                        <a href="index.html#about" ${this.currentPage === 'home' ? '' : 'onclick="this.href=\'index.html#about\'"'}>About</a>
                        <a href="index.html#music" ${this.currentPage === 'home' ? '' : 'onclick="this.href=\'index.html#music\'"'}>Music</a>
                        <a href="index.html#events" ${this.currentPage === 'home' ? '' : 'onclick="this.href=\'index.html#events\'"'}>Events</a>
                        <a href="gallery.html" ${this.currentPage === 'gallery' ? 'class="active"' : ''}>Gallery</a>
                        <a href="services.html" ${this.currentPage === 'services' ? 'class="active"' : ''}>Services</a>
                    </div>

                    <div class="nav-cta">
                        <a href="index.html#contact" class="btn btn-primary">Book Now</a>
                    </div>

                    <button class="mobile-menu-toggle" id="mobile-menu-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>

            <!-- Mobile Menu -->
            <div class="mobile-menu" id="mobile-menu">
                <a href="index.html" ${this.currentPage === 'home' ? 'class="active"' : ''}>Home</a>
                <a href="index.html#about">About</a>
                <a href="index.html#music">Music</a>
                <a href="index.html#events">Events</a>
                <a href="gallery.html" ${this.currentPage === 'gallery' ? 'class="active"' : ''}>Gallery</a>
                <a href="services.html" ${this.currentPage === 'services' ? 'class="active"' : ''}>Services</a>
                <a href="index.html#contact" class="btn-primary" style="margin-top: 1rem;">Book Now</a>
            </div>
        `;
    }

    render() {
        // Create navbar container if it doesn't exist
        let navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) {
            navbarContainer = document.createElement('div');
            navbarContainer.id = 'navbar-container';
            document.body.insertBefore(navbarContainer, document.body.firstChild);
        }

        navbarContainer.innerHTML = this.getNavbarHTML();
    }

    initializeEvents() {
        // Wait for DOM to be ready
        setTimeout(() => {
            // Mobile menu toggle
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuToggle && mobileMenu) {
                const mobileMenuIcon = mobileMenuToggle.querySelector('i');

                mobileMenuToggle.addEventListener('click', () => {
                    const isActive = mobileMenu.classList.toggle('active');
                    mobileMenuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
                });

                // Close mobile menu when clicking on links
                document.querySelectorAll('.mobile-menu a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.remove('active');
                        mobileMenuIcon.className = 'fas fa-bars';
                    });
                });
            }

            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                const navbar = document.getElementById('navbar');
                if (navbar) {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }
            });

            // Smooth scrolling for anchor links (only for same page)
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }, 100);
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicNavbar();
});
