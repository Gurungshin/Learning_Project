  $('[data-fancybox="gallery"]').fancybox({
    buttons: [
      "slideShow",
      "thumbs",
      "zoom",
      "fullScreen",
      "share",
      "close"
    ],
    loop: false,
    protect: true
  });
//  carrer
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('#heroEyebrow', { y: 20, opacity: 0, duration: .7, ease: 'power3.out', delay: .1 });
  gsap.from('#heroTitle', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: .25 });
  gsap.from('#heroSub', { y: 30, opacity: 0, duration: .8, ease: 'power3.out', delay: .45 });
  gsap.from('#heroStats > div', { y: 20, opacity: 0, duration: .6, stagger: .1, ease: 'power2.out', delay: .6 });

  function setRole(role) { document.getElementById('roleField').value = role; }
  function submitApplication() {
    const fn = document.getElementById('firstName').value.trim();
    if(!fn) { document.getElementById('firstNameErr').classList.add('show'); }
  }

// blog
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.from('#heroLeft', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
  gsap.from('#heroRight .hero-stat', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 });
  
  gsap.from('#valuesHeader', {
    y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '#valuesHeader', start: 'top 80%' }
  });
  
  // Script hooks target updated layout tokens cleanly
  gsap.from('.lf-blog-card', {
    y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: '.blog-grid-wrapper', start: 'top 75%' }
  });

//   blog detailed

gsap.registerPlugin(ScrollTrigger);
  
  gsap.from('.hero-banner-text', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 });
  
  document.querySelectorAll('.gsap-reveal').forEach(el => {
    gsap.from(el, {
      y: 24, opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // Smooth pinning ScrollTrigger bound to native split layout selectors
  ScrollTrigger.create({
    trigger: "#stickySidebarInner",
    start: "top 120px", 
    endTrigger: "#articleContent", 
    end: "bottom bottom", 
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
    matchMedia: "(min-width: 992px)"
  });

  //contact

  gsap.registerPlugin(ScrollTrigger);
  
  gsap.from('#valuesHeader', {
    y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '#valuesHeader', start: 'top 80%' }
  });
  
  // Re-targeted GSAP reveals to match custom grid component children elements securely
  gsap.from('.contact-split-grid .gsap-reveal', {
    y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-split-grid', start: 'top 75%' }
  });