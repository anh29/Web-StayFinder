// useCarousel.ts
import { useState } from 'react';

export const useCarousel = (initialIndex = 0, itemsPerPage = 1) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [items] = useState(itemsPerPage);

  const next = (totalItems: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + items) % totalItems);
  };

  const prev = (totalItems: number) => {
    setCurrentIndex((prevIndex) => (prevIndex - items + totalItems) % totalItems);
  };

  return { currentIndex, next, prev };
};
