export function groupBrandsByAlphabet(brands, alphabet) {
    let result = [];
  
    alphabet.forEach(letter => {
      let filteredBrands;
  
      if (letter === "0-9") {
        filteredBrands = brands.filter(brand => /^\d/.test(brand.name)); // check if name starts with a number
      } else {
        filteredBrands = brands.filter(brand => brand.name[0].toUpperCase() === letter); // check if name starts with the alphabet
      }
  
      if (filteredBrands.length) {
        result.push({
          label: letter,
          brands: filteredBrands
        });
      }
    });
  
    return result;
  }