export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  export const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Enter a valid email address";
        }
        break;
      case "firstName":
      case "lastName":
      case "address":
      case "city":
      case "postcode":
      case "phone":
      case "country":
        if (!value) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        break;
      case "cardNumber":
        if (!value) {
          error = "Card number is required";
        } else if (!/^\d{15,16}$/.test(value.replace(/\s/g, ""))) {
          error = "Enter a valid card number";
        }
        break;
    }
    return error;
  };