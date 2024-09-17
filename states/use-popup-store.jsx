import { create } from "zustand";
import { fetchExchangeRateByCountry } from "../hooks/exchagedata";


export const usePopupStore = create((set, get) => {
  const initializeStore = async () => {
    const savedCountry = typeof window !== "undefined" 
      ? JSON.parse(localStorage.getItem("selectedCountry")) 
      : null;

    const defaultCountry = {
      flag: "/UK Flag.png",
      countryCode: "en",
      code: "GBP",
      country: "United Kingdom",
    };

    const selectedCountry = savedCountry || defaultCountry;

    set({ selectedCountry, loading: true });

    try {
      const { rate, symbol } = await fetchExchangeRateByCountry(selectedCountry.code);
      console.log("Fetched rate and symbol:", rate, symbol);
      if (typeof rate !== 'number' || isNaN(rate)) {
        throw new Error('Invalid rate received');
      }
      if (typeof symbol !== 'string' || symbol.trim() === '') {
        throw new Error('Invalid symbol received');
      }
      set({ rate, currencySymbol: symbol, error: null });
    } catch (err) {
      console.error("Error in fetchExchangeRate:", err);
      set({ rate: 1, currencySymbol: '£', error: `Failed to fetch exchange rate: ${err}` });
    } finally {
      set({ loading: false });
    }
  };

  // Call initializeStore immediately
  initializeStore();

  return {
    rate: 1, // Default rate
    currencySymbol: '£', // Default symbol
    selectedCountry: null,
    loading: false,
    error: null,
    isOpen: false,

    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

    setSelectedCountry: async (country) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedCountry", JSON.stringify(country));
      }
      set({ selectedCountry: country, loading: true });

      try {
        const { rate, symbol } = await fetchExchangeRateByCountry(country.code);
        console.log("Fetched rate and symbol:", rate, symbol);
        if (typeof rate !== 'number' || isNaN(rate)) {
          throw new Error('Invalid rate received');
        }
        if (typeof symbol !== 'string' || symbol.trim() === '') {
          throw new Error('Invalid symbol received');
        }
        set({ rate, currencySymbol: symbol, error: null });
      } catch (err) {
        console.error("Error in fetchExchangeRate:", err);
        set({ rate: 1, currencySymbol: '£', error: `Failed to fetch exchange rate: ${err}` });
      } finally {
        set({ loading: false });
      }
    },

    refreshRateAndSymbol: async () => {
      const { selectedCountry } = get();
      if (selectedCountry) {
        await get().setSelectedCountry(selectedCountry);
      }
    },

    // ... other store properties and methods ...
  };
});



// const fetchExchangeRates = async () => {
    //   try {
    //     const response = await fetch('https://v6.exchangerate-api.com/v6/862a89bd25ca91fecef252af/latest/GBP');
    //     const data = await response.json();
    //     const conversionRates = data.conversion_rates;
    //   } catch (err) {
    //     setError('Failed to fetch exchange rates');
    //   } finally {
    //     setLoading(false);
    //   }
    // };