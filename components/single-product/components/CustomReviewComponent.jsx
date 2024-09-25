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
    userName: "Rihanna",
    rating: 5,
    title: "Fantastic for Sensitive Skin",
    comment:
      "Lorem ipsum dolor sit amet, consectetur. Lectus tellus egestus ut quam feugiat. Mauris donec donec urna feugiat adipiscing at. Erat eu aliquet et mauris tempus neque. Tristique justo diam id adipiscing habitasse fames feugiat ipsum risus.",
    date: "25/05/2024",
    skinType: "Sensitive",
    helpful: 1,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Alexandra",
    rating: 4,
    title: "Smooth and Radiant Skin",
    comment:
      "Amazing product! My skin feels smoother and more radiant. I noticed a difference within a week. Will definitely repurchase.",
    date: "12/06/2024",
    skinType: "Oily",
    helpful: 3,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "James",
    rating: 2,
    title: "Dry Skin Warning",
    comment:
      "Not as great as I expected. It made my skin a bit dry, but maybe it works better for other skin types.",
    date: "01/07/2024",
    skinType: "Dry",
    helpful: 0,
    notHelpful: 2,
    images: ["/product-slider/demo1.png"],
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Emily",
    rating: 5,
    title: "Perfect for Sensitive Skin",
    comment:
      "This product is a game-changer! My skin has never looked better. I have sensitive skin, and it’s perfect for me.",
    date: "17/08/2024",
    skinType: "Sensitive",
    helpful: 5,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Michael",
    rating: 3,
    title: "Decent, But Not Amazing",
    comment:
      "It’s decent, but I expected more. My skin feels okay, but it didn’t live up to the hype for me.",
    date: "20/06/2024",
    skinType: "Combination",
    helpful: 2,
    notHelpful: 1,brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Sophie",
    rating: 4,
    title: "Soft Skin, Lacks Hydration",
    comment:
      "I’ve been using this for a month, and my skin feels softer. I wish it was a bit more hydrating, though.",
    date: "03/07/2024",
    skinType: "Dry",
    helpful: 1,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
    images: ["/product-slider/demo1.png"],
  },
  {
    userName: "David",
    rating: 5,
    title: "Best for Oily Skin",
    comment:
      "One of the best products I’ve ever used. My oily skin loves it, and I haven’t had breakouts since using it.",
    date: "10/06/2024",
    skinType: "Oily",
    helpful: 4,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Jessica",
    rating: 4,
    title: "Great, But Pricey",
    comment:
      "Great product overall. My skin feels clearer, but it’s a bit pricey for the size of the bottle.",
    date: "29/05/2024",
    skinType: "Combination",
    helpful: 2,
    notHelpful: 1,brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Daniel",
    rating: 1,
    title: "Irritated My Skin",
    comment:
      "Did not work for me at all. My skin got irritated, and I had to stop using it after a few days.",
    date: "22/06/2024",
    skinType: "Sensitive",
    helpful: 0,
    notHelpful: 3,brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Olivia",
    rating: 5,
    title: "Glowing and Rejuvenated Skin",
    comment:
      "Absolutely love this! My skin feels rejuvenated and glowing. It’s a staple in my skincare routine now.",
    date: "30/07/2024",
    skinType: "Normal",
    images: ["/product-slider/demo2.png"],

    helpful: 6,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Sophie",
    rating: 4,
    title: "Soft Skin, Lacks Hydration",
    comment:
      "I’ve been using this for a month, and my skin feels softer. I wish it was a bit more hydrating, though.",
    date: "03/07/2024",
    skinType: "Dry",
    helpful: 1,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
    images: ["/product-slider/demo1.png"],
  },
  {
    userName: "David",
    rating: 5,
    title: "Best for Oily Skin",
    comment:
      "One of the best products I’ve ever used. My oily skin loves it, and I haven’t had breakouts since using it.",
    date: "10/06/2024",
    skinType: "Oily",
    helpful: 4,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Jessica",
    rating: 4,
    title: "Great, But Pricey",
    comment:
      "Great product overall. My skin feels clearer, but it’s a bit pricey for the size of the bottle.",
    date: "29/05/2024",
    skinType: "Combination",
    helpful: 2,
    notHelpful: 1,brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Daniel",
    rating: 1,
    title: "Irritated My Skin",
    comment:
      "Did not work for me at all. My skin got irritated, and I had to stop using it after a few days.",
    date: "22/06/2024",
    skinType: "Sensitive",
    helpful: 0,
    notHelpful: 3,brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
  {
    userName: "Olivia",
    rating: 5,
    title: "Glowing and Rejuvenated Skin",
    comment:
      "Absolutely love this! My skin feels rejuvenated and glowing. It’s a staple in my skincare routine now.",
    date: "30/07/2024",
    skinType: "Normal",
    images: ["/product-slider/demo2.png"],

    helpful: 6,
    notHelpful: 0,
    brandLogo: "/home_banners/max-factor-logo-two.svg",
  },
];

