/**
 * AURELIA & CO. | LUXURY WEDDING ATELIER & COMMERCIAL EVENT SCENOGRAPHY
 * Main JavaScript Engine
 * Features:
 * - Theme Toggle (Dark/Light) with LocalStorage persistence
 * - Sticky Glassmorphism Header & Active Navigation Spy
 * - Mobile Navigation Drawer
 * - Hero Animated Numeric Counters
 * - Profile Tabbed Content Navigation
 * - Skill Meter Animation with IntersectionObserver
 * - Portfolio Filter System with DOM Animation
 * - Case Study Modal with Dynamic Rich Data Injection
 * - "Find Your Mind Style" Multi-Step Interactive Quiz
 * - Testimonials Carousel
 * - Form Validation, Real-Time Feedback & Async Submission Handling
 * - Dynamic Character Counter & Range Slider Sync
 * - Newsletter Subscription Handling
 * - Smooth Back to Top Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Theme Toggle (Dark/Light Mode)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('aurelia_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('aurelia_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.style.color = '#aa820a';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.style.color = '#d4af37';
    }
  }

  // ==========================================================================
  // 2. Sticky Glassmorphism Header & Active Nav Tracking
  // ==========================================================================
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow and blur
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // ScrollSpy active link tracking
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 3. Mobile Navigation Drawer
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('open');
      navLinksContainer.classList.toggle('open');
    });

    // Close mobile drawer on navigation link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('open');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // ==========================================================================
  // 4. Hero Numeric Animated Counters
  // ==========================================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const isDollars = counter.innerText.includes('$');
      const isPercent = counter.innerText.includes('%');
      let current = 0;
      const increment = Math.ceil(target / 45);

      const updateCount = () => {
        current += increment;
        if (current >= target) {
          if (isDollars) {
            counter.innerText = `$${target}M+`;
          } else if (isPercent) {
            counter.innerText = `${target}%`;
          } else {
            counter.innerText = `${target}+`;
          }
        } else {
          if (isDollars) {
            counter.innerText = `$${current}M+`;
          } else if (isPercent) {
            counter.innerText = `${current}%`;
          } else {
            counter.innerText = `${current}`;
          }
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    });
  }

  // Trigger counters immediately or on first view
  setTimeout(animateCounters, 300);

  // ==========================================================================
  // 5. Profile Sub-tabs Switching
  // ==========================================================================
  const profileTabButtons = document.querySelectorAll('.profile-tab-btn');
  const profileTabPanels = document.querySelectorAll('.profile-tab-panel');

  profileTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      profileTabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      profileTabPanels.forEach(panel => panel.classList.remove('active'));

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // ==========================================================================
  // 6. Skill Meters Animation (IntersectionObserver)
  // ==========================================================================
  const skillCards = document.querySelectorAll('.skill-card');
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  if ('IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) skillsObserver.observe(skillsSection);
  } else {
    // Fallback
    progressBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-progress');
    });
  }

  // ==========================================================================
  // 7. Portfolio Filtering System
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // 8. Projects Case Study Modal System
  // ==========================================================================
  const caseStudyData = {
    p1: {
      title: "The Glass Pavilion Symphony",
      category: "Haute Wedding",
      mindStyle: "Architectural Monolith & Floral Geometry",
      location: "Villa Balbiano, Lake Como, Italy",
      scale: "320 International Guests",
      budget: "€1,850,000",
      lead: "Seraphina Vance & Architectural Team",
      image: "assets/images/hero_luxury_wedding.jpg",
      brief: "The couple, both contemporary art collectors, requested an unprecedented fusion of minimalist glass architecture and untamed botanical opulence over the historic Lake Como waters without damaging heritage stone pavers.",
      palette: [
        { name: "Pure Alabaster", hex: "#FFFFFF" },
        { name: "Liquid Champagne", hex: "#D4AF37" },
        { name: "Obsidian Steel", hex: "#111417" },
        { name: "Blush Chiffon", hex: "#E8D8C8" }
      ],
      execution: "Engineered a freestanding 40-meter glass pavilion elevated 15cm over the reflection pool. Over 12,000 cascading phalaenopsis orchids hung from the truss system, mirrored by 800 hand-poured beeswax candles reflecting on the midnight water.",
      quote: "Seraphina created a living sculpture. Walking across the water into our glass conservatory took our breath away."
    },
    p2: {
      title: "Aurora Global Awards Gala",
      category: "Commercial Gala",
      mindStyle: "High-Fashion Commercial Spectacle",
      location: "Palazzo Reale, Milan, Italy",
      scale: "650 VIP Delegates & Press",
      budget: "€2,400,000",
      lead: "Seraphina Vance (Executive Producer)",
      image: "assets/images/commercial_event_gala.jpg",
      brief: "Design and direct the flagship annual gala for an international luxury conglomerate, requiring seamless stage broadcast capabilities, high-security dignitary seating, and unforgettable visual grandeur.",
      palette: [
        { name: "Royal Gold", hex: "#C59B27" },
        { name: "Empire Onyx", hex: "#0E1012" },
        { name: "Warm Amber", hex: "#FFB03B" },
        { name: "Ivory Marble", hex: "#F5F3EF" }
      ],
      execution: "Constructed four unbroken 60-meter mirrored banquet tables down the neoclassical hall, crowned with 3-meter tall golden floral stanchions and computerized 2400K warm kinetic chandeliers synced to the live orchestra.",
      quote: "The benchmark by which all our global brand experiences are now measured. Flawless commercial precision."
    },
    p3: {
      title: "Amalfi Cliffside Dreamscape",
      category: "Destination Soirée",
      mindStyle: "Romantic Biophilic & Italian Riviera",
      location: "Villa TreVille, Positano, Amalfi Coast",
      scale: "140 Intimate Guests",
      budget: "$980,000",
      lead: "Seraphina Vance & Local Artisans",
      image: "assets/images/destination_wedding_coastal.jpg",
      brief: "A sunset destination celebration emphasizing coastal Italian warmth, scent memory, and tactile artisanal ceramics.",
      palette: [
        { name: "Terracotta Dawn", hex: "#E29578" },
        { name: "Dusty Rose", hex: "#E6B8B8" },
        { name: "Linen Cream", hex: "#FAF0CA" },
        { name: "Olive Bough", hex: "#588157" }
      ],
      execution: "Constructed an open-air timber pergola draped in natural raw Italian chiffon and scented garden roses. Table runners of hand-picked Amalfi lemons and rosemary blended with custom hand-painted Vietri ceramic charger plates.",
      quote: "Our guests felt like they were dining in a private dream high above the ocean. Pure poetry in physical form."
    },
    p4: {
      title: "Haute Couture Monolith Launch",
      category: "Commercial Showcase",
      mindStyle: "Avant-Garde Modernist",
      location: "Palais de Tokyo, Paris, France",
      scale: "480 Attendees & Global Press",
      budget: "€1,250,000",
      lead: "Seraphina Vance & Scenography Lab",
      image: "assets/images/commercial_fashion_launch.jpg",
      brief: "Launch a high-jewelry and haute couture capsule with an avant-garde runway transitioning directly into an exclusive VIP cocktail salon.",
      palette: [
        { name: "Brushed Bronze", hex: "#9E7D3B" },
        { name: "Noir Steel", hex: "#16181B" },
        { name: "Alabaster Stark", hex: "#F8F9FA" },
        { name: "Smoke Topaz", hex: "#7E685A" }
      ],
      execution: "Integrated architectural blackened iron structures with asymmetric floral sculptures of dark calla lilies and anthuriums. Utilized narrow-beam architectural profile spotlights focused strictly on runway models and display vitrines.",
      quote: "Aurelia & Co. brought an architectural integrity that perfectly amplified our fashion house's aesthetic rigor."
    },
    p5: {
      title: "The Solarium Botanical Immersion",
      category: "Botanical Artistry",
      mindStyle: "Organic Sculptural",
      location: "Private Estate Conservatory, Cotswolds, UK",
      scale: "110 Private Guests",
      budget: "£650,000",
      lead: "Seraphina Vance & Master Botanists",
      image: "assets/images/project_solarium_botanical.jpg",
      brief: "Transform a historic Victorian glass conservatory into an immersive enchanted dinner forest celebrating British flora and heirloom candlelit dining.",
      palette: [
        { name: "Deep Forest Moss", hex: "#2E604D" },
        { name: "Antique Wax", hex: "#FFF8E7" },
        { name: "Weathered Oak", hex: "#4A3B32" },
        { name: "Anemone White", hex: "#FFFFFF" }
      ],
      execution: "Suspended massive organic floral clouds of olive, silver eucalyptus, and white Japanese anemones. Over 400 taper candles in brass holders lined the dark wooden banquets, creating an intimate, glowing forest sanctuary.",
      quote: "Intimate, warm, and utterly sublime. It felt as if nature itself had set the banquet for us."
    },
    p6: {
      title: "Château Royal Midnight Nuptials",
      category: "Haute Wedding",
      mindStyle: "Neoclassical Heritage Grandeur",
      location: "Château de Chantilly, Loire Valley, France",
      scale: "260 Guests (3-Day Event)",
      budget: "€2,100,000",
      lead: "Seraphina Vance & French Production Unit",
      image: "assets/images/chateau_luxury_wedding.jpg",
      brief: "A 3-day multi-venue French heritage wedding harmonizing royal equestrian traditions with contemporary electronic lighting and midnight fireworks.",
      palette: [
        { name: "Midnight Indigo", hex: "#1B2430" },
        { name: "Versailles Gold", hex: "#D4AF37" },
        { name: "French Toile", hex: "#EAEAEA" },
        { name: "Deep Burgundy", hex: "#5C1D24" }
      ],
      execution: "Coordinated seamless multi-venue transitions from equestrian stable reception to grand salon banquet, concluding with architectural projection mapping across the 17th-century château facade during a synchronised pyrotechnic show.",
      quote: "The seamless movement of 260 guests across 3 days felt like high diplomacy executed with supreme grace."
    }
  };

  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalHeroImage = document.getElementById('modalHeroImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalMindStyle = document.getElementById('modalMindStyle');
  const modalLocation = document.getElementById('modalLocation');
  const modalScale = document.getElementById('modalScale');
  const modalBudget = document.getElementById('modalBudget');
  const modalLead = document.getElementById('modalLead');
  const modalBrief = document.getElementById('modalBrief');
  const modalPalette = document.getElementById('modalPalette');
  const modalExecution = document.getElementById('modalExecution');
  const modalQuote = document.getElementById('modalQuote');
  const modalInquireLink = document.querySelector('.modal-inquire-link');

  document.querySelectorAll('.explore-case-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = caseStudyData[projectId];
      if (!data) return;

      modalHeroImage.src = data.image;
      modalHeroImage.alt = data.title;
      modalCategory.innerText = data.category;
      modalProjectTitle.innerText = data.title;
      modalMindStyle.innerText = data.mindStyle;
      modalLocation.innerText = data.location;
      modalScale.innerText = data.scale;
      modalBudget.innerText = data.budget;
      modalLead.innerText = data.lead;
      modalBrief.innerText = data.brief;
      modalExecution.innerText = data.execution;
      modalQuote.innerText = `"${data.quote}"`;

      // Build swatches
      modalPalette.innerHTML = '';
      data.palette.forEach(color => {
        const swatchBox = document.createElement('div');
        swatchBox.className = 'palette-swatch-box';
        swatchBox.innerHTML = `
          <div class="swatch-circle" style="background-color: ${color.hex};"></div>
          <span style="font-size: 0.8rem; font-weight: 500;">${color.name}</span>
          <span class="swatch-hex">${color.hex}</span>
        `;
        modalPalette.appendChild(swatchBox);
      });

      caseStudyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (caseStudyModal) {
      caseStudyModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalInquireLink) modalInquireLink.addEventListener('click', closeModal);

  // Close on backdrop click or Escape key
  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseStudyModal && caseStudyModal.classList.contains('open')) {
      closeModal();
    }
  });

  // ==========================================================================
  // 9. Interactive "Find Your Mind Style" Matcher (Quiz Logic)
  // ==========================================================================
  const quizSteps = {
    1: document.getElementById('quizStep1'),
    2: document.getElementById('quizStep2'),
    3: document.getElementById('quizStep3'),
    result: document.getElementById('quizResultStep')
  };

  const quizBackBtn1 = document.getElementById('quizBackBtn1');
  const quizBackBtn2 = document.getElementById('quizBackBtn2');
  const retakeQuizBtn = document.getElementById('retakeQuizBtn');
  const applyMindStyleToFormBtn = document.getElementById('applyMindStyleToFormBtn');

  const quizState = {
    step1: null,
    step2: null,
    step3: null
  };

  const mindStyleResults = {
    architectural: {
      title: "Architectural Monolith & Floral Geometry",
      desc: "Your aesthetic soul is driven by pure geometry, structural glass marvels, bold negative space, and disciplined floral statements. You value structural clarity, modern monolithic materials, and precision illumination over traditional ornamentation.",
      swatches: [
        { name: "Alabaster", hex: "#FFFFFF" },
        { name: "Liquid Gold", hex: "#D4AF37" },
        { name: "Obsidian", hex: "#111417" },
        { name: "Blush Chiffon", hex: "#E8D8C8" }
      ],
      formValue: "architectural_monolith"
    },
    biophilic: {
      title: "Romantic Biophilic & Italian Riviera",
      desc: "Your creative mind seeks sensory warmth, organic textures, terraced coastal dining, and natural scent storytelling. Hand-woven linens, trailing heirloom garden roses, and flickering beeswax candlelight define your idyllic atmosphere.",
      swatches: [
        { name: "Terracotta", hex: "#E29578" },
        { name: "Olive Moss", hex: "#588157" },
        { name: "Linen Cream", hex: "#FAF0CA" },
        { name: "Antique Gold", hex: "#C59B27" }
      ],
      formValue: "romantic_biophilic"
    },
    spectacle: {
      title: "High-Fashion Commercial Spectacle",
      desc: "You thrive on red-carpet prestige, monumental 60-meter mirrored banquet tables, crystal chandeliers, and broadcast-grade show direction. Your celebrations feel like international couture galas that demand global media attention.",
      swatches: [
        { name: "Royal Gold", hex: "#D4AF37" },
        { name: "Empire Onyx", hex: "#0E1012" },
        { name: "Amber Luminescence", hex: "#FFB03B" },
        { name: "Mirrored Silver", hex: "#E0E0E0" }
      ],
      formValue: "high_fashion_spectacle"
    },
    avantgarde: {
      title: "Modern Avant-Garde & Botanical Drama",
      desc: "You reject conventional formulas in favor of daring sculptural installations, dark botanical immersion, brushed blackened bronze, and custom projection mapping. An experience tailored for design connoisseurs and cultural pioneers.",
      swatches: [
        { name: "Deep Forest", hex: "#2E604D" },
        { name: "Brushed Bronze", hex: "#9E7D3B" },
        { name: "Noir Velvet", hex: "#16181B" },
        { name: "Smoked Pearl", hex: "#D1D5DB" }
      ],
      formValue: "modern_avantgarde"
    }
  };

  // Option selection handlers
  document.querySelectorAll('.quiz-option-card').forEach(card => {
    card.addEventListener('click', () => {
      const step = card.getAttribute('data-step');
      const val = card.getAttribute('data-value');

      // Visual feedback
      const parentStep = card.closest('.quiz-step');
      parentStep.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      if (step === '1') {
        quizState.step1 = val;
        setTimeout(() => switchQuizStep(1, 2), 250);
      } else if (step === '2') {
        quizState.step2 = val;
        setTimeout(() => switchQuizStep(2, 3), 250);
      } else if (step === '3') {
        quizState.step3 = val;
        setTimeout(() => calculateAndShowResult(), 250);
      }
    });
  });

  function switchQuizStep(from, to) {
    if (quizSteps[from]) quizSteps[from].classList.remove('active');
    if (quizSteps[to]) quizSteps[to].classList.add('active');
  }

  if (quizBackBtn1) quizBackBtn1.addEventListener('click', () => switchQuizStep(2, 1));
  if (quizBackBtn2) quizBackBtn2.addEventListener('click', () => switchQuizStep(3, 2));

  function calculateAndShowResult() {
    // Choose outcome based on step1 primary aesthetic
    const styleKey = quizState.step1 || 'architectural';
    const result = mindStyleResults[styleKey];

    document.getElementById('resultStyleTitle').innerText = result.title;
    document.getElementById('resultStyleDescription').innerText = result.desc;

    // Render palette
    const swatchesContainer = document.getElementById('resultPaletteSwatches');
    swatchesContainer.innerHTML = '';
    result.swatches.forEach(c => {
      const box = document.createElement('div');
      box.className = 'palette-swatch-box';
      box.innerHTML = `
        <div class="swatch-circle" style="background-color: ${c.hex};"></div>
        <span style="font-size: 0.8rem; font-weight: 500;">${c.name}</span>
        <span class="swatch-hex">${c.hex}</span>
      `;
      swatchesContainer.appendChild(box);
    });

    switchQuizStep(3, 'result');
  }

  if (retakeQuizBtn) {
    retakeQuizBtn.addEventListener('click', () => {
      quizState.step1 = null;
      quizState.step2 = null;
      quizState.step3 = null;
      document.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
      switchQuizStep('result', 1);
    });
  }

  // Auto-apply Mind Style to Contact Form
  if (applyMindStyleToFormBtn) {
    applyMindStyleToFormBtn.addEventListener('click', () => {
      const styleKey = quizState.step1 || 'architectural';
      const result = mindStyleResults[styleKey];
      const mindStyleSelect = document.getElementById('mindStyleSelect');
      const eventCategorySelect = document.getElementById('eventCategory');

      if (mindStyleSelect) {
        mindStyleSelect.value = result.formValue;
      }

      // Synchronize category if chosen
      if (eventCategorySelect && quizState.step2) {
        if (quizState.step2 === 'intimate' || quizState.step2 === 'grand') {
          eventCategorySelect.value = 'haute_wedding';
        } else if (quizState.step2 === 'commercial_gala') {
          eventCategorySelect.value = 'commercial_gala';
        } else if (quizState.step2 === 'product_launch') {
          eventCategorySelect.value = 'luxury_launch';
        }
      }

      // Smooth scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================================================
  // 10. Testimonials Carousel
  // ==========================================================================
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevTestimonialBtn = document.getElementById('prevTestimonialBtn');
  const nextTestimonialBtn = document.getElementById('nextTestimonialBtn');
  const carouselSlideCounter = document.getElementById('carouselSlideCounter');
  let currentSlide = 0;

  function showSlide(index) {
    testimonialSlides.forEach((slide, idx) => {
      slide.classList.remove('active');
      if (idx === index) slide.classList.add('active');
    });
    if (carouselSlideCounter) {
      carouselSlideCounter.innerText = `${index + 1} / ${testimonialSlides.length}`;
    }
  }

  if (nextTestimonialBtn && prevTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    });

    prevTestimonialBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(currentSlide);
    });
  }

  // ==========================================================================
  // 11. Range Slider Sync & Dynamic Message Character Counter
  // ==========================================================================
  const guestCountSlider = document.getElementById('guestCount');
  const guestCountDisplay = document.getElementById('guestCountDisplay');
  const clientMessage = document.getElementById('clientMessage');
  const charCounter = document.getElementById('charCounter');

  if (guestCountSlider && guestCountDisplay) {
    guestCountSlider.addEventListener('input', () => {
      guestCountDisplay.innerText = `${guestCountSlider.value} Guests`;
    });
  }

  if (clientMessage && charCounter) {
    clientMessage.addEventListener('input', () => {
      const length = clientMessage.value.length;
      charCounter.innerText = `${length} / 600`;
      if (length >= 580) {
        charCounter.style.color = '#ef4444';
      } else {
        charCounter.style.color = 'var(--text-muted)';
      }
    });
  }

  // ==========================================================================
  // 12. Contact Form Live Validation & Async Transmission Handling
  // ==========================================================================
  const consultationForm = document.getElementById('consultationForm');
  const clientName = document.getElementById('clientName');
  const clientEmail = document.getElementById('clientEmail');
  const clientPhone = document.getElementById('clientPhone');
  const eventCategory = document.getElementById('eventCategory');
  const eventDate = document.getElementById('eventDate');
  const budgetScope = document.getElementById('budgetScope');
  const submitInquiryBtn = document.getElementById('submitInquiryBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const successToast = document.getElementById('successToast');
  const toastReferenceText = document.getElementById('toastReferenceText');

  // Set minimum date to tomorrow
  if (eventDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    eventDate.min = tomorrow.toISOString().split('T')[0];
  }

  // Real-time field validation helpers
  function validateField(input, errorElement, condition) {
    if (!condition) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (errorElement) errorElement.classList.add('visible');
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (errorElement) errorElement.classList.remove('visible');
      return true;
    }
  }

  // Input listeners for real-time feedback
  if (clientName) {
    clientName.addEventListener('input', () => {
      validateField(clientName, document.getElementById('nameError'), clientName.value.trim().length >= 3);
    });
  }

  if (clientEmail) {
    clientEmail.addEventListener('input', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(clientEmail, document.getElementById('emailError'), emailRegex.test(clientEmail.value.trim()));
    });
  }

  if (clientPhone) {
    clientPhone.addEventListener('input', () => {
      validateField(clientPhone, document.getElementById('phoneError'), clientPhone.value.trim().length >= 7);
    });
  }

  if (eventCategory) {
    eventCategory.addEventListener('change', () => {
      validateField(eventCategory, document.getElementById('categoryError'), eventCategory.value !== '');
    });
  }

  if (eventDate) {
    eventDate.addEventListener('change', () => {
      validateField(eventDate, document.getElementById('dateError'), eventDate.value !== '');
    });
  }

  if (budgetScope) {
    budgetScope.addEventListener('change', () => {
      validateField(budgetScope, document.getElementById('budgetError'), budgetScope.value !== '');
    });
  }

  if (clientMessage) {
    clientMessage.addEventListener('input', () => {
      validateField(clientMessage, document.getElementById('messageError'), clientMessage.value.trim().length >= 20);
    });
  }

  // Form submission handler
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isNameValid = validateField(clientName, document.getElementById('nameError'), clientName.value.trim().length >= 3);
      const isEmailValid = validateField(clientEmail, document.getElementById('emailError'), emailRegex.test(clientEmail.value.trim()));
      const isPhoneValid = validateField(clientPhone, document.getElementById('phoneError'), clientPhone.value.trim().length >= 7);
      const isCategoryValid = validateField(eventCategory, document.getElementById('categoryError'), eventCategory.value !== '');
      const isDateValid = validateField(eventDate, document.getElementById('dateError'), eventDate.value !== '');
      const isBudgetValid = validateField(budgetScope, document.getElementById('budgetError'), budgetScope.value !== '');
      const isMessageValid = validateField(clientMessage, document.getElementById('messageError'), clientMessage.value.trim().length >= 20);

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isCategoryValid || !isDateValid || !isBudgetValid || !isMessageValid) {
        // Scroll to the first invalid field
        const firstInvalid = consultationForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Show spinner state
      btnText.style.display = 'none';
      btnSpinner.style.display = 'inline-block';
      submitInquiryBtn.disabled = true;

      // Simulate async atelier transmission
      setTimeout(() => {
        btnText.style.display = 'inline-block';
        btnSpinner.style.display = 'none';
        submitInquiryBtn.disabled = false;

        // Generate luxury reference code
        const refId = `#AUR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        if (toastReferenceText) {
          toastReferenceText.innerText = `Reference ID ${refId}. Principal Director Seraphina Vance will review your brief within 24 hours.`;
        }

        // Show Toast
        if (successToast) {
          successToast.classList.add('show');
          setTimeout(() => {
            successToast.classList.remove('show');
          }, 6000);
        }

        // Reset form & styling states
        consultationForm.reset();
        document.querySelectorAll('.form-control').forEach(ctrl => {
          ctrl.classList.remove('is-valid');
          ctrl.classList.remove('is-invalid');
        });
        if (guestCountDisplay) guestCountDisplay.innerText = '150 Guests';
        if (charCounter) charCounter.innerText = '0 / 600';
      }, 1200);
    });
  }

  // ==========================================================================
  // 13. Newsletter Subscription Handling
  // ==========================================================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterSuccess = document.getElementById('newsletterSuccess');

  if (newsletterForm && newsletterEmail && newsletterSuccess) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (newsletterEmail.value.includes('@')) {
        newsletterForm.style.display = 'none';
        newsletterSuccess.style.display = 'block';
      }
    });
  }

  // ==========================================================================
  // 14. Smooth Back to Top
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
