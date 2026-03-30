const heroTrack = document.getElementById("heroTrack");
const heroSlides = Array.from(heroTrack.children);
let heroIndex = 0;
let heroTimer = null;
let detailMapInstance = null;

const detailOverlay = document.getElementById("detailOverlay");
const detailPanel = document.getElementById("detailPanel");
const detailClose = document.getElementById("detailClose");
const detailTitle = document.getElementById("detailTitle");
const detailKicker = document.getElementById("detailKicker");
const detailShort = document.getElementById("detailShort");
const detailLong = document.getElementById("detailLong");
const detailAddress = document.getElementById("detailAddress");
const detailMapsLink = document.getElementById("detailMapsLink");
const menuDestinos = document.getElementById("menuDestinos");
const menuGastronomia = document.getElementById("menuGastronomia");
const menuCultura = document.getElementById("menuCultura");
const destinosOverlay = document.getElementById("destinosOverlay");
const destinosPanel = document.getElementById("destinosPanel");
const destinosClose = document.getElementById("destinosClose");
const destinosTabs = document.getElementById("destinosTabs");
const destinosGrid = document.getElementById("destinosGrid");
const destinosTitle = document.getElementById("destinosTitle");
const destinosKicker = document.querySelector(".destinos-kicker");
const destinoDetailOverlay = document.getElementById("destinoDetailOverlay");
const destinoDetailCard = document.getElementById("destinoDetailCard");
const destinoDetailClose = document.getElementById("destinoDetailClose");
const destinoDetailImage = document.getElementById("destinoDetailImage");
const destinoDetailTitle = document.getElementById("destinoDetailTitle");
const destinoDetailDescription = document.getElementById("destinoDetailDescription");
const destinoDetailAddress = document.getElementById("destinoDetailAddress");
const destinoDetailMapsLink = document.getElementById("destinoDetailMapsLink");
const destinoDetailAddressBox = document.querySelector(".destino-detail-address");
const destinoDetailMapWrap = document.querySelector(".destino-detail-map-wrap");
const langSwitcher = document.getElementById("langSwitcher");
const langToggle = document.getElementById("langToggle");
const langMenu = document.getElementById("langMenu");
const langCurrentFlag = document.getElementById("langCurrentFlag");
const langCurrentLabel = document.getElementById("langCurrentLabel");

let destinoDetailMapInstance = null;
let activeDestinosTab = "folcloricas";
let activeOverlayMode = "destinos";
let currentLanguage = "es";
let activeDetailSectionKey = null;

const destinosData = {
  folcloricas: [
    {
      title: "Piscilago",
      image: "img/Destinos/piscilago.jpg",
      shortLabel: "Parque acuático y conservación",
      longDescription:
        "Piscilago es ideal para un plan familiar completo: combina atracciones acuáticas, zonas de descanso y experiencias de educación ambiental. Su propuesta une diversión y conservación, con recorridos de biodiversidad que lo convierten en uno de los destinos recreativos más reconocidos del país.",
      address:
        "Kilómetro 105 de la vía Bogotá-Girardot, a cinco minutos de Melgar (Tolima), Colombia.",
      lat: 4.223366181173269,
      lng: -74.69062835880113,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.223366181173269,-74.69062835880113",
    },
    {
      title: "Cerro de la Cruz",
      image: "img/Destinos/cerro_cruz.jpg",
      shortLabel: "Caminata y mirador natural",
      longDescription:
        "El Cerro de la Cruz ofrece una caminata agradable entre senderos y bosque de pinos, con pendientes moderadas y vistas panorámicas muy valoradas por visitantes y caminantes. Es un recorrido recomendado para quienes buscan naturaleza, aire libre y una excelente postal de Girardot.",
      address: "Girardot, Cundinamarca, sector del Cerro de la Cruz.",
      lat: 4.359713902040148,
      lng: -74.67244181302841,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.359713902040148,-74.67244181302841",
    },
    {
      title: "Isla del Sol",
      image: "img/Destinos/isla_sol.jpg",
      shortLabel: "Descanso en clima cálido",
      longDescription:
        "La Isla del Sol es perfecta para desconectarse y disfrutar del entorno en pareja, con amigos o en familia. Su ambiente tranquilo, el paisaje y el clima cálido crean una experiencia de descanso muy apreciada por quienes visitan Girardot.",
      address: "Zona turística de la Isla del Sol, Girardot, Cundinamarca.",
      lat: 4.28943291007592,
      lng: -74.79043473936906,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.28943291007592,-74.79043473936906",
    },
    {
      title: "Embarcadero Turístico",
      image: "img/Destinos/embarcadero.jpg",
      shortLabel: "Paseos por el río Magdalena",
      longDescription:
        "Desde el Embarcadero Turístico parten recorridos fluviales en diferentes embarcaciones, una experiencia ideal para conocer Girardot desde el río Magdalena. Es un plan muy atractivo para quienes desean vivir la ciudad desde su tradición ribereña.",
      address:
        "Embarcadero Turístico de Girardot, zona ribereña del río Magdalena, Girardot, Cundinamarca.",
      lat: 4.29376782727821,
      lng: -74.8105110708882,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.29376782727821,-74.8105110708882",
    },
  ],
  urbanas: [
    {
      title: "Puente Férreo",
      image: "img/Destinos/puente_ferreo.jpg",
      shortLabel: "Patrimonio y mirador histórico",
      longDescription:
        "El Puente Férreo es uno de los íconos más representativos de Girardot. Su historia está ligada a la antigua conexión ferroviaria con Tolima y Huila, y hoy es un punto peatonal con gran valor patrimonial, ideal para fotografía y recorridos urbanos.",
      address: "Puente Férreo de Girardot, sector del río Magdalena, Girardot, Cundinamarca.",
      lat: 4.293934519978105,
      lng: -74.81114185767194,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.293934519978105,-74.81114185767194",
    },
    {
      title: "Parque de la Locomotora",
      image: "img/Destinos/parque_locomotora.jpg",
      shortLabel: "Memoria ferroviaria",
      longDescription:
        "El Parque de la Locomotora conserva la memoria de la antigua estación de tren y de la infraestructura ferroviaria que marcó el desarrollo local. Es un lugar emblemático para conocer la historia de la ciudad en un recorrido corto y muy fotogénico.",
      address: "Cl. 16 #14-33, Girardot, Cundinamarca.",
      lat: 4.297159593284818,
      lng: -74.8090458,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.297159593284818,-74.8090458",
    },
    {
      title: "Parroquia San Miguel",
      image: "img/Destinos/parroquia_san_miguel.jpg",
      shortLabel: "Patrimonio religioso",
      longDescription:
        "La Parroquia San Miguel es un referente espiritual y urbano en Girardot. Su presencia en el barrio San Miguel la convierte en una parada cultural para quienes desean conocer espacios tradicionales de la ciudad.",
      address: "Calle 12 No. 9-18, barrio San Miguel, Girardot, Cundinamarca.",
      lat: 4.292811522868402,
      lng: -74.80750775582015,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.292811522868402,-74.80750775582015",
    },
  ],
};

