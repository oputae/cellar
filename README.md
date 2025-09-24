# 🍷 Wine Tracker

A production-ready Next.js application for tracking and exploring wine collections with interactive mapping, detailed tasting notes, and comprehensive wine data management.

## Features

- **Interactive Map**: Leaflet + OpenStreetMap with GeoJSON markers and clustering
- **Wine Database**: Comprehensive JSON schema with tasting notes and metadata
- **Static Site Generation**: Fast loading with SSG via `getStaticProps` and `getStaticPaths`
- **Responsive Design**: Mobile-first design with TailwindCSS and hamburger navigation
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Collection Management**: Search, filter, and organize wines by type, region, and favorites
- **Analytics Dashboard**: Comprehensive statistics and insights about your collection

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS with custom wine-themed design system
- **Mapping**: Leaflet with react-leaflet and marker clustering
- **Icons**: Heroicons
- **Deployment**: Vercel-ready with optimized build

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Data Structure

### JSON Schema Reference

The wine data follows a comprehensive JSON schema located at `/data/wine.schema.json`. Key fields include:

```json
{
  "id": "unique-wine-identifier",
  "name": "Wine Name",
  "vintage": 2020,
  "type": "red|white|rosé|sparkling|dessert|fortified",
  "region": "Wine Region",
  "country": "Country of Origin",
  "winery": "Producer Name",
  "coordinates": {
    "lat": 45.0433,
    "lng": -0.6742
  },
  "notes": "Tasting notes and observations",
  "aromas": ["blackberry", "cassis", "tobacco"],
  "varietals": ["Cabernet Sauvignon", "Merlot"],
  "alcohol": 13.5,
  "body": "full",
  "acidity": "medium",
  "favorite": true,
  "status": "cellar",
  "tags": ["bordeaux", "collectible"],
  "details": "Freja Cellars is a family-owned winery in Oregon's Willamette Valley, known for its sustainable practices and focus on Pinot Noir. The region's cool climate and volcanic soils produce elegant, expressive wines."
}
```

### Current Wine Collection

The application currently includes 19 wines from various regions:

1. **Freja Cellars Pinot Noir** (2018) - Willamette Valley, Oregon, USA
2. **Domaine Berthoumieu Charles de Batz** (2017) - Madiran, Southwest France
3. **Bow & Arrow Time Machine Blanc** (2024) - Willamette Valley, Oregon, USA
4. **Bastide de la Ciselette Vin de Pays du Var Rosé** (2022) - Provence, France
5. **Murgo Etna Rosato** (2022) - Etna DOC, Sicily, Italy
6. **Bodegas Ostatu Rioja Rosado** (2022) - Rioja DOCa, Spain
7. **Ernest Vineyards "Eugenia" Bruella Ranch Lodi Cinsault Rosé** (2022) - Lodi AVA, California, USA
8. **Château Aney Haut-Médoc Cru Bourgeois** (2015) - Haut-Médoc, France
9. **Château de Landiras Graves Rouge** (2018) - Graves, France
10. **Château Lamoliere Fronsac** (2019) - Fronsac, France
11. **Château La Vaisinerie Puisseguin Saint-Émilion** (2019) - Puisseguin Saint-Émilion, France
12. **Angelo Negro Langhe Nebbiolo "Angelin"** (2022) - Langhe, Italy
13. **Renzo Castella Langhe Nebbiolo** (2022) - Langhe, Italy
14. **De Forville Nebbiolo d'Alba "San Rocco"** (2021) - Nebbiolo d'Alba, Italy
15. **Tiziano Mazzoni Colline Novaresi Nebbiolo "del Monteregio"** (2021) - Colline Novaresi, Italy
16. **Copper Six Alisos Canyon Gamay** (2023) - Alisos Canyon AVA, California, USA
17. **Leah Jorgensen Gamay Le Coeur de Tour Rain – Havlin Vineyard** (2022) - Rogue Valley, Oregon, USA
18. **Domaine du Gueret Moulin-à-Vent** (2023) - Moulin-à-Vent, France
19. **Domaine des Gryphées Balmes Vieilles Vignes** (2023) - Beaujolais-Villages, France

### Sample JSON Entry

```json
{
  "id": "domaine-berthoumieu-charles-de-batz-2017",
  "name": "Domaine Berthoumieu Charles de Batz",
  "vintage": 2017,
  "type": "red",
  "region": "Madiran",
  "country": "France",
  "winery": "Domaine Berthoumieu",
  "coordinates": {
    "lat": 43.549639,
    "lng": -0.057621
  },
  "notes": "Opaque purple-ruby with a narrow garnet rim. The nose unfurls dense black fruits (blackberry, cassis, black cherry) woven with violet, licorice, cocoa, cedar and tobacco, plus a graphite/mineral edge. Full-bodied and powerful on the palate; the core is packed with ripe black fruits and dark chocolate, framed by abundant, fine-grained tannins typical of Tannat. Acidity is medium-high, bringing lift to the richness; oak is present but well-integrated, adding spice and toast without dominating. Savory undertones of dried herbs and a cool menthol/eucalyptus note emerge with air. The finish is long, vigorous and drying, with fruit, cocoa and cedar echoing for 30+ seconds. Decant 2–3 hours if drinking now; built for medium to long-term aging.",
  "aromas": ["blackberry", "cassis", "black cherry", "plum", "violet", "licorice", "cocoa", "tobacco leaf", "cedar", "graphite", "dried thyme", "eucalyptus"],
  "varietals": ["Tannat", "Cabernet Sauvignon"],
  "alcohol": 14.5,
  "body": "full",
  "acidity": "medium-high",
  "favorite": false,
  "status": "cellar",
  "tags": ["madiran", "southwest-france", "tannat", "old-vines", "oak-aged", "age-worthy", "collectible", "hearty-foods"]
}
```

