/* Initialize AOS animations */
AOS.init({
  duration: 1000,
  once: true,
});

/* GSAP Animation for Social Links on Page Load */
gsap.from('.social-links a', { 
  scale: 0, 
  opacity: 0, 
  stagger: 0.2, 
  duration: 0.5, 
  ease: 'back.out(1.7)' 
});

/* GSAP Animation for Hero Title */
gsap.from('.hero-title', { 
  opacity: 0, 
  y: -50, 
  duration: 1, 
  ease: 'power2.out' 
});
