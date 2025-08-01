// Loading Screen Management
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');

    // Simulate loading time (3 seconds)
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainContent.classList.add('visible');

        // Start slideshow after loading is complete
        startSlideshow();
        animateOnScroll();
        startTimeCounter(); // Start the time counter
    }, 3000);
});

// Time Counter Function
function startTimeCounter() {
    // Target date: December 9, 2024, 1:30 AM
    const targetDate = new Date('2024-12-09T01:30:00');

    function updateCounter() {
        const now = new Date();
        const timeDiff = now - targetDate;

        // Calculate time units
        const totalSeconds = Math.floor(timeDiff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        // Calculate years and months more accurately
        let years = 0;
        let months = 0;
        let days = totalDays;

        const currentYear = now.getFullYear();
        const targetYear = targetDate.getFullYear();
        const currentMonth = now.getMonth();
        const targetMonth = targetDate.getMonth();

        years = currentYear - targetYear;
        months = currentMonth - targetMonth;

        if (months < 0) {
            years--;
            months += 12;
        }

        // Adjust days calculation
        const tempDate = new Date(targetDate);
        tempDate.setFullYear(tempDate.getFullYear() + years);
        tempDate.setMonth(tempDate.getMonth() + months);
        days = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));

        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        // Update display
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = Math.max(0, days);
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    // Update immediately and then every second
    updateCounter();
    setInterval(updateCounter, 1000);
}

// Animation on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    const animatedElements = document.querySelectorAll('.message-card, .promise-item');
    animatedElements.forEach((el) => {
        observer.observe(el);
    });
}

// Show surprise modal
function showSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.style.display = 'block';

    // Add some extra effects
    confetti();
    playHeartAnimation();
    showLoveNotesInModal();
}

// Close surprise modal
function closeSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.style.display = 'none';

    // Remove any remaining love notes
    const loveNotes = document.querySelectorAll('.modal-love-note');
    loveNotes.forEach(note => note.remove());
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('surpriseModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Confetti effect
function confetti() {
    const colors = ['#ff9a9e', '#fecfef', '#fad0c4', '#ff6b6b', '#ffd93d', '#ffb3ba', '#ffdfba'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        createConfetti(colors[Math.floor(Math.random() * colors.length)]);
    }

    // Add rose petals effect
    createRosePetals();
} function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;

    document.body.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Create rose petals effect
function createRosePetals() {
    const roses = ['🌹', '🌺', '🌸', '💐'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingRose(roses[Math.floor(Math.random() * roses.length)]);
        }, i * 300);
    }
}

function createFloatingRose(rose) {
    const roseElement = document.createElement('div');
    roseElement.textContent = rose;
    roseElement.style.position = 'fixed';
    roseElement.style.left = Math.random() * 100 + 'vw';
    roseElement.style.top = '-10px';
    roseElement.style.fontSize = '1.8rem';
    roseElement.style.pointerEvents = 'none';
    roseElement.style.zIndex = '9999';
    roseElement.style.animation = `fallGently ${Math.random() * 4 + 3}s ease-out`;

    document.body.appendChild(roseElement);

    // Remove rose after animation
    setTimeout(() => {
        roseElement.remove();
    }, 7000);
}

// Add fall animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
    @keyframes fallGently {
        to {
            transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(style);

// Heart animation for surprise
function playHeartAnimation() {
    const hearts = ['💖', '💕', '💗', '💝', '💘', '💞', '💓', '💟', '♥️', '❤️'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingHeart(hearts[Math.floor(Math.random() * hearts.length)]);
        }, i * 200);
    }
}

function createFloatingHeart(heart) {
    const heartElement = document.createElement('div');
    heartElement.textContent = heart;
    heartElement.style.position = 'fixed';
    heartElement.style.left = Math.random() * 100 + 'vw';
    heartElement.style.top = '100vh';
    heartElement.style.fontSize = '2rem';
    heartElement.style.pointerEvents = 'none';
    heartElement.style.zIndex = '9999';
    heartElement.style.animation = `floatUp ${Math.random() * 2 + 3}s ease-out`;

    document.body.appendChild(heartElement);

    // Remove heart after animation
    setTimeout(() => {
        heartElement.remove();
    }, 5000);
}

// Add float up animation for hearts
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Smooth scrolling for better user experience
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add typing effect to messages
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect for first message when page loads
window.addEventListener('load', () => {
    const firstMessage = document.querySelector('.message-content p');
    if (firstMessage) {
        const originalText = firstMessage.textContent;
        setTimeout(() => {
            typeWriter(firstMessage, originalText, 30);
        }, 2000);
    }
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.stars');
    const speed = scrolled * 0.5;

    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add hover effects to message cards
document.addEventListener('DOMContentLoaded', () => {
    const messageCards = document.querySelectorAll('.message-card');

    messageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Add random floating hearts animation
function randomFloatingHearts() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 2 seconds
            const hearts = ['💕', '💖', '💗'];
            const heart = hearts[Math.floor(Math.random() * hearts.length)];
            createRandomHeart(heart);
        }
    }, 2000);
}

