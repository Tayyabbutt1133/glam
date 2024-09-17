import { create } from "zustand";
import { fetchExchangeRateByCountry } from "../hooks/exchagedata";
export const usePopupStore = create((set, get) => ({
  isOpen: false,
  rate: 1,
  currencySymbol: '£',
  loading: false,
  error: null,
  
  selectedCountry:
    typeof window !== "undefined" && localStorage.getItem("selectedCountry")
      ? JSON.parse(localStorage.getItem("selectedCountry"))
      : {
          flag: "/UK Flag.png",
          countryCode: "en",
          code: "GBP",
          country: "United Kingdom",
        },
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setSelectedCountry: async (country) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCountry", JSON.stringify(country));
    }
    set({ selectedCountry: country });
    const countryCode = country.code;
    set({ loading: true });

    try {
      const { rate, symbol } = await fetchExchangeRateByCountry(countryCode);
      console.log("Fetched rate and symbol:", rate, symbol);
      set({ rate, currencySymbol: symbol, error: null });
    } catch (err) {
      console.error("Error in fetchExchangeRate:", err);
      set({ rate: 1.3124, currencySymbol: '$', error: `Failed to fetch exchange rate ${err}` });
    } finally {
      set({ loading: false });
    }
  },
 
}));



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