"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const shadeOptions = ['All', 'Fair', 'Light', 'Medium', 'Tan', 'Deep', 'Rich'];
const undertoneOptions = ['All', 'Neutral', 'Pink', 'Yellow'];
const colorOptions = [
  { name: 'Ivory', hex: '#FFEFD5' },
  { name: 'Beige', hex: '#F5DEB3' },
  { name: 'Sand', hex: '#F4A460' },
  { name: 'Golden', hex: '#DAA520' },
];
const sizeOptions = ['5ml'];

export default function ProductSelector() {
  const [selectedShade, setSelectedShade] = useState('Fair');
  const [selectedUndertone, setSelectedUndertone] = useState('Pink');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Shade</h3>
        <div className="flex flex-wrap gap-2">
          {shadeOptions.map((shade) => (
            <button
              key={shade}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedShade === shade
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedShade(shade)}
            >
              {shade}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Undertone</h3>
        <div className="flex flex-wrap gap-2">
          {undertoneOptions.map((undertone) => (
            <button
              key={undertone}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedUndertone === undertone
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedUndertone(undertone)}
            >
              {undertone}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Colour</h3>
        <div className="flex gap-2 mb-2">
          {colorOptions.map((color, index) => (
            <button
              key={color.name}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor.name === color.name ? 'border-black' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color)}
            >
              {index === 1 && (
                <div className="w-full h-full rounded-full bg-red-500 transform rotate-45"></div>
              )}
            </button>
          ))}
        </div>
        <div className="relative">
          <select
            className="w-full p-2 pr-8 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-black"
            value={selectedColor.name}
            onChange={(e) => setSelectedColor(colorOptions.find(c => c.name === e.target.value) || colorOptions[0])}
          >
            {colorOptions.map((color) => (
              <option key={color.name} value={color.name}>
                {color.name} - For very fair skin with pink hue
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Select Size</h3>
        <div className="flex gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 border rounded ${
                selectedSize === size
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-black hover:bg-gray-100'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}