// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations
function initAnimations() {
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// Update active navigation item based on current page
function updateActiveNavItem() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentPage === '/' || currentPage === '/index.html') {
            if (link.getAttribute('href') === '#about') {
                link.classList.add('active');
            }
        } else if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links on the main page
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    updateActiveNavItem();
    initSmoothScroll();
});

// Update active nav item when navigating between pages
window.addEventListener('popstate', updateActiveNavItem);