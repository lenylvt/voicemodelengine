import { useState } from 'react';
import { searchConfig } from '../config/search';

export default function SearchBar({ onSearch }: { onSearch: (params: any) => void }) {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedSort, setSelectedSort] = useState('best-match');
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSearch = () => {
    onSearch({
      query,
      tag: selectedTag,
      sort: selectedSort
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="relative flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for voice models..."
            className="w-full px-6 py-4 text-lg rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-800 dark:border-neutral-700"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex gap-4 items-center justify-center">
          {/* Tags Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsTagsOpen(!isTagsOpen)}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
            >
              Tags {selectedTag && `• ${searchConfig.tags.find(t => t.id === selectedTag)?.label}`}
            </button>
            {isTagsOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-800 p-2 z-10">
                {searchConfig.tags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => {
                      setSelectedTag(tag.id);
                      setIsTagsOpen(false);
                    }}
                    className="mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-1 text-start font-bold transition-colors text-neutral-400 hover:bg-gray-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
            >
              Sort by {searchConfig.sortOptions.find(s => s.id === selectedSort)?.label}
            </button>
            {isSortOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-800 p-2 z-10">
                {searchConfig.sortOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSelectedSort(option.id);
                      setIsSortOpen(false);
                    }}
                    className="mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-1 text-start font-bold transition-colors text-neutral-400 hover:bg-gray-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}