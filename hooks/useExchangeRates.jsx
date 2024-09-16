import { useState, useEffect } from 'react';
import { usePopupStore } from '../states/use-popup-store'; // Adjust the import to your Zustand store

export const useExchangeRates = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [currencySymbol, setCurrencySymbol] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Access selectedCountry from Zustand store
  const selectedCountry = usePopupStore((state) => state.selectedCountry);

  const currencySymbols = {
    USD: '$',      // US Dollar
    GBP: '£',      // British Pound Sterling
    EUR: '€',      // Euro
    PKR: '₨',      // Pakistani Rupee
    JPY: '¥',      // Japanese Yen
    AUD: 'A$',     // Australian Dollar
    CAD: 'C$',     // Canadian Dollar
    CNY: '¥',      // Chinese Yuan
    INR: '₹',      // Indian Rupee
    KRW: '₩',      // South Korean Won
    CHF: 'CHF',    // Swiss Franc
    RUB: '₽',      // Russian Ruble
    ZAR: 'R',      // South African Rand
    MXN: 'Mex$',   // Mexican Peso
    BRL: 'R$',     // Brazilian Real
    SAR: 'ر.س',    // Saudi Riyal
    AED: 'د.إ',    // United Arab Emirates Dirham
    SGD: 'S$',     // Singapore Dollar
    HKD: 'HK$',    // Hong Kong Dollar
    NZD: 'NZ$',    // New Zealand Dollar
    TRY: '₺',      // Turkish Lira
    THB: '฿',      // Thai Baht
    NOK: 'kr',     // Norwegian Krone
    SEK: 'kr',     // Swedish Krona
    DKK: 'kr',     // Danish Krone
    PLN: 'zł',     // Polish Zloty
    CZK: 'Kč',     // Czech Koruna
    HUF: 'Ft',     // Hungarian Forint
    ILS: '₪',      // Israeli New Shekel
    MYR: 'RM',     // Malaysian Ringgit
    IDR: 'Rp',     // Indonesian Rupiah
    VND: '₫',      // Vietnamese Dong
    PHP: '₱',      // Philippine Peso
    BDT: '৳',      // Bangladeshi Taka
    KES: 'KSh',    // Kenyan Shilling
    EGP: '£',      // Egyptian Pound
    NGN: '₦',      // Nigerian Naira
    COP: 'COL$',   // Colombian Peso
    ARS: 'AR$',    // Argentine Peso
    CLP: 'CLP$',   // Chilean Peso
    PEN: 'S/.',    // Peruvian Sol
    TWD: 'NT$',    // New Taiwan Dollar
    BHD: '.د.ب',   // Bahraini Dinar
    QAR: 'ر.ق',    // Qatari Riyal
    LKR: 'Rs',     // Sri Lankan Rupee
  };
  

  useEffect(() => {
    try {
         // Commented out the previous API call code
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

      setLoading(true);

      // Hardcoded conversion rates (assumed to be available globally)
      const conversionRates = {
        "GBP": 1,
        "AED": 4.8198,
        "AFN": 90.9416,
        "ALL": 118.0181,
        "AMD": 507.9272,
        "ANG": 2.3492,
        "AOA": 1242.3447,
        "ARS": 1262.2067,
        "AUD": 1.9567,
        "AWG": 2.3492,
        "AZN": 2.2284,
        "BAM": 2.3170,
        "BBD": 2.6248,
        "BDT": 156.8435,
        "BGN": 2.3170,
        "BHD": 0.4935,
        "BIF": 3792.4762,
        "BMD": 1.3124,
        "BND": 1.7052,
        "BOB": 9.0405,
        "BRL": 7.3820,
        "BSD": 1.3124,
        "BTN": 110.1402,
        "BWP": 17.4800,
        "BYN": 4.2403,
        "BZD": 2.6248,
        "CAD": 1.7826,
        "CDF": 3721.5888,
        "CHF": 1.1141,
        "CLP": 1224.3976,
        "CNY": 9.3217,
        "COP": 5536.7688,
        "CRC": 674.7860,
        "CUP": 31.4977,
        "CVE": 130.6290,
        "CZK": 29.7821,
        "DJF": 233.2421,
        "DKK": 8.8378,
        "DOP": 78.0480,
        "DZD": 172.9746,
        "EGP": 63.5880,
        "ERN": 19.6861,
        "ETB": 148.5421,
        "EUR": 1.1847,
        "FJD": 2.9186,
        "FKP": 1.0000,
        "FOK": 8.8378,
        "GEL": 3.5368,
        "GGP": 1.0000,
        "GHS": 21.1220,
        "GIP": 1.0000,
        "GMD": 92.6882,
        "GNF": 11372.3317,
        "GTQ": 10.0931,
        "GYD": 272.9335,
        "HKD": 10.2381,
        "HNL": 32.3652,
        "HRK": 8.9260,
        "HTG": 171.7903,
        "HUF": 468.1825,
        "IDR": 20232.6850,
        "ILS": 4.8734,
        "IMP": 1.0000,
        "INR": 110.1405,
        "IQD": 1709.0558,
        "IRR": 55481.1227,
        "ISK": 180.4398,
        "JEP": 1.0000,
        "JMD": 206.0308,
        "JOD": 0.9305,
        "JPY": 184.9237,
        "KES": 169.5224,
        "KGS": 110.8237,
        "KHR": 5309.4667,
        "KID": 1.9567,
        "KMF": 582.8254,
        "KRW": 1744.3507,
        "KWD": 0.3999,
        "KYD": 1.0937,
        "KZT": 630.0529,
        "LAK": 28586.5767,
        "LBP": 117460.3555,
        "LKR": 396.4815,
        "LRD": 255.0170,
        "LSL": 23.3113,
        "LYD": 6.2171,
        "MAD": 12.8083,
        "MDL": 22.8554,
        "MGA": 5935.2513,
        "MKD": 72.7967,
        "MMK": 3981.9989,
        "MNT": 4469.1790,
        "MOP": 10.5452,
        "MRU": 51.8503,
        "MUR": 60.1898,
        "MVR": 20.1527,
        "MWK": 2291.9072,
        "MXN": 25.3585,
        "MYR": 5.6652,
        "MZN": 83.8835,
        "NAD": 23.3113,
        "NGN": 2157.3094,
        "NIO": 48.0535,
        "NOK": 13.9973,
        "NPR": 176.2242,
        "NZD": 2.1292,
        "OMR": 0.5046,
        "PAB": 1.3124,
        "PEN": 4.9473,
        "PGK": 5.0955,
        "PHP": 73.5329,
        "PKR": 364.9364,
        "PLN": 5.0759,
        "PYG": 10176.3338,
        "QAR": 4.7772,
        "RON": 5.8924,
        "RSD": 138.6064,
        "RUB": 118.7978,
        "RWF": 1790.4163,
        "SAR": 4.9215,
        "SBD": 10.9585,
        "SCR": 17.9215,
        "SDG": 583.0307,
        "SEK": 13.4347,
        "SGD": 1.7051,
        "SHP": 1.0000,
        "SLE": 29.6603,
        "SLL": 29660.2192,
        "SOS": 745.7116,
        "SRD": 39.6308,
        "SSP": 4392.7066,
        "STN": 29.0247,
        "SYP": 16700.6256,
        "SZL": 23.3113,
        "THB": 43.6867,
        "TJS": 13.9581,
        "TMT": 4.5946,
        "TND": 3.9909,
        "TOP": 3.0430,
        "TRY": 44.5724,
        "TTD": 9.0675,
        "TVD": 1.9567,
        "TWD": 41.9902,
        "TZS": 3557.4619,
        "UAH": 54.2788,
        "UGX": 4867.7637,
        "USD": 1.3124,
        "UYU": 52.8086,
        "UZS": 16799.4822,
        "VES": 48.2640,
        "VND": 32209.8642,
        "VUV": 154.3990,
        "WST": 3.5323,
        "XAF": 777.1005,
        "XCD": 3.5435,
        "XDR": 0.9729,
        "XOF": 777.1005,
        "XPF": 141.3705,
        "YER": 326.4243,
        "ZAR": 23.3113,
        "ZMW": 34.5962,
        "ZWL": 18.3400
      };

      // Get the rate based on the selected country's code
      const countryCode = selectedCountry.code;
      const selectedRate = conversionRates[countryCode];

      if (selectedRate) {
        setRate(selectedRate);

        // Check if there's a symbol for the selected country, otherwise return the code
        const symbol = currencySymbols[countryCode] || countryCode;
        setCurrencySymbol(symbol);
      } else {
        setError('Rate not available for the selected country');
      }
    } catch (err) {
      setError('Failed to fetch exchange rate');
    } finally {
      setLoading(false);
    }
  }, [selectedCountry.code]);

  return { rate, currencySymbol, loading, error };
};
