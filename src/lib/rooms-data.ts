import roomImg from "@/assets/room-interior.jpg";
import cottageImg from "@/assets/cottage-river.jpg";
import tentImg from "@/assets/tent-experience.jpg";
import villageImg from "@/assets/village-life.jpg";
import boatImg from "@/assets/boat-tour.jpg";

export type Room = {
  slug: string;
  name: string;
  img: string;
  gallery: string[];
  occ: string;
  bath: string;
  ac: string;
  size: string;
  view: string;
  price: number;
  short: string;
  desc: string;
  long: string;
  amenities: string[];
};

export const ROOMS: Room[] = [
  {
    slug: "river-view-friends",
    name: "River View Friends House",
    img: cottageImg,
    gallery: [cottageImg, roomImg, villageImg],
    occ: "Up to 4 guests",
    bath: "Private bath",
    ac: "AC available",
    size: "42 m²",
    view: "Direct river view",
    price: 5500,
    short: "Wake to mist on the water with a private deck overlooking the channel.",
    desc: "Wake to mist on the water. Wooden floors, mosquito-net beds, and a private deck overlooking the channel.",
    long: "Designed for groups of friends, the River View Friends House offers two queen beds, a sitting nook, and a wide private veranda where you can sip morning tea above the channel. Reclaimed teak floors, hand-loomed cotton linens, and a brass-fitted bathroom complete the stay.",
    amenities: ["King + queen beds", "Hot water shower", "Private veranda", "Mosquito nets", "Reading nook", "Tea & coffee station"],
  },
  {
    slug: "forest-view-friends",
    name: "Forest View Friends House",
    img: villageImg,
    gallery: [villageImg, roomImg, cottageImg],
    occ: "Up to 4 guests",
    bath: "Private bath",
    ac: "Non-AC, river breeze",
    size: "40 m²",
    view: "Mangrove canopy",
    price: 4500,
    short: "Tucked into mangrove canopy — quiet, shaded, and full of birdsong.",
    desc: "Tucked into mangrove canopy. Quiet, shaded, and full of birdsong from dawn till dusk.",
    long: "Set deeper into the property under a canopy of native trees, this cottage stays naturally cool through the day. A wraparound veranda invites slow afternoons with a book, and the night belongs to crickets and owls.",
    amenities: ["Two queen beds", "Hot water shower", "Wraparound veranda", "Ceiling fans", "Hammock", "Birdwatching spot"],
  },
  {
    slug: "eco-wooden-cottage",
    name: "Eco Wooden Cottage",
    img: roomImg,
    gallery: [roomImg, cottageImg, tentImg],
    occ: "2 guests",
    bath: "Private bath",
    ac: "AC",
    size: "36 m²",
    view: "River-facing",
    price: 6800,
    short: "Our signature stay — reclaimed teak, four-poster bed, full-height river windows.",
    desc: "Our signature stay. Reclaimed teak, four-poster bed, and full-height windows onto the river.",
    long: "The Eco Wooden Cottage is the soul of Pealy. A handcrafted four-poster bed faces full-height windows that open onto the river. The freestanding copper tub, organic toiletries, and curated reading shelf make it our most romantic stay.",
    amenities: ["Four-poster king bed", "Copper soaking tub", "Rain shower", "AC + ceiling fan", "Mini-bar", "River-facing daybed"],
  },
  {
    slug: "riverside-tent",
    name: "Riverside Tent Stay",
    img: tentImg,
    gallery: [tentImg, cottageImg, boatImg],
    occ: "2 guests",
    bath: "Shared bath",
    ac: "Non-AC, fan",
    size: "22 m²",
    view: "Tent on river deck",
    price: 3500,
    short: "Glamping under canvas with string lights and a wooden river deck.",
    desc: "Glamping under canvas with string lights and a wooden deck. The closest you can sleep to the river.",
    long: "Our most adventurous stay. A canvas tent on a raised wooden deck just metres from the water. Hear the tide come in, watch the stars through the open flap, sleep under hand-loomed quilts.",
    amenities: ["Queen bed on deck", "Shared eco-bath nearby", "Lantern lighting", "Mosquito netting", "Outdoor lounge", "Tea station"],
  },
  {
    slug: "group-house",
    name: "Group Accommodation",
    img: boatImg,
    gallery: [boatImg, villageImg, roomImg],
    occ: "Up to 12 guests",
    bath: "Common bath",
    ac: "Non-AC",
    size: "120 m²",
    view: "Communal garden",
    price: 9500,
    short: "Communal living with a large shared veranda — perfect for retreats.",
    desc: "Perfect for friends and corporate retreats. Communal living with a large shared veranda.",
    long: "Built for friends, families, and small retreats. Multiple bedrooms open onto a long shared veranda; a central living room hosts evenings of music, food, and conversation. Ideal for 8–12 guests travelling together.",
    amenities: ["6 bedrooms", "2 shared baths", "Shared lounge", "Long veranda", "Group dining table", "Bonfire pit"],
  },
];

export const PACKAGES = [
  { id: "friends", name: "Friends Package", base: 3500, blurb: "2 nights · group rooms · all meals · half-day boat tour" },
  { id: "couple", name: "Couple Package", base: 5800, blurb: "2 nights · eco cottage · private dinner · sunset cruise" },
  { id: "family", name: "Family Package", base: 12500, blurb: "3 nights · 2 cottages · full-day forest tour · cultural evening" },
  { id: "tent", name: "Tent Adventure", base: 2800, blurb: "1 night · river-deck tent · BBQ dinner · morning kayak" },
  { id: "cultural", name: "Cultural Retreat", base: 9800, blurb: "3 nights · workshops · folk performances · village walk" },
] as const;

export const ADDONS = [
  { id: "boat-half", name: "Half-day Boat Tour", price: 2500 },
  { id: "boat-full", name: "Full-day Forest Tour", price: 4800 },
  { id: "bbq", name: "Riverside BBQ Night", price: 1200 },
  { id: "cultural", name: "Private Cultural Evening", price: 3500 },
  { id: "transfer", name: "Pickup from Mongla", price: 1500 },
  { id: "photographer", name: "Personal Photographer", price: 5500 },
];
