// Populates the database with sample portfolio projects.
// Run with: npm run seed --prefix server   (or `npm run seed` from repo root)
//
// Replace the imageUrl values with photos of Nivara's own projects whenever
// they're ready \u2014 these are placeholder stock photos so the site has
// something to show out of the box.

require("dotenv").config();
const connectDB = require("../config/db");
const Portfolio = require("../models/Portfolio");

const items = [
  {
    title: "Quiet Living, Ashoka Nagar",
    category: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    description: "A softly lit reading corner built around restraint and texture.",
    order: 1,
  },
  {
    title: "The Fireplace Wing",
    category: "Residential",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "A twin-sofa living room anchored by a linear fireplace.",
    order: 2,
  },
  {
    title: "Jubilee Hills Residence",
    category: "Residential",
    imageUrl:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
    description: "Warm brass accents against a moody, layered bedroom palette.",
    order: 3,
  },
  {
    title: "Banjara Hills Penthouse",
    category: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    description: "Open-plan kitchen designed for daylight and easy gathering.",
    order: 4,
  },
  {
    title: "Atrium Co-working Studio",
    category: "Commercial",
    imageUrl:
      "https://images.unsplash.com/photo-1600508773949-53372e9d0a44?auto=format&fit=crop&w=1200&q=80",
    description: "A hospitality-inspired workspace for a boutique tech firm.",
    order: 5,
  },
  {
    title: "The Amber Boutique",
    category: "Commercial",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Retail interiors that let the merchandise take center stage.",
    order: 6,
  },
  {
    title: "Lakeview Family Home",
    category: "Residential",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    description: "A family living room planned for both quiet nights and gatherings.",
    order: 7,
  },
  {
    title: "Material Study \u2014 Suite 4B",
    category: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    description: "Curated textures and finishes for a considered guest suite.",
    order: 8,
  },
  {
    title: "The Courtyard Office",
    category: "Commercial",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description: "A calm, plant-filled office designed around natural light.",
    order: 9,
  },
];

async function seed() {
  await connectDB();
  await Portfolio.deleteMany({});
  await Portfolio.insertMany(items);
  console.log(`Seeded ${items.length} portfolio items.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
