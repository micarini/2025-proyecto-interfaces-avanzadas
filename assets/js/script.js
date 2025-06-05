const driverContainer = document.getElementById("driver-container");
const radioContainer = document.getElementById("radio-container");

const titleDrivers = document.getElementById("title-drivers");
const titleRadios = document.getElementById("title-radios");

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

// Mostrar radios
function mostrarRadios() {
  driverContainer.style.display = "none";
  titleDrivers.style.display = "none";

  radioContainer.style.display = "flex";
  titleRadios.style.display = "block";
  radioContainer.innerHTML = "<p>Cargando radios...</p>";
  
fetch("https://api.openf1.org/v1/team_radio?session_key=9158&driver_number=11")
    .then(res => res.json())
    .then(data => {
      radioContainer.innerHTML = "";

      if (data.length === 0) {
        radioContainer.innerHTML = "<p>No se encontraron radios.</p>";
        return;
      }

      data.forEach(radio => {
        const radioCard = document.createElement("div");
        radioCard.className = "driver-card"; // mismo estilo reutilizado

        radioCard.innerHTML = `
          <h3>Radio de piloto ${radio.driver_number || "?"}</h3>
          <p>Tiempo: ${radio.utc || "Desconocido"}</p>
          <audio controls src="${radio.path}" preload="none">
            Tu navegador no soporta el elemento de audio.
          </audio>
        `;

        radioContainer.appendChild(radioCard);
      });
    })
    .catch(err => {
      console.error(err);
      radioContainer.innerHTML = "<p>Error al cargar las radios.</p>";
    });
}

// Mostrar pilotos
document.getElementById("btn-drivers").addEventListener("click", () => {
  driverContainer.style.display = "flex";
  titleDrivers.style.display = "block";

  radioContainer.style.display = "none";
  titleRadios.style.display = "none";
});

// Botón para radios
document.getElementById("btn-radios").addEventListener("click", mostrarRadios);