const gastronomiaData = {
  restaurantes: [
    {
      title: "El Cielo - Gastrobar & Discoteca",
      image: "img/Gastronomia/el_cielo.jpg",
      shortLabel: "Gastronomía y noche en un solo lugar",
      longDescription:
        "El Cielo combina una propuesta gastronómica moderna con ambiente nocturno, ideal para quienes buscan una cena con estilo y una experiencia social más extendida en la noche girardoteña.",
      address: "Carrera 10 #30-65, barrio Miraflores, Girardot, Colombia.",
      lat: 4.306204120274662,
      lng: -74.80368414232805,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.306204120274662,-74.80368414232805",
    },
    {
      title: "Asadero La Bonga",
      image: "img/Gastronomia/la_bonga.jpg",
      shortLabel: "Sabor local y tradición",
      longDescription:
        "Asadero La Bonga es una excelente opción para disfrutar cocina local con un ambiente cercano y auténtico. Su propuesta resalta preparaciones tradicionales con un estilo casero muy apreciado por residentes y visitantes.",
      address: "Calle 20 #4-57, frente al Hotel Tocarema, Girardot, Colombia.",
      lat: 4.294739317139136,
      lng: -74.8013550865079,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.294739317139136,-74.8013550865079",
    },
    {
      title: "Casa Cruton By Cronch",
      image: "img/Gastronomia/casa_cruton.jpg",
      shortLabel: "Cocina creativa contemporánea",
      longDescription:
        "Casa Cruton By Cronch ofrece una experiencia gastronómica fresca y actual, con platos de presentación cuidada y un ambiente cómodo para compartir. Es una parada recomendada para quienes disfrutan propuestas culinarias modernas.",
      address: "Cl. 18 #7-69, Girardot, Cundinamarca.",
      lat: 4.29528672212228,
      lng: -74.80411002883595,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.29528672212228,-74.80411002883595",
    },
  ],
  nocturno_licor: [
    {
      title: "Pantera Café Bar",
      image: "img/Gastronomia/pantera.jpg",
      shortLabel: "Cócteles y ambiente lounge",
      longDescription:
        "Pantera Café Bar propone una noche elegante con coctelería, música y una atmósfera envolvente para iniciar o continuar planes nocturnos en Girardot.",
      address: "Cra. 12 #20-50, Girardot, Cundinamarca.",
      lat: 4.299796720761712,
      lng: -74.80584747116404,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.299796720761712,-74.80584747116404",
    },
    {
      title: "Keops Discoteca Bar",
      image: "img/Gastronomia/keops.jpg",
      shortLabel: "Discoteca y energía nocturna",
      longDescription:
        "Keops Discoteca Bar es una opción vibrante para quienes buscan baile, música y ambiente de fiesta en un formato clásico de discoteca-bar.",
      address: "Cl. 40, Girardot, Cundinamarca.",
      lat: 4.321950290690954,
      lng: -74.81074181349209,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.321950290690954,-74.81074181349209",
    },
    {
      title: "Discoteca Oasis",
      image: "img/Gastronomia/oasis.jpg",
      shortLabel: "Plan nocturno en zona comercial",
      longDescription:
        "Discoteca Oasis combina música, pista y ambiente festivo en una ubicación céntrica, ideal para disfrutar la noche con amigos en un entorno dinámico.",
      address:
        "Carrera 10 #19-77, 3er piso, Centro Comercial Oasis, Girardot, Cundinamarca.",
      lat: 4.298086821277717,
      lng: -74.80471342883595,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.298086821277717,-74.80471342883595",
    },
  ],
};

const culturaData = {
  tradiciones_festivales: [
    {
      title: "Festival del Río",
      image: "img/Cultura/festival_rio.jpg",
      shortLabel: "Celebración cultural ribereña",
      longDescription:
        "El Festival del Río celebra la relación histórica de Girardot con el Magdalena a través de música, comparsas, encuentros comunitarios y actividades para toda la familia. Es una experiencia cultural que refleja la identidad cálida y festiva de la ciudad.",
      address: "Ribera del río Magdalena y corredores culturales de Girardot",
      lat: 4.3018,
      lng: -74.8071,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.3018,-74.8071",
      hasMap: false,
      hasAddress: false,
      hasDirections: false,
    },
    {
      title: "Reinado Nacional",
      image: "img/Cultura/reinado_nacional.jpg",
      shortLabel: "Tradición y agenda de ciudad",
      longDescription:
        "El Reinado Nacional forma parte de la agenda más representativa de Girardot, integrando actos protocolarios, actividades artísticas y espacios de encuentro que dinamizan el turismo y la vida cultural local durante la temporada.",
      address: "Escenarios de eventos y convenciones de Girardot",
      lat: 4.3041,
      lng: -74.8003,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.3041,-74.8003",
      hasMap: false,
      hasAddress: false,
      hasDirections: false,
    },
    {
      title: "Semana Santa en Girardot",
      image: "img/Cultura/semana_santa.jpg",
      shortLabel: "Fe y patrimonio espiritual",
      longDescription:
        "La Semana Santa en Girardot reúne tradición religiosa, procesiones y actividades de reflexión que convocan a residentes y visitantes. Es una experiencia cultural y espiritual profundamente arraigada en la memoria de la ciudad.",
      address: "Centro histórico y parroquias de Girardot",
      lat: 4.3048,
      lng: -74.8016,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.3048,-74.8016",
      hasMap: false,
      hasAddress: false,
      hasDirections: false,
    },
  ],
  arte_patrimonio: [
    {
      title: "Parque Bolívar",
      image: "img/Cultura/parque_bolivar.jpg",
      shortLabel: "Corazón histórico urbano",
      longDescription:
        "El Parque Bolívar es uno de los espacios más representativos del centro de Girardot. Su entorno concentra actividad ciudadana, historia urbana y una atmósfera ideal para recorrer el patrimonio local.",
      address: "Cl. 18 #11-11, Girardot, Cundinamarca.",
      lat: 4.297112190737793,
      lng: -74.80714331779092,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.297112190737793,-74.80714331779092",
    },
    {
      title: "Ruta Muralista",
      image: "img/Cultura/ruta_muralista.jpg",
      shortLabel: "Arte urbano con identidad",
      longDescription:
        "La Ruta Muralista invita a descubrir expresiones visuales que narran historias de barrio, memoria local y creatividad contemporánea. Es una caminata cultural muy atractiva para quienes disfrutan del arte en el espacio público.",
      address: "Carrera 12, entre calle 13 y calle 14, Girardot, Cundinamarca.",
      lat: 4.294734406788456,
      lng: -74.80942536938478,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.294734406788456,-74.80942536938478",
    },
    {
      title: "CAS Teatro",
      image: "img/Cultura/cas_teatro.jpg",
      shortLabel: "Escena y formación cultural",
      longDescription:
        "CAS Teatro es un espacio clave para las artes escénicas en Girardot, con actividades culturales, procesos formativos y programación que fortalece la vida artística de la ciudad.",
      address: "Cl. 21 #11-10, Girardot, Cundinamarca.",
      lat: 4.2996476180945855,
      lng: -74.8049257,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.2996476180945855,-74.8049257",
    },
  ],
};

const overlayConfigs = {
  destinos: {
    title: { es: "Destinos", en: "Destinations" },
    kicker: { es: "Girardot en detalle", en: "Girardot in detail" },
    defaultTab: "folcloricas",
    tabs: {
      folcloricas: {
        label: { es: "Rutas Folclóricas", en: "Folkloric Routes" },
        items: destinosData.folcloricas,
      },
      urbanas: { label: { es: "Rutas Urbanas", en: "Urban Routes" }, items: destinosData.urbanas },
    },
  },
  gastronomia: {
    title: { es: "Gastronomía", en: "Gastronomy" },
    kicker: { es: "Sabores de Girardot", en: "Flavors of Girardot" },
    defaultTab: "restaurantes",
    tabs: {
      restaurantes: { label: { es: "Restaurantes", en: "Restaurants" }, items: gastronomiaData.restaurantes },
      nocturno_licor: {
        label: { es: "Nocturno y licor", en: "Nightlife & Drinks" },
        items: gastronomiaData.nocturno_licor,
      },
    },
  },
  cultura: {
    title: { es: "Cultura", en: "Culture" },
    kicker: { es: "Tradición y patrimonio", en: "Tradition and Heritage" },
    defaultTab: "tradiciones_festivales",
    tabs: {
      tradiciones_festivales: {
        label: { es: "Tradiciones y festivales", en: "Traditions and Festivals" },
        items: culturaData.tradiciones_festivales,
      },
      arte_patrimonio: {
        label: { es: "Arte y Patrimonio", en: "Art and Heritage" },
        items: culturaData.arte_patrimonio,
      },
    },
  },
};

