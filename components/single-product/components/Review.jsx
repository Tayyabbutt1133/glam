"use client";
import { useState } from "react";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const reviews = [
  {
    userName: "Jane",
    userImage: "/placeholder.svg?height=32&width=32",
    rating: 5,
    comment: "Great mascara! It really adds volume to my lashes.",
    date: "25/05/2023",
    likes: 10,
    dislikes: 2,
  },
  {
    userName: "John",
    userImage: "/placeholder.svg?height=32&width=32",
    rating: 4,
    comment: "Good product, but a bit pricey.",
    date: "21/05/2023",
    likes: 10,
    dislikes: 2,
  },
  {
    userName: "Alice",
    userImage: "/placeholder.svg?height=32&width=32",
    rating: 5,
    comment:
      "Absolutely love this mascara! It's long-lasting and doesn't smudge.",
    date: "18/05/2023",
    likes: 10,
    dislikes: 2,
  },
  {
    userName: "Jane",
    userImage: "/placeholder.svg?height=32&width=32",
    rating: 5,
    comment: "Great mascara! It really adds volume to my lashes.",
    date: "25/05/2023",
    likes: 10,
    dislikes: 2,
  },
  {
    userName: "John",
    userImage: "/placeholder.svg?height=32&width=32",
    rating: 4,
    comment: "Good product, but a bit pricey.",
    date: "21/05/2023",
    likes: 10,
    dislikes: 2,
  },
  {
    userName: "Alice",
    userImage: "/placeholder.svg?height=32&width=32",
    rating: 5,
    comment:
      "Absolutely love this mascara! It's long-lasting and doesn't smudge.",
    date: "18/05/2023",
    likes: 10,
    dislikes: 2,
  },
  {
    userName: "Jane",
    userImage: "/placeholder.svg?height=32&width=32",
    rating: 5,
    comment: "Great mascara! It really adds volume to my lashes.",
    date: "25/05/2023",
    likes: 10,
    dislikes: 2,
  },
  {
    userName: "John",
    userImage: "/placeholder.svg?height=32&width=32",
    rating: 4,
    comment: "Good product, but a bit pricey.",
    date: "21/05/2023",
    likes: 10,
    dislikes: 2,
  },
  {
    userName: "Alice",
    userImage: "/placeholder.svg?height=32&width=32",
    rating: 5,
    comment:
      "Absolutely love this mascara! It's long-lasting and doesn't smudge.",
    date: "18/05/2023",
    likes: 10,
    dislikes: 2,
  },
];

export default function Review({
  reviewsFromProduct,
  totalReviews = 0,
  averageRating = 0,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

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
                <Image
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
      <div className="flex justify-center space-x-2 mt-4">
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
      </div>
    </div>
  );
}
