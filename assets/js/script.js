//contenedores donde se muestran los pilotos, circuitos y carreras
const driverContainer = document.getElementById("driver-container");
const titleDrivers = document.getElementById("title-drivers");

const circuitoContainer = document.getElementById("circuitos-container");
const titleCircuito = document.getElementById("title-circuitos");

const raceContainer = document.getElementById("race-container");
const titleRaces = document.getElementById("title-races");

//mostrar un mensaje inicial mientras se cargan los pilotos
driverContainer.innerHTML = '<p id="loading-drivers">Cargando pilotos...</p>';

//llamada a la API de OpenF1 para obtener la lista de pilotos
fetch("https://api.openf1.org/v1/drivers") //GET al endpoint de la API
  .then((res) => res.json()) //convierte la respuesta a JSON
  .then((data) => { //cuando el JSON ya esta convertido en un array de objetos, pasamos a esta funcion para procesar ese array (data)
    driverContainer.innerHTML = ""; //limpia el contenedor

    const driversMap = new Map();  //Map para evitar duplicados de los drivers (ej el mismo driver de otro año, otro equipo,etc)

    data.forEach((driver) => { //iteramos sobre cada objeto "driver" que viene en el array data. Cada objeto representa un piloto y contiene propiedades como full_name, driver_number, team_name
      const key = driver.driver_number;
      //usamos el numero de piloto como clave unica para ese piloto. ej: si Verstappen tiene el numero 1, su key seria 1.
      if (key && !driversMap.has(key) && driver.headshot_url) { //key -> el piloto debe tener un numero asignado, si no lo tiene (null, undefined), se descarta.
      //!driversMap.has(key) verificamos si ese numero ya esta registrado en nuestro Map. asi evitamos duplicados.
      //driver.headshot_url si no tiene una imagen de perfil (headshot), tambien lo descartamos.


        driversMap.set(key, driver); //guardamos el piloto en el Map usando su número como clave.
      }
    });

    //convertir el map en array para iterar
    const uniqueDrivers = Array.from(driversMap.values());

    //crear tarjetas para cada piloto y agregarlas al DOM
    uniqueDrivers.forEach((driver) => { //uniqueDrivers es un array limpio y final de pilotos que cumplen los criterios
      //recorre cada piloto del array. en cada vuelta del bucle: driver es un objeto con informacion del piloto (nombre, numero, equipo, imagen, etc.).
      const card = createDriverCard(driver);
      driverContainer.appendChild(card);
    });
  })
  .catch((error) => { //manejo de errores en Promesas (try/catch para codigo asincronico con fetch)
    driverContainer.innerHTML = "<p>Error al cargar los pilotos.</p>";
    console.error(error);
  }); //si ocurre un error en cualquier parte del proceso de fetch o procesamiento del JSON, se entra a este bloque. se reemplaza el contenido del contenedor con un mensaje de error visible en la web: "Error al cargar los pilotos. tambien se muestra el error detallado en la consola del navegador con console.error(error), para depuracion.

//crear tarjeta de piloto
function createDriverCard(driver) {
  const card = document.createElement("div");
  card.className = "driver-card";

  //imagen del piloto
  const img = document.createElement("img");
  img.src = driver.headshot_url;
  img.alt = driver.full_name;
  img.onerror = function () {
    this.src = "https://via.placeholder.com/150?text=Sin+foto";
  };

  //nombre del piloto con clase 'driver-name'
  const name = document.createElement("h3");
  name.className = "driver-name";
  name.textContent = driver.full_name;

  //lista de info adicional con clase 'driver-info'
  const infoList = document.createElement("ul");
  infoList.className = "driver-info";

  const number = document.createElement("li");
  number.innerHTML = `<strong>Número:</strong> ${driver.driver_number || "?"}`;

  const country = document.createElement("li");
  country.innerHTML = `<strong>País:</strong> ${driver.country_code || "?"}`;

  const team = document.createElement("li");
  team.innerHTML = `<strong>Equipo:</strong> ${driver.team_name || "?"}`;

  infoList.appendChild(number);
  infoList.appendChild(country);
  infoList.appendChild(team);

  //armar la tarjeta
  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(infoList);

  return card;
}

//mostrar pilotos
document.getElementById("btn-drivers").addEventListener("click", () => {
  driverContainer.style.display = "flex";
  titleDrivers.style.display = "block";

  raceContainer.style.display = "none";
  titleRaces.style.display = "none";
  circuitoContainer.style.display = "none";
  titleCircuito.style.display = "none";

});

//mostrar carreras
document.getElementById("btn-races").addEventListener("click", mostrarCarreras)

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
  circuitoContainer.style.display = "none";
  titleCircuito.style.display = "none";

  raceContainer.style.display = "flex";
  titleRaces.style.display = "block";
  raceContainer.innerHTML = "<p>Cargando carreras...</p>";

    //llamada a la API de carreras de 2023
  fetch("https://api.openf1.org/v1/meetings?year=2023")
    .then((res) => res.json())
    .then((data) => {
      raceContainer.innerHTML = "";

    //si no hay datos, mostrar mensaje
      if (data.length === 0) {
        raceContainer.innerHTML = "<p>No se encontraron carreras.</p>";
        return;
      }

    //por cada carrera crear una tarjeta
      data.forEach((meeting) => {
        const card = document.createElement("div");
        card.className = "driver-card";

    //imagen según país, o placeholder si no hay 
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
//mostrar circuito y correr animación al hacer clic en el botón
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


// Coordenadas del circuito de Monza (800x480px)
const monzaPath = [
  { x: 312, y: 339 }, { x: 176, y: 324 }, { x: 147, y: 281 }, 
  { x: 126, y: 155 }, { x: 107, y: 143 }, { x: 96, y: 195 },
  { x: 79, y: 50 }, { x: 166, y: 32 }, { x: 215, y: 103 },
  { x: 359, y: 247 }, { x: 390, y: 249 }, { x: 418, y: 265 },
  { x: 691, y: 271 }, { x: 687, y: 316 }, { x: 518, y: 340 }, 
  { x: 316, y: 338 },
];

// Simula el movimiento de un auto .car en el trazado
function simularMovimiento(carElement, path, delay = 100) {
  let i = 0;

  function mover() {
    if (!carElement || i >= path.length) {
      i = 0; // vuelve a empezar
    }

    const punto = path[i];
    carElement.style.left = `${punto.x}px`;
    carElement.style.top = `${punto.y}px`;

    i++;
    setTimeout(mover, delay); // aca despues se puede ajustar la velocidad !! con el delay
  }

  mover();
}

// Iniciar simulación
const car = document.querySelector('.car.VER'); 
simularMovimiento(car, monzaPath, 100); // 100ms entre puntos (velocidad)
