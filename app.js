document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Mobile Menu Interaction
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      
      // Transform hamburger menu lines to an 'X'
      const spans = menuToggle.querySelectorAll('span');
      if (mobileNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ==========================================================================
  // Interactive Dashboard Mockup Tabs
  // ==========================================================================
  const mockupNavItems = document.querySelectorAll('.mockup-nav-item');
  const dashboardViews = document.querySelectorAll('.dashboard-view');

  mockupNavItems.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetView = tab.getAttribute('data-view');

      // Update active tab styling
      mockupNavItems.forEach(item => item.classList.remove('active'));
      tab.classList.add('active');

      // Show/hide corresponding dashboard view
      dashboardViews.forEach(view => {
        if (view.id === targetView) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });
    });
  });

  // ==========================================================================
  // Pricing Monthly/Yearly Switcher
  // ==========================================================================
  const toggleMonthly = document.getElementById('toggleMonthly');
  const toggleYearly = document.getElementById('toggleYearly');
  const pricingCards = document.querySelectorAll('.pricing-card');

  // Pricing plans data
  const pricingData = {
    starter: { monthly: 29, yearly: 23, periodMonthly: '/mo', periodYearly: '/mo, billed annually' },
    growth: { monthly: 79, yearly: 63, periodMonthly: '/mo', periodYearly: '/mo, billed annually' }
  };

  const updatePricing = (isYearly) => {
    pricingCards.forEach(card => {
      const tier = card.getAttribute('data-tier');
      if (!tier || tier === 'enterprise') return;

      const priceElement = card.querySelector('.pricing-price');
      const periodElement = card.querySelector('.pricing-period');

      if (priceElement && periodElement) {
        const value = isYearly ? pricingData[tier].yearly : pricingData[tier].monthly;
        const period = isYearly ? pricingData[tier].periodYearly : pricingData[tier].periodMonthly;
        
        // Quick number transition effect
        priceElement.textContent = value;
        periodElement.textContent = period;
      }
    });
  };

  if (toggleMonthly && toggleYearly) {
    toggleMonthly.addEventListener('click', () => {
      toggleMonthly.classList.add('active');
      toggleYearly.classList.remove('active');
      updatePricing(false);
    });

    toggleYearly.addEventListener('click', () => {
      toggleYearly.classList.add('active');
      toggleMonthly.classList.remove('active');
      updatePricing(true);
    });
  }

  // ==========================================================================
  // FAQ Accordion Expand/Collapse
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Toggle active status
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ==========================================================================
  // Scroll Progress Bar
  // ==========================================================================
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const scrollProgress = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = scrollProgress + '%';
      } else {
        progressBar.style.width = '0%';
      }
    });
  }

  // ==========================================================================
  // Scroll Reveal Animations
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => revealObserver.observe(el));
});
