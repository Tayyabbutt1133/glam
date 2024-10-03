"use client"
import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { jost } from '../../../components/ui/fonts'

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
  const handleColorClick = (colour) => {
    setSelectedColour(colour);
    setIsOpen(false); // Close the dropdown if a circle is clicked
  };
  return (
    <div className={`${jost.className} w-full  py-4 px-2 bg-white rounded-lg`}>
      {/* <div className="mb-4 w-full"> */}
        {/* <h3 className="text-xl font-semibold text-gray-700 mb-2">Shade</h3> */}
        {/* <div className="flex flex-wrap gap-3 text-[9px] sm:text-sm  sm:gap-4">
          {availableShades.map((shade) => (
            <button
              key={shade}
              className={`text-sm ${
                selectedShade === shade
                  ? 'font-semibold underline underline-offset-4 '
                  : 'opacity-40'
              }`}
              onClick={() => setSelectedShade(shade)}
            >
              {shade}
            </button>
          ))}
        </div> */}
      {/* </div> */}

      {/* <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Undertone</h3>
        <div className="flex  flex-nowrap gap-4 text-[9px] sm:text-sm">
          {undertones.map((undertone) => (
            <button
              key={undertone}
              className={`text-sm ${
                selectedUndertone === undertone
                  ? 'font-bold underline underline-offset-4'
                  : 'opacity-50'
              }`}
              onClick={() => setSelectedUndertone(undertone)}
            >
              {undertone}
            </button>
          ))}
        </div>
      </div> */}


      <div className="">
    <h3 className="text-xl font-semibold text-gray-700 mb-2">Colour</h3>

    {/* Color Circles */}
    <div className="flex gap-2 mb-4">
      {colours.map((colour) => (
        <div
          key={colour.name}
          className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
            selectedColour.name === colour.name ? 'border-slate-400' : 'border-gray-100'
          }`}
          style={{ backgroundColor: colour.name.toLowerCase() }}
          onClick={() => handleColorClick(colour)}
        ></div>
      ))}
    </div>

    {/* Color Select Dropdown */}
    <div className="relative lg:w-2/3 xl:w-8/12">
      <button
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          
          <span className="block truncate">
            {selectedColour.name} - {selectedColour.description}
          </span>
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </span>
      </button>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {colours.map((colour) => (
            <button
              key={colour.name}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
              onClick={() => handleColorClick(colour)}
            >
             
              <span>
                {colour.name} - {colour.description}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
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