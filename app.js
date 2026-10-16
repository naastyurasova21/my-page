function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  document.querySelector(".theme-btn i").className = isDark
    ? "fas fa-sun"
    : "fas fa-moon";
  showNotification(isDark ? "Тёмная тема включена!" : "Светлая тема включена!");
}

function showNotification(message) {
  const n = document.getElementById("notification");
  n.textContent = message;
  n.classList.add("show");
  setTimeout(() => n.classList.remove("show"), 2500);
}

document.querySelectorAll("nav a, .hero-buttons a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const facts = [
  "Сериал изначально назывался «Монтаук», но от идеи пришлось отказаться из-за сходства с реальными событиями.",
  "Милли Бобби Браун (Одиннадцать) сама предложила побриться налысо — это был её выбор, а не требование режиссёра.",
  "Все дети-актёры проходили кастинг через видеозаписи — братья Даффер искали неизвестные лица.",
  "Название города Хоукинс — отсылка к физику Стивену Хокингу и фильму «Хоукинг».",
  "Братья Даффер вдохновлялись фильмами Спилберга, Карпентера и Кинга — отсюда и стиль 80-х.",
  "Вайнона Райдер и Дэвид Харбор до «Очень странных дел» уже снимались вместе — в фильме 1993 года.",
];

let currentFact = 0;
let typingTimer = null;

function typeText(element, text, speed = 35) {
  clearInterval(typingTimer);
  element.textContent = "";
  let i = 0;
  typingTimer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
    } else {
      clearInterval(typingTimer);
    }
  }, speed);
}

function showFact(index, showNotice = false) {
  const factText = document.getElementById("fact-text");
  if (!factText) return;
  typeText(factText, facts[index], 35);
  if (showNotice) showNotification("Новый факт!");
}

function showRandomFact() {
  currentFact = (currentFact + 1) % facts.length;
  showFact(currentFact, true);
}

window.addEventListener("load", () => {
  showFact(0, false);
  const dateEl = document.getElementById("factsDate");
  if (dateEl) {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    dateEl.textContent = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  }
  updateCarousel();
});
let currentSlide = 0;

function getCardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateCarousel() {
  const track = document.getElementById("heroTrack");
  const cards = track.querySelectorAll(".hero-card");
  const totalCards = cards.length;
  const perView = getCardsPerView();
  const maxSlide = Math.max(0, totalCards - perView);

  if (currentSlide > maxSlide) currentSlide = maxSlide;
  if (currentSlide < 0) currentSlide = 0;

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = 25;
  const offset = currentSlide * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;

  document.querySelector(".carousel-btn.prev").disabled = currentSlide === 0;
  document.querySelector(".carousel-btn.next").disabled =
    currentSlide >= maxSlide;

  const dotsContainer = document.getElementById("heroDots");
  dotsContainer.innerHTML = "";
  for (let i = 0; i <= maxSlide; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === currentSlide ? " active" : "");
    dot.onclick = () => {
      currentSlide = i;
      updateCarousel();
    };
    dotsContainer.appendChild(dot);
  }
}

function slideHeroes(direction) {
  currentSlide += direction;
  updateCarousel();
}
window.addEventListener("resize", () => {
  currentSlide = 0;
  updateCarousel();
});
function toggleHiddenBlock() {
  const block = document.getElementById("hiddenBlock");
  block.classList.toggle("open");
  if (block.classList.contains("open")) {
    setTimeout(
      () => block.scrollIntoView({ behavior: "smooth", block: "center" }),
      300,
    );
    showNotification("Секретный блок открыт!");
  } else {
    showNotification("Секретный блок закрыт");
  }
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollTopBtn");
  if (window.scrollY > 300) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});
