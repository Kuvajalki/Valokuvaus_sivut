const buttons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.gallery .item');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');

    items.forEach(item => {
      if (category === 'all' || item.classList.contains(category)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

document.querySelector("#navbar-show-btn").addEventListener("click", () => {
  document.querySelector("#navbar-collapse").classList.add("open");
});

document.querySelector("#navbar-close-btn").addEventListener("click", () => {
  document.querySelector("#navbar-collapse").classList.remove("open");
});

// Show all by default
document.querySelector('[data-category="all"]').click();