## LLM Prompt Template

Use this template to generate wine entries with AI assistance:

```
You are a wine expert. Given the wine name and vintage, create a comprehensive wine entry following this JSON schema:

[PASTE THE ENTIRE JSON SCHEMA FROM /data/wine.schema.json]

Wine Name: [WINE_NAME]
Vintage: [VINTAGE_YEAR]

Generate a complete wine entry with realistic data. Include:
- Geographic coordinates for the wine region
- Detailed tasting notes with specific aromas
- Appropriate varietals for the region
- Wine characteristics (tannins, body, acidity)
- Relevant tags for categorization

Output ONLY valid JSON that conforms to the schema. Do not include any explanatory text.
```

### Example LLM Usage

```javascript
// Example prompt for Château Margaux 2015
const prompt = `
You are a wine expert. Given the wine name and vintage, create a comprehensive wine entry following this JSON schema:

[SCHEMA_CONTENT]

Wine Name: Château Margaux
Vintage: 2015

Generate a complete wine entry with realistic data...
`;

// Expected output: Valid JSON conforming to the schema
```

## Workflow

### 1. Coordinate Validation

Use OpenStreetMap Nominatim API for coordinate validation:

```bash
# Example: Validate coordinates for Bordeaux region
curl "https://nominatim.openstreetmap.org/search?q=Bordeaux,France&format=json&limit=1"
```

**Best Practices:**
- Always validate coordinates before adding to database
- Use region-level coordinates for consistency
- Store coordinates with appropriate precision (4-6 decimal places)
- Implement coordinate bounds checking (-90 to 90 lat, -180 to 180 lng)

### 2. Image Ingestion Pipeline

```bash
# Image processing workflow
1. Capture wine bottle photos (recommended: 800x800px, JPG format)
2. Optimize images for web (compress, resize if needed)
3. Name files using wine ID: /public/images/[wine-id].jpg
4. Add alt text descriptions for accessibility
5. Implement fallback for missing images
```

**Image Guidelines:**
- Format: JPG with 80-85% quality
- Dimensions: 800x800px minimum
- File naming: Use wine ID (e.g., `chateau-margaux-2015.jpg`)
- Alt text: Include wine name, vintage, and region

### 3. Version Control Best Practices

```bash
# Git workflow for wine data
git add data/wines.json
git commit -m "Add Château Margaux 2015 to wine collection

- Add comprehensive tasting notes
- Include geographic coordinates for Margaux region
- Tag as collectible and first-growth"

# Branch strategy
main          # Production data
develop       # Development and testing
feature/*     # New wine additions
hotfix/*      # Data corrections
```

**Data Management:**
- Commit wine additions individually with descriptive messages
- Use semantic versioning for schema changes
- Maintain data integrity with validation scripts
- Backup wine images separately (consider CDN for production)

### 4. Quality Assurance

```bash
# Validation scripts
npm run validate-schema    # Validate JSON against schema
npm run check-coordinates  # Verify coordinate validity
npm run optimize-images    # Process and optimize images
npm run build             # Test build process
```

## Project Structure

```
wine-tracker/
├── components/           # React components
│   ├── WineMap.tsx      # Interactive map component
│   └── WineFilter.tsx   # Filter UI component
├── data/                # Wine data and schema
│   ├── wine.schema.json # JSON schema definition
│   └── wines.json       # Wine collection data
├── pages/               # Next.js pages
│   ├── index.tsx        # Home page with map
│   ├── [id].tsx         # Wine detail pages
│   └── _app.tsx         # App wrapper
├── public/              # Static assets
│   └── images/          # Wine bottle photos
│       └── [id].jpg     # Individual wine images
├── styles/              # CSS and styling
│   └── globals.css      # Global styles with TailwindCSS
├── types/               # TypeScript type definitions
│   └── wine.ts          # Wine data types
├── utils/               # Utility functions
│   └── wine.ts          # Wine data processing
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # TailwindCSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## API Endpoints

The application uses static generation, but here are the data access patterns:

```typescript
// Get all wines
const wines = getAllWines();

// Get wine by ID
const wine = getWineById('chateau-margaux-2015');

// Filter wines
const filteredWines = filterWines(wines, {
  type: 'red',
  favorite: true
});
```

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npm run build
vercel --prod
```

### Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Build Optimization

- Images are optimized with Next.js Image component
- CSS is purged and minified
- JavaScript is tree-shaken and code-split
- Static pages are pre-rendered for fast loading

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-wine`)
3. Add wine data following the schema
4. Include wine bottle image in `/public/images/`
5. Test the build process
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues:
- Create an issue on GitHub
- Check the documentation in `/data/wine.schema.json`
- Review the sample data in `/data/wines.json`

---

**Happy wine tracking! 🍷** 

---

## Recent Updates

### UI/UX Improvements
- **Mobile Navigation**: Added hamburger menu for mobile devices with smooth transitions
- **Card Alignment**: Fixed wine card layout with consistent "View Details" button alignment
- **Collection Stats**: Moved statistics above search bar for better user flow
- **Responsive Design**: Enhanced mobile experience across all pages

### Wine Collection Growth
- Added comprehensive wine entries with detailed tasting notes
- Implemented proper image placeholders for all wines
- Enhanced wine categorization with detailed tags and metadata

## Getting Started

The application comes with a curated collection of 19 wines from various regions. To add your own wines:

1. **Use the LLM Prompt Template** (see below) to generate wine entries
2. **Add wine images** to `/public/images/` with the naming convention `[wine-id].jpg`
3. **Update the wine data** in `/data/wines.json`
4. **Test the build process** with `npm run build`

## LLM Prompt Template

Use this template to generate wine entries with AI assistance: 