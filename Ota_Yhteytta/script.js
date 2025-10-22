// ============================
// Mobiilivalikon avaaminen ja sulkeminen
// ============================
document.querySelector("#navbar-show-btn").addEventListener("click", () => {
  document.querySelector("#navbar-collapse").classList.add("open");
});

document.querySelector("#navbar-close-btn").addEventListener("click", () => {
  document.querySelector("#navbar-collapse").classList.remove("open");
});

// Pienet utilit: mobiilivalikko (jos sivulla on)
const showBtn = document.getElementById('navbar-show-btn');
const closeBtn = document.getElementById('navbar-close-btn');
const collapse = document.getElementById('navbar-collapse');
if (showBtn) showBtn.addEventListener('click', ()=> collapse?.classList?.add('open'));
if (closeBtn) closeBtn.addEventListener('click', ()=> collapse?.classList?.remove('open'));

// Mobiilivalikon avaaminen ja sulkeminen (sama kuin Etusivu)
const showBtn2 = document.querySelector("#navbar-show-btn");
const closeBtn2 = document.querySelector("#navbar-close-btn");
const collapse2 = document.querySelector("#navbar-collapse");
if (showBtn2) showBtn2.addEventListener("click", () => collapse2 && collapse2.classList.add("open"));
if (closeBtn2) closeBtn2.addEventListener("click", () => collapse2 && collapse2.classList.remove("open"));

// Estä lomakkeen oletuslähetys (ei yhdistetä vielä mihinkään)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Lomake lähetetty (estetty oletus) — ei vielä yhdistetty.');
  });
}

// FAQ / Accordion: kaikki suljettuna oletuksena, voi muokata kysymyksiä myöhemmin
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.faq-q');
  if (!btn) return;
  const item = btn.closest('.faq-item');
  if (!item) return;

  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  item.classList.toggle('open', !expanded);

  const answer = item.querySelector('.faq-a');
  if (!answer) return;
  if (!expanded) {
    answer.hidden = false;
  } else {
    setTimeout(() => answer.hidden = true, 320);
  }
});
