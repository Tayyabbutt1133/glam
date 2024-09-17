"use client"


import { useCartStore } from '../../../../states/Cardstore';

const ButtonAddToCart = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    console.log(product);
    addToCart(product);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full lg:text-xs lg:py-1  bg-gray-900 hover:bg-hover ease duration-100 text-white py-2 mt-auto rounded-md"
    >
      ADD TO BAG
    </button>
  );
};

export default ButtonAddToCart;