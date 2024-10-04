// hooks/useSearch.ts
import { fetchHotels } from 'api/api';
import { useState, useEffect } from 'react';
import { Hotel } from 'types/data';

interface SearchFilters {
  date: string;
  persons: string;
  location: string;
}

const useSearch = (filters: SearchFilters) => {
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndFilterHotels = async () => {
      setLoading(true);
      try {
        const hotelsData = await fetchHotels();

        // Filter hotels based on the search filters
        const results = hotelsData.filter((hotel) => {
          const matchesLocation = hotel.location.city.toLowerCase().includes(filters.location.toLowerCase());
          // Additional filtering logic can be added based on date and persons
          return matchesLocation; // Update this to include more filtering conditions
        });

        setFilteredHotels(results);
      } catch (err) {
        setError('Failed to fetch hotels');
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterHotels();
  }, [filters]);

  return { filteredHotels, loading, error };
};

export default useSearch;
