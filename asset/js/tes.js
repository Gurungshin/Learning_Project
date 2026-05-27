
/* ── Testimonials Carousel Engine ── */
  const container = document.querySelector('.testimonials-carousel-container');
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (container && track) {
    let currentIndex = 0;
    let isDragging = false;
    let startX, currentTranslate, prevTranslate;

    const getMaxIndex = () => {
      const card = track.querySelector('.testimonial-card');
      if (!card) return 0;
      const cardsVisible = Math.round(container.offsetWidth / card.offsetWidth);
      return Math.max(0, track.children.length - cardsVisible);
    };

    const updateSliderPosition = () => {
      const card = track.querySelector('.testimonial-card');
      if (!card) return;
      const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
      const moveAmount = currentIndex * (card.offsetWidth + gap);
      track.style.transform = `translateX(-${moveAmount}px)`;
      prevTranslate = -moveAmount;
    };

    const slideTo = (index) => {
      const maxIndex = getMaxIndex();
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateSliderPosition();
    };

    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (window.innerWidth <= 767) {
        const card = track.querySelector('.testimonial-card');
        if (card) container.scrollBy({ left: card.offsetWidth + 24, behavior: 'smooth' });
      } else { slideTo(currentIndex + 1); }
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (window.innerWidth <= 767) {
        const card = track.querySelector('.testimonial-card');
        if (card) container.scrollBy({ left: -(card.offsetWidth + 24), behavior: 'smooth' });
      } else { slideTo(currentIndex - 1); }
    });

    container.addEventListener('pointerdown', (e) => {
      if (window.innerWidth <= 767) return; 
      isDragging = true;
      startX = e.clientX;
      track.style.transition = 'none';
      container.setPointerCapture(e.pointerId);
    });

    container.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const currentX = e.clientX;
      const dragDistance = currentX - startX;
      currentTranslate = (prevTranslate || 0) + dragDistance;
      track.style.transform = `translateX(${currentTranslate}px)`;
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
      
      const movedBy = currentTranslate - prevTranslate;
      const card = track.querySelector('.testimonial-card');
      const threshold = card ? card.offsetWidth / 4 : 100;

      if (movedBy < -threshold) slideTo(currentIndex + 1);
      else if (movedBy > threshold) slideTo(currentIndex - 1);
      else slideTo(currentIndex);

      container.releasePointerCapture(e.pointerId);
    };

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);

    window.addEventListener('resize', () => {
      slideTo(currentIndex);
    });
  }

// F n Q script
(function() {
  gsap.registerPlugin(ScrollTrigger);

  /* ── GSAP Animations ── */
  gsap.from("#heroLeft", { x: -50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  gsap.from("#heroRight .hero-stat", { y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.2)", delay: 0.4 });

  gsap.from("#storyImg", {
    x: -50, opacity: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: "#story", start: "top 75%" }
  });
  gsap.from("#storyText", {
    x: 50, opacity: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: "#story", start: "top 75%" }
  });
  gsap.from(".timeline-item", {
    y: 25, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
    scrollTrigger: { trigger: ".story-timeline", start: "top 80%" }
  });

  gsap.from("#valuesHeader", {
    y: 25, opacity: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: { trigger: "#values", start: "top 80%" }
  });
  gsap.from("#values .value-card", {
    y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
    scrollTrigger: { trigger: "#values .values-grid", start: "top 75%" }
  });

  gsap.from("#archHeader", {
    y: 25, opacity: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: { trigger: "#architecture", start: "top 80%" }
  });
  gsap.from("#archText", {
    x: -30, opacity: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: ".arch-grid", start: "top 75%" }
  });
  gsap.from("#archCards .arch-metric-card", {
    y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: "#archCards", start: "top 75%" }
  });

  gsap.from("#partnersContainer", {
    y: 20, opacity: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: "#partners", start: "top 85%" }
  });

  /* ── FAQ Animations ── */
  gsap.from(".faq-header", {
    y: 25, opacity: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: { trigger: "#faq", start: "top 80%" }
  });
  gsap.from(".faq-item", {
    y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
    scrollTrigger: { trigger: "#faqList", start: "top 80%" }
  });

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      
      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      
      // If the clicked item wasn't open, open it now
      if (!isOpen) item.classList.add('open');
    });
  });
})();