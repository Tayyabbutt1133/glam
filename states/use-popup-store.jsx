import create from 'zustand';

export const usePopupStore = create((set) => ({
    isOpen: false,
    selectedCountry: JSON.parse(localStorage.getItem('selectedCountry')) || {
        flag: '/UK Flag.png',
        countryCode: 'en',
        code: 'GBP',
        country: 'United Kingdom'
    },
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setSelectedCountry: (country) => {
        localStorage.setItem('selectedCountry', JSON.stringify(country));
        set({ selectedCountry: country });
    },
}));
