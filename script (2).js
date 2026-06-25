// ============================================
//   SATHYA DIGITAL v2 — script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. LOADER ─── */
  const loader     = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  let progress = 0;

  const fillInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(fillInterval);
      loaderFill.style.width = '100%';
      setTimeout(() => loader.classList.add('gone'), 400);
    }
    loaderFill.style.width = progress + '%';
  }, 80);


  /* ─── 2. CUSTOM CURSOR ─── */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && window.innerWidth > 768) {
    let mx = 0, my = 0;
    let cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top  = my + 'px';
    });

    function smoothCursor() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      requestAnimationFrame(smoothCursor);
    }
    smoothCursor();
  }


  /* ─── 3. NAVBAR ─── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 60);
  });


  /* ─── 4. BURGER MENU ─── */
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');

  burger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7.5px) rotate(45deg)';
      spans[1].style.transform = 'translateY(-7.5px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.transform = '');
    }
  });

  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => s.style.transform = '');
    });
  });


  /* ─── 5. COUNTER ANIMATION ─── */
  function runCounter(el) {
    const target   = +el.dataset.target;
    const duration = 2000;
    const start    = performance.now();

    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.floor(ease * target);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const cntObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        runCounter(e.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.count').forEach(el => cntObserver.observe(el));


  /* ─── 6. REVEAL ON SCROLL ─── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const parent   = entry.target.parentElement;
        const siblings = [...parent.querySelectorAll('.reveal')];
        const idx      = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('on'), idx * 100);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


  /* ─── 7. SERVICE ROW HOVER CURSOR ─── */
  document.querySelectorAll('.svc-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      if (cursor) { cursor.style.width = '60px'; cursor.style.height = '60px'; }
    });
    row.addEventListener('mouseleave', () => {
      if (cursor) { cursor.style.width = ''; cursor.style.height = ''; }
    });
  });


  /* ─── 8. CONTACT FORM ─── */
  const form       = document.getElementById('form');
  const formBtnTxt = document.getElementById('formBtnText');
  const formOk     = document.getElementById('formOk');

  form.addEventListener('submit', e => {
    e.preventDefault();
    formBtnTxt.textContent = 'Sending...';
    form.querySelector('.form-btn').disabled = true;

    setTimeout(() => {
      formOk.style.display = 'block';
      formBtnTxt.textContent = 'Book Free Strategy Call 🚀';
      form.querySelector('.form-btn').disabled = false;
      form.reset();
      setTimeout(() => formOk.style.display = 'none', 5000);
    }, 1500);
  });


  /* ─── 9. ACTIVE NAV HIGHLIGHT ─── */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--gold)'
        : '';
    });
  });


  /* ─── 10. WORK CARDS SPOTLIGHT ─── */
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(245,166,35,0.06), #111111 70%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  console.log('🔥 Sathya Digital v2 — Loaded');
});
