"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from '../../../container';
import brand_one from '../../../../public/home_banners/brand_one.svg';
import brand_two from '../../../../public/home_banners/brand_two.svg';
import brand_three from '../../../../public/home_banners/brand_three.svg';
import brand_four from '../../../../public/home_banners/brand_four.svg';
import brand_slide from '../../../../public/home_banners/brand_slide.svg';
import Text from '../../../ui/Text';
import { jost, lexendDeca } from '../../../ui/fonts';
// import { jost } from '../../../ui/fonts';
// import

const HomeBrand = () => {
  const router = useRouter();

  const products = [
    { id: 1, name: 'CLINIQUE', description: 'Discover Clinique\'s Anti-Wrinkle sunscreen', image: brand_one },
    { id: 2, name: 'ESTEE LAUDER', description: 'Discover Clinique\'s Anti-Wrinkle sunscreen', image: brand_two },
    { id: 3, name: 'SCHWARZKOPF', description: 'Discover Clinique\'s Anti-Wrinkle sunscreen', image: brand_three },
    { id: 4, name: 'JIMMY CHOO', description: 'Discover Clinique\'s Anti-Wrinkle sunscreen', image: brand_four },
  ];

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <Container>
      <div className="px-4 py-16 space-y-10">
        <h2 className={`text-2xl font-semibold ${jost.className}`}>SHOP BY BRAND</h2>
        <Image src={brand_slide}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer bg-transparent rounded-lg overflow-hidden transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative w-full h-64">
                <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" />
              </div>

              {/* Product Info */}
              <div className="px-4 py-6 text-left">
                <h3 className={`text-lg font-semibold text-gray-900 ${jost.className}`}>{product.name}</h3>
                <p className={`text-black text-sm my-2 ${lexendDeca.className}`}>{product.description}</p>
                <button className={`mt-4 bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-200 ${jost.className}`}>
                  SHOP NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomeBrand;
