/* Initialize AOS animations */
AOS.init({
    duration: 1000,
    once: true,
  });
  
  /* GSAP ScrollTrigger Registration */
  gsap.registerPlugin(ScrollTrigger);
  
  /* Theme Management */
  class ThemeManager {
    constructor() {
      this.currentTheme = localStorage.getItem('theme') || 'dark';
      this.init();
    }
  
    init() {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      const themeToggle = document.getElementById('themeToggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', () => this.toggleTheme());
      }
    }
  
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
      
      // Animate theme transition
      gsap.to('body', {
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  }
  
  /* Custom Cursor */
  class CustomCursor {
    constructor() {
      this.cursor = document.querySelector('.cursor');
      this.cursorTrail = document.querySelector('.cursor-trail');
      this.init();
    }
  
    init() {
      if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => this.updateCursor(e));
        document.addEventListener('mousedown', () => this.scaleCursor(0.8));
        document.addEventListener('mouseup', () => this.scaleCursor(1));
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', () => this.scaleCursor(1.5));
          el.addEventListener('mouseleave', () => this.scaleCursor(1));
        });
      }
    }
  
    updateCursor(e) {
      const x = e.clientX;
      const y = e.clientY;
      
      gsap.to(this.cursor, {
        x: x - 10,
        y: y - 10,
        duration: 0.1,
        ease: 'power2.out'
      });
      
      gsap.to(this.cursorTrail, {
        x: x - 4,
        y: y - 4,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  
    scaleCursor(scale) {
      gsap.to(this.cursor, {
        scale: scale,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  }
  
  /* Typing Animation */
  class TypingAnimation {
    constructor(element, texts, speed = 100) {
      this.element = element;
      this.texts = texts;
      this.speed = speed;
      this.textIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.init();
    }
  
    init() {
      this.type();
    }
  
    type() {
      const currentText = this.texts[this.textIndex];
      
      if (this.isDeleting) {
        this.element.textContent = currentText.substring(0, this.charIndex - 1);
        this.charIndex--;
      } else {
        this.element.textContent = currentText.substring(0, this.charIndex + 1);
        this.charIndex++;
      }
  
      let typeSpeed = this.speed;
      if (this.isDeleting) typeSpeed /= 2;
  
      if (!this.isDeleting && this.charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.textIndex = (this.textIndex + 1) % this.texts.length;
        typeSpeed = 500; // Pause before next text
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  /* Matrix Rain Effect */
  class MatrixRain {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
      this.fontSize = 14;
      this.columns = 0;
      this.drops = [];
      this.init();
    }
  
    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.animate();
    }
  
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.columns = Math.floor(this.canvas.width / this.fontSize);
      this.drops = Array(this.columns).fill(1);
    }
  
    animate() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.fillStyle = '#00ff41';
      this.ctx.font = `${this.fontSize}px monospace`;
      
      for (let i = 0; i < this.drops.length; i++) {
        const text = this.chars[Math.floor(Math.random() * this.chars.length)];
        this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
        
        if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
          this.drops[i] = 0;
        }
        this.drops[i]++;
      }
      
      requestAnimationFrame(() => this.animate());
    }
  }
  
  /* Skills Animation */
  class SkillsAnimation {
    constructor() {
      this.skillCircles = document.querySelectorAll('.skill-circle');
      this.init();
    }
  
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateSkill(entry.target);
          }
        });
      }, { threshold: 0.5 });
  
      this.skillCircles.forEach(circle => observer.observe(circle));
    }
  
    animateSkill(skillCircle) {
      const percentage = parseInt(skillCircle.dataset.skill);
      const percentageElement = skillCircle.querySelector('.skill-percentage');
      const degrees = (percentage / 100) * 360;
      
      // Animate the circular progress
      gsap.to(skillCircle, {
        background: `conic-gradient(var(--accent) ${degrees}deg, var(--secondary-accent) ${degrees}deg, transparent ${degrees}deg)`,
        duration: 2,
        ease: 'power2.out'
      });
      
      // Animate the percentage counter
      gsap.to({ value: 0 }, {
        value: percentage,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          percentageElement.textContent = Math.round(this.targets()[0].value) + '%';
        }
      });
    }
  }
  
  /* Portfolio Filter */
  class PortfolioFilter {
    constructor() {
      this.filterButtons = document.querySelectorAll('.filter-btn');
      this.portfolioItems = document.querySelectorAll('.portfolio-item');
      this.init();
    }
  
    init() {
      this.filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => this.filterProjects(e.target.dataset.filter));
      });
    }
  
    filterProjects(filter) {
      // Update active button
      this.filterButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
      
      // Filter projects with animation
      this.portfolioItems.forEach(item => {
        const categories = item.dataset.category.split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        if (shouldShow) {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => item.classList.remove('hidden')
          });
        } else {
          gsap.to(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => item.classList.add('hidden')
          });
        }
      });
    }
  }
  
  /* Particle Background */
  function initParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#ff0099' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#00e6ff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
    }
  }
  
  /* GSAP Animations */
  function initGSAPAnimations() {
    // Hero animations
    gsap.from('.hero-content', { 
      opacity: 0, 
      y: 50, 
      duration: 1, 
      ease: 'power2.out',
      delay: 0.5
    });
  
    // Social links animation
    gsap.from('.social-links a', { 
      scale: 0, 
      opacity: 0, 
      stagger: 0.2, 
      duration: 0.5, 
      ease: 'back.out(1.7)',
      delay: 1
    });
  
    // Scroll-triggered animations
    gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });
  
    // Navbar scroll effect
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: {className: 'scrolled', targets: '.navbar'}
    });
  }
  
  /* Initialize everything when DOM is loaded */
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new CustomCursor();
    new SkillsAnimation();
    new PortfolioFilter();
    
    // Initialize typing animation
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
      new TypingAnimation(typingElement, [
        'Android Developer',
        'Kotlin Enthusiast', 
        'Java Expert',
        'Mobile App Creator',
        'Code Architect'
      ]);
    }
    
    // Initialize matrix rain
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
      new MatrixRain(matrixCanvas);
    }
    
    // Initialize particles
    initParticles();
    
    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: target,
            ease: 'power2.inOut'
          });
        }
      });
    });
  });
  
  /* Add some extra visual flair */
  window.addEventListener('load', () => {
    // Add loading complete animation
    gsap.to('body', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

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

/* Optional: Add floating anime-style animation */
gsap.to('.hero-content', {
  y: 10,
  repeat: -1,
  yoyo: true,
  duration: 2,
  ease: 'sine.inOut'
});
