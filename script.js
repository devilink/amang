document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    setTimeout(revealOnScroll, 100);

    // --- Floating Hearts Background ---
    const heartsContainer = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💖', '✨', '🌸', '💝'];

    const createHeart = () => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        const size = Math.random() * 2 + 0.8; // larger hearts now
        heart.style.fontSize = `${size}rem`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 10 + 12}s`; 
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 22000);
    };

    setInterval(createHeart, 600); // more frequent hearts for the larger screen
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, Math.random() * 2000);
    }

    // --- Interactive Envelope ---
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
    });

    // --- 3D Carousel (9 Images) ---
    const carousel = document.getElementById('carousel');
    const cells = carousel.querySelectorAll('.carousel__cell');
    const cellCount = cells.length; // 9
    const theta = 360 / cellCount; // 40 deg
    
    // Calculate Radius dynamically based on cell width
    let cellWidth = 280; // Desktop default
    if (window.innerWidth <= 360) {
        cellWidth = 180;
    } else if (window.innerWidth <= 768) {
        cellWidth = 200;
    }
    
    // radius = (cellWidth / 2) / Math.tan(Math.PI / cellCount);
    // Added 15% extra padding so the images don't touch
    const radius = Math.round((cellWidth / 2) / Math.tan(Math.PI / cellCount)) * 1.15;

    // Position cells
    cells.forEach((cell, index) => {
        const cellAngle = theta * index;
        cell.style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
    });

    let currentAngle = 0;
    
    const rotateCarousel = () => {
        carousel.style.transform = `translateZ(${-radius}px) rotateY(${currentAngle}deg)`;
    };
    
    // Initial setup
    rotateCarousel();

    // Controls
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.addEventListener('click', () => {
        currentAngle += theta;
        rotateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentAngle -= theta;
        rotateCarousel();
    });

    // Auto rotate
    let autoRotate = setInterval(() => {
        currentAngle -= theta;
        rotateCarousel();
    }, 3500);

    // Pause on hover/interaction
    const scene = document.querySelector('.scene');
    scene.addEventListener('mouseenter', () => clearInterval(autoRotate));
    scene.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            currentAngle -= theta;
            rotateCarousel();
        }, 3500);
    });
    
    // Support touch swipe for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    scene.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoRotate);
    }, {passive: true});
    
    scene.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        
        autoRotate = setInterval(() => {
            currentAngle -= theta;
            rotateCarousel();
        }, 3500);
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 30) {
            // Swiped left
            currentAngle -= theta;
            rotateCarousel();
        }
        if (touchEndX > touchStartX + 30) {
            // Swiped right
            currentAngle += theta;
            rotateCarousel();
        }
    }

    // --- Dynamic Days Counter ---
    const daysElement = document.getElementById('days');
    let currentDay = 0;
    const targetDay = 1096;
    const duration = 2500;
    const interval = 20;
    const step = targetDay / (duration / interval);

    const updateCounter = () => {
        const counterRect = daysElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (counterRect.top < windowHeight && currentDay === 0) {
            const counterInterval = setInterval(() => {
                currentDay += step;
                if (currentDay >= targetDay) {
                    daysElement.innerText = targetDay.toLocaleString();
                    clearInterval(counterInterval);
                } else {
                    daysElement.innerText = Math.floor(currentDay).toLocaleString();
                }
            }, interval);
            window.removeEventListener('scroll', updateCounter);
        }
    };

    window.addEventListener('scroll', updateCounter);
    
});
