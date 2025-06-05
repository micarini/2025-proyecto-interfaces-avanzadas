const driverContainer = document.getElementById("driver-container");
const titleDrivers = document.getElementById("title-drivers");

const circuitoContainer = document.getElementById("circuitos-container");
const titleCircuito = document.getElementById("title-circuitos");

const raceContainer = document.getElementById("race-container");
const titleRaces = document.getElementById("title-races");

// Mostrar mensaje de carga inicial para pilotos
driverContainer.innerHTML = '<p id="loading-drivers">Cargando pilotos...</p>';

// Obtener y mostrar pilotos
fetch("https://api.openf1.org/v1/drivers")
  .then((res) => res.json())
  .then((data) => {
    driverContainer.innerHTML = "";

    const driversMap = new Map();

    data.forEach((driver) => {
      const key = driver.driver_number;
      if (key && !driversMap.has(key) && driver.headshot_url) {
        driversMap.set(key, driver);
      }
    });

    const uniqueDrivers = Array.from(driversMap.values());

    uniqueDrivers.forEach((driver) => {
      const card = createDriverCard(driver);
      driverContainer.appendChild(card);
    });
  })
  .catch((error) => {
    driverContainer.innerHTML = "<p>Error al cargar los pilotos.</p>";
    console.error(error);
  });

// Crear tarjeta de piloto
function createDriverCard(driver) {
  const card = document.createElement("div");
  card.className = "driver-card";

  card.innerHTML = `
    <img src="${driver.headshot_url}" alt="${driver.full_name}" 
         onerror="this.src='https://via.placeholder.com/150?text=Sin+foto'" />
    <h3>${driver.full_name}</h3>
    <p>Número: ${driver.driver_number || "?"}</p>
    <p>País: ${driver.country_code || "?"}</p>
    <p>Equipo: ${driver.team_name || "?"}</p>
  `;

  return card;
}

// Mostrar pilotos
document.getElementById("btn-drivers").addEventListener("click", () => {
  driverContainer.style.display = "flex";
  titleDrivers.style.display = "block";

  raceContainer.style.display = "none";
  titleRaces.style.display = "none";
});

// Mostrar carreras
document.getElementById("btn-races").addEventListener("click", mostrarCarreras);

const countryImages = {
  "United Arab Emirates": "../assets/images/Abu Dhabi Grand Prix.avif",
  "United Kingdom": "../assets/images/Great Britain carbon.avif",
  "Italy": "../assets/images/Italy carbon.avif",
  "Spain": "../assets/images/Spanish Grand Prix.png",
  "Brazil": "../assets/images/Brazil carbon.avif",
  "Japan": "../assets/images/Japan carbon.png",
  "Canada": "../assets/images/Canada carbon.png",
  "Australia": "../assets/images/Australian Grand Prix.avif",
  "Austria": "../assets/images/Austrian Grand Prix.png",
  "Mexico": "../assets/images/Mexico carbon.avif",
  "Netherlands": "../assets/images/Netherlands carbon.avif",
  "Monaco":"../assets/images/Monaco Grand Prix.png",
  "United States":"../assets/images/Miami Grand Prix.png",
  "Bahrain":"",
  "Qatar":"../assets/images/Qatar Grand Prix.png",
  "Singapore":"../assets/images/Singapore Grand Prix.avif",
  "Belgium":"../assets/images/Singapore Grand Prix.avif",
  "Hungary":"../assets/images/Singapore Grand Prix.avif",
  "Great Britain":"../assets/images/British Grand Prix.png",
  "Azerbaijan":"../assets/images/British Grand Prix.png",
  "Saudi Arabia":"../assets/images/British Grand Prix.png",
  "Bahrain":"../assets/images/Bahrain Grand Prix.png",
  "Bahrain":"../assets/images/Pre-Season Testing.png",

};

function mostrarCarreras() {
  driverContainer.style.display = "none";
  titleDrivers.style.display = "none";

  raceContainer.style.display = "flex";
  titleRaces.style.display = "block";
  raceContainer.innerHTML = "<p>Cargando carreras...</p>";

  fetch("https://api.openf1.org/v1/meetings?year=2023")
    .then((res) => res.json())
    .then((data) => {
      raceContainer.innerHTML = "";

      if (data.length === 0) {
        raceContainer.innerHTML = "<p>No se encontraron carreras.</p>";
        return;
      }

      data.forEach((meeting) => {
        const card = document.createElement("div");
        card.className = "driver-card";

        const imageUrl =
          countryImages[meeting.country_name] ||
          "https://via.placeholder.com/300x180?text=" +
            encodeURIComponent(meeting.country_name || "Carrera");

        card.innerHTML = `
        <img src="${imageUrl}" alt="${meeting.country_name}" />
          <h3>${meeting.meeting_name}</h3>
          <p>País: ${meeting.country_name || "?"}</p>
          <p>Fecha: ${meeting.date_start?.split("T")[0] || "?"}</p>
        `;

        raceContainer.appendChild(card);
      });
    })
    .catch((err) => {
      console.error(err);
      raceContainer.innerHTML = "<p>Error al cargar las carreras.</p>";
    });
}

/*RUTAS DE LOS AUTOS QUE RECORREN EL CIRCUITO*/
// Mostrar circuito y correr animación al hacer clic en el botón
document.getElementById("btn-circuito").addEventListener("click", () => {
  document.getElementById("driver-container").style.display = "none";
  document.getElementById("title-drivers").style.display = "none";
  document.getElementById("race-container").style.display = "none";
  document.getElementById("title-races").style.display = "none";

  document.getElementById("circuitos-container").style.display = "block";
  document.getElementById("title-circuitos").style.display = "block";

  simularMovimiento();
  setTimeout(simularMovimiento, 300);
});

const rutas = {
  VER: [
    [720, 110], [690, 125], [660, 145], [620, 160], [590, 180], [570, 200],
    [550, 220], [520, 240], [500, 260], [480, 280], [460, 300],
    [440, 320], [420, 340], [400, 360], [370, 370], [330, 380],
    [300, 375], [270, 360], [240, 340], [220, 310], [210, 280],
    [200, 250], [190, 220], [180, 190], [175, 170], [180, 140],
    [190, 120], [210, 100], [240, 90], [280, 85], [320, 80],
    [360, 82], [400, 90], [440, 100], [480, 110], [520, 120],
    [560, 125], [600, 130], [640, 135], [680, 125], [720, 110] 
  ]
};

// Función para crear pequeñas variaciones entre rutas de distintos autos
function desplazarRuta(ruta, dx, dy) {
  return ruta.map(([x, y]) => [x + dx, y + dy]);
}

// Duplicar rutas para otros autos
rutas.LEC = desplazarRuta(rutas.VER, -5, 5);
rutas.TSU = desplazarRuta(rutas.VER, 5, -5);

// Función para animar los autos
function simularMovimiento() {
  const autos = {
    VER: document.querySelector(".car.VER"),
    LEC: document.querySelector(".car.LEC"),
    TSU: document.querySelector(".car.TSU"),
  };

  let frame = 0;

  function mover() {
    for (const piloto in rutas) {
      const puntos = rutas[piloto];
      const pos = puntos[frame % puntos.length];
      const auto = autos[piloto];
      if (auto && pos) {
        auto.style.left = pos[0] + "px";
        auto.style.top = pos[1] + "px";
      }
    }
    frame++;
    requestAnimationFrame(mover);
  }

  mover();
}
