// Dynamic Footer Component
class DynamicFooter {
    constructor() {
        this.render();
    }

    getFooterHTML() {
        return `
            <footer>
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-about">
                            <h4>DJ JAI</h4>
                            <p>Electrifying audiences worldwide with cutting-edge electronic music and unforgettable performances.</p>
                            <div class="footer-socials">
                                <a href="https://instagram.com/djjai" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                                <a href="https://open.spotify.com/artist/djjai" target="_blank" rel="noopener noreferrer"><i class="fab fa-spotify"></i></a>
                                <a href="https://soundcloud.com/djjai" target="_blank" rel="noopener noreferrer"><i class="fab fa-soundcloud"></i></a>
                                <a href="https://youtube.com/@djjai" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div class="footer-links">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li><a href="index.html#about">About</a></li>
                                <li><a href="index.html#music">Music</a></li>
                                <li><a href="index.html#events">Events</a></li>
                                <li><a href="gallery.html">Gallery</a></li>
                                <li><a href="services.html">Services</a></li>
                            </ul>
                        </div>
                        <div class="footer-links">
                            <h4>Services</h4>
                            <ul>
                                <li><a href="services.html">Wedding DJ</a></li>
                                <li><a href="services.html">Corporate Events</a></li>
                                <li><a href="services.html">Private Parties</a></li>
                                <li><a href="services.html">Music Production</a></li>
                            </ul>
                        </div>
                        <div class="footer-links">
                            <h4>Contact</h4>
                            <ul>
                                <li><a href="mailto:booking@djjai.com">booking@djjai.com</a></li>
                                <li><a href="tel:+15551234567">+1 (555) 123-4567</a></li>
                                <li><a href="index.html#contact">Get Quote</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="copyright">
                        <p>&copy; ${new Date().getFullYear()} DJ JAI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }

    render() {
        // Create footer container if it doesn't exist
        let footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            footerContainer = document.createElement('div');
            footerContainer.id = 'footer-container';
            document.body.appendChild(footerContainer);
        }

        footerContainer.innerHTML = this.getFooterHTML();
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicFooter();
});
