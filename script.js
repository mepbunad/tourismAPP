const languageSelect = document.getElementById('language-select');
const languageNodes = document.querySelectorAll('[data-es][data-en]');

const places = [
  {
    name: { es: 'La Candelaria', en: 'La Candelaria' },
    description: {
      es: 'Ruta histórica con plazas, museos y arte urbano.',
      en: 'Historic route with plazas, museums, and street art.'
    },
    coords: [4.5975, -74.0721],
    category: 'routes',
    anchor: '#route-candelaria'
  },
  {
    name: { es: 'Parque Nacional', en: 'National Park' },
    description: {
      es: 'Zona verde ideal para caminatas y descanso.',
      en: 'Green area ideal for walks and downtime.'
    },
    coords: [4.6248, -74.0683],
    category: 'routes',
    anchor: '#route-park'
  },
  {
    name: { es: 'Museo del Oro', en: 'Gold Museum' },
    description: {
      es: 'Parada cultural clave dentro del centro.',
      en: 'A key cultural stop in the city center.'
    },
    coords: [4.6019, -74.0724],
    category: 'culture',
    anchor: '#culture-museums'
  },
  {
    name: { es: 'Chapinero gastronómico', en: 'Foodie Chapinero' },
    description: {
      es: 'Cafés especiales, brunch y cocina creativa.',
      en: 'Specialty coffee, brunch, and creative cuisine.'
    },
    coords: [4.6486, -74.0611],
    category: 'gastronomy',
    anchor: '#food-coffee'
  },
  {
    name: { es: 'Usaquén', en: 'Usaquén' },
    description: {
      es: 'Mercados, ferias y agenda cultural barrial.',
      en: 'Markets, fairs, and neighborhood culture.'
    },
    coords: [4.6946, -74.0304],
    category: 'events',
    anchor: '#events-neighborhood'
  }
];

const categoryColors = {
  routes: '#1765c1',
  culture: '#7c3aed',
  gastronomy: '#ea580c',
  events: '#059669'
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  languageNodes.forEach((node) => {
    node.textContent = node.dataset[lang];
  });
}

languageSelect?.addEventListener('change', (event) => {
  setLanguage(event.target.value);
});

setLanguage(languageSelect?.value || 'es');

if (typeof L !== 'undefined') {
  const map = L.map('map', {
    scrollWheelZoom: false
  }).setView([4.6486, -74.0867], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const currentLang = () => languageSelect?.value || 'es';

  places.forEach((place) => {
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<span style="display:block;width:16px;height:16px;border-radius:50%;background:${categoryColors[place.category]};border:3px solid white;box-shadow:0 4px 10px rgba(0,0,0,.2)"></span>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    const marker = L.marker(place.coords, { icon }).addTo(map);
    const popupContent = () => `
      <div class="map-popup">
        <h3>${place.name[currentLang()]}</h3>
        <p>${place.description[currentLang()]}</p>
        <a href="${place.anchor}">${currentLang() === 'es' ? 'Ir a la subsección' : 'Go to subsection'}</a>
      </div>
    `;

    marker.bindPopup(popupContent());

    languageSelect?.addEventListener('change', () => {
      marker.setPopupContent(popupContent());
    });
  });
}
