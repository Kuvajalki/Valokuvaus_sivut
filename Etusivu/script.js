// Mobiilivalikon avaaminen ja sulkeminen
document.querySelector("#navbar-show-btn").addEventListener("click", () => {
  document.querySelector("#navbar-collapse").classList.add("open");
});

document.querySelector("#navbar-close-btn").addEventListener("click", () => {
  document.querySelector("#navbar-collapse").classList.remove("open");
});