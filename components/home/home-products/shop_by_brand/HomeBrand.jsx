"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from '../../../container';
import brand_one from '../../../../public/home_banners/brand_one.svg';
import brand_two from '../../../../public/home_banners/brand_two.svg';
import brand_three from '../../../../public/home_banners/brand_three.svg';
import brand_four from '../../../../public/home_banners/brand_four.svg';
import { jost, lexendDeca } from '../../../ui/fonts';
import BrandSlide from './BrandSlide';


const HomeBrand = () => {
  const router = useRouter();

  //`The ids are demo ids
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
        {/* <Image src={brand_slide}/> */}
        <BrandSlide/>
        <div className="flex overflow-x-auto pb-4 space-x-4 lg:grid lg:grid-cols-4 lg:gap-8 lg:space-x-0 scrollbar-hide">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer bg-transparent overflow-hidden transition-shadow duration-300 flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-full "
            >
              {/* Product Image */}
              <div className="relative sm:w-full h-[120px] sm:h-72 2xl:h-[390px] w-[150px]">
                <Image className='rounded-md 2xl:rounded-lg brightness-75 sm:brightness-100' src={product.image} alt={product.name} layout="fill" objectFit="cover" />
                <h3 className={` sm:hidden text-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-gray-50 ${jost.className}`}>{product.name}</h3>

              </div>

              {/* Product Info */}
              <div className="px-4 py-6 text-left">
                <h3 className={`hidden sm:block text-lg font-semibold text-gray-900 ${jost.className}`}>{product.name}</h3>
                <p className={`text-black text-xs sm:text-sm my-2  ${lexendDeca.className}`}>{product.description}</p>
                <button className={`sm:mt-4 bg-black text-white text-xs sm:text-sm py-2 sm:px-6 px-2 rounded-md hover:bg-gray-800 transition duration-200 ${jost.className}`}>
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
