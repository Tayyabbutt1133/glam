"use client";

import React, { useState } from 'react';
import creditCardType from 'credit-card-type';
import Image from 'next/image';
import master from '../../../public/card-logos/master.svg';
import visa from '../../../public/card-logos/visa.svg';
import paypal from '../../../public/card-logos/paypal.svg';
import american from '../../../public/card-logos/american-express.svg';
import maestro from '../../../public/card-logos/maestro.svg';
import { lexendDeca, jost } from '../../ui/fonts';

const Payments = () => {
  const [cardNumber, setCardNumber] = useState(''); // State for card number
  const [cardType, setCardType] = useState('');
  const [error, setError] = useState('');

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters

    // Validate if the input contains only numbers
    if (!/^\d*$/.test(value)) {
      setError('Card number is invalid. Please enter only numeric characters.');
      setCardType('');  // Clear card type if invalid input
      return;
    } else {
      setError('');  // Clear any previous error if input is valid
    }

    value = value.match(/.{1,4}/g)?.join(' ') || ''; // Group digits in sets of 4
    setCardNumber(value);

    if (value.replace(/\s+/g, '').length === 0) {
      setCardType('');  // Clear card type if input is empty
      return;
    }

    const cardInfo = creditCardType(value.replace(/\s+/g, ''));
    if (cardInfo.length) {
      setCardType(cardInfo[0].type);  // Set card type based on detected card
    } else {
      setCardType('');  // Clear card type if no match
    }
  };

  const getCardLogo = (type) => {
    switch (type) {
      case 'visa':
        return visa;
      case 'mastercard':
        return master;
      case 'paypal':
        return paypal;
      case 'american-express':
        return american;
      case 'maestro':
        return maestro;
      default:
        return null;  // Return null if no match
    }
  };

  const cardLogo = getCardLogo(cardType);  // Get the card logo outside of JSX

  return (
    <div className="mx-auto rounded-lg">
      <h2 className={`text-2xl font-medium -mt-4 mb-14 ${jost.className}`}>
        Add Credit/Debit Card
      </h2>
      <form>
        <div className="mb-6 relative">
          <input
            type="text"
            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
            placeholder="Card Number*"
            maxLength="19"
            onChange={handleCardNumberChange}
            value={cardNumber}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {cardLogo && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8">
              <Image
                src={cardLogo}
                alt={`${cardType} logo`}
                width={32}
                height={20}
                className="h-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="mb-6 flex space-x-4">
          <input
            type="text"
            className={`w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
            placeholder="Expiry Date* (MM/YY)"
          />
          <input
            type="text"
            className={`w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
            placeholder="CVV*"
            maxLength="4"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
            placeholder="Full Name*"
          />
        </div>
        <p className={`text-sm text-gray-500 mb-6 ${lexendDeca.className}`}>
          By providing your card information, you allow <span className="font-semibold">GlamBeauty International Ltd.</span> to charge your card for future payments in accordance with their terms.
        </p>
        <button
          type="submit"
          className={`w-[30%] uppercase bg-black text-white p-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-8 ${jost.className}`}
        >
          Save Card Details
        </button>
      </form>
    </div>
  );
};

export default Payments;
