import Image from 'next/image'
import { useState } from 'react'
import { Star, Heart, ChevronDown, ThumbsUp, ThumbsDown, Flag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-1 space-y-4">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Product image ${index + 1}`}
            width={80}
            height={80}
            className={`cursor-pointer ${activeImage === img ? 'border-2 border-black' : ''}`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>
      <div className="col-span-4">
        <Image src={activeImage} alt="Active product image" width={400} height={400} className="w-full" />
      </div>
    </div>
  )
}

const ProductInfo = ({ product }) => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">{product.name}</h1>
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} size={20} />
        ))}
      </div>
      <span className="text-sm text-gray-600">{product.reviewCount} Reviews</span>
    </div>
    <p className="text-xl font-bold">£{product.price}</p>
    <div>
      <h3 className="font-semibold mb-2">Size</h3>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {product.sizes.map((size) => (
            <SelectItem key={size} value={size}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div>
      <h3 className="font-semibold mb-2">Purchase options</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input type="radio" id="one-time" name="purchase" value="one-time" defaultChecked />
          <label htmlFor="one-time">One-time purchase</label>
        </div>
        <div className="flex items-center space-x-2">
          <input type="radio" id="subscribe" name="purchase" value="subscribe" />
          <label htmlFor="subscribe">Subscribe & save 10%</label>
        </div>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <Select defaultValue="1">
        <SelectTrigger className="w-20">
          <SelectValue placeholder="Qty" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5].map((qty) => (
            <SelectItem key={qty} value={qty.toString()}>{qty}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button className="flex-grow">Add to Bag</Button>
    </div>
  </div>
)

const ProductDetails = ({ product }) => (
  <div className="grid grid-cols-2 gap-8 mt-8">
    <div className="space-y-4">
      <Image src={product.detailImage1} alt="Product detail 1" width={300} height={400} />
      <Image src={product.detailImage2} alt="Product detail 2" width={300} height={400} />
    </div>
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="description">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>{product.description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="benefits">
          <AccordionTrigger>Benefits</AccordionTrigger>
          <AccordionContent>{product.benefits}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="how-to-use">
          <AccordionTrigger>How To Use</AccordionTrigger>
          <AccordionContent>{product.howToUse}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="delivery-returns">
          <AccordionTrigger>Delivery & Returns</AccordionTrigger>
          <AccordionContent>{product.deliveryReturns}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
)

const FrequentlyBoughtTogether = ({ products }) => (
  <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">Frequently Bought Together</h2>
    <div className="grid grid-cols-3 gap-4">
      {products.map((product, index) => (
        <div key={index} className="border p-4 rounded-lg">
          <Image src={product.image} alt={product.name} width={150} height={150} className="mx-auto mb-2" />
          <h3 className="font-semibold text-center">{product.name}</h3>
          <p className="text-center">£{product.price}</p>
          <Button variant="outline" className="w-full mt-2">Add to Bag</Button>
        </div>
      ))}
    </div>
  </div>
)

const ProductCarousel = ({ title, products }) => (
  <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {products.map((product, index) => (
        <div key={index} className="flex-shrink-0 w-48 border rounded-lg p-4">
          <Image src={product.image} alt={product.name} width={150} height={150} className="mx-auto mb-2" />
          <h3 className="font-semibold text-center">{product.name}</h3>
          <div className="flex justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} size={16} />
            ))}
          </div>
          <p className="text-center mt-1">£{product.price}</p>
          <Button variant="outline" className="w-full mt-2">Add to Bag</Button>
        </div>
      ))}
    </div>
  </div>
)

const CustomerReviews = ({ reviews, totalReviews, averageRating }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 3

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-4xl font-bold">{averageRating}</div>
        <div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} size={20} />
            ))}
          </div>
          <p className="text-sm text-gray-600">Based on {totalReviews} reviews</p>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All skin types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All skin types</SelectItem>
            <SelectItem value="dry">Dry</SelectItem>
            <SelectItem value="oily">Oily</SelectItem>
            <SelectItem value="combination">Combination</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All age ranges" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All age ranges</SelectItem>
            <SelectItem value="18-24">18-24</SelectItem>
            <SelectItem value="25-34">25-34</SelectItem>
            <SelectItem value="35-44">35-44</SelectItem>
            <SelectItem value="45+">45+</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All skin tones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All skin tones</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage).map((review, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex items-center space-x-4 mb-2">
              <Image src={review.userImage} alt={review.userName} width={40} height={40} className="rounded-full" />
              <div>
                <p className="font-semibold">{review.userName}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} size={16} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mb-2">{review.comment}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{review.date}</span>
              <button className="flex items-center"><ThumbsUp size={16} className="mr-1" /> Like</button>
              <button className="flex items-center"><ThumbsDown size={16} className="mr-1" /> Dislike</button>
              <button className="flex items-center"><Flag size={16} className="mr-1" /> Report</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

const RecentlyViewed = ({ products }) => (
  <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {products.map((product, index) => (
        <div key={index} className="flex-shrink-0 w-48">
          <Image src={product.image} alt={product.name} width={150} height={150} className="mx-auto mb-2" />
          <h3 className="font-semibold text-center">{product.name}</h3>
          <p className="text-center">£{product.price}</p>
        </div>
      ))}
    </div>
  </div>
)

export default function ProductPage() {
  const product = {
    name: "RIMMEL Wonder'Bond Bonding Mascara - 001 Black 11ml",
    price: 9.99,
    rating: 4,
    reviewCount: 52,
    sizes: ["11ml"],
    description: "Rimmel Wonder'Bond Bonding Mascara is a revolutionary mascara that bonds to your lashes for extreme volume and length.",
    benefits: "Extreme volume and length, Long-lasting formula, Smudge-proof and flake-proof",
    howToUse: "Apply from root to tip, building layers for desired volume and length.",
    deliveryReturns: "Free delivery on orders over £30. Returns accepted within 30 days of purchase.",
    detailImage1: "/placeholder.svg?height=400&width=300",
    detailImage2: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=80&width=80",
      "/placeholder.svg?height=80&width=80",
      "/placeholder.svg?height=80&width=80",
      "/placeholder.svg?height=80&width=80",
    ],
  }

  const frequentlyBoughtTogether = [
    { name: "Eyeliner", price: 7.99, image: "/placeholder.svg?height=150&width=150" },
    { name: "Eyeshadow Palette", price: 14.99, image: "/placeholder.svg?height=150&width=150" },
    { name: "Makeup Remover", price: 5.99, image: "/placeholder.svg?height=150&width=150" },
  ]

  const othersBuying = [
    { name: "Lipstick", price: 8.99, rating: 4, image: "/placeholder.svg?height=150&width=150" },
    { name: "Foundation", price: 12.99, rating: 5, image: "/placeholder.svg?height=150&width=150" },
    { name: "Blush", price: 9.99, rating: 4, image: "/placeholder.svg?height=150&width=150" },
    { name: "Concealer", price: 7.99, rating: 3, image: "/placeholder.svg?height=150&width=150" },
  ]

  const reviews = [
    {
      userName: "Jane Doe",
      userImage: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "Great mascara! It really adds volume to my lashes.",
      date: "25/05/2023",
    },
    {
      userName: "John Smith",
      userImage: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment: "Good product, but a bit pricey.",
      date: "21/05/2023",
    },
    {
      userName: "Alice Johnson",
      userImage: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "Absolutely love this mascara! It's long-lasting and doesn't smudge.",
      date: "18/05/2023",
    },
  ]

  const recentlyViewed = [
    { name: "Face Cream", price: 19.99, image: "/placeholder.svg?height=150&width=150" },
    { name: "Nail Polish", price: 5.99, image: "/placeholder.svg?height=150&width=150" },
    { name: "Hair Serum", price: 14.99, image: "/placeholder.svg?height=150&width=150" },
    { name: "Body Lotion", price: 8.99, image: "/placeholder.svg?height=150&width=150" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ProductImages images={product.images} />
        <ProductInfo product={product} />
      </div>
      <ProductDetails product={product} />
      <FrequentlyBoughtTogether products={frequentlyBoughtTogether} />
      <ProductCarousel title="See What Others Are Buying" products={othersBuying} />
      <CustomerReviews reviews={reviews} totalReviews={52} averageRating={4.2} />
      <RecentlyViewed products={recentlyViewed} />
    </div>
  )
}