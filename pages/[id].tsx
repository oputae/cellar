import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type { Wine } from '@/types/wine';
import { getAllWines, getWineById, getWineTypeColor } from '@/utils/wine';
import { StarIcon } from '@heroicons/react/24/outline';

interface WineDetailProps {
  wine: Wine;
}

export default function WineDetail({ wine }: WineDetailProps) {
  return (
    <>
      <Head>
        <title>{`${wine.name} ${wine.vintage} - Wine Tracker`}</title>
        <meta name="description" content={`${wine.name} ${wine.vintage} from ${wine.region}. ${wine.notes || 'Explore this wine in your collection.'}`} />
        <meta property="og:title" content={`${wine.name} ${wine.vintage} - Wine Tracker`} />
        <meta property="og:description" content={`${wine.name} ${wine.vintage} from ${wine.region}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main background */}
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/" className="flex items-center text-wine-400 hover:text-wine-300 transition-colors duration-200">
                  <span className="text-2xl mr-2">←</span>
                  <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-wine-400 to-gold-400 bg-clip-text text-transparent">
                    🍷 Wine Tracker
                  </h1>
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Map
                </Link>
                <Link href="/collection" className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Collection
                </Link>
                <Link href="/stats" className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Statistics
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Wine Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-premium p-8 mb-10 animate-fade-in mt-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-wine-400 to-gold-400 bg-clip-text text-transparent mb-2">
              {wine.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xl text-white/80 font-medium">
                {wine.vintage} • {wine.region}{wine.country && ` • ${wine.country}`}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full border font-medium ${getWineTypeColor(wine.type)}`}>{wine.type}</span>
              {wine.favorite && (
                <span className="ml-2 px-2 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold flex items-center gap-1">
                  <StarIcon className="h-4 w-4" /> Favorite
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Wine Image Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-premium p-6 flex flex-col items-center justify-center">
              <div className="relative w-full flex flex-col items-center justify-center mb-6">
                <div className="w-56 h-96 flex items-center justify-center">
                  <Image
                    src={`/images/${wine.id}.jpg`}
                    alt={`${wine.name} ${wine.vintage}`}
                    width={224}
                    height={384}
                    className="rounded-xl object-contain shadow-lg border-4 border-white/20 bg-white/10 max-h-96 max-w-56"
                    onError={(e) => {
                      const target = e.target;
                      if (target instanceof HTMLImageElement) {
                        target.style.display = 'none';
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }
                    }}
                  />
                  <div className="hidden absolute inset-0 items-center justify-center text-6xl text-white/30 bg-white/10 rounded-xl">🍷</div>
                </div>
              </div>
              <div className="w-full text-center space-y-2">
                {wine.winery && (
                  <div className="text-white/80 text-base font-medium">
                    <span className="text-wine-300 font-semibold">Winery:</span> {wine.winery}
                  </div>
                )}
                {wine.alcohol && (
                  <div className="text-white/70 text-sm">
                    <span className="text-gold-300 font-semibold">Alcohol:</span> {wine.alcohol}%
                  </div>
                )}
              </div>
            </div>

            {/* Wine Info Cards */}
            <div className="lg:col-span-2 space-y-8">
              {wine.details && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-elegant p-6 animate-fade-in mb-8">
                  <h2 className="text-2xl font-display font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-gold-400"></span> Details
                  </h2>
                  <p className="text-white/90 leading-relaxed text-lg">{wine.details}</p>
                </div>
              )}
              {wine.notes && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-elegant p-6 animate-fade-in">
                  <h2 className="text-2xl font-display font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-wine-400"></span> Tasting Notes
                  </h2>
                  <p className="text-white/90 leading-relaxed text-lg">{wine.notes}</p>
                </div>
              )}

              {/* Wine Characteristics */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-elegant p-6 animate-fade-in">
                <h2 className="text-2xl font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold-400"></span> Characteristics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wine.varietals && wine.varietals.length > 0 && (
                    <div>
                      <h3 className="text-white/80 font-medium mb-2">Varietals</h3>
                      <div className="flex flex-wrap gap-2">
                        {wine.varietals.map((varietal) => (
                          <span key={varietal} className="px-3 py-1 bg-white/10 text-white/90 rounded-full border border-white/20 text-sm font-medium">
                            {varietal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {wine.aromas && wine.aromas.length > 0 && (
                    <div>
                      <h3 className="text-white/80 font-medium mb-2">Aromas</h3>
                      <div className="flex flex-wrap gap-2">
                        {wine.aromas.map((aroma) => (
                          <span key={aroma} className="px-3 py-1 bg-wine-400/20 text-wine-200 rounded-full border border-wine-400/30 text-sm font-medium">
                            {aroma}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {wine.body && (
                    <div className="mt-4">
                      <span className="text-white/60 font-semibold uppercase text-xs tracking-wide block mb-1">Body</span>
                      <span className="inline-block px-3 py-1 bg-white/10 text-white/90 rounded-full border border-white/20 text-sm font-semibold">
                        {wine.body}
                      </span>
                    </div>
                  )}
                  {wine.acidity && (
                    <div className="mt-4">
                      <span className="text-white/60 font-semibold uppercase text-xs tracking-wide block mb-1">Acidity</span>
                      <span className="inline-block px-3 py-1 bg-white/10 text-white/90 rounded-full border border-white/20 text-sm font-semibold">
                        {wine.acidity}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Food Pairing Suggestions */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-elegant p-6 animate-fade-in">
                <h2 className="text-2xl font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span> 🍽️ Food Pairings
                </h2>
                <div className="flex flex-wrap gap-2">
                  {getFoodPairings(wine).map((pairing, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-green-400/20 text-green-200 rounded-full border border-green-400/30 text-sm font-medium"
                    >
                      {pairing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-elegant p-6 animate-fade-in">
                <h2 className="text-2xl font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400"></span> Additional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wine.status && (
                    <div>
                      <h3 className="text-white/80 font-medium mb-2">Status</h3>
                      <span className={`inline-block px-3 py-1 rounded-full border text-sm font-medium ${wine.status === 'cellar' ? 'bg-green-400/20 text-green-200 border-green-400/30' : 'bg-gray-400/20 text-gray-200 border-gray-400/30'}`}>
                        {wine.status === 'cellar' ? 'In Cellar' : 'Consumed'}
                      </span>
                    </div>
                  )}
                  {wine.tags && wine.tags.length > 0 && (
                    <div className="md:col-span-2">
                      <h3 className="text-white/80 font-medium mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {wine.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-white/10 text-white/90 rounded-full border border-white/20 text-sm font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Helper function for food pairing suggestions
function getFoodPairings(wine: { tags?: string[]; type: string; aromas?: string[] }): string[] {
  const pairings: string[] = [];
  
  // Extract food suggestions from tags
  if (wine.tags) {
    wine.tags.forEach((tag: string) => {
      switch (tag) {
        case 'seafood':
        case 'seafood-pairing':
          pairings.push('Grilled fish', 'Oysters', 'Lobster', 'Ceviche');
          break;
        case 'bbq-friendly':
        case 'bbq':
          pairings.push('Grilled meats', 'BBQ ribs', 'Burgers', 'Steak');
          break;
        case 'pizza-pasta':
          pairings.push('Pizza', 'Pasta', 'Italian dishes', 'Margherita pizza');
          break;
        case 'cheese':
          pairings.push('Cheese board', 'Aged cheeses', 'Soft cheeses');
          break;
        case 'charcuterie':
          pairings.push('Charcuterie board', 'Cured meats', 'Prosciutto');
          break;
        case 'spicy-food':
          pairings.push('Spicy dishes', 'Curry', 'Thai food', 'Mexican cuisine');
          break;
        case 'dessert':
          pairings.push('Desserts', 'Chocolate', 'Fruit tarts', 'Cheesecake');
          break;
        case 'aperitif':
          pairings.push('Appetizers', 'Light snacks', 'Canapés');
          break;
      }
    });
  }
  
  // Add suggestions based on wine type
  switch (wine.type) {
    case 'red':
      if (!pairings.includes('Grilled meats')) pairings.push('Grilled meats', 'Red meat', 'Game');
      break;
    case 'white':
      if (!pairings.includes('Grilled fish')) pairings.push('White fish', 'Chicken', 'Salads');
      break;
    case 'rosé':
      pairings.push('Summer salads', 'Light appetizers', 'Mediterranean cuisine');
      break;
    case 'sparkling':
      pairings.push('Celebration foods', 'Light appetizers', 'Brunch');
      break;
    case 'dessert':
      pairings.push('Desserts', 'Fruit', 'Chocolate', 'Cheese');
      break;
  }
  
  // Add suggestions based on aromas
  if (wine.aromas) {
    wine.aromas.forEach((aroma: string) => {
      switch (aroma) {
        case 'lavender':
        case 'garrigue':
          pairings.push('Provençal cuisine', 'Herbed dishes', 'Mediterranean food');
          break;
        case 'smoke':
        case 'tobacco':
          pairings.push('Smoked meats', 'Grilled foods', 'Barbecue');
          break;
        case 'citrus':
        case 'lemon':
          pairings.push('Seafood', 'Light fish', 'Citrus-based dishes');
          break;
        case 'spice':
        case 'pepper':
          pairings.push('Spicy foods', 'Asian cuisine', 'Curry');
          break;
      }
    });
  }
  
  // Remove duplicates and return unique suggestions
  return [...new Set(pairings)].slice(0, 6);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const wines = getAllWines();
  
  const paths = wines.map((wine) => ({
    params: { id: wine.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<WineDetailProps> = async ({ params }) => {
  const id = params?.id as string;
  const wine = getWineById(id);

  if (!wine) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      wine,
    },
    revalidate: 3600, // Revalidate every hour
  };
}; 