const staticTranslations = {
  menuInicio: { es: "Inicio", en: "Home" },
  menuDestinos: { es: "Destinos", en: "Destinations" },
  menuGastronomia: { es: "Gastronomía", en: "Gastronomy" },
  menuCultura: { es: "Cultura", en: "Culture" },
  heroTagline: { es: "DESCUBRE", en: "DISCOVER" },
  aboutTitle: { es: "UN DESTINO CON BELLEZA NATURAL E HISTORIA", en: "A DESTINATION OF NATURAL BEAUTY AND HISTORY" },
  aboutText: {
    es: "Girardot, fundada oficialmente en el siglo XIX como punto comercial estratégico, se transformó con el tiempo en uno de los destinos favoritos del centro del país. Su clima cálido, con temperaturas agradables durante todo el año, la convierte en un lugar ideal para el descanso. Además de su oferta hotelera y recreativa, la ciudad mantiene una fuerte relación con el río Magdalena, eje histórico del transporte y del crecimiento económico regional, que hoy sigue siendo símbolo de identidad y atractivo para quienes la visitan.",
    en: "Girardot, officially founded in the 19th century as a strategic trade hub, became one of the most popular destinations in central Colombia. Its warm weather throughout the year makes it ideal for relaxation. Beyond its hotel and leisure offer, the city has a deep connection with the Magdalena River, a historic axis of transport and regional growth that remains a key symbol of local identity.",
  },
  aboutHighlight1Title: { es: "Clima cálido todo el año", en: "Warm weather all year round" },
  aboutHighlight1Text: {
    es: "Sol, piscina y actividades al aire libre en cualquier temporada.",
    en: "Sun, pool, and outdoor activities in every season.",
  },
  aboutHighlight2Title: { es: "Destino cercano a Bogotá", en: "Close-to-Bogotá getaway" },
  aboutHighlight2Text: {
    es: "Escapada ideal para fines de semana y planes de descanso.",
    en: "Perfect for weekend breaks and relaxing plans.",
  },
  monumentosTitle: { es: "MONUMENTOS", en: "MONUMENTS" },
  hotelesTitle: { es: "HOTELES Y HOSPEDAJE", en: "HOTELS AND LODGING" },
  footerTitle: { es: "Turismo Girardot", en: "Girardot Tourism" },
  footerTagline: {
    es: "Experiencias auténticas para descubrir, descansar y volver.",
    en: "Authentic experiences to discover, relax, and return.",
  },
  footerLinkHome: { es: "Inicio", en: "Home" },
  footerLinkDestinos: { es: "Destinos", en: "Destinations" },
  footerLinkGastro: { es: "Gastronomía", en: "Gastronomy" },
  footerLinkCultura: { es: "Cultura", en: "Culture" },
  footerCopy: { es: "© 2026 Turismo Girardot. Todos los derechos reservados.", en: "© 2026 Girardot Tourism. All rights reserved." },
};

const itemTranslations = {
  "Monumento El León": {
    title: "Lion Monument",
    description: "Commemorative sculpture and one of Girardot’s best-known urban landmarks.",
    longDescription:
      "The Lion Monument honors the social legacy of the Girardot Lions Club, founded in 1947. In 2019, the roundabout and the sculpture were renovated as part of an urban improvement project, reinforcing its symbolic role in the city.",
    address: "Cundinamarca, Girardot, Comuna 1, Granada neighborhood, Carrera 9 and 10 with Calle 20.",
  },
  "Monumento Jorge Eliécer Gaitán": {
    title: "Jorge Eliécer Gaitán Monument",
    description: "Historic tribute in one of Girardot’s busiest central areas.",
    longDescription:
      "This monument was installed in 1949 near Parque de la Locomotora to honor Jorge Eliécer Gaitán after the events of 1948. Today, it remains a key commemorative point surrounded by commercial life and daily city movement.",
    address: "Cundinamarca, Girardot, Comuna 1, downtown, Calle 16 with Carrera 14.",
  },
  "Monumento Danza del Sol": {
    title: "Sun Dance Monument",
    description: "A welcoming sculpture that reflects Girardot’s warm and vibrant identity.",
    longDescription:
      "Located at one of the city entrances, the Sun Dance Monument symbolizes tourism, urban beautification, and Girardot’s warm climate. Its position near the main road to Flandes makes it a clear welcome landmark.",
    address: "Cundinamarca, Girardot, Comuna 2, Puerto Montero, Carrera 7 with Calle 8.",
  },
  "GHL Hotel Club el Puente": {
    title: "GHL Hotel Club el Puente",
    description: "Comfort-focused hotel with leisure spaces for restful getaways.",
    longDescription:
      "GHL Hotel Club el Puente blends comfort and wellness through pools, relaxation areas, and recreational spaces. It is ideal for visitors looking for calm stays near Girardot’s urban and leisure zones.",
    address: "Kilometer 2, Girardot - Melgar Road, 252410 Girardot, Colombia.",
  },
  "Hotel Los Puentes Comfacundi": {
    title: "Hotel Los Puentes Comfacundi",
    description: "Central lodging with recreation and wellness for all travel types.",
    longDescription:
      "Close to the Magdalena River and downtown Girardot, this hotel combines practical location, comfortable rooms, pools, and wellness-oriented areas for families, leisure travelers, and events.",
    address: "Carrera 12 #15-03, Girardot, Cundinamarca 252432, Colombia.",
  },
  "Condominio Campestre El Peñón": {
    title: "El Peñón Country Condominium",
    description: "Private country-style stay ideal for families and groups.",
    longDescription:
      "This house-style accommodation inside El Peñón offers privacy, spacious areas, and a relaxed atmosphere. It is a strong option for families or groups seeking comfort and independent lodging in a quiet setting.",
    address: "House, Second Sector, Condominio El Peñón, 252432 Girardot, Colombia.",
  },
};

