const params = new URLSearchParams(window.location.search);
const driverNumber = params.get("number");

const detailsContainer = document.getElementById("driver-details");

if (!driverNumber) {
  detailsContainer.innerHTML = "<p>Faltan datos del piloto.</p>";
} else {
  fetch("https://api.openf1.org/v1/drivers")
    .then(res => res.json())
    .then(data => {
      const driver = data.find(d => d.driver_number == driverNumber && d.headshot_url);

      if (!driver) {
        detailsContainer.innerHTML = "<p>Piloto no encontrado.</p>";
        return;
      }

      detailsContainer.innerHTML = `
        <h1>${driver.full_name}</h1>
        <img src="${driver.headshot_url}" alt="${driver.full_name}" style="max-width:200px" />
        <p><strong>Número:</strong> ${driver.driver_number}</p>
        <p><strong>País:</strong> ${driver.country_code}</p>
        <p><strong>Equipo:</strong> ${driver.team_name}</p>
        <p><strong>Nacimiento:</strong> ${driver.date_of_birth || "?"}</p>
      `;
    })
    .catch(error => {
      console.error(error);
      detailsContainer.innerHTML = "<p>Error al cargar el piloto.</p>";
    });
}



