import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const WISHLIST_STORAGE_KEY = 'fin_wishlist';

export const useWishlistStore = defineStore('wishlist', () => {
  // Attempt to load wishlist from localStorage on initialization
  const loadWishlist = (): string[] => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  };

  const wishlist = ref<string[]>(loadWishlist());

  // Watch for changes and save to localStorage
  watch(
    wishlist,
    (newWishlist) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist));
      }
    },
    { deep: true } // Use deep watch if storing objects, though only symbols for now
  );

  // Check if a company symbol is in the wishlist
  const isInWishlist = (symbol: string): boolean => {
    return wishlist.value.includes(symbol);
  };

  // Add a company symbol to the wishlist
  const addToWishlist = (symbol: string) => {
    if (!isInWishlist(symbol)) {
      wishlist.value.push(symbol);
    }
  };

  // Remove a company symbol from the wishlist
  const removeFromWishlist = (symbol: string) => {
    wishlist.value = wishlist.value.filter((item) => item !== symbol);
  };

  // Toggle wishlist status for a company symbol
  const toggleWishlist = (symbol: string) => {
    if (isInWishlist(symbol)) {
      removeFromWishlist(symbol);
    } else {
      addToWishlist(symbol);
    }
  };

  return {
    wishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
  };
}); 