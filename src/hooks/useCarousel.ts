import { useState } from 'react';

export const useCarousel = (initialIndex = 0, itemsPerPage = 1) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const next = (totalItems: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalItems);
  };

  const prev = (totalItems: number) => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + totalItems) % totalItems);
  };

  return { currentIndex, next, prev };
};
