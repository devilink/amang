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
    const heartSymbols = ['❤️', '💖', '✨', '🌸'];

    const createHeart = () => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        const size = Math.random() * 1.5 + 0.5; // 0.5rem to 2rem
        heart.style.fontSize = `${size}rem`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 10 + 10}s`; // 10s to 20s
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 20000);
    };

    setInterval(createHeart, 800);
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, Math.random() * 2000);
    }

    // --- Interactive Envelope ---
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
    });

    // --- 3D Carousel ---
    const carousel = document.getElementById('carousel');
    const cells = carousel.querySelectorAll('.carousel__cell');
    const cellCount = cells.length; // 8
    const theta = 360 / cellCount; // 45 deg
    // radius = (cellWidth / 2) / tan(PI / cellCount)
    // For cell width 210px in desktop: (105) / tan(PI/8) ≈ 253.4px. We'll use 280px for a bit of gap.
    let radius = 280;
    
    // Adjust radius for mobile
    if (window.innerWidth <= 768) {
        radius = 210; // cell width is 160px. (80) / tan(PI/8) ≈ 193px.
    }

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
    }, 4000);

    // Pause on hover/interaction
    const scene = document.querySelector('.scene');
    scene.addEventListener('mouseenter', () => clearInterval(autoRotate));
    scene.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            currentAngle -= theta;
            rotateCarousel();
        }, 4000);
    });

    // --- Dynamic Days Counter ---
    const daysElement = document.getElementById('days');
    let currentDay = 0;
    const targetDay = 1096;
    const duration = 2000;
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
