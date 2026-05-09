document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Entrance Animation
    const hero = document.querySelector('.hero');
    setTimeout(() => {
        hero.classList.add('active-hero');
    }, 300);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Parallax Effect for Experience Section
    const experienceSection = document.querySelector('.experience');
    const parallaxBg = document.querySelector('.experience-parallax');

    window.addEventListener('scroll', () => {
        if (experienceSection) {
            const speed = 0.5;
            const rect = experienceSection.getBoundingClientRect();
            const offset = rect.top;
            
            // Only calculate if the section is visible
            if (offset < window.innerHeight && offset + rect.height > 0) {
                const yPos = -(offset * speed);
                parallaxBg.style.transform = `translateY(${yPos}px)`;
            }
        }
    });

    // 5. Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Interactive Card Hover Glow
    const cards = document.querySelectorAll('.collection-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
