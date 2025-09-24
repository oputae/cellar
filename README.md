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

The application currently includes 55 wines from various regions:

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
20. **Tasi Prosecco DOC** (2023) - Prosecco DOC, Italy
21. **Venturini Valpolicella Classico** (2023) - Valpolicella Classico, Italy
22. **Fasoli Gino Bardolino "La Corte del Pozzo"** (2022) - Bardolino, Italy
23. **Corte Mainente Soave Classico "Tenda"** (2023) - Soave Classico, Italy
24. **Domaine Lafond Lirac Blanc "Roc Epine"** (2021) - Lirac, France
25. **Domaine Gavoty Côtes de Provence Blanc "Grand Classique"** (2021) - Côtes de Provence, France
26. **Domaine Ray-Jane IGP du Var Blanc** (2022) - IGP du Var, France
27. **Moulin de Gassac Picpoul de Pinet** (2022) - Picpoul de Pinet, France
28. **Yamhill Valley Vineyards Willamette Valley Estate Pinot Noir** (2022) - Willamette Valley, Oregon, USA
29. **Salem Wine Co. Eola-Amity Hills Chardonnay** (2021) - Eola-Amity Hills, Oregon, USA
30. **Simon di Brazzan Venezia Giulia Cabernet Franc** (2021) - Venezia Giulia IGT, Italy
31. **Château Jeandebout Bordeaux Rouge "Belle Nature"** (2020) - Bordeaux, France
32. **Vignoble Musset-Roullier Anjou Rouge "Les Neuf Vingt"** (2021) - Anjou, France
33. **Fanatic Wine Co. Clarksburg Cabernet Franc** (2021) - Clarksburg AVA, California, USA
34. **Domaine Vico Corse Rouge "Forca di Pero"** (2022) - Corse, France
35. **I Garagisti di Sorgono Mandrolisai Rosso "Garage"** (2023) - Mandrolisai, Italy
36. **Douloufakis PGI Crete Vidiano** (2023) - Crete PGI, Greece
37. **Caravaglio IGP Salina Bianco** (2023) - Salina IGP, Italy
38. **Clos du Caillou Côtes du Rhône "Cuvée Unique" Vieilles Vignes** (2021) - Côtes du Rhône, France
39. **Mas des Capitelles Faugères "Vieilles Vignes"** (2020) - Faugères, France
40. **La Mozza Maremma Toscana Cabernet Sauvignon "I Perazzi"** (2021) - Maremma Toscana, Italy
41. **Cantina Tramin Alto Adige Pinot Nero** (2022) - Alto Adige, Italy
42. **De Forville Piemonte Chardonnay** (2022) - Piemonte, Italy
43. **Weingut Niklas Alto Adige Sauvignon** (2022) - Alto Adige, Italy
44. **Glatzer Carnuntum DAC Blaufränkisch** (2021) - Carnuntum, Austria
45. **Geyerhof Kremstal Zweigelt "StockWerk"** (2020) - Kremstal, Austria
46. **Weingut Zahel Wiener Gemischter Satz** (2022) - Wiener Gemischter Satz, Austria
47. **Philipp Bründlmayer Grüner Veltliner** (2022) - Kremstal, Austria

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

Use this comprehensive template to generate wine entries with AI assistance:

```
You are a wine expert and sommelier. Given a wine name and vintage, create a detailed wine entry following this exact JSON schema:

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Wine Entry Schema",
  "description": "Schema for wine tracking entries with geographic and tasting data",
  "type": "object",
  "required": ["id", "name", "vintage", "type", "region", "coordinates"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9-_]+$",
      "description": "Unique identifier for the wine entry"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200,
      "description": "Name of the wine"
    },
    "vintage": {
      "type": "integer",
      "minimum": 1900,
      "maximum": 2030,
      "description": "Vintage year of the wine"
    },
    "type": {
      "type": "string",
      "enum": ["red", "white", "rosé", "sparkling", "dessert", "fortified"],
      "description": "Type of wine"
    },
    "region": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "description": "Wine region or appellation"
    },
    "country": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50,
      "description": "Country of origin"
    },
    "winery": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "description": "Winery or producer name"
    },
    "coordinates": {
      "type": "object",
      "required": ["lat", "lng"],
      "properties": {
        "lat": {
          "type": "number",
          "minimum": -90,
          "maximum": 90,
          "description": "Latitude coordinate"
        },
        "lng": {
          "type": "number",
          "minimum": -180,
          "maximum": 180,
          "description": "Longitude coordinate"
        }
      },
      "additionalProperties": false
    },
    "notes": {
      "type": "string",
      "maxLength": 2000,
      "description": "Tasting notes or personal observations"
    },
    "aromas": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "maxItems": 20,
      "description": "Array of detected aromas"
    },
    "varietals": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "maxItems": 10,
      "description": "Grape varietals used"
    },
    "alcohol": {
      "type": "number",
      "minimum": 0,
      "maximum": 25,
      "description": "Alcohol percentage"
    },
    "body": {
      "type": "string",
      "enum": ["light", "medium-light", "medium", "medium-full", "full"],
      "description": "Wine body"
    },
    "acidity": {
      "type": "string",
      "enum": ["low", "medium-low", "medium", "medium-high", "high"],
      "description": "Acidity level"
    },
    "favorite": {
      "type": "boolean",
      "default": false,
      "description": "Whether this wine is marked as favorite"
    },
    "status": {
      "type": "string",
      "enum": ["cellar", "consumed"],
      "description": "Whether the wine is still in the cellar or has been consumed."
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 30
      },
      "maxItems": 10,
      "description": "Custom tags for categorization"
    },
    "details": {
      "type": "string",
      "maxLength": 2000,
      "description": "Unique facts or context about the wine, region, or winery."
    }
  },
  "additionalProperties": false
}

Wine Name: [WINE_NAME]
Vintage: [VINTAGE_YEAR]

INSTRUCTIONS:
1. Create a unique ID using lowercase, hyphens, and numbers (e.g., "chateau-margaux-2015")
2. Provide accurate geographic coordinates for the wine region (use 4-6 decimal places)
3. Write detailed, professional tasting notes (150-300 words) describing:
   - Visual appearance (color, clarity, rim variation)
   - Aromas (primary fruit, secondary, tertiary notes)
   - Palate (body, tannins, acidity, finish)
   - Food pairing suggestions
4. Include 8-15 specific aromas that would be detected in this wine
5. List appropriate grape varietals for the region and wine style
6. Set realistic alcohol content (typically 11-15% for table wines)
7. Choose appropriate body and acidity levels
8. Add 5-8 relevant tags including:
   - Region/appellation name
   - Wine style (e.g., "oak-aged", "mineral", "fruity")
   - Food pairing hints (e.g., "seafood-friendly", "bbq-pairing")
   - Special characteristics (e.g., "organic", "biodynamic", "age-worthy")
9. Write detailed winery/region information in the "details" field
10. Set "favorite" to false and "status" to "cellar" by default

OUTPUT REQUIREMENTS:
- Return ONLY valid JSON that conforms to the schema
- Do not include any explanatory text or markdown formatting
- Ensure all required fields are present
- Validate that coordinates are within valid ranges
- Use proper JSON formatting with correct quotes and commas

EXAMPLE USAGE:
Wine Name: Château Margaux
Vintage: 2015

[Generate complete JSON entry following the schema and instructions above]
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

The application comes with a curated collection of 55 wines from various regions. To add your own wines:

1. **Use the LLM Prompt Template** (see below) to generate wine entries
2. **Add wine images** to `/public/images/` with the naming convention `[wine-id].jpg`
3. **Update the wine data** in `/data/wines.json`
4. **Test the build process** with `npm run build`

## LLM Prompt Template

Use this template to generate wine entries with AI assistance: 