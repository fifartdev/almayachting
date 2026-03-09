export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  shortDescription: string;
  image: string;
  highlights: string[];
  bestSeason: string;
  distance: string; // from Athens
}

const UNSPLASH_BASE = "https://images.unsplash.com";

export const destinations: Destination[] = [
  {
    id: "mykonos",
    name: "Mykonos",
    region: "Cyclades",
    description:
      "Mykonos is Greece's most glamorous island — a dazzling white labyrinth of narrow alleys, iconic windmills, and a cosmopolitan energy that has attracted the world's creative class for decades. By day, her crystalline waters invite swimming and snorkeling from your private deck; by evening, the island transforms into a sophisticated playground of fine dining and celebrated nightlife. Little Venice, with its houses hanging dramatically over the sea, is best viewed from the cockpit of your yacht at sunset, glass in hand.",
    shortDescription:
      "Greece's most glamorous island with iconic windmills and crystalline waters.",
    image: `${UNSPLASH_BASE}/photo-1533105079780-92b9be482077?w=1920&q=80`,
    highlights: [
      "Iconic windmills and Little Venice",
      "World-class dining and nightlife",
      "Stunning beaches including Super Paradise",
      "Easy day sail to Delos ancient ruins",
    ],
    bestSeason: "June – September",
    distance: "130 nautical miles from Athens",
  },
  {
    id: "santorini",
    name: "Santorini",
    region: "Cyclades",
    description:
      "No destination in the Mediterranean stirs the imagination quite like Santorini. The remnants of an ancient volcanic caldera create one of the world's most dramatic seascapes — sheer cliff faces dropping hundreds of metres to the sea, crowned by the world-famous white and blue villages of Oia and Fira. Arriving by yacht into the caldera is a genuinely breathtaking experience, the scale of the cliffs and the clarity of the light creating a sense of arrival that no airport transfer can rival. Sail here for the sunsets, stay for the wine, the cuisine, and the archaeology.",
    shortDescription:
      "Dramatic volcanic caldera crowned by iconic white-and-blue villages.",
    image: `${UNSPLASH_BASE}/photo-1555993539-1732b0258235?w=1920&q=80`,
    highlights: [
      "Caldera anchorage with cliff-top views",
      "Legendary Oia sunset experience",
      "Volcanic black sand beaches",
      "World-renowned local wines and cuisine",
    ],
    bestSeason: "May – October",
    distance: "120 nautical miles from Athens",
  },
  {
    id: "corfu",
    name: "Corfu",
    region: "Ionian Islands",
    description:
      "Corfu is the emerald jewel of the Ionian Sea — an island of lush green hills, Venetian fortresses, and a cuisine that reflects centuries of Italian, French, and British influence. The old town of Corfu is a UNESCO World Heritage Site, its narrow streets and elegant architecture a testament to the island's extraordinary history. Sailing the Ionian is a gentler experience than the Aegean — lighter winds, calmer seas, and a succession of breathtaking anchorages in turquoise bays where the water is so clear you can count the pebbles on the seabed.",
    shortDescription:
      "The emerald jewel of the Ionian with Venetian old town and lush green hills.",
    image: `${UNSPLASH_BASE}/photo-1530739498450-fe0c3e1a16d2?w=1920&q=80`,
    highlights: [
      "UNESCO World Heritage old town",
      "Venetian fortresses and architecture",
      "Emerald green hills and secluded bays",
      "Gentler Ionian sailing conditions",
    ],
    bestSeason: "May – September",
    distance: "175 nautical miles from Athens",
  },
  {
    id: "rhodes",
    name: "Rhodes",
    region: "Dodecanese",
    description:
      "Rhodes stands as one of the great crossroads of Mediterranean civilisation — a sun-drenched island of Crusader castles, ancient acropoli, and beaches that stretch for miles under the relentless Aegean sun. The medieval old town, entirely enclosed within its original walls, is a living museum where knights once walked. By contrast, the beaches of Faliraki and Lindos offer the full spectrum of Aegean holiday pleasure. Sailing the Dodecanese from a base in Rhodes opens up a chain of islands — from the volcanic Nisyros to the serene Symi — each with its own distinct character.",
    shortDescription:
      "Sun-drenched island with medieval Crusader walls and ancient history.",
    image: `${UNSPLASH_BASE}/photo-1564596489416-83e32fc14c55?w=1920&q=80`,
    highlights: [
      "Medieval old town — UNESCO World Heritage",
      "Ancient Acropolis of Lindos",
      "Gateway to the Dodecanese island chain",
      "Renowned for sunshine and warm waters",
    ],
    bestSeason: "April – November",
    distance: "230 nautical miles from Athens",
  },
  {
    id: "crete",
    name: "Crete",
    region: "Southern Aegean",
    description:
      "Crete is Greece's largest and most varied island — a place of extraordinary contrasts where snow-capped mountains meet palm-fringed beaches, and Minoan palaces stand a short drive from vibrant harbour towns. Sailing the northern coast of Crete reveals a succession of natural harbours and inviting tavernas; rounding the wild cape of western Crete and anchoring in the turquoise waters of Balos lagoon is one of the great sailing experiences in the Mediterranean. Chania, with its Venetian harbour and lighthouse, is a particularly beautiful port of call.",
    shortDescription:
      "Greece's largest island — mountains, Minoan palaces, and turquoise lagoons.",
    image: `${UNSPLASH_BASE}/photo-1570077188670-e3a8d69ac5ff?w=1920&q=80`,
    highlights: [
      "Venetian harbour of Chania",
      "Balos lagoon — one of Greece's finest anchorages",
      "Minoan palace at Knossos",
      "Diverse landscape from mountains to coast",
    ],
    bestSeason: "May – October",
    distance: "150 nautical miles from Athens",
  },
  {
    id: "paros",
    name: "Paros",
    region: "Cyclades",
    description:
      "Paros occupies a special place in the hearts of those who have discovered her — close enough to Mykonos for comparison, yet retaining an authenticity and unhurried pace that makes her a favourite among discerning travellers. The island is famed for its luminous white marble, its medieval Venetian villages, and the picture-perfect harbour of Naoussa where fishing boats rock gently beside fashionable restaurants. Paros is also a world-class windsurfing destination, but for yacht guests, the island's greatest gift is its proximity to the unspoiled islets of Antiparos and Despotiko.",
    shortDescription:
      "Authentic Cycladic beauty with marble quarries and Naoussa's charming harbour.",
    image: `${UNSPLASH_BASE}/photo-1533105079780-92b9be482077?w=1920&q=80`,
    highlights: [
      "Picturesque Naoussa harbour",
      "Day trips to uninhabited Despotiko island",
      "Local marble and traditional villages",
      "Excellent windsurfing conditions at Golden Beach",
    ],
    bestSeason: "June – September",
    distance: "95 nautical miles from Athens",
  },
  {
    id: "zakynthos",
    name: "Zakynthos",
    region: "Ionian Islands",
    description:
      "Zakynthos — known to Italians as Zante, 'the flower of the Levant' — is an island of extraordinary natural drama. The famous Navagio Beach (Shipwreck Beach), accessible only by sea, is one of the most photographed places on Earth: a pristine crescent of white pebbles enclosed by towering limestone cliffs, with the rusting hull of a smuggler's ship at its centre. The Blue Caves, carved by centuries of wave action into the northern cliffs, glow with an otherworldly light in the afternoon sun. Loggerhead sea turtles nest on the southern beaches, making a late-night anchorage here a privileged wildlife encounter.",
    shortDescription:
      "Home to the legendary Shipwreck Beach and the magical Blue Caves.",
    image: `${UNSPLASH_BASE}/photo-1555993539-1732b0258235?w=1920&q=80`,
    highlights: [
      "Iconic Navagio Shipwreck Beach",
      "Blue Caves sea kayaking and exploration",
      "Loggerhead turtle nesting beaches",
      "Verdant hills and Venetian heritage",
    ],
    bestSeason: "May – September",
    distance: "190 nautical miles from Athens",
  },
  {
    id: "hydra",
    name: "Hydra",
    region: "Saronic Gulf",
    description:
      "Hydra is the most singular island in all of Greece. Motor vehicles are banned here — the only transport is by foot, donkey, or boat — and the result is an island of perfect, timeless tranquility. The horseshoe harbour, ringed by grand 18th-century stone mansions built by shipping merchants, is one of the most beautiful in the Aegean. Artists, writers, and musicians have found sanctuary here for generations, drawn by the quality of the light, the silence, and the sense that time moves at a different pace. As the closest jewel in the Saronic chain to Athens, Hydra is the perfect first or last night of any Greek charter.",
    shortDescription:
      "The car-free island of artists and stone mansions — closest gem to Athens.",
    image: `${UNSPLASH_BASE}/photo-1533105079780-92b9be482077?w=1920&q=80`,
    highlights: [
      "No motor vehicles — total tranquility",
      "Elegant 18th-century stone mansions",
      "Artist and literary heritage",
      "Just 40 nautical miles from Athens",
    ],
    bestSeason: "April – October",
    distance: "40 nautical miles from Athens",
  },
];
