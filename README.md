# 🍷 Wine Tracker

A production-ready Next.js application for tracking and exploring wine collections with interactive mapping, detailed tasting notes, and comprehensive wine data management.

## Features

- **Interactive Map**: Leaflet + OpenStreetMap with GeoJSON markers and clustering
- **Wine Database**: Comprehensive JSON schema with tasting notes and metadata
- **Static Site Generation**: Fast loading with SSG via `getStaticProps` and `getStaticPaths`
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

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

### Sample JSON Entry

```json
{
  "id": "chateau-margaux-2015",
  "name": "Château Margaux",
  "vintage": 2015,
  "type": "red",
  "region": "Margaux",
  "country": "France",
  "winery": "Château Margaux",
  "coordinates": {
    "lat": 45.0433,
    "lng": -0.6742
  },
  "notes": "Exceptional vintage with perfect balance. Deep ruby color with complex aromas of black fruits, tobacco, and cedar. Silky tannins and long finish.",
  "aromas": ["blackberry", "cassis", "tobacco", "cedar", "vanilla", "violets"],
  "varietals": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"],
  "alcohol": 13.5,
  "body": "full",
  "acidity": "medium",
  "favorite": true,
  "status": "cellar",
  "tags": ["bordeaux", "first-growth", "collectible", "special-occasion"]
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

## Example: Placeholder Wines

Here's a minimal set of sample wines you can use. Add this to your `data/wines.json` file:

```json
[
  {
    "id": "placeholder-bordeaux",
    "name": "Placeholder Bordeaux",
    "vintage": 2020,
    "type": "red",
    "region": "Bordeaux",
    "country": "France",
    "winery": "Demo Winery",
    "coordinates": { "lat": 44.8378, "lng": -0.5792 },
    "notes": "A classic Bordeaux with notes of plum and cedar.",
    "aromas": ["plum", "cedar"],
    "varietals": ["Merlot", "Cabernet Sauvignon"],
    "alcohol": 13.5,
    "body": "medium",
    "acidity": "medium",
    "favorite": false,
    "status": "consumed",
    "tags": ["placeholder", "bordeaux"]
  },
  {
    "id": "placeholder-napa",
    "name": "Placeholder Napa",
    "vintage": 2018,
    "type": "red",
    "region": "Napa Valley",
    "country": "USA",
    "winery": "Demo Cellars",
    "coordinates": { "lat": 38.5025, "lng": -122.2654 },
    "notes": "Rich and bold with blackberry and vanilla.",
    "aromas": ["blackberry", "vanilla"],
    "varietals": ["Cabernet Sauvignon"],
    "alcohol": 14.2,
    "body": "full",
    "acidity": "medium",
    "favorite": true,
    "status": "cellar",
    "tags": ["placeholder", "napa"]
  }
]
```

---

## What to do

1. **Copy the above JSON** and replace the contents of your `data/wines.json` file with it.
2. **Restart your dev server** (`npm run dev`).
3. **Reload the map page**. You should see two markers: one in France (Bordeaux) and one in California (Napa).

---

If you still don't see any markers, let me know and we'll troubleshoot further (for example, checking the data loading logic or console errors). If you want me to apply this change for you, just say so! 