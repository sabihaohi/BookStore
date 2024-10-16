import { useEffect, useState } from "react";
import EachBook from "./EachBook";
import FilterComponent from "./FilterComp";
import PropTypes from "prop-types";

// Skeleton Loader component
const SkeletonBook = () => {
  return (
    <div className="flex flex-col p-3 border rounded-lg shadow-lg animate-pulse">
      {/* Book cover skeleton */}
      <div className="bg-gray-300 h-40 md:h-52 lg:h-64 w-full rounded mb-4"></div>
      {/* Book title skeleton */}
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      {/* Author skeleton */}
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      {/* Genre skeleton */}
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

const AllBooks = ({ searchTerm }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [genres, setGenres] = useState([]); // State to hold genres

  useEffect(() => {
    fetch("https://gutendex.com/books/")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.results);
        setFilteredBooks(data.results);
        setLoading(false);

        // Extract unique genres/topics
        const uniqueGenres = new Set();
        data.results.forEach((book) => {
          book.subjects.forEach((subject) => uniqueGenres.add(subject));
        });
        setGenres(Array.from(uniqueGenres)); // Convert Set to Array
      });
  }, []);

  // Filter books based on category
  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    filterBooks(searchTerm, category);
  };

  // Filter books based on search term and category
  const filterBooks = (term, category) => {
    const filtered = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(term.toLowerCase());
      const authorMatch = book.authors.some((author) =>
        author.name.toLowerCase().includes(term.toLowerCase())
      );
      return titleMatch || authorMatch; // Include book if title or author matches
    });

    // Apply category filter if set
    const finalFilteredBooks = category
      ? filtered.filter((book) =>
          book.subjects.some((subject) =>
            subject.toLowerCase().includes(category.toLowerCase())
          )
        )
      : filtered;

    setFilteredBooks(finalFilteredBooks);
  };

  // Apply search term whenever it changes
  useEffect(() => {
    filterBooks(searchTerm, categoryFilter);
  }, [searchTerm, categoryFilter]);

  if (loading) {
    // Display skeleton loaders
    return (
      <div className="container mx-auto p-4 mt-24">
        {/* Skeleton loaders for filter and books */}
        <div className="flex gap-5">
          {/* Filter Section */}
          <div className="w-1/4 pt-20">
            <div className="bg-gray-200 h-10 w-full mb-5 animate-pulse"></div> {/* Category Filter Skeleton */}
            <div className="bg-gray-200 h-10 w-full mb-5 animate-pulse"></div> {/* Filter */}
            <div className="bg-gray-200 h-10 w-full mb-5 animate-pulse"></div> {/* More filters */}
          </div>

          {/* Books Section */}
          <div className="w-3/4">
            <h2 className="text-2xl font-bold text-center mb-10">All Books</h2>

            {/* Skeleton loaders grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-3 lg:gap-5">
              {/* Render 10 skeletons */}
              {Array(10).fill(0).map((_, index) => (
                <SkeletonBook key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-24">
      {/* Filter and Books Section */}
      <div className="flex gap-5">
        {/* Filter Section */}
        <div className="w-1/4 pt-20">
          <FilterComponent genres={genres} onFilterChange={handleFilterChange} />
        </div>

        {/* Books Section */}
        <div className="w-3/4">
          <h2 className="text-2xl font-bold text-center mb-10">All Books</h2>

          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-3 lg:gap-5">
            {filteredBooks.map((book) => (
              <EachBook key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

AllBooks.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default AllBooks;
