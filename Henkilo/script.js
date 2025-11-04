// ============================
// Mobiilivalikon avaaminen ja sulkeminen + a11y
// ============================
(() => {
  const btnOpen = document.querySelector("#navbar-show-btn");
  const btnClose = document.querySelector("#navbar-close-btn");
  const menu = document.querySelector("#navbar-collapse");

  if (!menu || !btnOpen || !btnClose) return;

  function openMenu() {
    menu.classList.add("open");
    // siirrä fokus sulje-nappiin
    btnClose.focus({ preventScroll: true });
    document.addEventListener("keydown", onEsc);
  }

  function closeMenu() {
    menu.classList.remove("open");
    // palauta fokus hampurilaiseen
    btnOpen.focus({ preventScroll: true });
    document.removeEventListener("keydown", onEsc);
  }

  function onEsc(e) {
    if (e.key === "Escape") closeMenu();
  }

  btnOpen.addEventListener("click", openMenu);
  btnClose.addEventListener("click", closeMenu);
})();

// ============================
// Pehmeä scrollaus ankkurilinkeille (#...)
// ============================
(() => {
  const navbar = document.querySelector(".navbar");
  const getOffset = () => (navbar ? navbar.offsetHeight + 8 : 0);

  function smoothScrollTo(targetElement) {
    const y = targetElement.getBoundingClientRect().top + window.scrollY - getOffset();
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const hash = link.getAttribute("href");
      if (!hash || hash.length <= 1) return; // ohita "#"
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      smoothScrollTo(target);

      // Sulje mobiilivalikko, jos auki
      const menu = document.querySelector("#navbar-collapse");
      if (menu && menu.classList.contains("open")) {
        menu.classList.remove("open");
      }

      // Päivitä osoiterivi ilman "hyppyä"
      history.pushState(null, "", hash);
    });
  });
})();

// ========================================================
//  PORTFOLIO KARUSELLI (ilman kirjastoja)
//  - näyttää 3 kuvaa kerrallaan
//  - keskimmäinen isompi, sivuilla pienemmät
//  - nuolinapit, nuolinäppäimet ja kosketuspyyhkäisy
// ========================================================
(() => {
  const root = document.getElementById("portfolio-carousel");
  if (!root) return;

  const items = Array.from(root.querySelectorAll(".carousel-item"));
  const btnPrev = root.querySelector(".carousel-btn.prev");
  const btnNext = root.querySelector(".carousel-btn.next");
  const n = items.length;
  if (n === 0 || !btnPrev || !btnNext) return;

  let index = 0; // aktiivinen keskikuva

  // Aseta luokat keskelle/vasemmalle/oikealle
  function render() {
    const left = (index - 1 + n) % n;
    const right = (index + 1) % n;

    items.forEach((el, i) => {
      el.classList.remove("is-center", "is-left", "is-right");
      el.style.setProperty("--dir", i === left ? "-1" : "1"); // mobiilin hienosäätö
      if (i === index) el.classList.add("is-center");
      else if (i === left) el.classList.add("is-left");
      else if (i === right) el.classList.add("is-right");
      // ARIA: vain nykyinen on current
      if (i === index) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });

    root.setAttribute("aria-live", "polite");
  }

  function next() { index = (index + 1) % n; render(); }
  function prev() { index = (index - 1 + n) % n; render(); }

  // Nappien kuuntelijat
  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  // Näppäimistötuki
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
  root.tabIndex = 0; // fokus kelpoiseksi

  // Kosketuspyyhkäisy (mobiili)
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 30;

  root.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  root.addEventListener("touchmove", (e) => {
    touchEndX = e.changedTouches[0].clientX;
  }, { passive: true });

  root.addEventListener("touchend", () => {
    const dx = touchEndX - touchStartX;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) next(); else prev();
    }
    touchStartX = touchEndX = 0;
  });

  // Alustus
  render();
})();
