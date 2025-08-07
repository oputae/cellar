import Head from 'next/head';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { getAllWines, filterWines } from '@/utils/wine';
import { WineType } from '@/types/wine';
import { ArrowLeftIcon, BeakerIcon, MapPinIcon, StarIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CollectionPage() {
  const allWines = getAllWines();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState<WineType | ''>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Filter wines based on search and filters
  const filteredWines = useMemo(() => {
    return filterWines(allWines, {
      keyword: searchKeyword,
      type: selectedType || undefined,
      favorite: showFavoritesOnly ? true : undefined
    });
  }, [allWines, searchKeyword, selectedType, showFavoritesOnly]);
  
  return (
    <>
      <Head>
        <title>Wine Collection - Cellar17</title>
        <meta name="description" content="Browse your complete wine collection with detailed information and tasting notes." />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/" className="flex items-center text-wine-400 hover:text-wine-300 transition-colors duration-200">
                  <ArrowLeftIcon className="h-6 w-6 mr-2" />
                  <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-wine-400 to-gold-400 bg-clip-text text-transparent">
                    Cellar17
                  </h1>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Map
                </Link>
                <Link href="/collection" className="text-white/90 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
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
                    className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Map
                  </Link>
                  <Link 
                    href="/collection" 
                    className="text-white/90 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
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

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Your Wine Collection
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Discover and explore every bottle in your curated collection, from classic Bordeaux to bold Napa Valley wines.
            </p>
          </div>

          {/* Collection Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-wine-600/20 to-wine-800/20 backdrop-blur-sm rounded-2xl border border-wine-500/20 p-6 shadow-elegant">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-wine-500 to-wine-600 rounded-lg flex items-center justify-center">
                  <BeakerIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white/60">Total Wines</p>
                  <p className="text-2xl font-display font-bold text-white">{allWines.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gold-600/20 to-gold-800/20 backdrop-blur-sm rounded-2xl border border-gold-500/20 p-6 shadow-elegant">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                  <StarIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white/60">Favorites</p>
                  <p className="text-2xl font-display font-bold text-white">
                    {allWines.filter(w => w.favorite).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-dark-600/20 to-dark-800/20 backdrop-blur-sm rounded-2xl border border-dark-500/20 p-6 shadow-elegant">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-dark-500 to-dark-600 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white/60">Regions</p>
                  <p className="text-2xl font-display font-bold text-white">
                    {new Set(allWines.map(w => w.region)).size}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 shadow-elegant">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🌍</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white/60">Countries</p>
                  <p className="text-2xl font-display font-bold text-white">
                    {new Set(allWines.map(w => w.country).filter(Boolean)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8 shadow-elegant">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Box */}
              <div className="md:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search wines, aromas, varietals, notes..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-wine-500/50 focus:border-wine-500/50 transition-all duration-200"
                  />
                </div>
              </div>
              
              {/* Wine Type Filter */}
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as WineType | '')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-wine-500/50 focus:border-wine-500/50 transition-all duration-200"
                >
                  <option value="">All Types</option>
                  <option value="red">Red</option>
                  <option value="white">White</option>
                  <option value="rosé">Rosé</option>
                  <option value="sparkling">Sparkling</option>
                  <option value="dessert">Dessert</option>
                  <option value="fortified">Fortified</option>
                </select>
              </div>
              
              {/* Favorites Filter */}
              <div>
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 ${
                    showFavoritesOnly
                      ? 'bg-gold-600/20 border-gold-500/50 text-gold-300'
                      : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                  }`}
                >
                  <StarIcon className="h-5 w-5" />
                  Favorites
                </button>
              </div>
            </div>
            
            {/* Search Results Count */}
            {searchKeyword && (
              <div className="mt-4 text-center">
                <p className="text-white/70">
                  Found {filteredWines.length} wine{filteredWines.length !== 1 ? 's' : ''} matching &ldquo;{searchKeyword}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Wine List */}
          {filteredWines.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍷</div>
              <p className="text-xl text-white/60">
                {searchKeyword || selectedType || showFavoritesOnly 
                  ? 'No wines match your search criteria.' 
                  : 'No wines in your collection yet.'
                }
              </p>
              <p className="text-white/40 mt-2">
                {searchKeyword || selectedType || showFavoritesOnly 
                  ? 'Try adjusting your search terms or filters.'
                  : 'Start building your collection by adding your first bottle.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWines.map((wine, index) => (
                <div 
                  key={wine.id} 
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-elegant hover:shadow-premium transition-all duration-300 hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Link 
                        href={`/${wine.id}`} 
                        className="text-xl font-display font-semibold text-white hover:text-wine-300 transition-colors duration-200 block mb-2"
                      >
                        {wine.name}
                      </Link>
                      <p className="text-white/70 text-lg mb-3">
                        {wine.vintage} • {wine.region}
                      </p>
                      {wine.country && (
                        <p className="text-white/60 text-sm mb-3">{wine.country}</p>
                      )}
                    </div>
                    {wine.favorite && (
                      <StarIcon className="h-6 w-6 text-gold-400 fill-current flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 text-sm rounded-full border font-medium ${getWineTypeColor(wine.type)}`}>
                      {wine.type}
                    </span>
                  </div>
                  
                  {wine.notes && (
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                      {wine.notes}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      {wine.winery && (
                        <span className="flex items-center gap-1">
                          <BeakerIcon className="h-4 w-4" />
                          {wine.winery}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/${wine.id}`}
                      className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-wine-600/20 to-wine-700/20 text-wine-300 text-sm font-medium rounded-lg hover:from-wine-600/30 hover:to-wine-700/30 transition-all duration-200 border border-wine-500/30"
                    >
                      View Details
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

// Helper function for wine type colors
function getWineTypeColor(type: WineType): string {
  const colors = {
    red: 'text-red-400 bg-red-900/20 border-red-500/30',
    white: 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30',
    'rosé': 'text-pink-400 bg-pink-900/20 border-pink-500/30',
    sparkling: 'text-purple-400 bg-purple-900/20 border-purple-500/30',
    dessert: 'text-amber-400 bg-amber-900/20 border-amber-500/30',
    fortified: 'text-orange-400 bg-orange-900/20 border-orange-500/30',
  };
  return colors[type] || 'text-gray-400 bg-gray-900/20 border-gray-500/30';
} 