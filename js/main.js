// ============================================
// BULLS HUB - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');

            // Toggle icon
            const icon = this.querySelector('span');
            if (icon) {
                icon.textContent = nav.classList.contains('active') ? '✕' : '☰';
            }
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                nav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('span');
                if (icon) {
                    icon.textContent = '☰';
                }
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-link');

    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ============================================
    // THEME TOGGLE (DARK/LIGHT MODE)
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    }

    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    // Initialize icons based on current theme
    updateThemeIcons(body.getAttribute('data-theme') || 'light');

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.card, .course-card, .highlight-item, .trust-badge');
    animatedElements.forEach(el => observer.observe(el));

    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const phone = this.querySelector('input[name="phone"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();

            // Basic validation
            if (!name || !email || !phone || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Phone validation (Indian format)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            // Create WhatsApp message
            const whatsappMessage = `*New Enquiry from Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Message:* ${message}`;
            const whatsappURL = `https://wa.me/919187110568?text=${whatsappMessage}`;

            // Open WhatsApp
            window.open(whatsappURL, '_blank');

            // Reset form
            this.reset();
            alert('Thank you! Redirecting to WhatsApp...');
        });
    }

    // ============================================
    // WHATSAPP FLOATING BUTTON
    // ============================================
    const whatsappFloat = document.querySelector('.whatsapp-float');

    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function () {
            const message = 'Hello! I am interested in Bulls Hub stock market courses. Please provide more information.';
            const whatsappURL = `https://wa.me/919187110568?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    }

    // ============================================
    // COURSE MODULE EXPAND/COLLAPSE (if needed)
    // ============================================
    const courseToggles = document.querySelectorAll('.course-toggle');

    courseToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const moduleList = this.nextElementSibling;
            if (moduleList) {
                moduleList.classList.toggle('hidden');
                this.textContent = moduleList.classList.contains('hidden') ? 'Show Modules ▼' : 'Hide Modules ▲';
            }
        });
    });

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // PRICE ANIMATION ON SCROLL
    // ============================================
    const priceElements = document.querySelectorAll('.price-current');

    const priceObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 0.5s ease';
                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    priceElements.forEach(el => priceObserver.observe(el));

});

// ============================================
// HELPER FUNCTIONS
// ============================================

// WhatsApp link generator
function generateWhatsAppLink(phone, message) {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/91${cleanPhone}?text=${encodedMessage}`;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// ============================================
// PULSE ANIMATION (for prices)
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;
document.head.appendChild(style);
