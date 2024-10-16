import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Componant/homeComp/Navbar";
import { FaHeart, FaBook } from "react-icons/fa";

const BookDetails = () => {
  const { title } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://gutendex.com/books?search=${title.replace(/-/g, " ")}`)
      .then((response) => response.json())
      .then((data) => {

        // Assuming the API returns matching books, pick the first match
        const matchedBook = data.results.find(
          (book) => book.title.toLowerCase() === title.replace(/-/g, " ")
        );
        setBook(matchedBook);
        setLoading(false); 
      });
  }, [title]);

  // Skeleton loader layout
  if (loading) {
    return (
      <div className="container mx-auto mt-40 p-4 max-w-4xl animate-pulse">
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/3 flex justify-center items-center p-2">
            <div className="h-64 w-full bg-gray-200"></div>
          </div>

          {/* Skeleton for Book Information */}
          <div className="md:w-2/3 p-4">
            <div className="h-8 bg-gray-200 rounded mb-4"></div> 
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div> 
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div> 
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded mt-6 w-40"></div> 
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto mt-40 p-4 max-w-4xl animate-pulse">
        <div className="flex flex-col md:flex-row items-start">
          {/* Skeleton for Book Cover */}
          <div className="md:w-1/3 flex justify-center items-center p-2">
            <div className="h-64 w-full bg-gray-200"></div>
          </div>
          <div className="md:w-2/3 p-4">
            <div className="h-8 bg-gray-200 rounded mb-4"></div> 
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div> 
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div> 
            <div className="h-10 bg-gray-200 rounded mt-6 w-40"></div> 
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-40 p-4 max-w-4xl bg-slate-100 rounded-lg shadow-gray-100 shadow-xl">
        <div className="flex flex-col md:flex-row items-start">
          {/* Book Cover */}
          <div className="md:w-1/3 flex justify-center items-center p-2 shadow-xl">
            <img
              className="h-auto w-full object-contain"
              src={book.formats["image/jpeg"] || "https://via.placeholder.com/200x300"}
              alt={book.title}
            />
          </div>

          {/* Book Information */}
          <div className="md:w-2/3 p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {book.title}
            </h1>
            <p className="text-sm text-gray-600 mb-1">
              <FaBook className="inline-block mr-1 text-indigo-500" />
              Author: <span className="font-semibold">{book.authors[0]?.name || "Unknown Author"}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Genre: <span className="font-semibold">{book.subjects[0] || "Unknown Genre"}</span>
            </p>

            {/* Additional Information */}
            <div className="mt-4">
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Download Count:</span> {book.download_count || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Language:</span> {book.languages[0] || "Unknown"}
              </p>
            </div>

            {/* "Add to Wishlist" Button */}
            <div className="mt-6">
              <button className="bg-pink-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 flex items-center">
                <FaHeart className="mr-2 text-red-400" /> Add to wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
