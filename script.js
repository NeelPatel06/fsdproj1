// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('.tab-content form');
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.getElementById('password');
const sliderDots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const cardSearch = document.getElementById('card-search');

// Theme Toggle
if (themeToggle) {
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        // Update theme toggle icon
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Reveal Animation
function revealOnScroll() {
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Call on load in case elements are already in view
if (scrollRevealElements.length > 0) {
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
}

// Login/Register Tab Switching
if (tabs.length > 0 && forms.length > 0) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(tab => tab.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding form
            forms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${targetTab}-form`).classList.add('active');
        });
    });
}

// Toggle Password Visibility
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    });
}

// Features Slider
if (slider && slides.length > 0) {
    let currentSlide = 0;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        sliderDots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    }
    
    // Dot navigation
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
            updateSlider();
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
            updateSlider();
        });
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        updateSlider();
    }, 5000);
    
    // Initialize slider
    updateSlider();
}

// Card Filtering
if (filterButtons.length > 0 && cards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Card Search
if (cardSearch && cards.length > 0) {
    cardSearch.addEventListener('input', () => {
        const searchTerm = cardSearch.value.toLowerCase();
        
        cards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const cardContent = card.querySelector('.card-content').textContent.toLowerCase();
            
            if (cardTitle.includes(searchTerm) || cardContent.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Simple validation
        if (nameInput && nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Valid email is required');
                isValid = false;
            }
        }
        
        if (messageInput && messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
        
        // Remove error on input
        input.addEventListener('input', function() {
            input.classList.remove('error');
            if (formGroup.querySelector('.error-message')) {
                formGroup.removeChild(errorElement);
            }
        });
    }
}

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length > 0) {
    const lazyLoad = function() {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top <= window.innerHeight + 100 && img.getBoundingClientRect().bottom >= 0) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    };
    
    // Load images initially visible
    lazyLoad();
    
    // Add scroll listener
    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
}

// Initialize any tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
if (tooltips.length > 0) {
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.dataset.tooltip;
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);
            
            const rect = this.getBoundingClientRect();
            tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
            tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`;
            tooltipElement.style.opacity = '1';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipElement = document.querySelector('.tooltip');
            if (tooltipElement) {
                document.body.removeChild(tooltipElement);
            }
        });
    });
}

// Content loaded event
document.addEventListener('DOMContentLoaded', function() {
    console.log('All functionality initialized!');
});