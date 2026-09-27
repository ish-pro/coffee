/* ==========================================================
   COFFEE SHOP WEBSITE - JAVASCRIPT FUNCTIONALITY
   Beginner-friendly code with clear step-by-step comments
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------
       1. MOBILE HAMBURGER MENU TOGGLE
       ------------------------------------------------------ */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and X
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking any navigation link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }


    /* ------------------------------------------------------
       2. COFFEE MENU FILTERING FUNCTIONALITY
       ------------------------------------------------------ */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked button
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });


    /* ------------------------------------------------------
       3. ORDER BUTTON INTERACTION ALERT
       ------------------------------------------------------ */
    const orderButtons = document.querySelectorAll('.btn-order');

    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const coffeeName = button.getAttribute('data-name');
            const coffeePrice = button.getAttribute('data-price');
            alert(`☕ Great choice! Your order for ${coffeeName} ($${coffeePrice}) has been placed successfully.`);
        });
    });


    /* ------------------------------------------------------
       4. CUSTOMER REVIEW SLIDER FUNCTIONALITY
       ------------------------------------------------------ */
    const sliderTrack = document.querySelector('.slider-track');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalReviews = reviewCards.length;

    function updateSlider() {
        if (sliderTrack) {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalReviews;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
            updateSlider();
        });
    }


    /* ------------------------------------------------------
       5. SCROLL TO TOP BUTTON & NAVBAR ACTIVE STATE
       ------------------------------------------------------ */
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Add shadow/background tint to navbar on scroll
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ------------------------------------------------------
       6. BASIC CONTACT / NEWSLETTER FORM VALIDATION
       ------------------------------------------------------ */
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('newsletter-email');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailValue = emailInput.value.trim();

            if (emailValue === '') {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.className = 'form-message error';
            } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
                formMessage.textContent = 'Please enter a complete email address.';
                formMessage.className = 'form-message error';
            } else {
                formMessage.textContent = '🎉 Thank you for subscribing to Coffee Break!';
                formMessage.className = 'form-message success';
                emailInput.value = '';
                
                // Clear success message after 4 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 4000);
            }
        });
    }

});