const itemTranslationsBySlug = {
  monumento_el_leon: itemTranslations["Monumento El León"],
  monumento_jorge_eliecer_gaitan: itemTranslations["Monumento Jorge Eliécer Gaitán"],
  monumento_danza_del_sol: itemTranslations["Monumento Danza del Sol"],
  ghl_hotel_club_el_puente: itemTranslations["GHL Hotel Club el Puente"],
  hotel_los_puentes_comfacundi: itemTranslations["Hotel Los Puentes Comfacundi"],
  condominio_campestre_el_penon: itemTranslations["Condominio Campestre El Peñón"],
  piscilago: {
    title: "Piscilago",
    longDescription:
      "Piscilago is perfect for family travel, combining aquatic attractions, relaxation areas, and environmental experiences. Its mix of recreation and biodiversity makes it one of Colombia's most recognized leisure parks.",
    address: "Kilometer 105 on the Bogota-Girardot road, five minutes from Melgar (Tolima), Colombia.",
  },
  cerro_de_la_cruz: {
    title: "Cerro de la Cruz",
    longDescription:
      "Cerro de la Cruz offers an enjoyable hike through pine-lined paths with moderate slopes and outstanding views. It is a great outdoor route for travelers seeking nature and panoramic city scenery.",
    address: "Girardot, Cundinamarca, Cerro de la Cruz sector.",
  },
  isla_del_sol: {
    title: "Isla del Sol",
    longDescription:
      "Isla del Sol is ideal for relaxing with family, friends, or as a couple. Its warm weather and natural landscape create a calm atmosphere for a restorative escape.",
    address: "Tourist area of Isla del Sol, Girardot, Cundinamarca.",
  },
  embarcadero_turistico: {
    title: "Tourist Pier",
    longDescription:
      "From the Tourist Pier, visitors can enjoy river rides on different boats and discover Girardot from the Magdalena River. It is one of the city's most attractive fluvial experiences.",
    address: "Girardot Tourist Pier, Magdalena River waterfront, Girardot, Cundinamarca.",
  },
  puente_ferreo: {
    title: "Railway Bridge",
    longDescription:
      "The Railway Bridge is one of Girardot's most iconic landmarks. Once part of a strategic rail corridor, it now serves as a heritage walkway and scenic photo spot.",
    address: "Girardot Railway Bridge, Magdalena River sector, Girardot, Cundinamarca.",
  },
  parque_de_la_locomotora: {
    title: "Locomotora Park",
    longDescription:
      "Locomotora Park preserves the legacy of the old train station and rail structures that shaped local development. It is an emblematic stop for understanding Girardot's railway heritage.",
    address: "Cl. 16 #14-33, Girardot, Cundinamarca.",
  },
  parroquia_san_miguel: {
    title: "San Miguel Parish",
    longDescription:
      "San Miguel Parish is a spiritual and urban landmark in Girardot. Its location in the San Miguel neighborhood makes it a meaningful cultural stop in the city.",
    address: "Calle 12 No. 9-18, San Miguel neighborhood, Girardot, Cundinamarca.",
  },
  el_cielo_gastrobar_discoteca: {
    title: "El Cielo - Gastrobar & Nightclub",
    longDescription:
      "El Cielo blends contemporary cuisine with a vibrant nightlife atmosphere, ideal for travelers seeking an elegant dinner that can continue into an evening social experience.",
    address: "Carrera 10 #30-65, Miraflores neighborhood, Girardot, Colombia.",
  },
  asadero_la_bonga: {
    title: "Asadero La Bonga",
    longDescription:
      "Asadero La Bonga is a strong local choice for traditional flavors and a warm, authentic ambiance. It is well loved by visitors looking for regional cuisine in a welcoming setting.",
    address: "Calle 20 #4-57, in front of Hotel Tocarema, Girardot, Colombia.",
  },
  casa_cruton_by_cronch: {
    title: "Casa Cruton By Cronch",
    longDescription:
      "Casa Cruton By Cronch offers a modern dining experience with careful presentation and a comfortable social atmosphere. It is ideal for travelers who enjoy contemporary culinary proposals.",
    address: "Cl. 18 #7-69, Girardot, Cundinamarca.",
  },
  pantera_cafe_bar: {
    title: "Pantera Cafe Bar",
    longDescription:
      "Pantera Cafe Bar delivers an elegant nighttime setting with cocktails and music, ideal to start or continue evening plans in Girardot.",
    address: "Cra. 12 #20-50, Girardot, Cundinamarca.",
  },
  keops_discoteca_bar: {
    title: "Keops Discoteca Bar",
    longDescription:
      "Keops Discoteca Bar is a lively option for dancing and nightlife energy, with a classic disco-bar atmosphere.",
    address: "Cl. 40, Girardot, Cundinamarca.",
  },
  discoteca_oasis: {
    title: "Oasis Nightclub",
    longDescription:
      "Oasis offers music, dance floor, and a vibrant atmosphere in a central location, perfect for enjoying Girardot's nightlife with friends.",
    address: "Carrera 10 #19-77, 3rd floor, Oasis Shopping Center, Girardot, Cundinamarca.",
  },
  festival_del_rio: {
    title: "River Festival",
    longDescription:
      "The River Festival celebrates Girardot's bond with the Magdalena through music, parades, and community activities. It is a cultural experience that reflects the city's warm and festive identity.",
  },
  reinado_nacional: {
    title: "National Pageant",
    longDescription:
      "The National Pageant is one of Girardot's most representative events, integrating protocol acts, artistic performances, and gathering spaces that energize local tourism and culture.",
  },
  semana_santa_en_girardot: {
    title: "Holy Week in Girardot",
    longDescription:
      "Holy Week in Girardot brings together religious tradition, processions, and reflection activities for residents and visitors, preserving one of the city's strongest cultural and spiritual expressions.",
  },
  parque_bolivar: {
    title: "Bolivar Park",
    longDescription:
      "Bolivar Park is one of downtown Girardot's most representative public spaces, where urban history, local life, and heritage routes come together.",
    address: "Cl. 18 #11-11, Girardot, Cundinamarca.",
  },
  ruta_muralista: {
    title: "Mural Route",
    longDescription:
      "The Mural Route showcases urban art that tells neighborhood stories, collective memory, and contemporary creativity in Girardot.",
    address: "Carrera 12, between Calle 13 and Calle 14, Girardot, Cundinamarca.",
  },
  cas_teatro: {
    title: "CAS Theater",
    longDescription:
      "CAS Theater is a key space for performing arts in Girardot, with cultural activities, training processes, and programming that strengthens local artistic life.",
    address: "Cl. 21 #11-10, Girardot, Cundinamarca.",
  },
};

function pickLang(value) {
  if (value && typeof value === "object" && "es" in value && "en" in value) {
    return value[currentLanguage] || value.es;
  }
  return value;
}

