// ============================
// Mobiilivalikon avaaminen ja sulkeminen
// ============================
document.querySelector("#navbar-show-btn").addEventListener("click", () => {
  document.querySelector("#navbar-collapse").classList.add("open");
});

document.querySelector("#navbar-close-btn").addEventListener("click", () => {
  document.querySelector("#navbar-collapse").classList.remove("open");
});

// ============================
// Pehmeä scrollaus ankkurilinkeille (#...)
// ============================

// Hae navbarin korkeus offsetin laskemista varten
const navbar = document.querySelector(".navbar");
const getOffset = () => (navbar ? navbar.offsetHeight + 8 : 0);

// Funktio, joka vierittää pehmeästi oikeaan kohtaan
function smoothScrollTo(targetElement) {
  const y = targetElement.getBoundingClientRect().top + window.scrollY - getOffset();
  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}

// Käy läpi kaikki linkit, joiden href alkaa #
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const hash = link.getAttribute("href"); // esim. "#galleria"
    if (hash && hash.length > 1) {
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault(); // estetään sivun hyppäys
        smoothScrollTo(target);

        // Sulje mobiilivalikko, jos auki
        const menu = document.querySelector("#navbar-collapse");
        if (menu && menu.classList.contains("open")) {
          menu.classList.remove("open");
        }

        // Päivitä osoiterivi ilman "hyppyä"
        history.pushState(null, "", hash);
      }
    }
  });
});



  // ========================================================
  //  PORTFOLIO KARUSELLI (ilman kirjastoja)
  //  - näyttää 3 kuvaa kerrallaan
  //  - keskimmäinen isompi, sivuilla pienemmät
  //  - nuolinapit ja nuolinäppäimet toimivat
  // ========================================================

  (function () {
    const root = document.getElementById("portfolio-carousel");
    if (!root) return;

    const stage = root.querySelector(".carousel-stage");
    const items = Array.from(root.querySelectorAll(".carousel-item"));
    const btnPrev = root.querySelector(".carousel-btn.prev");
    const btnNext = root.querySelector(".carousel-btn.next");
    const n = items.length;

    let index = 0;  // aktiivinen keskikuva

    // Aseta luokat keskelle/vasemmalle/oikealle
    function render() {
      const left = (index - 1 + n) % n;
      const right = (index + 1) % n;

      items.forEach((el, i) => {
        el.classList.remove("is-center", "is-left", "is-right");
        el.style.setProperty("--dir", i === left ? "-1" : "1"); // pienet kikkasäädöt mobiiliin
        if (i === index) {
          el.classList.add("is-center");
        } else if (i === left) {
          el.classList.add("is-left");
        } else if (i === right) {
          el.classList.add("is-right");
        }
      });

      // ARIA: kerrotaan mikä kuva on keskellä
      root.setAttribute("aria-live", "polite");
      items[index].setAttribute("aria-current", "true");
      items.forEach((el, i) => {
        if (i !== index) el.removeAttribute("aria-current");
      });
    }

    function next() {
      index = (index + 1) % n;
      render();
    }

    function prev() {
      index = (index - 1 + n) % n;
      render();
    }

    // Nappien kuuntelijat
    btnNext.addEventListener("click", next);
    btnPrev.addEventListener("click", prev);

    // Näppäimistötuki
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { next(); }
      if (e.key === "ArrowLeft") { prev(); }
    });

    // Tee karusellista fokuskelpoinen nuolinäppäimille
    root.tabIndex = 0;

    // Alustus
    render();
  })();


