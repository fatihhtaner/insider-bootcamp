const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

const favoriteBtn = document.getElementById("favoriteBtn");

favoriteBtn.addEventListener("click", () => {
  favoriteBtn.classList.toggle("active");

  if (favoriteBtn.classList.contains("active")) {
    favoriteBtn.textContent = "Favorilere Eklendi!";
  } else {
    favoriteBtn.textContent = "Favorilere Ekle";
  }
});
