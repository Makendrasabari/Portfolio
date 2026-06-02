document.addEventListener('DOMContentLoaded', () => {

  // ── Footer Copyright Year ──
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // ── Theme Switcher ──
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  
  // Set default theme (dark)
  const defaultTheme = 'dark';
  const activeTheme = savedTheme || defaultTheme;
  document.documentElement.setAttribute('data-theme', activeTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ── Mobile Nav Toggle ──
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close mobile nav when links are clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ── Scroll-Triggered Section Animations ──
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('reveal-active');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };

  // ── Header Scroll State ──
  const header = document.querySelector('.header');
  const handleHeaderScroll = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
  };

  // ── Active Nav Indicator Slide Effect ──
  const navLinksUl = document.querySelector('.nav-links');
  let indicator = null;
  if (navLinksUl) {
    indicator = document.createElement('div');
    indicator.classList.add('nav-indicator');
    navLinksUl.appendChild(indicator);

    window.updateIndicator = (activeLink) => {
      if (!activeLink) {
        indicator.style.opacity = '0';
        return;
      }
      const rect = activeLink.getBoundingClientRect();
      const parentRect = navLinksUl.getBoundingClientRect();
      
      indicator.style.left = `${rect.left - parentRect.left}px`;
      indicator.style.width = `${rect.width}px`;
      indicator.style.opacity = '1';
    };

    // Hover mouse interaction
    const links = navLinksUl.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        window.updateIndicator(link);
      });
    });

    navLinksUl.addEventListener('mouseleave', () => {
      const currentActive = navLinksUl.querySelector('a.active');
      window.updateIndicator(currentActive);
    });
  }

  // ── Active Nav Link Highlight on Scroll ──
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = ['skills', 'experience', 'projects', 'contact'];

  const handleNavHighlight = () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const elTop = el.offsetTop;
        if (window.scrollY >= elTop - 180) {
          current = id;
        }
      }
    });

    let activeLink = null;
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
        activeLink = link;
      } else {
        link.classList.remove('active');
      }
    });

    if (window.updateIndicator) {
      window.updateIndicator(activeLink);
    }
  };

  // Initialize scroll animation and attach events
  handleScrollAnimation();
  handleHeaderScroll();
  handleNavHighlight();

  window.addEventListener('scroll', () => {
    handleScrollAnimation();
    handleHeaderScroll();
    handleNavHighlight();
  });

  window.addEventListener('resize', () => {
    const currentActive = navLinksUl ? navLinksUl.querySelector('a.active') : null;
    if (window.updateIndicator && currentActive) {
      window.updateIndicator(currentActive);
    }
  });

  // ── Custom Lagging Cursor Follower ──
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  if (cursorDot && cursorOutline) {
    // Show custom cursor on desktop devices only
    cursorDot.style.display = 'block';
    cursorOutline.style.display = 'block';

    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Speeds (lag effect)
    const speed = 0.15;

    window.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      
      // Instantly position dot
      cursorDot.style.left = `${cursorX}px`;
      cursorDot.style.top = `${cursorY}px`;
    });

    // Animate outline lagging behind
    const animateOutline = () => {
      const distX = cursorX - outlineX;
      const distY = cursorY - outlineY;
      
      outlineX += distX * speed;
      outlineY += distY * speed;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateOutline);
    };
    animateOutline();

    // Hover states for elements
    const hoverElements = document.querySelectorAll('a, button, .card-tilt, .skill-pill, input, textarea, .contact-chip');
    hoverElements.forEach(item => {
      item.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      item.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // ── 3D Tilt Card Effect ──
  const tiltCards = document.querySelectorAll('.card-tilt');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (-10deg to 10deg)
      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ── Typewriter Subtitle Animation ──
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = ["Front-End Developer", "React Specialist", "UI/UX Creator", "Problem Solver"];
  const typingDelay = 100;
  const erasingDelay = 60;
  const newTextDelay = 2000; // Delay between word rotations
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (typedTextSpan) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      }
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (typedTextSpan) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      }
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (typedTextSpan && textArray.length) {
    setTimeout(type, newTextDelay);
  }

  // ── Project Filtering Logic ──
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.proj-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all') {
          card.classList.remove('filtered-out');
        } else if (categories.includes(filterValue)) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // ── Smooth Scroll for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Contact Form Success Simulation ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission success
      const submitBtn = contactForm.querySelector('.submit-btn');
      const submitText = submitBtn.querySelector('span');
      const originalText = submitText.textContent;
      
      submitText.textContent = "Sent Successfully!";
      submitBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)"; // Green accent
      
      // Clear inputs
      contactForm.reset();

      setTimeout(() => {
        submitText.textContent = originalText;
        submitBtn.style.background = ""; // revert to CSS var
      }, 4000);
    });
  }
});