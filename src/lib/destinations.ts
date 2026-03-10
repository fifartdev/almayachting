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
    image: "/images/destinations/mykonos.jpg",
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
    image: "/images/destinations/santorini.jpg",
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
    image: "/images/destinations/corfu.jpg",
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
    id: "lefkada",
    name: "Lefkada",
    region: "Ionian Islands",
    description:
      "Lefkada is the Ionian's best-kept secret — a mountainous island of rare natural beauty connected to the mainland by a narrow causeway, yet surrounded by waters that rival the Caribbean in their clarity and colour. The west coast is home to Porto Katsiki and Egremni, two of the most dramatic beaches in all of Greece: white pebbles tumbling into seas of impossible turquoise, backed by sheer white limestone cliffs. Sailing south from Lefkada, you enter the sheltered waters of the Lefkada channel and the protected Nidri strait, a cruising ground studded with small green islets — Meganisi, Skorpios, Kastos — each with its own hidden anchorage and taverna at the water's edge.",
    shortDescription:
      "Mountainous Ionian island with Caribbean-blue waters and dramatic white-cliff beaches.",
    image: "/images/destinations/lefkada.jpg",
    highlights: [
      "Porto Katsiki — one of Greece's finest beaches",
      "Protected Nidri strait and island-hopping anchorages",
      "Skorpios island — former Onassis private retreat",
      "Exceptional sailing winds for experienced crews",
    ],
    bestSeason: "May – October",
    distance: "185 nautical miles from Athens",
  },
  {
    id: "spetses",
    name: "Spetses",
    region: "Saronic Gulf",
    description:
      "Spetses is the most aristocratic island in the Saronic Gulf — a fragrant pine-covered island of elegant neoclassical mansions, horse-drawn carriages, and a sailing culture that runs deep in its blood. Cars are largely banned from the old town, lending the seafront a timeless quality that has made Spetses a favourite retreat for Athenian families and discerning international visitors for generations. The island's position at the mouth of the Argolic Gulf makes it the ideal base for exploring the broader Saronic and Argolic chains: Hydra, Dokos, Ermioni, and the ancient ruins of Epidaurus are all within a half-day's sail.",
    shortDescription:
      "Aristocratic pine-covered island with neoclassical mansions and a proud sailing heritage.",
    image: "/images/destinations/spetses.jpg",
    highlights: [
      "Car-free old harbour with horse-drawn carriages",
      "Elegant neoclassical mansions and pine-lined lanes",
      "Gateway to the Argolic Gulf and ancient Epidaurus",
      "Just 55 nautical miles from Athens",
    ],
    bestSeason: "April – October",
    distance: "55 nautical miles from Athens",
  },
  {
    id: "paros",
    name: "Paros",
    region: "Cyclades",
    description:
      "Paros occupies a special place in the hearts of those who have discovered her — close enough to Mykonos for comparison, yet retaining an authenticity and unhurried pace that makes her a favourite among discerning travellers. The island is famed for its luminous white marble, its medieval Venetian villages, and the picture-perfect harbour of Naoussa where fishing boats rock gently beside fashionable restaurants. Paros is also a world-class windsurfing destination, but for yacht guests, the island's greatest gift is its proximity to the unspoiled islets of Antiparos and Despotiko.",
    shortDescription:
      "Authentic Cycladic beauty with marble quarries and Naoussa's charming harbour.",
    image: "/images/destinations/paros.jpg",
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
    image: "/images/destinations/zakynthos.jpg",
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
    image: "/images/destinations/hydra.jpg",
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
