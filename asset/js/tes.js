
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