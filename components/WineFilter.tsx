'use client';

import { useState } from 'react';
import type { WineFilter } from '@/types/wine';
import { getWineTypes, getUniqueRegions, getUniqueCountries } from '@/utils/wine';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface WineFilterProps {
  filter: WineFilter;
  onFilterChange: (filter: WineFilter) => void;
  totalWines: number;
  filteredCount: number;
}

export default function WineFilter({ filter, onFilterChange, totalWines, filteredCount }: WineFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wineTypes = getWineTypes();
  const regions = getUniqueRegions();
  const countries = getUniqueCountries();

  const handleFilterChange = (key: keyof WineFilter, value: unknown) => {
    onFilterChange({
      ...filter,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filter).length > 0;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-elegant">
      {/* Filter Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-br from-wine-500 to-wine-600 rounded-lg flex items-center justify-center">
              <FunnelIcon className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-white">Filters</h3>
              {hasActiveFilters && (
                <span className="bg-gradient-to-r from-wine-500/20 to-wine-600/20 text-wine-300 text-xs font-medium px-2 py-1 rounded-full border border-wine-500/30">
                  {Object.keys(filter).length} active
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/60 font-medium">
              {filteredCount} of {totalWines}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/60 hover:text-wine-300 transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
            >
              {isOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <FunnelIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-6 space-y-6">
          {/* Wine Type Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Wine Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {wineTypes.map((type) => (
                <label key={type} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filter.type === type}
                    onChange={(e) => handleFilterChange('type', e.target.checked ? type : undefined)}
                    className="rounded border-white/20 text-wine-500 focus:ring-wine-500 bg-white/5"
                  />
                  <span className="ml-3 text-sm text-white/80 group-hover:text-white transition-colors capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Favorites Filter */}
          <div>
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filter.favorite === true}
                onChange={(e) => handleFilterChange('favorite', e.target.checked ? true : undefined)}
                className="rounded border-white/20 text-gold-500 focus:ring-gold-500 bg-white/5"
              />
              <span className="ml-3 text-sm font-medium text-white/80 group-hover:text-white transition-colors">Favorites Only</span>
            </label>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Region
            </label>
            <select
              value={filter.region || ''}
              onChange={(e) => handleFilterChange('region', e.target.value || undefined)}
              className="w-full rounded-lg border-white/20 bg-white/5 text-white placeholder-white/50 focus:border-wine-500 focus:ring-wine-500 shadow-sm"
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region} className="bg-dark-800">
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Country
            </label>
            <select
              value={filter.country || ''}
              onChange={(e) => handleFilterChange('country', e.target.value || undefined)}
              className="w-full rounded-lg border-white/20 bg-white/5 text-white placeholder-white/50 focus:border-wine-500 focus:ring-wine-500 shadow-sm"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country} className="bg-dark-800">
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-3 text-sm font-medium text-white/80 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine-500 transition-all duration-200"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 