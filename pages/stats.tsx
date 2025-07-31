import Head from 'next/head';
import Link from 'next/link';
import { getAllWines, getUniqueCountries, getUniqueRegions, getWineTypes } from '@/utils/wine';
import { ArrowLeftIcon, BeakerIcon, MapPinIcon, StarIcon, GlobeAltIcon, ChartBarIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

export default function StatsPage() {
  const wines = getAllWines();
  const totalWines = wines.length;
  const favorites = wines.filter(w => w.favorite).length;
  const countries = getUniqueCountries();
  const regions = getUniqueRegions();
  const types = getWineTypes();
  const typeCounts = types.map(type => ({ type, count: wines.filter(w => w.type === type).length }));
  const vintages = wines.map(w => w.vintage).filter(Boolean);
  const oldestVintage = vintages.length ? Math.min(...vintages) : null;
  const newestVintage = vintages.length ? Math.max(...vintages) : null;

  // Calculate additional stats
  const winesWithNotes = wines.filter(w => w.notes).length;
  const winesWithWinery = wines.filter(w => w.winery).length;

  return (
    <>
      <Head>
        <title>Wine Analytics - Cellar17</title>
        <meta name="description" content="Comprehensive analytics and insights about your wine collection." />
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
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Map
                </Link>
                <Link href="/collection" className="text-white/70 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Collection
                </Link>
                <Link href="/stats" className="text-white/90 hover:text-wine-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Analytics
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Collection Analytics
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Discover insights about your wine collection with detailed statistics and trends.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-wine-600/20 to-wine-800/20 backdrop-blur-sm rounded-2xl border border-wine-500/20 p-6 shadow-elegant animate-float">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gradient-to-br from-wine-500 to-wine-600 rounded-xl flex items-center justify-center shadow-elegant">
                  <BeakerIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-white/60">Total Wines</p>
                  <p className="text-3xl font-display font-bold text-white">{totalWines}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gold-600/20 to-gold-800/20 backdrop-blur-sm rounded-2xl border border-gold-500/20 p-6 shadow-elegant animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-elegant">
                  <StarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-white/60">Favorites</p>
                  <p className="text-3xl font-display font-bold text-white">{favorites}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 shadow-elegant animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-elegant">
                  <GlobeAltIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-white/60">Countries</p>
                  <p className="text-3xl font-display font-bold text-white">{countries.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6 shadow-elegant animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-elegant">
                  <MapPinIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-white/60">Regions</p>
                  <p className="text-3xl font-display font-bold text-white">{regions.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Wine Types Distribution */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-elegant animate-scale-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-gradient-to-br from-wine-500 to-wine-600 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-white">Wine Types</h3>
              </div>
              <div className="space-y-4">
                {typeCounts.map(({ type, count }) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-sm rounded-full border font-medium ${getWineTypeColor(type)}`}>
                        {type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-wine-500 to-wine-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(count / totalWines) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-semibold min-w-[2rem] text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vintage Analysis */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-elegant animate-scale-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-white">Vintage Analysis</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/80">Oldest Vintage</span>
                  <span className="text-2xl font-display font-bold text-white">{oldestVintage ?? 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/80">Newest Vintage</span>
                  <span className="text-2xl font-display font-bold text-white">{newestVintage ?? 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Collection Quality */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-elegant animate-scale-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <TagIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-white">Collection Quality</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/80">With Tasting Notes</span>
                  <span className="text-xl font-semibold text-white">{winesWithNotes}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/80">With Winery Info</span>
                  <span className="text-xl font-semibold text-white">{winesWithWinery}</span>
                </div>
              </div>
            </div>

            {/* Top Regions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-elegant animate-scale-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-white">Top Regions</h3>
              </div>
              <div className="space-y-3">
                {regions.slice(0, 5).map((region, index) => {
                  const regionCount = wines.filter(w => w.region === region).length;
                  return (
                    <div key={region} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 text-sm font-medium">#{index + 1}</span>
                        <span className="text-white font-medium">{region}</span>
                      </div>
                      <span className="text-white font-semibold">{regionCount}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Helper function for wine type colors
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