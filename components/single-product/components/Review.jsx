"use client";
import { useState } from "react";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { ArrowBigLeft, ArrowBigRight, ArrowBigRightDash } from "lucide-react";

const reviewsdemo = [
  {
    userName: "Emily",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 5,
    comment: "This foundation gives a flawless finish. I'm impressed!",
    date: "25/05/2023",
    likes: 10,
    dislikes: 2,
  },
  {
    userName: "Michael",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 4,
    comment: "Decent cologne, but the scent doesn't last as long as I'd like.",
    date: "21/05/2023",
    likes: 8,
    dislikes: 1,
  },
  {
    userName: "Sophia",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 5,
    comment: "This lipstick is my new favorite! The color payoff is amazing.",
    date: "18/05/2023",
    likes: 15,
    dislikes: 0,
  },
  {
    userName: "Daniel",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 3,
    comment: "The face wash is okay, but it dried out my skin a bit.",
    date: "15/05/2023",
    likes: 5,
    dislikes: 2,
  },
  {
    userName: "Olivia",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 5,
    comment: "Best eyeshadow palette I've ever used. The colors are stunning!",
    date: "12/05/2023",
    likes: 20,
    dislikes: 1,
  },
  {
    userName: "Ethan",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 4,
    comment: "The beard oil works well, but the scent is a bit strong for me.",
    date: "09/05/2023",
    likes: 7,
    dislikes: 3,
  },
  {
    userName: "Ava",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 5,
    comment: "This moisturizer has completely transformed my skin. Love it!",
    date: "06/05/2023",
    likes: 18,
    dislikes: 0,
  },
  {
    userName: "Noah",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 4,
    comment: "Good hair gel, holds well without being too stiff.",
    date: "03/05/2023",
    likes: 9,
    dislikes: 1,
  },
  {
    userName: "Isabella",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 5,
    comment: "This nail polish is chip-resistant and the color is gorgeous!",
    date: "30/04/2023",
    likes: 14,
    dislikes: 1,
  },
  {
    userName: "Liam",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 3,
    comment: "The aftershave lotion is refreshing, but a bit overpriced.",
    date: "27/04/2023",
    likes: 6,
    dislikes: 2,
  },
  {
    userName: "Emma",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 5,
    comment: "This concealer provides excellent coverage without caking.",
    date: "24/04/2023",
    likes: 16,
    dislikes: 0,
  },
  {
    userName: "Mason",
    userImage: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
    rating: 4,
    comment: "The shampoo leaves my hair feeling clean and smelling great.",
    date: "21/04/2023",
    likes: 11,
    dislikes: 1,
  },
];

export default function Review({
  reviewsFromProduct,
  totalReviews = reviewsdemo.length,
  averageRatingFromProduct,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const reviews = reviewsFromProduct.length > 0 ? reviewsFromProduct : reviewsdemo;
  const averageRating = reviewsFromProduct.length > 0 ? averageRatingFromProduct : 4.4;
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Reviews ({totalReviews})</h2>
        <button
          className={
            "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }
        >
          Leave Review
        </button>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-3xl font-bold">{averageRating}</div>
        <div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }
                size={16}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">{totalReviews} Reviews</p>
        </div>
      </div>
      <div className="space-y-4">
        {reviews
          .slice(
            (currentPage - 1) * reviewsPerPage,
            currentPage * reviewsPerPage
          )
          .map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center space-x-2 mb-2">
              <img
      src={review.userImage}
      alt={review.userName}
      width={32}
      height={32}
      className="rounded-full"
    />
                <div>
                  <p className="font-semibold text-sm">{review.userName}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }
                        size={12}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm mb-2">{review.comment}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-600">
                <span>{review.date}</span>
                <button className="flex items-center">
                  <FaThumbsUp size={12} className="mr-1" /> Like
                </button>
                <button className="flex items-center">
                  <FaThumbsDown size={12} className="mr-1" /> Dislike
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ArrowBigLeft />
        </button>
        {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map(
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                currentPage === index + 1
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(reviews.length / reviewsPerPage)))}
          disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)}
        >
          <ArrowBigRight />
        </button>
      </div>
    </div>
  );
}
