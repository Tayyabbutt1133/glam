import React from 'react';
import Container from '../../../container';
import cat_one from '../../../../public/home_categories_banner/category_one.svg';
import cat_two from '../../../../public/home_categories_banner/category_two.svg';
import cat_three from '../../../../public/home_categories_banner/category_three.svg';
import cat_four from '../../../../public/home_categories_banner/category_four.svg';
import Image from 'next/image';
import Link from 'next/link';
import { jost } from '../../../ui/fonts';

export default function HomeCategory() {
  return (
    <>
          <Container>
              <div className=' py-16'>
          <h1 className={`text-2xl font-semibold mb-4 ${jost.className}`}>Shop by Category</h1>
        <div className="flex justify-between gap-4">
          <div className="w-1/4">
            <Image src={cat_one} alt="Makeup" className="rounded-lg object-cover cursor-pointer" />
          </div>
          <div className="w-1/4">
            <Image src={cat_two} alt="Lips" className="rounded-lg object-cover cursor-pointer" />
          </div>
          <div className="w-1/4">
            <Image src={cat_three} alt="Hair" className="rounded-lg object-cover cursor-pointer" />
          </div>
          <div className="w-1/4">
            <Image src={cat_four} alt="Fragrance" className="rounded-lg object-cover cursor-pointer" />
          </div>
                  </div>
                  </div>
      </Container>
    </>
  );
}
