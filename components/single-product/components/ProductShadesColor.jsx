"use client"
import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'

const shades = ['All', 'Fair', 'Light', 'Medium', 'Tan', 'Deep', 'Rich']
const undertones = ['All', 'Neutral', 'Pink', 'Yellow']
const colours = [
  { name: 'Ivory', description: 'For very fair skin with pink hue' },
  { name: 'Beige', description: 'For light skin with neutral undertones' },
  { name: 'Sand', description: 'For medium skin with warm undertones' },
  { name: 'Amber', description: 'For deep skin with golden undertones' },
]

export default function SkinToneSelector({product}) {

  const attributes = product?.attributes;
  // Find where attribute name is shade
  const shadeAttribute = attributes?.find(attribute => attribute.name.toLowerCase() === 'shade');

  // Use shadeAttribute options if available, otherwise use default shades
  const availableShades = shadeAttribute ? shadeAttribute.options : shades;

  const [selectedShade, setSelectedShade] = useState(availableShades[0] || 'All')
  const size = attributes?.find(attribute => attribute.name.toLowerCase() === 'size'); //set size name 
  const sizes = size?.options;
  console.log(attributes)
// {
//   id: 0,
//   name: 'Shade',
//   slug: 'Shade',
//   position: 0,
//   visible: false,
//   variation: true,
//   options: [ '135N', '320C' ]
// }


  const [selectedUndertone, setSelectedUndertone] = useState('All')
  const [selectedColour, setSelectedColour] = useState(colours[0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Shade</h3>
        <div className="flex flex-wrap gap-4">
          {availableShades.map((shade) => (
            <button
              key={shade}
              className={`text-sm ${
                selectedShade === shade
                  ? 'font-bold underline'
                  : 'opacity-50'
              }`}
              onClick={() => setSelectedShade(shade)}
            >
              {shade}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Undertone</h3>
        <div className="flex flex-wrap gap-4">
          {undertones.map((undertone) => (
            <button
              key={undertone}
              className={`text-sm ${
                selectedUndertone === undertone
                  ? 'font-bold underline'
                  : 'opacity-50'
              }`}
              onClick={() => setSelectedUndertone(undertone)}
            >
              {undertone}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Colour</h3>
        <div className="relative">
          <button
            className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="block truncate">{selectedColour.name} - {selectedColour.description}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </span>
          </button>
          {isOpen && (
            <div className="absolute  w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              {colours.map((colour) => (
                <button
                  key={colour.name}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                  onClick={() => {
                    setSelectedColour(colour)
                    setIsOpen(false)
                  }}
                >
                  {colour.name} - {colour.description}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {colours.map((colour) => (
          <div
            key={colour.name}
            className="w-8 h-8 rounded-full border border-gray-300"
            style={{ backgroundColor: colour.name.toLowerCase() }}
          ></div>
        ))}
      </div>
      {/* add sizes if available  */}

      {sizes && sizes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {size.trim()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}