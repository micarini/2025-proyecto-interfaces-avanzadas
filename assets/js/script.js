const container = document.getElementById("cards-container");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("error");

const btnCharacters = document.getElementById("btn-characters");
const btnPlanets = document.getElementById("btn-planets");
const btnStarships = document.getElementById("btn-starships");

const API_BASE = "https://swapi.py4e.com/api"; // Reemplazable si vuelve swapi.dev

let currentCategory = "people";
let currentPage = 1;
let isLoading = false;
let hasMore = true;

btnCharacters.addEventListener("click", () => switchCategory("people"));
btnPlanets.addEventListener("click", () => switchCategory("planets"));
btnStarships.addEventListener("click", () => switchCategory("starships"));

function switchCategory(category) {
  currentCategory = category;
  currentPage = 1;
  hasMore = true;
  container.innerHTML = "";
  fetchAndRender();
}

function fetchAndRender() {
  if (isLoading || !hasMore) return;

  isLoading = true;
  loader.classList.remove("hidden");
  errorMsg.classList.add("hidden");

  fetch(`${API_BASE}/${currentCategory}/?page=${currentPage}`)
    .then(response => {
      if (!response.ok) throw new Error("Fallo al conectar con la API");
      return response.json();
    })
    .then(data => {
      loader.classList.add("hidden");
      renderCards(data.results, currentCategory);
      if (data.next === null) hasMore = false;
      currentPage++;
    })
    .catch(error => {
      loader.classList.add("hidden");
      errorMsg.textContent = "Error cargando datos. Intenta nuevamente.";
      errorMsg.classList.remove("hidden");
    })
    .finally(() => {
      isLoading = false;
    });
}

function renderCards(items, category) {
  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = item.name || item.title;
    const idMatch = item.url.match(/\/([0-9]*)\/$/);
    const id = idMatch ? idMatch[1] : "1";

    let imageCategory = category;
    if (category === "people") imageCategory = "characters";

    const imageURL = `https://starwars-visualguide.com/assets/img/${imageCategory}/${id}.jpg`;

    card.innerHTML = `
      <img src="${imageURL}" alt="${title}" onerror="this.src='assets/images/error.jpg'">
      <h3>${title}</h3>
      <button onclick="location.href='detail.html?url=${encodeURIComponent(item.url)}'">Ver más</button>
    `;

    container.appendChild(card);
  });
}

// Detectar scroll al fondo para cargar más
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchAndRender();
  }
});

// Cargar personajes por defecto al iniciar
fetchAndRender();
