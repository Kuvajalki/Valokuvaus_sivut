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
