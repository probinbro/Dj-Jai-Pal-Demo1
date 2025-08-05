// This script will orchestrate the loading of all dynamic components and initialize them in the correct order.

// Function to fetch and inject HTML for a component
async function loadComponent(component, containerId) {
    try {
        const response = await fetch(component.url);
        if (!response.ok) {
            throw new Error(`Failed to load ${component.name}: ${response.statusText}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            console.log(`${component.name} loaded successfully.`);
            // If the component has an init function, call it
            if (typeof component.init === 'function') {
                component.init();
            }
        } else {
            console.error(`Container with id #${containerId} not found for ${component.name}.`);
        }
    } catch (error) {
        console.error(error);
    }
}

// Define all the dynamic components and their initialization logic
const components = {
    navbar: {
        name: 'Navbar',
        url: './components/navbar.html',
        containerId: 'navbar-container',
        init: () => {
            // Add any navbar-specific JS initialization here
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuIcon = mobileMenuToggle ? mobileMenuToggle.querySelector('i') : null;
            const mobileMenuClose = document.getElementById('mobile-menu-close');

            // Function to close mobile menu
            const closeMobileMenu = () => {
                if (mobileMenu && mobileMenuIcon) {
                    mobileMenu.classList.remove('active');
                    mobileMenuIcon.className = 'fas fa-bars';
                }
            };

            // Function to toggle mobile menu
            const toggleMobileMenu = () => {
                if (mobileMenu && mobileMenuIcon) {
                    const isActive = mobileMenu.classList.toggle('active');
                    mobileMenuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
                }
            };

            // Event listeners
            if (mobileMenuToggle) {
                mobileMenuToggle.addEventListener('click', toggleMobileMenu);
            }

            if (mobileMenuClose) {
                mobileMenuClose.addEventListener('click', closeMobileMenu);
            }

            // Close mobile menu when clicking on links
            const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
        }
    },
    footer: {
        name: 'Footer',
        url: './components/footer.html',
        containerId: 'footer-container',
        init: () => {
            // Add any footer-specific JS initialization here
            const yearSpan = document.getElementById('current-year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        }
    }
};

// Main initialization function
async function initializePage() {
    // Start loading all components in parallel
    const componentPromises = [
        loadComponent(components.navbar, components.navbar.containerId),
        loadComponent(components.footer, components.footer.containerId)
    ];

    // Wait for all components to be loaded and injected
    await Promise.all(componentPromises);

    console.log('All dynamic components loaded. Initializing main scripts...');

    // Now that the DOM is stable, initialize everything else
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    });

    // Initialize hero slideshow, gallery, etc. from index.js
    if (typeof initHeroSlideshow === 'function') {
        initHeroSlideshow();
    }
    if (typeof initGallery === 'function') {
        initGallery();
    }
    if (typeof loadDynamicEvents === 'function') {
        loadDynamicEvents();
    }
    if (typeof setupFormPackageSelection === 'function') {
        setupFormPackageSelection();
    }
    if (typeof setupContactForm === 'function') {
        setupContactForm();
    }

    // Hide loading screen
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Run the main initialization function when the DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);