function localizeItem(item) {
  if (currentLanguage === "es") return item;
  const normalized = (item.title || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_");
  const translated = itemTranslations[item.title] || itemTranslationsBySlug[normalized];
  if (!translated) return item;
  return {
    ...item,
    title: translated.title || item.title,
    description: translated.description || item.description,
    longDescription: translated.longDescription || item.longDescription,
    address: translated.address || item.address,
  };
}

const overlayTabThemes = {
  destinos: {
    folcloricas: {
      panelBg: "linear-gradient(135deg, #f5f9fc 0%, #ebf2f8 100%)",
      panelBorder: "rgba(208, 223, 236, 0.7)",
      accent: "#2f6a95",
      cardFooterBg: "#edf4f9",
      cardFooterText: "#1f3345",
      panelTitle: "#152839",
      kickerColor: "#577489",
      tabsBg: "#e2ebf3",
      tabText: "#4f677a",
      detailBg: "linear-gradient(140deg, #f8fbfd 0%, #e9f1f7 100%)",
      detailBorder: "#d0dfea",
      detailTitle: "#163042",
      detailText: "#476176",
      detailImageBg: "linear-gradient(145deg, #ebf3f9 0%, #f2f7fb 100%)",
    },
    urbanas: {
      panelBg: "linear-gradient(135deg, #f7f8fc 0%, #edf0f8 100%)",
      panelBorder: "rgba(212, 214, 236, 0.75)",
      accent: "#4d5f9a",
      cardFooterBg: "#eef0fb",
      cardFooterText: "#28345e",
      panelTitle: "#1d2747",
      kickerColor: "#657a92",
      tabsBg: "#e2e7f3",
      tabText: "#4f5f82",
      detailBg: "linear-gradient(140deg, #f6f8fd 0%, #e9eef8 100%)",
      detailBorder: "#d4dbef",
      detailTitle: "#263763",
      detailText: "#4c5f86",
      detailImageBg: "linear-gradient(145deg, #edf1fa 0%, #f6f8fd 100%)",
    },
  },
  gastronomia: {
    restaurantes: {
      panelBg: "linear-gradient(135deg, #fcf7f1 0%, #f6eee3 100%)",
      panelBorder: "rgba(226, 206, 178, 0.75)",
      accent: "#96613d",
      cardFooterBg: "#f8ede0",
      cardFooterText: "#50331f",
      panelTitle: "#392314",
      kickerColor: "#7a5d45",
      tabsBg: "#eee1d2",
      tabText: "#6f4c30",
      detailBg: "linear-gradient(140deg, #fcf7f1 0%, #f4ebde 100%)",
      detailBorder: "#e3d2bc",
      detailTitle: "#4d301a",
      detailText: "#6b4b30",
      detailImageBg: "linear-gradient(145deg, #f7ecde 0%, #fcf6ec 100%)",
    },
    nocturno_licor: {
      panelBg: "linear-gradient(135deg, #252733 0%, #1d2230 55%, #26203a 100%)",
      panelBorder: "rgba(108, 116, 152, 0.55)",
      accent: "#6152a5",
      cardFooterBg: "#2c3143",
      cardFooterText: "#eef2ff",
      panelTitle: "#eef1ff",
      kickerColor: "#a8b6d7",
      tabsBg: "#353a4f",
      tabText: "#cdd6f2",
      detailBg: "linear-gradient(140deg, #272b3a 0%, #1f2533 100%)",
      detailBorder: "#555e7f",
      detailTitle: "#eff2ff",
      detailText: "#c2cbe8",
      detailImageBg: "linear-gradient(145deg, #32384c 0%, #262c3e 100%)",
    },
  },
  cultura: {
    tradiciones_festivales: {
      panelBg: "linear-gradient(135deg, #f8f3eb 0%, #f2e9dd 100%)",
      panelBorder: "rgba(223, 203, 177, 0.78)",
      accent: "#8e6642",
      cardFooterBg: "#f5e9d8",
      cardFooterText: "#4e3722",
      panelTitle: "#3e2919",
      kickerColor: "#7e684f",
      tabsBg: "#efe2d1",
      tabText: "#684d35",
      detailBg: "linear-gradient(140deg, #f8f2e9 0%, #eee3d4 100%)",
      detailBorder: "#dfcbb1",
      detailTitle: "#4a301d",
      detailText: "#6e5138",
      detailImageBg: "linear-gradient(145deg, #f2e5d4 0%, #faf3e8 100%)",
    },
    arte_patrimonio: {
      panelBg: "linear-gradient(135deg, #f1f5f8 0%, #e6edf3 100%)",
      panelBorder: "rgba(194, 210, 224, 0.8)",
      accent: "#3f6f8d",
      cardFooterBg: "#e8f0f6",
      cardFooterText: "#213f55",
      panelTitle: "#183247",
      kickerColor: "#5d7c91",
      tabsBg: "#dfeaf3",
      tabText: "#3f6279",
      detailBg: "linear-gradient(140deg, #f1f6fa 0%, #e4edf4 100%)",
      detailBorder: "#c9dce9",
      detailTitle: "#1d3b51",
      detailText: "#42657d",
      detailImageBg: "linear-gradient(145deg, #e9f1f8 0%, #f4f8fc 100%)",
    },
  },
};

// Carrusel horizontal infinito: clona la primera diapositiva para reinicio suave.
function setupHeroCarousel() {
  if (!heroTrack || heroSlides.length < 2) return;

  const firstClone = heroSlides[0].cloneNode(true);
  heroTrack.appendChild(firstClone);

  const totalSlides = heroTrack.children.length;
  heroTrack.style.width = `${totalSlides * 100}%`;
  Array.from(heroTrack.children).forEach((slide) => {
    slide.style.width = `${100 / totalSlides}%`;
  });

  const moveSlide = () => {
    heroIndex += 1;
    heroTrack.style.transition = "transform 1.2s ease";
    heroTrack.style.transform = `translateX(-${heroIndex * (100 / totalSlides)}%)`;

    if (heroIndex === totalSlides - 1) {
      setTimeout(() => {
        heroTrack.style.transition = "none";
        heroTrack.style.transform = "translateX(0)";
        heroIndex = 0;
      }, 1250);
    }
  };

  heroTimer = setInterval(moveSlide, 4500);
}

const sectionData = {
  monumentos: {
    imageId: "monumentosImage",
    listId: "monumentosList",
    activeIndex: 0,
    items: [
      {
        title: "Monumento El León",
        image: "img/monumento1.jpg",
        description:
          "Escultura conmemorativa que representa una parte clave de la memoria cívica de Girardot y se mantiene como ícono urbano de referencia.",
        longDescription:
          "El Monumento El León está ligado al trabajo comunitario del Club de Leones de Girardot, organización fundada en 1947 y reconocida por su apoyo social a la infancia vulnerable. En 2019 la glorieta fue remodelada y se inauguró una nueva versión de la obra, integrada a una intervención urbana que mejoró el sector y reforzó su valor simbólico para la ciudad.",
        address:
          "Cundinamarca, Girardot, comuna 1, barrio Granada, carrera 9 y 10 con calle 20.",
        lat: 4.2977457346507935,
        lng: -74.80435169087451,
      },
      {
        title: "Monumento Jorge Eliécer Gaitán",
        image: "img/monumento2.jpg",
        description:
          "Monumento histórico de carácter conmemorativo que recuerda a Jorge Eliécer Gaitán en una de las zonas más transitadas del centro.",
        longDescription:
          "La escultura de Jorge Eliécer Gaitán fue emplazada en 1949 frente al entorno del Parque de la Locomotora, como homenaje a una de las figuras políticas más influyentes del país tras los hechos de 1948. Hoy permanece en un sector central, comercial y turístico, rodeado de actividad urbana constante, árboles y espacios de encuentro ciudadano.",
        address: "Cundinamarca, Girardot, comuna 1, centro, calle 16 con carrera 14.",
        lat: 4.300834646289338,
        lng: -74.80930699982211,
      },
      {
        title: "Monumento Danza del Sol",
        image: "img/monumento3.jpg",
        description:
          "Escultura simbólica que recibe a los visitantes y transmite la identidad cálida y turística de la ciudad.",
        longDescription:
          "El Monumento Danza del Sol cumple una función turística y de embellecimiento urbano en una de las entradas más importantes de Girardot. Su presencia sobre la vía principal hacia Flandes, cerca de la plaza de mercado y del puente Ospina Pérez, refuerza la idea de bienvenida y evoca el clima cálido que caracteriza a la ciudad.",
        address: "Cundinamarca, Girardot, comuna 2, Puerto Montero, carrera 7 con calle 8.",
        lat: 4.289201540595745,
        lng: -74.80718504563838,
      },
    ],
  },
  hoteles: {
    imageId: "hotelesImage",
    listId: "hotelesList",
    activeIndex: 0,
    items: [
      {
        title: "GHL Hotel Club el Puente",
        image: "img/hotel1.jpg",
        description:
          "Hotel de estilo tradicional con ambiente de descanso y servicios recreativos para escapadas familiares o de fin de semana.",
        longDescription:
          "GHL Hotel Club el Puente ofrece una experiencia enfocada en comodidad y bienestar, con piscinas, zonas de relajación y espacios deportivos que se integran a su ambiente tranquilo. Es una alternativa práctica para quienes desean descansar cerca del centro de Girardot y conectar fácilmente con planes recreativos de la región.",
        address: "Kilometro 2 Via Girardot - Melgar, 252410 Girardot, Colombia.",
        lat: 4.292842945058661,
        lng: -74.7855859735035,
      },
      {
        title: "Hotel Los Puentes Comfacundi",
        image: "img/hotel2.jpg",
        description:
          "Hospedaje central con enfoque en descanso, recreación y bienestar, ideal para quienes buscan comodidad en plena ciudad.",
        longDescription:
          "Hotel Los Puentes Comfacundi se ubica en una zona estratégica de Girardot, cerca del río Magdalena y del movimiento urbano del centro. Su propuesta combina habitaciones confortables con espacios de recreación, piscinas, bienestar y servicios pensados para viajes familiares, de descanso o eventos.",
        address: "Carrera 12 #15-03, Girardot, Cundinamarca 252432, Colombia.",
        lat: 4.295992224753226,
        lng: -74.80894331906761,
      },
      {
        title: "Condominio Campestre El Peñón",
        image: "img/hotel3.jpg",
        description:
          "Alojamiento campestre con enfoque en privacidad y descanso, perfecto para estadías tranquilas en grupo o en familia.",
        longDescription:
          "Este alojamiento tipo casa dentro del Condominio El Peñón ofrece una experiencia más privada y relajada, con espacios amplios, zona exterior y ambiente campestre. Es una opción muy conveniente para viajes familiares o grupales que buscan comodidad, independencia y tiempo de calidad en un entorno sereno.",
        address: "Casa, Segundo Sector, Condominio El Peñón, 252432 Girardot, Colombia.",
        lat: 4.311657882082693,
        lng: -74.76888086854618,
      },
    ],
  },
};

// Construye cada item de la lista lateral con su estado expandible.
function createItemMarkup(item, index, activeIndex) {
  const localized = localizeItem(item);
  const wrapper = document.createElement("article");
  wrapper.className = `experience-item${index === activeIndex ? " active" : ""}`;
  wrapper.innerHTML = `
    <button class="item-button" type="button" aria-expanded="${index === activeIndex ? "true" : "false"}">
      <span class="item-left">
        <span class="item-dot" aria-hidden="true"></span>
        <span class="item-title">${localized.title}</span>
      </span>
      <span class="item-arrow" aria-hidden="true">&#8250;</span>
    </button>
    <p class="item-desc">${localized.description}</p>
  `;
  return wrapper;
}

// Transicion suave al cambiar la imagen principal de cada seccion.
function swapImageWithFade(imageElement, nextSrc, nextAlt) {
  imageElement.classList.add("media-swapping");
  setTimeout(() => {
    imageElement.src = nextSrc;
    imageElement.alt = nextAlt;
    imageElement.classList.remove("media-swapping");
  }, 170);
}

// Logica reutilizable para "Monumentos" y "Hoteles y hospedaje".
function setupExperienceSection(config) {
  const imageElement = document.getElementById(config.imageId);
  const listElement = document.getElementById(config.listId);
  if (!imageElement || !listElement) return;

  listElement.innerHTML = "";
  const activeIndex = config.activeIndex ?? 0;
  config.items.forEach((item, index) => {
    listElement.appendChild(createItemMarkup(item, index, activeIndex));
  });

  const activeItem = localizeItem(config.items[activeIndex] || config.items[0]);
  if (activeItem) {
    imageElement.src = activeItem.image;
    imageElement.alt = activeItem.title;
  }

  const cards = Array.from(listElement.querySelectorAll(".experience-item"));

  cards.forEach((card, idx) => {
    const btn = card.querySelector(".item-button");
    btn.addEventListener("click", () => {
      cards.forEach((otherCard) => {
        otherCard.classList.remove("active");
        otherCard.querySelector(".item-button").setAttribute("aria-expanded", "false");
      });

      card.classList.add("active");
      btn.setAttribute("aria-expanded", "true");
      config.activeIndex = idx;
      const chosen = config.items[idx];
      swapImageWithFade(imageElement, chosen.image, chosen.title);
    });
  });
}

function createPanelMap(item) {
  const detailMap = document.getElementById("detailMap");
  if (!detailMap) return;

  if (detailMapInstance) {
    detailMapInstance.remove();
    detailMapInstance = null;
  }

  if (typeof window.L === "undefined") {
    detailMap.innerHTML =
      "<div style='display:grid;place-items:center;height:100%;color:#3f5a70;font-weight:500;'>Mapa no disponible en este momento.</div>";
    return;
  }

  detailMap.innerHTML = "";
  const localized = localizeItem(item);
  detailMapInstance = L.map(detailMap, {
    zoomControl: true,
    attributionControl: true,
  }).setView([item.lat, item.lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(detailMapInstance);

  L.marker([item.lat, item.lng])
    .addTo(detailMapInstance)
    .bindPopup(`<span>${localized.title}</span>`)
    .openPopup();
  setTimeout(() => detailMapInstance.invalidateSize(), 210);
}

function openDetailPanel(sectionKey) {
  const section = sectionData[sectionKey];
  if (!section || !detailOverlay || !detailPanel) return;

  const selectedItem = section.items[section.activeIndex ?? 0];
  if (!selectedItem) return;
  activeDetailSectionKey = sectionKey;
  const localized = localizeItem(selectedItem);

  detailKicker.textContent =
    sectionKey === "monumentos"
      ? currentLanguage === "es"
        ? "Monumento destacado"
        : "Featured monument"
      : currentLanguage === "es"
        ? "Hospedaje recomendado"
        : "Recommended lodging";
  detailTitle.textContent = localized.title;
  detailShort.textContent = localized.description;
  detailLong.textContent = localized.longDescription;
  detailAddress.textContent = localized.address;
  if (detailMapsLink) {
    detailMapsLink.href = `https://www.google.com/maps/search/?api=1&query=${selectedItem.lat},${selectedItem.lng}`;
    detailMapsLink.textContent = currentLanguage === "es" ? "Ver en Google Maps" : "View on Google Maps";
    detailMapsLink.setAttribute(
      "aria-label",
      `${currentLanguage === "es" ? "Ver" : "View"} ${localized.title} ${
        currentLanguage === "es" ? "en Google Maps" : "on Google Maps"
      }`
    );
  }

  detailOverlay.classList.add("open");
  detailOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  createPanelMap(selectedItem);
}

function closeDetailPanel() {
  if (!detailOverlay) return;
  detailOverlay.classList.remove("open");
  detailOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeDetailSectionKey = null;
}

function setupExplorePanel() {
  const exploreButtons = document.querySelectorAll(".explore-btn[data-explore-section]");

  exploreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sectionKey = btn.getAttribute("data-explore-section");
      if (!sectionKey) return;
      openDetailPanel(sectionKey);
    });
  });

  if (detailClose) {
    detailClose.addEventListener("click", closeDetailPanel);
  }

  if (detailOverlay) {
    detailOverlay.addEventListener("click", (event) => {
      if (event.target === detailOverlay) {
        closeDetailPanel();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && detailOverlay?.classList.contains("open")) {
      closeDetailPanel();
    }
  });
}

