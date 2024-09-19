import React from 'react'
import Container from './container'
import Image from 'next/image'
import trust_reviews from '../public/home_banners/Trust Pilot Reviews.svg';

export default function Trustpilot() {
  return (
      <>
          <Container>
              <div className='mb-12'>
                  <Image src={trust_reviews} alt='trust-pilot'/>
              </div>

      </Container>
      </>
  )
}
