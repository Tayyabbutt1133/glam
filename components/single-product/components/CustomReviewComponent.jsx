"use client";

import { useEffect, useState } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronRight,
  FilterIcon,
  SlidersHorizontal,
  ArrowBigLeft,
  ArrowBigRight,
  ChevronLeft,
  MoreHorizontal,
} from "lucide-react";
import imgss from "../../../public/product-slider/demo1.png";
import { jost, lexendDeca } from "../../ui/fonts";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../../ui/button";
import Text from "../../ui/Text";
import { MdKeyboardArrowDown } from "react-icons/md";

const reviews = [
  {
    id: 1,
    userName: "Rihanna",
    rating: 5,
    title: "Does not Smudge",
    comment: "Lorem ipsum dolor sit amet consectetur. Lectus tellus egestus ut quam feugiat. Mauris donec donec urna feugiat adipiscing at. Erat eu aliquet et mauris tempus neque. Tristique justo diam id adipiscing habitasse fames feugiat ipsum risus.",
    date: "25/05/2024",
    skinType: "Sensitive",
    helpful: 1,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    id: 2,
    userName: "Rachel",
    rating: 5,
    title: "Great Mascara for a Natural Look",
    comment: "Lorem ipsum dolor sit amet consectetur. Lectus tellus egestus ut quam feugiat. Mauris donec donec urna feugiat adipiscing at. Erat eu aliquet in mauris tempus neque. Tristique justo diam id adipiscing habitasse fames feugiat ipsum risus.",
    date: "21/03/2024",
    skinType: "Normal",
    helpful: 1,
    notHelpful: 1,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    id: 3,
    userName: "Nishel",
    rating: 5,
    title: "Game Changer",
    comment: "Lorem ipsum dolor sit amet consectetur. Lectus tellus egestus ut quam feugiat. Mauris donec donec urna feugiat adipiscing at. Erat eu aliquet in mauris tempus neque. Tristique justo diam id adipiscing habitasse fames feugiat ipsum risus.",
    date: "02/02/2024",
    skinType: "Combination",
    helpful: 1,
    notHelpful: 1,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
    // images: ["/placeholder.svg?height=100&width=100"],
  },
];

const FilterDropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`${lexendDeca.className} inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <ChevronDown className="ml-2 h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <a
                key={option}
                href="#"
                className={`${lexendDeca.className} block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewFilters = () => {
  const [showFilters, setShowFilters] = useState(false);
  const filterOptions = [
    { label: 'All Ratings', options: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'] },
    { label: 'All Age Ranges', options: ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'] },
    { label: 'All Skin Types', options: ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'] },
    { label: 'All Skin Tones', options: ['Fair', 'Light', 'Medium', 'Tan', 'Deep'] },
  ];

  return (
    <div className="relative">
      {!showFilters ? (
        <button
          className={`${lexendDeca.className} flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50`}
          onClick={() => setShowFilters(true)}
        >
          <Image src={filter} height={20} width={20}/>
          <span>Filters</span>
        </button>
      ) : (
        <div className="flex space-x-4">
          {filterOptions.map((filter, index) => (
            <FilterDropdown key={index} label={filter.label} options={filter.options} />
          ))}
        </div>
      )}
    </div>
  );
};

const SortBy = () => (
  <div className={`${lexendDeca.className} flex items-center`}>
    <span className="text-gray-700 mr-2">Sort By:</span>
    <select className="bg-transparent focus:outline-none text-gray-700 font-medium">
      <option>Most Recent</option>
      <option>Highest Rated</option>
      <option>Lowest Rated</option>
    </select>
  </div>
);

export default function Component() {
  const [isMounted, setIsMounted] = useState(false);
  const reviewsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [helpfulCounts, setHelpfulCounts] = useState(
    reviews.map((r) => ({ helpful: r.helpful, notHelpful: r.notHelpful }))
  );
  const totalReviews = 213;
  const averageRating = 4.94;
  const ratingCounts = [128, 50, 25, 14, 7];

  const handleHelpful = (index, isHelpful) => {
    setHelpfulCounts((prev) =>
      prev.map((count, i) =>
        i === index
          ? {
              ...count,
              helpful: isHelpful ? count.helpful + 1 : count.helpful,
              notHelpful: !isHelpful ? count.notHelpful + 1 : count.notHelpful,
            }
          : count
      )
    );
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const Filters = () => (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-md"
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        <SlidersHorizontal className=" hidden lg:block" /> Filters
      </button>
      {isFiltersOpen && (
        <div className="absolute top-full -left-10 sm:left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Rating</h3>
            {[5, 4, 3, 2, 1].map((stars) => (
              <label key={stars} className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" />
                <span>{stars} stars</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  const SortBy = () => (
    <Text style="sm" className={`${jost.className} flex items-center border border-b-01 rounded-lg py-1 px-3 mr-3 relative`}>
      <span className="text-light mr-2">Sort By:</span>
      <div className="relative inline-block">
        <select className="text-primary appearance-none bg-transparent pr-6 focus:outline-none">
          <option>Most Recent</option>
          <option>Highest Rated</option>
          <option>Lowest Rated</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-primary">
          <MdKeyboardArrowDown className="h-4 w-4 text-light" aria-hidden="true" />
        </div>
      </div>
    </Text>
  );

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <section className={`${lexendDeca.className} px-5 lg:px-7 xl:px-10`}>
      <div className="w-full mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold">{averageRating}</span>
              <div className="flex flex-col">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < Math.round(averageRating)
                          ? "text-[#000000] fill-current"
                          : "text-gray-200"
                      }
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Based On {totalReviews} Reviews
                </p>
              </div>
            </div>

            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={stars} className="flex items-center gap-2 mb-2">
                <span className="w-3">{stars}</span>
                <Star className="text-gray-400 fill-current" size={16} />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-full rounded-full"
                    style={{
                      width: `${(ratingCounts[index] / totalReviews) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="font-medium w-8">{ratingCounts[index]}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div className="grid grid-cols-3 gap-2">
              {[
                "/product-slider/demo2.png",
                "/product-slider/img1.png",
                "/product-slider/demo1.png",
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Product ${index + 1}`}
                  className="w-[110px] h-[170px] xl:w-44 xl:h-64 object-cover rounded"
                />
              ))}
            </div>
            <aside className="px-3 min-w-32">
              <button className="flex items-center">
                <span className="font-medium xl:text-xl">View All</span>
                <ChevronRight />
              </button>
            </aside>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <ReviewFilters />
          <div className="flex items-center gap-4">
            <SortBy />
            <button className={`${lexendDeca.className} rounded-md bg-gray-900 px-4 py-2 text-white text-sm font-medium`}>
              Write a review
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {currentReviews.map((review, index) => (
            <div key={index} className="border-b pb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                    {review.userName[0]}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold">{review.userName}</h3>
                      <span className="text-sm text-gray-500">Verified Buyer</span>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <h4 className="font-semibold mr-2">{review.title}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }
                          size={16}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{review.comment}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <img
                      src={review.brandLogo}
                      alt="Brand Logo"
                      className="h-6 mr-2"
                    />
                    <span>Originally posted on rimmel.com</span>
                  </div>
                  {review.images && (
                    <div className="flex space-x-2 mb-4">
                      {review.images.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`Review image ${imgIndex + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <button
                      className="flex items-center text-sm text-gray-500"
                      onClick={() => handleHelpful(index, true)}
                    >
                      <ThumbsUp size={14} className="mr-1 text-green-500" />
                      Yes ({helpfulCounts[index].helpful})
                    </button>
                    <button
                      className="flex items-center text-sm text-gray-500"
                      onClick={() => handleHelpful(index, false)}
                    >
                      <ThumbsDown size={14} className="mr-1 text-red-500" />
                      No ({helpfulCounts[index].notHelpful})
                    </button>
                    <button className="text-sm text-gray-500">
                      Report this review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(reviews.length / reviewsPerPage)))}
            disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}