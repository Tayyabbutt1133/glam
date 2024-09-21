"use client";

import React, { useState } from "react";
import creditCardType from "credit-card-type";
import Image from "next/image";
import master from "../../../public/card-logos/master.svg";
import visa from "../../../public/card-logos/visa.svg";
import paypal from "../../../public/card-logos/paypal.svg";
import american from "../../../public/card-logos/american-express.svg";
import maestro from "../../../public/card-logos/maestro.svg";
import { lexendDeca, jost } from "../../ui/fonts";
import { FaPencilAlt, FaPlus } from 'react-icons/fa';

const Payments = () => {
  const [cardNumber, setCardNumber] = useState(""); // State for card number
  const [cardType, setCardType] = useState("");
  const [error, setError] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [fullName, setFullName] = useState("");
  const [cvv, setCvv] = useState("");
  const [cards, setCards] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState(null);

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters

    // Validate if the input contains only numbers
    if (!/^\d*$/.test(value)) {
      setError("Card number is invalid. Please enter only numeric characters.");
      setCardType(""); // Clear card type if invalid input
      return;
    } else {
      setError(""); // Clear any previous error if input is valid
    }

    value = value.match(/.{1,4}/g)?.join(" ") || ""; // Group digits in sets of 4
    setCardNumber(value);

    if (value.replace(/\s+/g, "").length === 0) {
      setCardType(""); // Clear card type if input is empty
      return;
    }

    const cardInfo = creditCardType(value.replace(/\s+/g, ""));
    if (cardInfo.length) {
      setCardType(cardInfo[0].type); // Set card type based on detected card
    } else {
      setCardType(""); // Clear card type if no match
    }
  };

  const getCardLogo = (type) => {
    switch (type) {
      case "visa":
        return visa;
      case "mastercard":
        return master;
      case "paypal":
        return paypal;
      case "american-express":
        return american;
      case "maestro":
        return maestro;
      default:
        return null; // Return null if no match
    }
  };
  //`Form Validation`
  const validateForm = () => {
    const errors = {};
    if (cardNumber.replace(/\s/g, "").length < 13) {
      errors.cardNumber = "Invalid card number";
    }
    if (expiryDate.length !== 5) {
      errors.expiryDate = "Invalid expiry date";
    }
    if (cvv.length < 3) {
      errors.cvv = "Invalid CVV";
    }
    if (fullName.trim().length === 0) {
      errors.fullName = "Full name is required";
    }
    return errors;
  };
  const cardLogo = getCardLogo(cardType); // Get the card logo outside of JSX

  //`To add / in the expiry date`
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const newCard = {
        cardType,
        cardNumber,
        expiryDate,
        cvv,
        fullName
      };
      
      if (editingCardIndex !== null) {
        // Update existing card
        const updatedCards = [...cards];
        updatedCards[editingCardIndex] = newCard;
        setCards(updatedCards);
      } else {
        // Add new card
        setCards([...cards, newCard]);
      }
      
      // Reset form and close it
      resetForm();
      setIsFormOpen(false);
      setEditingCardIndex(null);
    } else {
      setFormErrors(errors);
    }
  };
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleEditCard = (index) => {
    const cardToEdit = cards[index];
    setCardNumber(cardToEdit.cardNumber);
    setCardType(cardToEdit.cardType);
    setExpiryDate(cardToEdit.expiryDate);
    setCvv(cardToEdit.cvv);
    setFullName(cardToEdit.fullName);
    setEditingCardIndex(index);
    setIsFormOpen(true);
  };
  const resetForm = () => {
    setCardNumber("");
    setCardType("");
    setExpiryDate("");
    setCvv("");
    setFullName("");
    setFormErrors({});
  };

  return (
    <div className="mx-auto rounded-lg">
      <h2
        className={`text-2xl font-medium mt-2 mb-4 md:mb-14 md:-mt-4 ${jost.className}`}
      >
        Add Credit/Debit Card
      </h2>
      {cards.length > 0 && (
        <div className="mb-6">
          <h3 className={`text-xl font-medium mb-4 ${jost.className}`}>
            Your Cards
          </h3>
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-2 p-3 border rounded-md"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={getCardLogo(card.cardType)}
                  alt={`${card.cardType} logo`}
                  width={32}
                  height={20}
                />
                <div className="flex flex-col">
                  <span>**** **** **** **** {card.cardNumber.slice(-4)}</span>
                  <span className=" text-sm text-gray-500">{card.expiryDate}<span className="text-gray-500 text-sm ml-2 font-mono rounded-3xl border border-gray-300 p-1 px-2">CVV</span></span>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <FaPencilAlt onClick={() => handleEditCard(index)} />
              </button>
            </div>
          ))}
        </div>
      )}

      {!isFormOpen && (
        <button
          className={`flex items-center justify-center w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-500 ${jost.className}`}
          onClick={() => setIsFormOpen(true)}
        >
          <FaPlus className="mr-2" /> Add New Card
        </button>
      )}
      {isFormOpen && (
        <form onSubmit={handleSubmit}>
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
            {formErrors.cardNumber && (
              <p className="text-red-500 text-sm mt-2">
                {formErrors.cardNumber}
              </p>
            )}
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
              maxLength="5"
              value={expiryDate}
              onChange={handleExpiryDateChange}
            />
            {formErrors.expiryDate && (
              <p className="text-red-500 text-sm mt-2">
                {formErrors.expiryDate}
              </p>
            )}
            <input
              type="text"
              className={`w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
              placeholder="CVV*"
              maxLength="4"
              value={cvv}
              onChange={handleCvvChange}
            />
            {formErrors.cvv && (
              <p className="text-red-500 text-sm mt-2">{formErrors.cvv}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="text"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
              placeholder="Full Name*"
              value={fullName}
              onChange={handleFullNameChange}
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-sm mt-2">{formErrors.fullName}</p>
            )}
          </div>
          <p className={`text-sm text-gray-500 mb-6 ${lexendDeca.className}`}>
            By providing your card information, you allow{" "}
            <span className="font-semibold">GlamBeauty International Ltd.</span>{" "}
            to charge your card for future payments in accordance with their
            terms.
          </p>
          <button
            type="submit"
            className={`md:w-[30%] w-full uppercase bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-8 ${jost.className}`}
          >
            Save Card Details
          </button>
        </form>
      )}
    </div>
  );
};

export default Payments;
