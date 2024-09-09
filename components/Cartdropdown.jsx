import { useCartStore } from '../states/Cardstore'; // adjust the import based on your file structure
import Image from 'next/image';
import Link from 'next/link';

const Cartdropdown = () => {
  const { cartItems, removeItem } = useCartStore();

  // Helper function to ensure price is a number
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price); // Ensure price is a number
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white shadow-lg rounded-md p-6 z-50">
      <h2 className="text-lg font-bold mb-4">Your Bag ({cartItems.length})</h2>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md" />
                <div className="ml-4 flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm">Shade: {item.shade}</p>
                  <p className="text-gray-500 text-sm">Size: {item.size}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-right">£{item.price}</p>
              </li>
            ))}
          </ul>
          <button
            className="text-blue-500 text-sm hover:underline mb-4"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
          <hr className="my-4" />
          <div className="flex justify-between font-semibold">
            <p>Estimated Subtotal ({cartItems.length}):</p>
            <p>£{calculateSubtotal().toFixed(2)}</p>
          </div>
          <Link href="/cart">
            <button className="mt-4 w-full bg-black text-white py-3 rounded-md text-center font-semibold hover:bg-gray-900">
              VIEW BAG
            </button>
          </Link>
        </>
      ) : (
        <p className="text-center text-gray-500">Your bag is empty.</p>
      )}
    </div>
  );
};

export default Cartdropdown;
