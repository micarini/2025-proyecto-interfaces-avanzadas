document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const carNumber = params.get('number');

  if (!carNumber) {
    document.getElementById('driver-details').textContent = 'No driver selected.';
    return;
  }

  const drivers = {
  "1": {
    name: "Max Verstappen",
    fullBio: "Max Verstappen is a Dutch racing driver currently competing for Red Bull Racing. Known for his aggressive style and racecraft, he became the youngest race winner in F1 history in 2016.",
    stats: {
      nationality: "Dutch",
      team: "Red Bull Racing",
      carNumber: 1,
      championships: 3,
      wins: 60,
      podiums: 98,
      poles: 40,
      fastestLaps: 31,
      firstEntry: "2015 Australian GP",
      firstWin: "2016 Spanish GP",
      lastWin: "2024 Japanese GP"
    }
  },
  "4": {
    name: "Lando Norris",
    fullBio: "Lando Norris is a British driver racing for McLaren. Known for his consistency and charisma, he claimed his first win in the 2024 Miami GP.",
    stats: {
      nationality: "British",
      team: "McLaren",
      carNumber: 4,
      championships: 0,
      wins: 1,
      podiums: 15,
      poles: 2,
      fastestLaps: 6,
      firstEntry: "2019 Australian GP",
      firstWin: "2024 Miami GP",
      lastWin: "2024 Miami GP"
    }
  },
  "2": {
    name: "Logan Sargeant",
    fullBio: "Logan Sargeant is an American F1 driver for Williams. He joined the grid in 2023 and became the first full-time American driver since 2007.",
    stats: {
      nationality: "American",
      team: "Williams",
      carNumber: 2,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "2023 Bahrain GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "20": {
    name: "Kevin Magnussen",
    fullBio: "Kevin Magnussen is a Danish driver competing with Haas. He debuted with a podium finish and returned to F1 in 2022 after a brief hiatus.",
    stats: {
      nationality: "Danish",
      team: "Haas",
      carNumber: 20,
      championships: 0,
      wins: 0,
      podiums: 1,
      poles: 0,
      fastestLaps: 2,
      firstEntry: "2014 Australian GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "21": {
    name: "Nyck de Vries",
    fullBio: "Nyck de Vries is a Dutch driver who made his F1 debut in 2022 with Williams as a substitute and later raced for AlphaTauri.",
    stats: {
      nationality: "Dutch",
      team: "AlphaTauri",
      carNumber: 21,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "2022 Italian GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "22": {
    name: "Yuki Tsunoda",
    fullBio: "Yuki Tsunoda is a Japanese F1 driver racing for RB (formerly AlphaTauri). He's known for his speed and outspoken personality.",
    stats: {
      nationality: "Japanese",
      team: "RB",
      carNumber: 22,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 1,
      firstEntry: "2021 Bahrain GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "24": {
    name: "Zhou Guanyu",
    fullBio: "Zhou Guanyu is China's first full-time F1 driver, competing for Sauber. He joined the sport in 2022.",
    stats: {
      nationality: "Chinese",
      team: "Sauber",
      carNumber: 24,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "2022 Bahrain GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "27": {
    name: "Nico Hülkenberg",
    fullBio: "Nico Hülkenberg is a German F1 veteran with stints at multiple teams, known for his consistency and pole in Brazil 2010.",
    stats: {
      nationality: "German",
      team: "Haas",
      carNumber: 27,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 1,
      fastestLaps: 2,
      firstEntry: "2010 Bahrain GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "16": {
    name: "Charles Leclerc",
    fullBio: "Charles Leclerc is a Monégasque driver racing for Ferrari. He is widely regarded as one of the top talents in the current grid.",
    stats: {
      nationality: "Monégasque",
      team: "Ferrari",
      carNumber: 16,
      championships: 0,
      wins: 6,
      podiums: 33,
      poles: 23,
      fastestLaps: 9,
      firstEntry: "2018 Australian GP",
      firstWin: "2019 Belgian GP",
      lastWin: "2024 Monaco GP"
    }
  },
  "55": {
    name: "Carlos Sainz",
    fullBio: "Carlos Sainz is a Spanish driver for Ferrari. He claimed his maiden win in the 2022 British GP.",
    stats: {
      nationality: "Spanish",
      team: "Ferrari",
      carNumber: 55,
      championships: 0,
      wins: 3,
      podiums: 19,
      poles: 5,
      fastestLaps: 5,
      firstEntry: "2015 Australian GP",
      firstWin: "2022 British GP",
      lastWin: "2024 Australian GP"
    }
  },
  "63": {
    name: "George Russell",
    fullBio: "George Russell is a British driver racing for Mercedes. He secured his first win in 2022 and has become a consistent front-runner.",
    stats: {
      nationality: "British",
      team: "Mercedes",
      carNumber: 63,
      championships: 0,
      wins: 1,
      podiums: 11,
      poles: 2,
      fastestLaps: 6,
      firstEntry: "2019 Australian GP",
      firstWin: "2022 Brazilian GP",
      lastWin: "2022 Brazilian GP"
    }
  },
  "44": {
    name: "Lewis Hamilton",
    fullBio: "Lewis Hamilton is a seven-time world champion known for his speed, consistency, and activism. He currently races for Mercedes.",
    stats: {
      nationality: "British",
      team: "Mercedes",
      carNumber: 44,
      championships: 7,
      wins: 103,
      podiums: 197,
      poles: 104,
      fastestLaps: 63,
      firstEntry: "2007 Australian GP",
      firstWin: "2007 Canadian GP",
      lastWin: "2021 Saudi Arabian GP"
    }
  },
  "11": {
    name: "Sergio Pérez",
    fullBio: "Sergio 'Checo' Pérez is a Mexican F1 driver for Red Bull. He is known for tire management and several memorable comebacks.",
    stats: {
      nationality: "Mexican",
      team: "Red Bull Racing",
      carNumber: 11,
      championships: 0,
      wins: 6,
      podiums: 35,
      poles: 3,
      fastestLaps: 11,
      firstEntry: "2011 Australian GP",
      firstWin: "2020 Sakhir GP",
      lastWin: "2023 Azerbaijan GP"
    }
  },
  "10": {
    name: "Pierre Gasly",
    fullBio: "Pierre Gasly is a French driver racing for Alpine. He is a Grand Prix winner and known for his resilience and qualifying performances.",
    stats: {
      nationality: "French",
      team: "Alpine",
      carNumber: 10,
      championships: 0,
      wins: 1,
      podiums: 4,
      poles: 0,
      fastestLaps: 3,
      firstEntry: "2017 Malaysian GP",
      firstWin: "2020 Italian GP",
      lastWin: "2020 Italian GP"
    }
  },
  "31": {
    name: "Esteban Ocon",
    fullBio: "Esteban Ocon is a French F1 driver for Alpine. He claimed his first win in a dramatic 2021 Hungarian GP.",
    stats: {
      nationality: "French",
      team: "Alpine",
      carNumber: 31,
      championships: 0,
      wins: 1,
      podiums: 3,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "2016 Belgian GP",
      firstWin: "2021 Hungarian GP",
      lastWin: "2021 Hungarian GP"
    }
  },
  "18": {
    name: "Lance Stroll",
    fullBio: "Lance Stroll is a Canadian driver for Aston Martin. He debuted in 2017 and has scored multiple podiums.",
    stats: {
      nationality: "Canadian",
      team: "Aston Martin",
      carNumber: 18,
      championships: 0,
      wins: 0,
      podiums: 3,
      poles: 1,
      fastestLaps: 0,
      firstEntry: "2017 Australian GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "14": {
    name: "Fernando Alonso",
    fullBio: "Fernando Alonso is a two-time world champion from Spain, currently racing for Aston Martin. Renowned for his racecraft and longevity.",
    stats: {
      nationality: "Spanish",
      team: "Aston Martin",
      carNumber: 14,
      championships: 2,
      wins: 32,
      podiums: 106,
      poles: 22,
      fastestLaps: 24,
      firstEntry: "2001 Australian GP",
      firstWin: "2003 Hungarian GP",
      lastWin: "2013 Spanish GP"
    }
  },
  "23": {
    name: "Alexander Albon",
    fullBio: "Alex Albon is a Thai-British F1 driver racing for Williams. He is known for his adaptability and strong midfield performances.",
    stats: {
      nationality: "Thai",
      team: "Williams",
      carNumber: 23,
      championships: 0,
      wins: 0,
      podiums: 2,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "2019 Australian GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "3": {
    name: "Daniel Ricciardo",
    fullBio: "Daniel Ricciardo is an Australian F1 driver currently racing for RB. He's known for his overtaking skills and trademark smile.",
    stats: {
      nationality: "Australian",
      team: "RB",
      carNumber: 3,
      championships: 0,
      wins: 8,
      podiums: 32,
      poles: 3,
      fastestLaps: 16,
      firstEntry: "2011 British GP",
      firstWin: "2014 Canadian GP",
      lastWin: "2021 Italian GP"
    }
  },
  "77": {
    name: "Valtteri Bottas",
    fullBio: "Valtteri Bottas is a Finnish F1 driver and former Mercedes race winner, now racing for Sauber.",
    stats: {
      nationality: "Finnish",
      team: "Sauber",
      carNumber: 77,
      championships: 0,
      wins: 10,
      podiums: 67,
      poles: 20,
      fastestLaps: 19,
      firstEntry: "2013 Australian GP",
      firstWin: "2017 Russian GP",
      lastWin: "2021 Turkish GP"
    }
  },
  "81": {
    name: "Oscar Piastri",
    fullBio: "Oscar Piastri is an Australian F1 driver racing for McLaren. A former F2 and F3 champion, he is regarded as one of the most promising talents.",
    stats: {
      nationality: "Australian",
      team: "McLaren",
      carNumber: 81,
      championships: 0,
      wins: 0,
      podiums: 2,
      poles: 0,
      fastestLaps: 1,
      firstEntry: "2023 Bahrain GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "14": {
    name: "Fernando Alonso",
    fullBio: "Fernando Alonso is a two-time world champion from Spain. With a career spanning decades, he races for Aston Martin.",
    stats: {
      nationality: "Spanish",
      team: "Aston Martin",
      carNumber: 14,
      championships: 2,
      wins: 32,
      podiums: 106,
      poles: 22,
      fastestLaps: 24,
      firstEntry: "2001 Australian GP",
      firstWin: "2003 Hungarian GP",
      lastWin: "2013 Spanish GP"
    }
  },
  "18": {
    name: "Lance Stroll",
    fullBio: "Lance Stroll is a Canadian F1 driver competing for Aston Martin. He made his debut in 2017 and scored a podium in his rookie year.",
    stats: {
      nationality: "Canadian",
      team: "Aston Martin",
      carNumber: 18,
      championships: 0,
      wins: 0,
      podiums: 3,
      poles: 1,
      fastestLaps: 0,
      firstEntry: "2017 Australian GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "38": {
    name: "Oliver Bearman",
    fullBio: "Oliver Bearman is a British junior driver in the Ferrari Driver Academy. He made his F1 debut with Ferrari at the 2024 Saudi Arabian GP as a substitute.",
    stats: {
      nationality: "British",
      team: "Ferrari (substitute)",
      carNumber: 38,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "2024 Saudi Arabian GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "40": {
    name: "Liam Lawson",
    fullBio: "Liam Lawson is a New Zealand driver from the Red Bull Junior Team. He made a notable F1 debut in 2023 replacing Ricciardo at AlphaTauri.",
    stats: {
      nationality: "New Zealander",
      team: "RB (Reserve)",
      carNumber: 40,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "2023 Dutch GP",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "45": {
    name: "Jack Doohan",
    fullBio: "Jack Doohan is an Australian racing driver and Alpine reserve driver. He is a former F2 race winner and part of the Alpine Academy.",
    stats: {
      nationality: "Australian",
      team: "Alpine (Reserve)",
      carNumber: 45,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "N/A",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "46": {
    name: "Isack Hadjar",
    fullBio: "Isack Hadjar is a French driver affiliated with Red Bull's junior program. He is a current F2 contender and Red Bull reserve driver.",
    stats: {
      nationality: "French",
      team: "Red Bull (Reserve)",
      carNumber: 46,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "N/A",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "47": {
    name: "Gabriel Bortoleto",
    fullBio: "Gabriel Bortoleto is a Brazilian racing driver, 2023 FIA F3 champion and reserve driver for McLaren in 2024.",
    stats: {
      nationality: "Brazilian",
      team: "McLaren (Reserve)",
      carNumber: 47,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "N/A",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  },
  "8": {
    name: "Andrea Kimi Antonelli",
    fullBio: "Andrea Kimi Antonelli is an Italian racing prodigy part of the Mercedes Junior Team. Considered a future F1 talent, he's currently racing in F2.",
    stats: {
      nationality: "Italian",
      team: "Mercedes Junior",
      carNumber: 8,
      championships: 0,
      wins: 0,
      podiums: 0,
      poles: 0,
      fastestLaps: 0,
      firstEntry: "N/A",
      firstWin: "N/A",
      lastWin: "N/A"
    }
  }
};


  const driver = drivers[carNumber];

  if (!driver) {
    document.getElementById('driver-details').textContent = 'Driver not found.';
    return;
  }

  document.getElementById('driver-name').textContent = driver.name;

  const container = document.getElementById('driver-details');
  container.innerHTML = `
    <p>${driver.fullBio}</p>
    <ul>
      <li><strong>Nationality:</strong> ${driver.stats.nationality}</li>
      <li><strong>Team:</strong> ${driver.stats.team}</li>
      <li><strong>Car Number:</strong> ${driver.stats.carNumber}</li>
      <li><strong>Championships:</strong> ${driver.stats.championships}</li>
      <li><strong>Wins:</strong> ${driver.stats.wins}</li>
      <li><strong>Podiums:</strong> ${driver.stats.podiums}</li>
      <li><strong>Poles:</strong> ${driver.stats.poles}</li>
      <li><strong>Fastest Laps:</strong> ${driver.stats.fastestLaps}</li>
      <li><strong>First Entry:</strong> ${driver.stats.firstEntry}</li>
      <li><strong>First Win:</strong> ${driver.stats.firstWin}</li>
      <li><strong>Last Win:</strong> ${driver.stats.lastWin}</li>
    </ul>
  `;
});
