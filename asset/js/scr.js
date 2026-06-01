(function() {
  // Register ScrollTrigger Plugin
  gsap.registerPlugin(ScrollTrigger);

  /* ── Boomerang BG ── */
  const video = document.getElementById('bgVideo');
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  const frames = [];
  const MAX_WIDTH = 960;
  let capturing = true, lastTime = -1, rafId = 0;
  function captureFrame() {
    if (!capturing || video.readyState < 2 || video.currentTime === lastTime) return;
    lastTime = video.currentTime;
    const vw = video.videoWidth, vh = video.videoHeight;
    if (!vw || !vh) return;
    const scale = Math.min(1, MAX_WIDTH / vw);
    const c = document.createElement('canvas');
    c.width = Math.round(vw * scale); c.height = Math.round(vh * scale);
    c.getContext('2d').drawImage(video, 0, 0, c.width, c.height);
    frames.push(c);
  }
  const hasVFC = typeof video.requestVideoFrameCallback === 'function';
  function rafLoop() { captureFrame(); if (capturing) rafId = requestAnimationFrame(rafLoop); }
  function vfcLoop() { captureFrame(); if (capturing) video.requestVideoFrameCallback(vfcLoop); }
  function startPlayback() {
    if (!frames.length) return;
    canvas.width = frames[0].width; canvas.height = frames[0].height;
    video.style.display = 'none'; canvas.style.display = 'block';
    let idx = 0, dir = 1, last = performance.now();
    (function render(now) {
      if (now - last >= 1000/30) {
        last = now; ctx.drawImage(frames[idx], 0, 0);
        idx += dir;
        if (idx >= frames.length - 1) { idx = frames.length - 1; dir = -1; }
        else if (idx <= 0) { idx = 0; dir = 1; }
      }
      requestAnimationFrame(render);
    })(performance.now());
  }
  video.addEventListener('loadedmetadata', function() {
    video.play().catch(()=>{});
    hasVFC ? video.requestVideoFrameCallback(vfcLoop) : (rafId = requestAnimationFrame(rafLoop));
  });
  video.addEventListener('ended', function() {
    capturing = false; cancelAnimationFrame(rafId); startPlayback();
  });
  if (video.readyState >= 1) { video.play().catch(()=>{}); hasVFC ? video.requestVideoFrameCallback(vfcLoop) : (rafId = requestAnimationFrame(rafLoop)); }

  
  /* ── Billing toggle ── */
  const toggle = document.getElementById('billingToggle');
  let annual = true;
  if (toggle) {
    toggle.addEventListener('click', function() {
      annual = !annual;
      toggle.classList.toggle('annual', annual);
      document.querySelectorAll('.plan-price .amount').forEach(el => {
        const val = annual ? el.dataset.annual : el.dataset.monthly;
        if (val) el.textContent = val;
      });
    });
  }

  /* ════════════════════════════════
     GSAP PARALLAX & ANIMATIONS STACK
  ════════════════════════════════ */
  gsap.to("#heroBg", {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to("#heroText", {
    y: -40,
    opacity: 0.3,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom mid",
      scrub: true
    }
  });

  gsap.from("#missionLeft", {
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#mission",
      start: "top 75%",
      toggleActions: "play none none none"
    }
  });

  gsap.from("#missionLeft .stat-card", {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.2)",
    scrollTrigger: {
      trigger: ".mission-stats",
      start: "top 80%"
    }
  });

  gsap.from("#missionRight .mission-point", {
    x: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#missionRight",
      start: "top 75%"
    }
  });

  gsap.from("#howHeader", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#how",
      start: "top 80%"
    }
  });

  gsap.from("#howGrid .step-card", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.18,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#howGrid",
      start: "top 75%"
    }
  });

  gsap.from("#howIntegrations", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#howIntegrations",
      start: "top 85%"
    }
  });

  gsap.from("#pricingHeader", {
    opacity: 0,
    y: 25,
    duration: 0.9,
    scrollTrigger: { trigger: "#pricing", start: "top 80%" }
  });

  gsap.from("#pricingGrid .plan-card", {
    y: 50,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#pricingGrid",
      start: "top 70%"
    }
  });

  gsap.from("#testimonialsHeader", {
    y: 25,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: { trigger: "#testimonials", start: "top 80%" }
  });

  gsap.from("#testimonialsCarousel", {
    y: 35,
    opacity: 0,
    duration: 0.9,
    scrollTrigger: { trigger: "#testimonialsCarousel", start: "top 75%" }
  });

  gsap.from("#ctaBandSection h2, #ctaBandSection p, #ctaBandSection .cta-band-btns", {
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#ctaBandSection",
      start: "top 80%"
    }
  });
})();