export default function Component() {
    const [isMounted, setIsMounted] = useState(false);
  const reviewsPerPage = 3; // Number of reviews per page
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [helpfulCounts, setHelpfulCounts] = useState(
    reviews.map((r) => ({ helpful: r.helpful, notHelpful: r.notHelpful }))
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMobileDot, setIsMobileDot] = useState(null);
  const totalReviews = 213;
  const averageRating = 4.94;
  const ratingCounts = [128, 50, 25, 14, 7];

  const totalPages = Math.ceil(reviews.length / reviewsPerPage); // Total number of pages

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

  // Get the reviews to display on the current page
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
    <section className=" px-5 lg:px-7 xl:px-10">
      <div className="py-4 bg-white lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Reviews (65)</h2>
          <button className="px-4 py-2 text-sm font-medium text-white bg-white border border-gray-300 bg-[#404040] rounded-lg">
            Leave Review
          </button>
        </div>

        <div className="flex items-center justify-between w-3/4 mx-auto mb-4">
          <div className={`${jost.className} flex items-center`}>
            <span className=" text-[#8B929D] text-sm hidden lg:inline">
              Sort By:
            </span>
            <select className="rounded p-2 mr-2">
              <option className=" text-[#8B929D] text-sm ">
                <span className="">Sort By</span>
              </option>
              <option>Most Recent</option>
              <option>Highest Rated</option>
              <option>Lowest Rated</option>
            </select>
          </div>
          <Filters />
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="font-semibold">4.94</div>
          <div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < 5 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }
                  size={14}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <span className="bg-[#F7EBE0] text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
            good quality(1)
          </span>
          <span className="bg-[#F7EBE0] text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
            long lasting(3)
          </span>
        </div>

        <div className="space-y-4">
          {currentReviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className=" flex  items-center gap-5">
                    <p className="font-medium text-sm">{review.userName}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < review.rating
                              ? "text-[#404040] fill-current"
                              : "text-gray-200 fill-current"
                          }
                          size={12}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#8b929d]">{review.date}</span>
              </div>
              <p className="text-xs text-[#8b929d] font-medium mb-2">
                <span className=" font-medium">Skin Type:</span>{" "}
                {review.skinType}
              </p>
              <p className="text-sm mb-2">{review.comment}</p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex text-[#8b929d]  space-x-4 font-medium">
                  <button>Translate</button>
                </div>
                <aside className=" flex items-center text-[#8b929d]  gap-4">
                  <button className="flex items-center">
                    <ThumbsUp size={12} className="mr-1" /> Helpful (2)
                  </button>
                  <div className="relative">
                    <button onClick={() => setIsMobileDot((prev) => {
                        return prev === index ? null : index
                    })}>
                      <MoreHorizontal size={16} />
                    </button>

                    {isMobileDot== index && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <ul className="py-1">
                          <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Report Spam
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mx-auto p-6 bg-white rounded-lg hidden lg:block">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold">{averageRating}</span>
              <div className="lg:flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < Math.round(averageRating)
                          ? "text-[#000000] fill-current"
                          : "text-gray-50"
                      }
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-sm text-[#8b929d]">
                  Based On {totalReviews} Reviews
                </p>
              </div>
            </div>

            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={stars} className="flex items-center gap-2 mb-2">
                <span className="w-3">{stars}</span>
                <Star className="text-[#7E7E7E] fill-current" size={16} />
                <div className="flex-1 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-full rounded-full"
                    style={{
                      width: `${(ratingCounts[index] / totalReviews) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className=" font-medium  w-8">{ratingCounts[index]}</span>
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
                  className=" w-[110px] h-[170px] xl:w-44 xl:h-64 object-cover rounded"
                />
              ))}
            </div>
            <aside className="px-3 min-w-32">
              <button className=" flex items-center">
                <span className="font-medium xl:text-xl ">View All</span>
                <ChevronRight />
              </button>
            </aside>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-md"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <SlidersHorizontal /> Filters
              </button>
              {isFiltersOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
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

            <div className="flex items-center gap-1">
              <SortBy />
              <button
                className={`${jost.className} rounded-lg bg-[#202020] px-6 py-2 text-white`}
              >
                Write a Review
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 lg:px-8 xl:px-14 2xl:px-20">
            {currentReviews.map((review, index) => (
              <div key={index} className="mb-6 flex items-center ">
                <section className=" w-[27%]  xl:w-[22%] 2xl:w-[20%]  flex flex-col  justify-start mb-auto mt-2">
                  <div className=" flex items-center">
                    <aside className=" relative ">
                      <img
                        src={"/product-slider/demo1.png"}
                        alt={review.userName}
                        className="object-cover size-12 rounded-full brightness-125 "
                      />
                      <FaCheckCircle className=" absolute size-5 -bottom-1 -right-1" />
                    </aside>
                    <div className=" mx-2 items-center gap-2">
                      <h3 className="font-bold">{review.userName}</h3>
                      <span className="text-sm text-[#8b929d]">
                        Verified Buyer
                      </span>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${lexendDeca.className} text-[#8B929D] mt-4 `}
                  >
                    Skin Type{" "}
                    <span className=" text-[#202020] font-normal ml-3 xl:ml-5 2xl:ml-7">
                      {review.skinType}
                    </span>
                  </span>
                </section>

                <section className=" w-[73%]  xl:w-[78%] 2xl:w-[80%] ">
                  <aside className=" flex items-center my-2">
                    <h4 className="font-bold w-">{review.title}</h4>
                    <div className="flex items-center ml-5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < review.rating
                              ? "text-[#7E7E7E] fill-current"
                              : "text-gray-300"
                          }
                          size={16}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#8b929d] ml-auto">
                      {review.date}
                    </span>
                  </aside>
                  <p className="text-sm mb-4 w-3/4">{review.comment}</p>
                  <div className="flex items-center gap-4 text-sm text-[#8b929d]">
                    <img
                      src={review.brandLogo}
                      alt={review.userName}
                      className=" h-14"
                    />
                    <span>Originally posted on rimmel.com</span>
                  </div>
                 
                 
                 
                 <section className=" flex my-2">
                      {
                        review?.images && review?.images?.length > 0 && review?.images.map((img, index) => (
                            <img
                                src={img}
                                alt={review.userName}
                                key={index}
                                className="w-20 h-20 xl:h-28 xl:w-28 2xl:w-36 object-cover rounded-lg"
                            />
                        ))
                      }
                 </section>
                 
                 
                 
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      className="flex items-center gap-2 px-4 py-2  "
                      onClick={() => handleHelpful(index, true)}
                    >
                      <ThumbsUp size={16} className=" text-[#008A06]" />
                      Yes ({helpfulCounts[index].helpful})
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2  "
                      onClick={() => handleHelpful(index, false)}
                    >
                      <ThumbsDown size={16} className=" text-[#BF0000]" />
                      No ({helpfulCounts[index].notHelpful})
                    </button>
                    <span className="text-sm text-[#7E7E7E] cursor-pointer underline underline-offset-1">
                      Report this review
                    </span>
                  </div>
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="flex justify-center items-center space-x-2 my-4">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white   disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>

        {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map(
          (_, index, pagesArray) => {
            const totalPages = pagesArray.length;
            const firstPage = 1;
            const lastPage = totalPages;
            const leftBound = Math.max(currentPage - 2, 2); // Two pages to the left of the current
            const rightBound = Math.min(currentPage + 1, totalPages - 1); // Two pages to the right of the current

            // Always show the first page
            if (index === 0) {
              return (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border ${
                    currentPage === index + 1
                      ? "border-indigo-500 bg-gray-200 text-gray-800"
                      : "border-gray-300 bg-white text-gray-800"
                  } rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              );
            }

            // Always show the last page
            if (index === totalPages - 1) {
              return (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border ${
                    currentPage === index + 1
                      ? "border-indigo-500 bg-gray-200 text-gray-800"
                      : "border-gray-300 bg-white text-gray-800"
                  } rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              );
            }

            // Ellipsis before left bound (i.e., after first page)
            if (index === leftBound - 1 && leftBound > 2) {
              return (
                <span key={index} className="px-4 py-2 text-sm text-gray-700">
                  ...
                </span>
              );
            }

            // Show pages within the left and right bounds
            if (index + 1 >= leftBound && index + 1 <= rightBound) {
              return (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border ${
                    currentPage === index + 1
                      ? "border-indigo-500 bg-gray-200 text-gray-800"
                      : "border-gray-300 bg-white text-gray-800"
                  } rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              );
            }

            // Ellipsis after right bound (i.e., before last page)
            if (index === rightBound && rightBound < totalPages - 1) {
              return (
                <span key={index} className="px-4 py-2 text-sm text-gray-700">
                  ...
                </span>
              );
            }

            // Don't render other pages
            return null;
          }
        )}

        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white   disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(reviews.length / reviewsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)}
        >
          <ChevronRight />
        </button>
      </section>
    </section>
  );
}