function applyOverlayTheme(tabKey) {
  const modeThemes = overlayTabThemes[activeOverlayMode];
  const selectedTheme = modeThemes?.[tabKey];
  if (!destinosPanel || !destinosOverlay || !selectedTheme) return;

  destinosOverlay.style.setProperty("--overlay-panel-bg", selectedTheme.panelBg);
  destinosOverlay.style.setProperty("--overlay-panel-border", selectedTheme.panelBorder);
  destinosOverlay.style.setProperty("--overlay-accent", selectedTheme.accent);
  destinosOverlay.style.setProperty("--overlay-card-footer-bg", selectedTheme.cardFooterBg);
  destinosOverlay.style.setProperty("--overlay-card-footer-text", selectedTheme.cardFooterText);
  destinosOverlay.style.setProperty("--overlay-panel-title", selectedTheme.panelTitle);
  destinosOverlay.style.setProperty("--overlay-kicker-color", selectedTheme.kickerColor || "#577489");
  destinosOverlay.style.setProperty("--overlay-tabs-bg", selectedTheme.tabsBg || "#e2ebf3");
  destinosOverlay.style.setProperty("--overlay-tab-text", selectedTheme.tabText || "#4f677a");
  destinosOverlay.style.setProperty("--overlay-detail-bg", selectedTheme.detailBg || selectedTheme.panelBg);
  destinosOverlay.style.setProperty("--overlay-detail-border", selectedTheme.detailBorder || "#d0dfea");
  destinosOverlay.style.setProperty("--overlay-detail-title", selectedTheme.detailTitle || "#163042");
  destinosOverlay.style.setProperty("--overlay-detail-text", selectedTheme.detailText || "#476176");
  destinosOverlay.style.setProperty(
    "--overlay-detail-image-bg",
    selectedTheme.detailImageBg || "linear-gradient(145deg, #ebf3f9 0%, #f2f7fb 100%)"
  );
}

