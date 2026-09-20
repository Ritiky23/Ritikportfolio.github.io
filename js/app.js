/* ==========================================================================
   RITIK YADAV - OBSIDIAN EXECUTIVE INTERACTIVE LOGIC (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar scroll background elevation
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.background = 'rgba(7, 9, 14, 0.95)';
      navbar.style.borderBottomColor = 'var(--border-card)';
    } else {
      navbar.style.background = 'rgba(7, 9, 14, 0.85)';
      navbar.style.borderBottomColor = 'var(--border-subtle)';
    }
  });

  // 2. Smooth scrolling with offset for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // 4. Active Navigation Link Highlighting on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });

  // 4. Project Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 7. Interactive Journey Circuit / Transit Map Controller
  const circuitStations = document.querySelectorAll('.circuit-station');
  const circuitProgress = document.getElementById('circuitProgress');
  const hudCard = document.getElementById('circuitHudCard');
  const hudBadge = document.getElementById('hudBadge');
  const hudTitle = document.getElementById('hudTitle');
  const hudLocation = document.getElementById('hudLocation');
  const hudMilestone = document.getElementById('hudMilestone');
  const hudScope = document.getElementById('hudScope');
  const hudDeliverables = document.getElementById('hudDeliverables');
  const hudTags = document.getElementById('hudTags');
  const hudJumpBtn = document.getElementById('hudJumpBtn');
  const prevBtn = document.getElementById('circuitPrevBtn');
  const nextBtn = document.getElementById('circuitNextBtn');

  if (circuitStations.length > 0 && hudCard) {
    const stationsData = [
      {
        index: 0,
        badge: "ORIGIN STATION 01 // ACADEMIC & ALGORITHMIC FOUNDATION",
        title: "PSIT Kanpur — B.Tech Computer Science & Engineering",
        location: "Kanpur, India",
        milestone: "Graduated with 8.0 CGPA & 700+ DSA",
        scope: "Data Structures, Algorithms & Systems",
        deliverables: "LeetCode 500+, Adobe GenSolve Top 5%, GfG 200+",
        tags: ["Java", "Python", "C++", "DSA", "DBMS", "OOP"],
        jumpId: "#credentials",
        jumpText: "View Academic Credentials",
        progressPercent: "5%"
      },
      {
        index: 1,
        badge: "WAYPOINT STATION 02 // FIRST PRODUCTION FOOTPRINT",
        title: "ClearMind — Software Developer Intern",
        location: "Remote",
        milestone: "60fps Fluid UI & 35% Faster Startup",
        scope: "React Native Mobile Engineering & API Sync",
        deliverables: "MongoDB Aggregations, Portfolio UI, Startup Profiling",
        tags: ["React Native", "JavaScript", "MongoDB", "REST APIs", "Git"],
        jumpId: "#exp-clearmind-intern",
        jumpText: "Jump to Internship Log",
        progressPercent: "35%"
      },
      {
        index: 2,
        badge: "WAYPOINT STATION 03 // PRODUCTION FINTECH SCALE",
        title: "AlphaQuark — Software Development Engineer",
        location: "Bangalore, India",
        milestone: "3 Play Store Apps & 2,000+ Downloads",
        scope: "Multi-Channel Notification Infrastructure & Apps",
        deliverables: "WhatsApp/Telegram Alerts, Promo Engine, ARFS & AlphaPro",
        tags: ["React Native", "Node.js", "MongoDB", "WebSockets", "Google Play"],
        jumpId: "#exp-alphaquark-sde",
        jumpText: "Jump to AlphaQuark Log",
        progressPercent: "68%"
      },
      {
        index: 3,
        badge: "TERMINAL STATION 04 // CURRENT ASSIGNMENT",
        title: "ClearMind — Software Development Engineer",
        location: "Pune, India",
        milestone: "Latency slashed 500ms → <40ms under load",
        scope: "Real-Time Trading Engine & Caching Pipelines",
        deliverables: "WebSockets, FastAPI, Redis Pub/Sub, Order Life-Cycle",
        tags: ["FastAPI", "Redis", "WebSockets", "PostgreSQL", "Python"],
        jumpId: "#exp-clearmind-sde",
        jumpText: "Jump to Current Role Log",
        progressPercent: "100%"
      }
    ];

    let currentStationIndex = 3; // Start at current assignment (ClearMind SDE)

    function updateStation(index) {
      currentStationIndex = Math.max(0, Math.min(stationsData.length - 1, index));
      const data = stationsData[currentStationIndex];

      // Update active station button
      circuitStations.forEach((btn, i) => {
        if (i === currentStationIndex) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update track line progress width
      if (circuitProgress) {
        circuitProgress.style.width = data.progressPercent;
      }

      // Smooth HUD transition
      hudCard.style.opacity = '0.4';
      hudCard.style.transform = 'translateY(4px)';

      setTimeout(() => {
        if (hudBadge) hudBadge.textContent = data.badge;
        if (hudTitle) hudTitle.textContent = data.title;
        if (hudLocation) hudLocation.innerHTML = `<i class="fas fa-map-pin"></i> ${data.location}`;
        if (hudMilestone) hudMilestone.textContent = data.milestone;
        if (hudScope) hudScope.textContent = data.scope;
        if (hudDeliverables) hudDeliverables.textContent = data.deliverables;

        if (hudTags) {
          hudTags.innerHTML = data.tags.map(t => `<span class="tag-mono">${t}</span>`).join('');
        }

        if (hudJumpBtn) {
          hudJumpBtn.setAttribute('href', data.jumpId);
          hudJumpBtn.innerHTML = `${data.jumpText} <i class="fas fa-arrow-down"></i>`;
        }

        hudCard.style.opacity = '1';
        hudCard.style.transform = 'translateY(0)';
      }, 150);
    }

    // Bind click events on stations
    circuitStations.forEach((btn) => {
      btn.addEventListener('click', () => {
        const stationIdx = parseInt(btn.getAttribute('data-station'), 10);
        updateStation(stationIdx);
      });
    });

    // Bind prev / next buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateStation(currentStationIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateStation(currentStationIndex + 1);
      });
    }

    // Smooth scroll and highlight target card on Jump click
    if (hudJumpBtn) {
      hudJumpBtn.addEventListener('click', (e) => {
        const targetId = hudJumpBtn.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetEl.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
          targetEl.style.borderColor = 'var(--accent-cyan)';
          targetEl.style.boxShadow = '0 0 25px rgba(56, 189, 248, 0.35)';
          setTimeout(() => {
            targetEl.style.borderColor = '';
            targetEl.style.boxShadow = '';
          }, 1800);
        }
      });
    }
  }

  // 8. Copy Email with Toast Feedback
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'ritikyadav2325@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalHtml = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `<i class="fas fa-check" style="color: var(--accent-emerald);"></i> Copied!`;
        copyEmailBtn.style.borderColor = 'var(--accent-emerald)';
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalHtml;
          copyEmailBtn.style.borderColor = '';
        }, 2200);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // 9. Live Dynamic Visitor Counter (Globally Synced via REST API)
  const visitorCountEl = document.getElementById('portfolioVisitorCount');
  if (visitorCountEl) {
    const baseOffset = 1482;
    const isCounted = sessionStorage.getItem('ry_portfolio_session');
    const endpoint = isCounted 
      ? 'https://abacus.jasoncameron.dev/get/ritikyadav23/portfolio' 
      : 'https://abacus.jasoncameron.dev/hit/ritikyadav23/portfolio';

    // Show initial cached count instantly to prevent layout jump
    const cachedVisits = parseInt(localStorage.getItem('ry_portfolio_views'), 10) || (baseOffset + 1);
    visitorCountEl.textContent = cachedVisits.toLocaleString('en-US');

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.value === 'number') {
          sessionStorage.setItem('ry_portfolio_session', 'true');
          const totalVisits = baseOffset + data.value;
          visitorCountEl.textContent = totalVisits.toLocaleString('en-US');
          localStorage.setItem('ry_portfolio_views', totalVisits);
        }
      })
      .catch(err => {
        console.warn('Live visitor counter fallback:', err);
      });
  }
});

