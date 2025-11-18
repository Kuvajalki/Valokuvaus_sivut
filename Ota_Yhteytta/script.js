// ============================
// Mobiilivalikon avaaminen ja sulkeminen
// ============================
const navbarShowBtn = document.querySelector("#navbar-show-btn");
const navbarCloseBtn = document.querySelector("#navbar-close-btn");
const navbarCollapse = document.querySelector("#navbar-collapse");

if (navbarShowBtn && navbarCollapse) {
  navbarShowBtn.addEventListener("click", () => {
    navbarCollapse.classList.add("open");
  });
}

if (navbarCloseBtn && navbarCollapse) {
  navbarCloseBtn.addEventListener("click", () => {
    navbarCollapse.classList.remove("open");
  });
}

// ============================
// FAQ / Accordion
// ============================
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".faq-q");
  if (!btn) return;

  const item = btn.closest(".faq-item");
  if (!item) return;

  const expanded = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", String(!expanded));
  item.classList.toggle("open", !expanded);

  const answer = item.querySelector(".faq-a");
  if (!answer) return;

  if (!expanded) {
    // avataan
    answer.hidden = false;
  } else {
    // suljetaan pienen animaatioajan jälkeen
    setTimeout(() => {
      answer.hidden = true;
    }, 320);
  }
});

// ============================
// LOMAKE → Netlify Function → MailerSend
// ============================
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (statusEl) {
      statusEl.textContent = "Lähetetään...";
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/.netlify/functions/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        if (statusEl) {
          statusEl.textContent = "Kiitos viestistäsi! Otan yhteyttä pian.";
        }
        form.reset();
      } else {
        if (statusEl) {
          statusEl.textContent =
            "Viestiä ei voitu lähettää. Yritä hetken päästä uudelleen.";
        }
      }
    } catch (error) {
      console.error("Virhe lähetyksessä:", error);
      if (statusEl) {
        statusEl.textContent =
          "Yhteysvirhe. Tarkista internet-yhteys ja yritä uudelleen.";
      }
    }
  });
}
