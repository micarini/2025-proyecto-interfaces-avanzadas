const container = document.getElementById("driver-container");

fetch("https://api.openf1.org/v1/drivers")
  .then((res) => res.json())
  .then((data) => {
    container.innerHTML = "";

    // Map para asegurarnos de que cada driver_number aparezca solo una vez
    const driversMap = new Map();

    data.forEach((driver) => {
      const key = driver.driver_number;
      // Solo agregar si no está aún en el mapa y tiene imagen
      if (key && !driversMap.has(key) && driver.headshot_url) {
        driversMap.set(key, driver);
      }
    });

    const uniqueDrivers = Array.from(driversMap.values());

    uniqueDrivers.forEach((driver) => {
      const card = createDriverCard(driver);
      container.appendChild(card);
    });
  })
  .catch((error) => {
    container.innerHTML = "<p>Error al cargar los pilotos.</p>";
    console.error(error);
  });

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
