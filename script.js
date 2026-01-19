// ===========================
// Navigation Functionality
// ===========================

// Sticky Navigation
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - navbar.offsetHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Back to Top Button
// ===========================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Project Filtering
// ===========================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Create mailto link (fallback for static site)
        const mailtoLink = `mailto:RFI@noreasinc.com?subject=${encodeURIComponent(subject || 'Website Contact Form')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        // Show success message
        showNotification('Thank you for your message! Opening email client...', 'success');

        // Open mailto link after a short delay
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1000);

        // Reset form
        contactForm.reset();
    });
}

// ===========================
// Notification System
// ===========================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? '#8ec63f' : '#0760ad'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
        z-index: 10000;
        animation: slideIn 0.4s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-icon {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .notification-message {
        font-size: 0.95rem;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// ===========================
// Intersection Observer for Animations (Optimized)
// ===========================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

let animationObserver;

function initAnimationObserver() {
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Unobserve after animation to save resources
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe ALL elements with data-aos attribute
    const elements = Array.from(document.querySelectorAll('[data-aos]'));
    
    elements.forEach(el => {
        animationObserver.observe(el);
    });
}

// Initialize on idle for better performance
if ('requestIdleCallback' in window) {
    requestIdleCallback(initAnimationObserver, { timeout: 2000 });
} else {
    setTimeout(initAnimationObserver, 100);
}

// ===========================
// Counter Animation for Stats
// ===========================

function animateCounter(element, target, suffix = '+', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    const originalText = element.textContent;

    // Handle special formats (K, M, etc)
    const hasK = originalText.includes('K');
    const hasM = originalText.includes('M');

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            let displayValue = Math.floor(current);
            if (hasK) {
                displayValue = (displayValue / 1000).toFixed(0) + 'K';
            } else if (hasM) {
                displayValue = (displayValue / 1000000).toFixed(1) + 'M';
            }
            element.textContent = displayValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            let finalValue = target;
            if (hasK) {
                finalValue = (target / 1000).toFixed(0) + 'K';
            } else if (hasM) {
                finalValue = (target / 1000000).toFixed(1) + 'M';
            }
            element.textContent = finalValue + suffix;
        }
    };

    updateCounter();
}

function parseStatNumber(text) {
    // Remove common suffixes and parse
    const cleanText = text.replace(/[+\s,]/g, '');
    if (cleanText.includes('K')) {
        return parseFloat(cleanText.replace('K', '')) * 1000;
    } else if (cleanText.includes('M')) {
        return parseFloat(cleanText.replace('M', '')) * 1000000;
    } else {
        return parseInt(cleanText);
    }
}

// Trigger counter animation when stats come into view
const heroStatsAnimated = { value: false };
const trackStatsAnimated = { value: false };

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const isHeroStats = entry.target.classList.contains('hero-stats');
            const isTrackStats = entry.target.classList.contains('track-stats');

            if (isHeroStats && !heroStatsAnimated.value) {
                heroStatsAnimated.value = true;
                const statNumbers = entry.target.querySelectorAll('.stat-number');

                statNumbers.forEach((stat, index) => {
                    const text = stat.textContent;
                    const number = parseStatNumber(text);
                    const hasSuffix = text.includes('+');

                    stat.textContent = '0' + (hasSuffix ? '+' : '');

                    setTimeout(() => {
                        animateCounter(stat, number, hasSuffix ? '+' : '', 2000);
                    }, index * 100);
                });
            }

            if (isTrackStats && !trackStatsAnimated.value) {
                trackStatsAnimated.value = true;
                const trackNumbers = entry.target.querySelectorAll('.track-stat-number');

                trackNumbers.forEach((stat, index) => {
                    const text = stat.textContent;
                    const number = parseStatNumber(text);
                    const hasSuffix = text.includes('+');

                    stat.textContent = '0' + (hasSuffix ? '+' : '');

                    setTimeout(() => {
                        animateCounter(stat, number, hasSuffix ? '+' : '', 2500);
                    }, index * 150);
                });
            }
        }
    });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

const trackStats = document.querySelector('.track-stats');
if (trackStats) {
    statsObserver.observe(trackStats);
}

// ===========================
// Loading Animation
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('aos-animate');
            }
        });
    }, 100);
});

// ===========================
// Performance Optimizations
// ===========================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Parallax Effect REMOVED - was causing layout shifts and CLS issues
// ===========================

// ===========================
// Enhanced Hover Effects (Optimized)
// ===========================

// Cache card rects for performance
const cardRects = new WeakMap();

function cacheCardRects() {
    document.querySelectorAll('.service-card').forEach(card => {
        cardRects.set(card, {
            width: card.offsetWidth,
            height: card.offsetHeight
        });
    });
}

// Cache on load and resize
cacheCardRects();
window.addEventListener('resize', debounce(cacheCardRects, 200));

// Service cards - removed aggressive 3D tilt effect
// Cards now only lift up on hover via CSS

// ===========================
// Dynamic Year in Footer
// ===========================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear && footerYear.textContent.includes('2026')) {
    // Keep 2026 as specified in the design
}

// ===========================
// Accessibility Enhancements
// ===========================

// Skip to main content functionality
document.addEventListener('keydown', (e) => {
    // If user presses Tab on page load, show focus indicators
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
});

// Add keyboard navigation for dropdown menus
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (trigger && menu) {
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menu.classList.toggle('visible');
            }
        });
    }
});

// ===========================
// Print Optimization
// ===========================

window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections for printing
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    // Restore normal state after printing
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = '';
    });
});

// ===========================
// Console Easter Egg
// ===========================

console.log('%c🌱 NOREAS Inc. - Engineering Excellence Since 2008', 'color: #8ec63f; font-size: 16px; font-weight: bold;');
console.log('%cInterested in joining our team? Visit our LinkedIn: https://www.linkedin.com/company/noreas-inc', 'color: #0760ad; font-size: 12px;');
console.log('%cWebsite developed with modern web technologies for optimal performance and user experience.', 'color: #326b93; font-size: 11px;');

// ===========================
// Video Autoplay Handling
// ===========================

// Ensure video plays - some browsers block autoplay even with muted attribute
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
    // Force play attempt
    const playVideo = () => {
        const playPromise = heroVideo.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Video started playing
                    console.log('Video is playing');
                })
                .catch((error) => {
                    // Autoplay was prevented or failed
                    console.warn('Video autoplay prevented:', error);
                    // Try again after user interaction
                    document.addEventListener('click', () => {
                        heroVideo.play().catch(err => console.warn('Video play failed:', err));
                    }, { once: true });
                });
        }
    };

    // Try to play immediately
    playVideo();

    // Also try when video is ready
    heroVideo.addEventListener('loadedmetadata', playVideo);
    heroVideo.addEventListener('canplay', playVideo);
    
    // Handle video errors
    heroVideo.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        const error = heroVideo.error;
        if (error) {
            switch (error.code) {
                case error.MEDIA_ERR_ABORTED:
                    console.error('Video loading aborted');
                    break;
                case error.MEDIA_ERR_NETWORK:
                    console.error('Network error while loading video');
                    break;
                case error.MEDIA_ERR_DECODE:
                    console.error('Error decoding video');
                    break;
                case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    console.error('Video format not supported or source not found');
                    break;
            }
        }
    });
}

// ===========================
// Interactive Gradient for Featured Service
// ===========================

const serviceFeatured = document.querySelector('.service-featured');

if (serviceFeatured) {
    serviceFeatured.addEventListener('mousemove', (e) => {
        const rect = serviceFeatured.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        serviceFeatured.style.setProperty('--mouse-x', `${x}%`);
        serviceFeatured.style.setProperty('--mouse-y', `${y}%`);
    });

    serviceFeatured.addEventListener('mouseleave', () => {
        serviceFeatured.style.setProperty('--mouse-x', '50%');
        serviceFeatured.style.setProperty('--mouse-y', '50%');
    });
}

// ===========================
// Initialize All Features
// ===========================

// Add JS class immediately to enable animations
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    console.log('NOREAS website initialized successfully');

    // Add loaded class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
