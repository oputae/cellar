import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import type { Wine, WineFilter as WineFilterType } from '@/types/wine';
import { getAllWines, filterWines } from '@/utils/wine';
import WineMap from '@/components/WineMap';
import WineFilter from '@/components/WineFilter';
import { MapPinIcon, StarIcon, BeakerIcon, GlobeAltIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface HomeProps {
  wines: Wine[];
}

export default function Home({ wines }: HomeProps) {
  const [filter, setFilter] = useState<WineFilterType>({});
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredWines = filterWines(wines, filter);

  const handleWineSelect = (wine: Wine) => {
    setSelectedWine(wine);
  };

  return (
    <>
      <Head>
        <title>Cellar17 - Premium Wine Collection</title>
        <meta name="description" content="Discover and explore your curated wine collection with our sophisticated mapping and tasting platform." />
        <meta name="keywords" content="wine, cellar, collection, tasting notes, premium wines, sommelier" />
        <meta property="og:title" content="Cellar17 - Premium Wine Collection" />
        <meta property="og:description" content="Discover and explore your curated wine collection with our sophisticated mapping and tasting platform." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cellar17 - Premium Wine Collection" />
        <meta name="twitter:description" content="Discover and explore your curated wine collection with our sophisticated mapping and tasting platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-wine-400 to-gold-400 bg-clip-text text-transparent">
                    Cellar17
                  </h1>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-white/90 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Map
                </Link>
                <Link href="/collection" className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Collection
                </Link>
                <Link href="/stats" className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Analytics
                </Link>
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white/70 hover:text-wine-300 p-2 transition-colors duration-200"
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-6">
                <nav className="flex flex-col space-y-4">
                  <Link 
                    href="/" 
                    className="text-white/90 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Map
                  </Link>
                  <Link 
                    href="/collection" 
                    className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Collection
                  </Link>
                  <Link 
                    href="/stats" 
                    className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Analytics
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Your World of
              <span className="block bg-gradient-to-r from-wine-400 to-gold-400 bg-clip-text text-transparent">
                Fine Wines
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Explore your curated collection through an interactive world map, discover tasting notes, 
              and track your journey through the world&apos;s most prestigious wine regions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 animate-slide-up">
              <WineFilter
                filter={filter}
                onFilterChange={setFilter}
                totalWines={wines.length}
                filteredCount={filteredWines.length}
              />
            </div>

            {/* Map and Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Map */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-elegant animate-scale-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-display font-semibold text-white">
                    World Wine Map
                  </h3>
                  <div className="flex items-center gap-2 text-white/60">
                    <GlobeAltIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">{filteredWines.length} wines</span>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden shadow-premium">
                  <WineMap wines={filteredWines} onWineSelect={handleWineSelect} />
                </div>
              </div>

              {/* Selected Wine Details */}
              {selectedWine && (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-elegant animate-scale-in">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-white mb-2">
                        {selectedWine.name}
                      </h3>
                      <p className="text-white/70 text-lg">
                        {selectedWine.vintage} • {selectedWine.region}
                        {selectedWine.country && ` • ${selectedWine.country}`}
                      </p>
                    </div>
                    <Link
                      href={`/${selectedWine.id}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-wine-600 to-wine-700 text-white text-sm font-medium rounded-lg hover:from-wine-700 hover:to-wine-800 transition-all duration-200 shadow-elegant"
                    >
                      View Details
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <BeakerIcon className="h-5 w-5 text-wine-400" />
                        <span className="text-white/80">
                          <span className="font-medium text-white">Vintage:</span> {selectedWine.vintage}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPinIcon className="h-5 w-5 text-wine-400" />
                        <span className="text-white/80">
                          <span className="font-medium text-white">Region:</span> {selectedWine.region}
                        </span>
                      </div>
                      {selectedWine.country && (
                        <div className="flex items-center gap-3">
                          <GlobeAltIcon className="h-5 w-5 text-wine-400" />
                          <span className="text-white/80">
                            <span className="font-medium text-white">Country:</span> {selectedWine.country}
                          </span>
                        </div>
                      )}
                      {selectedWine.winery && (
                        <div className="flex items-center gap-3">
                          <div className="h-5 w-5 rounded-full bg-wine-400 flex items-center justify-center">
                            <span className="text-xs text-white font-bold">W</span>
                          </div>
                          <span className="text-white/80">
                            <span className="font-medium text-white">Winery:</span> {selectedWine.winery}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 font-medium">Type:</span>
                        <span className={`px-3 py-1 text-sm rounded-full border font-medium ${getWineTypeColor(selectedWine.type)}`}>
                          {selectedWine.type}
                        </span>
                      </div>
                      {selectedWine.favorite && (
                        <div className="flex items-center gap-2">
                          <StarIcon className="h-5 w-5 text-gold-400 fill-current" />
                          <span className="text-gold-400 font-medium">Favorite</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedWine.notes && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-white/80 leading-relaxed italic">&ldquo;{selectedWine.notes}&rdquo;</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-wine-600/20 to-wine-800/20 backdrop-blur-sm rounded-2xl border border-wine-500/20 p-6 shadow-elegant animate-float">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gradient-to-br from-wine-500 to-wine-600 rounded-xl flex items-center justify-center shadow-elegant">
                      <MapPinIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-white/60">Total Wines</p>
                      <p className="text-3xl font-display font-bold text-white">{wines.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gold-600/20 to-gold-800/20 backdrop-blur-sm rounded-2xl border border-gold-500/20 p-6 shadow-elegant animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-elegant">
                      <StarIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-white/60">Favorites</p>
                      <p className="text-3xl font-display font-bold text-white">
                        {wines.filter(w => w.favorite).length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-dark-600/20 to-dark-800/20 backdrop-blur-sm rounded-2xl border border-dark-500/20 p-6 shadow-elegant animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gradient-to-br from-dark-500 to-dark-600 rounded-xl flex items-center justify-center shadow-elegant">
                      <GlobeAltIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-white/60">Countries</p>
                      <p className="text-3xl font-display font-bold text-white">
                        {new Set(wines.map(w => w.country).filter(Boolean)).size}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const wines = getAllWines();
  
  return {
    props: {
      wines,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

// Helper function for wine type colors (duplicated from utils for now)
function getWineTypeColor(type: string): string {
  const colors = {
    red: 'text-red-400 bg-red-900/20 border-red-500/30',
    white: 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30',
    'rosé': 'text-pink-400 bg-pink-900/20 border-pink-500/30',
    sparkling: 'text-purple-400 bg-purple-900/20 border-purple-500/30',
    dessert: 'text-amber-400 bg-amber-900/20 border-amber-500/30',
    fortified: 'text-orange-400 bg-orange-900/20 border-orange-500/30',
  };
  return colors[type as keyof typeof colors] || 'text-gray-400 bg-gray-900/20 border-gray-500/30';
} 