function updateOverlayPanelHeight() {
  if (!destinosPanel || !destinosGrid) return;
  const panelHeader = destinosPanel.querySelector(".destinos-header");
  if (!panelHeader) return;

  const visibleCardCount = destinosGrid.querySelectorAll(".destino-card").length;
  const columnCount = Math.min(Math.max(visibleCardCount, 1), 4);
  destinosPanel.style.setProperty("--overlay-columns", String(columnCount));

  if (window.innerWidth > 680) {
    const cardMinWidth = 210;
    const gapWidth = 16;
    const sidePadding = 64;
    const contentWidth = columnCount * cardMinWidth + (columnCount - 1) * gapWidth + sidePadding;
    const minPanelWidth = columnCount >= 4 ? 980 : 760;
    const preferredWidth = Math.max(contentWidth, minPanelWidth);
    destinosPanel.style.width = `${Math.min(preferredWidth, Math.floor(window.innerWidth * 0.94))}px`;
  } else {
    destinosPanel.style.width = "";
    destinosPanel.style.setProperty("--overlay-columns", "2");
  }

  // Recalcula despues de aplicar columnas/ancho para evitar altura erratica en primera apertura.
  const desiredHeight = panelHeader.offsetHeight + destinosGrid.scrollHeight + 8;
  const maxHeight = Math.floor(window.innerHeight * 0.88);
  destinosPanel.style.height = `${Math.min(desiredHeight, maxHeight)}px`;
}

function renderDestinosCards(tabKey) {
  if (!destinosGrid) return;
  const modeConfig = overlayConfigs[activeOverlayMode];
  const items = modeConfig?.tabs?.[tabKey]?.items || [];

  destinosGrid.innerHTML = items
    .map(
      (item, idx) => `
      <button class="destino-card" type="button" data-tab="${tabKey}" data-index="${idx}">
        <img class="destino-card-image" src="${item.image}" alt="${localizeItem(item).title}" />
        <p class="destino-card-title">${localizeItem(item).title}</p>
      </button>
    `
    )
    .join("");

  destinosGrid.querySelectorAll(".destino-card").forEach((card) => {
    card.addEventListener("click", () => {
      const tab = card.getAttribute("data-tab");
      const index = Number(card.getAttribute("data-index"));
      const selected = modeConfig?.tabs?.[tab]?.items?.[index];
      if (!selected) return;
      openDestinoDetail(selected, card);
    });
  });

  destinosGrid.querySelectorAll(".destino-card-image").forEach((image) => {
    if (!image.complete) {
      image.addEventListener("load", updateOverlayPanelHeight, { once: true });
      image.addEventListener("error", updateOverlayPanelHeight, { once: true });
    }
  });

  requestAnimationFrame(() => {
    updateOverlayPanelHeight();
    requestAnimationFrame(updateOverlayPanelHeight);
  });
}

function setActiveDestinosTab(tabKey) {
  activeDestinosTab = tabKey;
  destinosTabs?.querySelectorAll(".destinos-tab").forEach((tabBtn) => {
    tabBtn.classList.toggle("active", tabBtn.getAttribute("data-tab") === tabKey);
  });
  applyOverlayTheme(tabKey);
  renderDestinosCards(tabKey);
}

function configureOverlayMode(modeKey) {
  const modeConfig = overlayConfigs[modeKey];
  if (!modeConfig || !destinosTabs) return;

  activeOverlayMode = modeKey;
  if (destinosTitle) destinosTitle.textContent = pickLang(modeConfig.title);
  if (destinosKicker) destinosKicker.textContent = pickLang(modeConfig.kicker);

  const tabButtons = Array.from(destinosTabs.querySelectorAll(".destinos-tab"));
  const tabEntries = Object.entries(modeConfig.tabs);

  tabButtons.forEach((button, index) => {
    const entry = tabEntries[index];
    if (!entry) {
      button.style.display = "none";
      return;
    }
    const [tabKey, tabData] = entry;
    button.style.display = "";
    button.textContent = pickLang(tabData.label);
    button.setAttribute("data-tab", tabKey);
  });

  setActiveDestinosTab(modeConfig.defaultTab);
}

