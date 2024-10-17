import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaHeart } from "react-icons/fa"; // Import Heart icon from react-icons/fa

const EachBook = ({ book }) => {
  const { title, authors, formats, subjects, id } = book;
  const genre = subjects.length > 0 ? subjects[0] : "Unknown Genre";
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle clicking on the book card
  const handleBookClick = () => {
    const urlTitle = title.toLowerCase().replace(/\s+/g, "-"); // Convert title to URL-friendly format
    navigate(`/book/${urlTitle}`); // Navigate to the book details page
  };

  // Add to wishlist function
  const addToWishlist = (e) => {
    e.stopPropagation(); // Prevent triggering navigation when clicking the button
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlist.find((item) => item.id === id);

    if (!isAlreadyInWishlist) {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert(`${title} has been added to your wishlist!`);
    } else {
      alert(`${title} is already in your wishlist!`);
    }
  };

  return (
    <div
      onClick={handleBookClick} // Add onClick event to handle navigation
      className="w-full sm:w-60 md:w-48 lg:w-56 min-h-[20rem] rounded-lg overflow-hidden bg-white relative flex flex-col cursor-pointer hover:scale-105 hover:shadow-pink-300 hover:shadow-md transition-all duration-200 border shadow-gray-100 shadow-xl"
    >
      {/* Book Cover Image */}
      <div className="h-48 w-full flex justify-center items-center p-2">
        <img
          className="h-full w-auto object-contain"
          src={formats["image/jpeg"] || "https://via.placeholder.com/200x200"}
          alt={title}
        />
      </div>

      {/* Card Content */}
      <div className="p-2 flex-grow flex flex-col justify-between">
        <div className="text-center">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
            {title}
          </h2>
          <p className="text-xs text-gray-600 mb-1">
            Author : {authors.length > 0 ? authors[0].name : "Unknown Author"}
          </p>
          <p className="text-xs text-gray-500 mb-1">Genre: {genre}</p> 
          <p className="text-xs text-gray-500 mb-1">ID: {id}</p> 
          
        </div>
        <div className="text-center mt-auto">
          <button className="bg-pink-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 flex items-center mb-2 mt-2">
            <FaHeart className=" mr-1 mt-0.5 text-red-400" /> Add to wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

EachBook.propTypes = {
  book: PropTypes.shape({
    formats: PropTypes.objectOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    subjects: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default EachBook;
