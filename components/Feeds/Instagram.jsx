import React from 'react';
import Image from 'next/image';
import ig_one from '../../public/home_banners/feeds/IG_animation_one.svg';
import ig_two from '../../public/home_banners/feeds/IG_animation_two.svg';
import ig_three from '../../public/home_banners/feeds/IG_animation_three.svg';
import ig_four from '../../public/home_banners/feeds/IG_animation_four.svg';
import ig_five from '../../public/home_banners/feeds/IG_animation_five.svg';
import ig_six from '../../public/home_banners/feeds/IG_animation_six.svg';
import ig_seven from '../../public/home_banners/feeds/IG_animation_seven.svg';
import Container from '../container';

export default function Instagram() {
    return (
        <Container>
            <div className="p-5">
      <h2 className="font-semibold text-lg">SHOP OUR IG</h2>
      <div className="grid grid-cols-4 grid-rows-2 gap-2">
        <Image src={ig_one} alt="IG One" className="col-span-2 row-span-2 object-cover" />
        <Image src={ig_two} alt="IG Two" className="object-cover" />
        <Image src={ig_three} alt="IG Three" className="object-cover" />
        <Image src={ig_four} alt="IG Four" className="object-cover" />
        <Image src={ig_five} alt="IG Five" className="object-cover" />
        <Image src={ig_six} alt="IG Six" className="object-cover" />
        <Image src={ig_seven} alt="IG Seven" className="object-cover" />
      </div>
            </div>
            </Container>

  );
}