function createDestinoDetailMap(item) {
  const mapContainer = document.getElementById("destinoDetailMap");
  if (!mapContainer) return;

  if (destinoDetailMapInstance) {
    destinoDetailMapInstance.remove();
    destinoDetailMapInstance = null;
  }

  if (typeof window.L === "undefined") {
    mapContainer.innerHTML =
      "<div style='display:grid;place-items:center;height:100%;color:#345167;font-weight:600;'>Mapa no disponible.</div>";
    return;
  }

  mapContainer.innerHTML = "";
  const localized = localizeItem(item);
  destinoDetailMapInstance = L.map(mapContainer, {
    zoomControl: true,
    attributionControl: true,
  }).setView([item.lat, item.lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(destinoDetailMapInstance);

  L.marker([item.lat, item.lng]).addTo(destinoDetailMapInstance).bindPopup(localized.title).openPopup();
  setTimeout(() => destinoDetailMapInstance?.invalidateSize(), 180);
}

function animateDestinoCardExpansion(sourceCard, item) {
  if (!sourceCard || !destinoDetailCard) return;

  const sourceRect = sourceCard.getBoundingClientRect();
  const ghost = document.createElement("div");
  ghost.className = "destino-card-ghost";
  ghost.style.left = `${sourceRect.left}px`;
  ghost.style.top = `${sourceRect.top}px`;
  ghost.style.width = `${sourceRect.width}px`;
  ghost.style.height = `${sourceRect.height}px`;
  ghost.innerHTML = `<img src="${item.image}" alt="${item.title}" /><p>${item.title}</p>`;
  document.body.appendChild(ghost);

  destinoDetailCard.classList.add("is-hidden-for-morph");
  const targetRect = destinoDetailCard.getBoundingClientRect();

  requestAnimationFrame(() => {
    ghost.style.transition = "all 420ms cubic-bezier(0.2, 0.72, 0.2, 1)";
    ghost.style.left = `${targetRect.left}px`;
    ghost.style.top = `${targetRect.top}px`;
    ghost.style.width = `${targetRect.width}px`;
    ghost.style.height = `${targetRect.height}px`;
    ghost.style.borderRadius = "20px";
  });

  setTimeout(() => {
    destinoDetailCard.classList.remove("is-hidden-for-morph");
    ghost.remove();
  }, 440);
}

function openDestinoDetail(item, sourceCard) {
  if (!destinoDetailOverlay || !destinoDetailCard) return;
  const localized = localizeItem(item);

  destinoDetailImage.src = item.image;
  destinoDetailImage.alt = localized.title;
  destinoDetailTitle.textContent = localized.title;
  destinoDetailDescription.textContent = localized.longDescription;
  destinoDetailAddress.textContent = localized.address || "";
  destinoDetailMapsLink.href =
    item.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
  destinoDetailMapsLink.textContent = currentLanguage === "es" ? "Cómo llegar" : "Get directions";
  destinoDetailMapsLink.setAttribute(
    "aria-label",
    `${currentLanguage === "es" ? "Abrir" : "Open"} ${localized.title} ${
      currentLanguage === "es" ? "en Google Maps" : "in Google Maps"
    }`
  );

  const showAddress = item.hasAddress !== false;
  const showDirections = item.hasDirections !== false;
  const showMap = item.hasMap !== false;

  destinoDetailAddressBox?.classList.toggle("is-hidden", !showAddress);
  destinoDetailMapsLink?.classList.toggle("is-hidden", !showDirections);
  destinoDetailMapWrap?.classList.toggle("is-hidden", !showMap);
  destinoDetailCard.classList.toggle("text-priority", !showMap && !showAddress && !showDirections);

  destinoDetailOverlay.classList.add("open");
  destinoDetailOverlay.setAttribute("aria-hidden", "false");

  animateDestinoCardExpansion(sourceCard, item);
  if (showMap) {
    createDestinoDetailMap(item);
  } else if (destinoDetailMapInstance) {
    destinoDetailMapInstance.remove();
    destinoDetailMapInstance = null;
  }
}

function closeDestinoDetail() {
  if (!destinoDetailOverlay) return;
  destinoDetailOverlay.classList.remove("open");
  destinoDetailOverlay.setAttribute("aria-hidden", "true");
  if (destinoDetailMapInstance) {
    destinoDetailMapInstance.remove();
    destinoDetailMapInstance = null;
  }
}

function openDestinosPanel(modeKey = "destinos") {
  if (!destinosOverlay) return;
  configureOverlayMode(modeKey);
  destinosOverlay.classList.add("open");
  destinosOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("destinos-open");
  requestAnimationFrame(() => {
    updateOverlayPanelHeight();
    setTimeout(updateOverlayPanelHeight, 80);
  });
}

function closeDestinosPanel() {
  if (!destinosOverlay) return;
  closeDestinoDetail();
  destinosOverlay.classList.remove("open");
  destinosOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("destinos-open");
  if (destinosPanel) destinosPanel.style.height = "";
}

function setupDestinosExperience() {
  if (menuDestinos) {
    menuDestinos.addEventListener("click", (event) => {
      event.preventDefault();
      openDestinosPanel("destinos");
    });
  }

  if (menuGastronomia) {
    menuGastronomia.addEventListener("click", (event) => {
      event.preventDefault();
      openDestinosPanel("gastronomia");
    });
  }

  if (menuCultura) {
    menuCultura.addEventListener("click", (event) => {
      event.preventDefault();
      openDestinosPanel("cultura");
    });
  }

  destinosClose?.addEventListener("click", closeDestinosPanel);

  destinosTabs?.querySelectorAll(".destinos-tab").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      const tabKey = tabBtn.getAttribute("data-tab");
      if (!tabKey || tabKey === activeDestinosTab) return;
      setActiveDestinosTab(tabKey);
    });
  });

  destinosOverlay?.addEventListener("click", (event) => {
    if (event.target === destinosOverlay) {
      closeDestinosPanel();
    }
  });

  destinoDetailClose?.addEventListener("click", closeDestinoDetail);

  destinoDetailOverlay?.addEventListener("click", (event) => {
    if (event.target === destinoDetailOverlay) {
      closeDestinoDetail();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (destinoDetailOverlay?.classList.contains("open")) {
      closeDestinoDetail();
      return;
    }
    if (destinosOverlay?.classList.contains("open")) {
      closeDestinosPanel();
    }
  });

  window.addEventListener("resize", () => {
    if (destinosOverlay?.classList.contains("open")) {
      updateOverlayPanelHeight();
    }
  });
}

function applyStaticTranslations() {
  Object.entries(staticTranslations).forEach(([id, value]) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.textContent = pickLang(value);
  });

  const exploreLabels = document.querySelectorAll(".explore-label");
  exploreLabels.forEach((label) => {
    label.textContent = currentLanguage === "es" ? "Explorar" : "Explore";
  });

  const mapCenterBtn = document.getElementById("mapCenterBtn");
  if (mapCenterBtn) mapCenterBtn.textContent = currentLanguage === "es" ? "Centrar" : "Center";

  const detailAddressLabel = document.querySelector(".detail-address span");
  if (detailAddressLabel) detailAddressLabel.textContent = currentLanguage === "es" ? "Dirección" : "Address";

  const destinoAddressLabel = document.querySelector(".destino-detail-address span");
  if (destinoAddressLabel) destinoAddressLabel.textContent = currentLanguage === "es" ? "Dirección" : "Address";

  const langToggleBtn = document.getElementById("langToggle");
  if (langToggleBtn) {
    langToggleBtn.setAttribute("aria-label", currentLanguage === "es" ? "Cambiar idioma" : "Change language");
  }
}

function applyLanguage(lang) {
  currentLanguage = lang;
  if (langCurrentFlag) langCurrentFlag.textContent = lang === "es" ? "🇪🇸" : "🇺🇸";
  if (langCurrentLabel) langCurrentLabel.textContent = lang === "es" ? "ES" : "EN";

  applyStaticTranslations();

  setupExperienceSection(sectionData.monumentos);
  setupExperienceSection(sectionData.hoteles);

  if (detailOverlay?.classList.contains("open") && activeDetailSectionKey) {
    openDetailPanel(activeDetailSectionKey);
  }

  if (destinosOverlay?.classList.contains("open")) {
    configureOverlayMode(activeOverlayMode);
    if (destinoDetailOverlay?.classList.contains("open")) {
      closeDestinoDetail();
    }
  }
}

function setupLanguageSwitcher() {
  if (!langSwitcher || !langToggle || !langMenu) return;

  langToggle.addEventListener("click", () => {
    langSwitcher.classList.toggle("open");
  });

  langMenu.querySelectorAll("button[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLang = button.getAttribute("data-lang");
      if (!nextLang) return;
      applyLanguage(nextLang);
      langSwitcher.classList.remove("open");
    });
  });

  document.addEventListener("click", (event) => {
    if (!langSwitcher.contains(event.target)) {
      langSwitcher.classList.remove("open");
    }
  });
}

function setupLeafletMap() {
  const mapContainer = document.getElementById("map");
  const mapShell = document.querySelector(".map-shell");
  const centerBtn = document.getElementById("mapCenterBtn");
  if (!mapContainer || !mapShell || typeof window.L === "undefined") return;

  try {
    const defaultCoords = [4.3048, -74.8016];
    const defaultZoom = 13;
    const map = L.map(mapContainer, {
      zoomControl: true,
      attributionControl: true,
    }).setView(defaultCoords, defaultZoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    L.marker(defaultCoords).addTo(map);

    if (centerBtn) {
      centerBtn.addEventListener("click", () => {
        map.setView(defaultCoords, defaultZoom, { animate: true });
      });
    }

    mapShell.classList.add("map-loaded");
    setTimeout(() => map.invalidateSize(), 120);
  } catch (error) {
    // Si Leaflet falla, se mantiene automaticamente el fallback visual.
  }
}

setupHeroCarousel();
setupExperienceSection(sectionData.monumentos);
setupExperienceSection(sectionData.hoteles);
setupLeafletMap();
setupExplorePanel();
setupDestinosExperience();
setupLanguageSwitcher();
applyLanguage("es");