function createRandomHeart(heart) {
    const heartElement = document.createElement('div');
    heartElement.textContent = heart;
    heartElement.style.position = 'fixed';
    heartElement.style.left = Math.random() * 100 + 'vw';
    heartElement.style.top = '100vh';
    heartElement.style.fontSize = '1.5rem';
    heartElement.style.pointerEvents = 'none';
    heartElement.style.zIndex = '1';
    heartElement.style.opacity = '0.7';
    heartElement.style.animation = `slowFloatUp ${Math.random() * 5 + 8}s ease-out`;

    document.body.appendChild(heartElement);

    setTimeout(() => {
        heartElement.remove();
    }, 13000);
}

// Add slow float up animation
const slowFloatStyle = document.createElement('style');
slowFloatStyle.textContent = `
    @keyframes slowFloatUp {
        from {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        to {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slowFloatStyle);

// Initialize all animations (except slideshow which starts after loading)
document.addEventListener('DOMContentLoaded', () => {
    randomFloatingHearts();
    handleImageErrors();
    // startSlideshow(); // This is now called from the loading screen handler
});

// Background image slideshow
function startSlideshow() {
    const slides = document.querySelectorAll('.background-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Handle image loading errors gracefully
function handleImageErrors() {
    const memoryPhotos = document.querySelectorAll('.memory-photo');

    memoryPhotos.forEach(img => {
        img.addEventListener('error', function () {
            // Hide the image and show overlay by default
            this.style.display = 'none';
            const overlay = this.parentElement.querySelector('.photo-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });

        img.addEventListener('load', function () {
            // Image loaded successfully, keep overlay hidden until hover
            const overlay = this.parentElement.querySelector('.photo-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// Add special message for specific times
function checkSpecialTime() {
    const now = new Date();
    const hour = now.getHours();

    // Add special message if viewed at romantic times
    if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour <= 2)) {
        const specialMessage = document.createElement('div');
        specialMessage.style.position = 'fixed';
        specialMessage.style.top = '20px';
        specialMessage.style.right = '20px';
        specialMessage.style.background = 'rgba(255, 107, 107, 0.9)';
        specialMessage.style.color = 'white';
        specialMessage.style.padding = '15px';
        specialMessage.style.borderRadius = '10px';
        specialMessage.style.fontSize = '14px';
        specialMessage.style.zIndex = '1000';
        specialMessage.style.animation = 'fadeIn 1s ease-out';


        document.body.appendChild(specialMessage);

        setTimeout(() => {
            specialMessage.remove();
        }, 5000);
    }
}

// Check special time on load
window.addEventListener('load', checkSpecialTime);

// Romantic love notes that appear randomly
function showRandomLoveNote() {


    const randomNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];

    const noteElement = document.createElement('div');
    noteElement.textContent = randomNote;
    noteElement.style.position = 'fixed';
    noteElement.style.top = '50px';
    noteElement.style.left = '50%';
    noteElement.style.transform = 'translateX(-50%)';
    noteElement.style.background = 'rgba(255, 154, 158, 0.95)';
    noteElement.style.color = 'white';
    noteElement.style.padding = '15px 25px';
    noteElement.style.borderRadius = '25px';
    noteElement.style.fontSize = '16px';
    noteElement.style.fontWeight = '600';
    noteElement.style.zIndex = '1001';
    noteElement.style.animation = 'fadeIn 1s ease-out';
    noteElement.style.backdropFilter = 'blur(10px)';
    noteElement.style.boxShadow = '0 10px 25px rgba(255, 154, 158, 0.3)';

    document.body.appendChild(noteElement);

    setTimeout(() => {
        noteElement.style.animation = 'fadeOut 1s ease-out';
        setTimeout(() => {
            noteElement.remove();
        }, 1000);
    }, 4000);
}

// Show love notes specifically when modal opens
function showLoveNotesInModal() {


    // Show multiple love notes with delays
    loveNotes.forEach((note, index) => {
        setTimeout(() => {
            const noteElement = document.createElement('div');
            noteElement.textContent = note;
            noteElement.style.position = 'fixed';
            noteElement.style.top = (100 + index * 60) + 'px';
            noteElement.style.left = '50%';
            noteElement.style.transform = 'translateX(-50%)';
            noteElement.style.background = 'rgba(255, 154, 158, 0.95)';
            noteElement.style.color = 'white';
            noteElement.style.padding = '12px 20px';
            noteElement.style.borderRadius = '20px';
            noteElement.style.fontSize = '14px';
            noteElement.style.fontWeight = '600';
            noteElement.style.zIndex = '1002';
            noteElement.style.animation = 'fadeIn 1s ease-out';
            noteElement.style.backdropFilter = 'blur(10px)';
            noteElement.style.boxShadow = '0 10px 25px rgba(255, 154, 158, 0.3)';
            noteElement.className = 'modal-love-note';

            document.body.appendChild(noteElement);

            setTimeout(() => {
                noteElement.style.animation = 'fadeOut 1s ease-out';
                setTimeout(() => {
                    noteElement.remove();
                }, 1000);
            }, 3000);
        }, index * 800);
    });
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);
