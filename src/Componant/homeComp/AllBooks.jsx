import { useEffect, useState } from "react";
import EachBook from "./EachBook";
import FilterComponent from "./FilterComp";
import PropTypes from "prop-types";

const AllBooks = ({ searchTerm }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [genres, setGenres] = useState([]);

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

  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    filterBooks(searchTerm, category);
  };

  const filterBooks = (term, category) => {
    const filtered = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(term.toLowerCase());
      const authorMatch = book.authors.some((author) =>
        author.name.toLowerCase().includes(term.toLowerCase())
      );
      return titleMatch || authorMatch;
    });

    const finalFilteredBooks = category
      ? filtered.filter((book) =>
          book.subjects.some((subject) =>
            subject.toLowerCase().includes(category.toLowerCase())
          )
        )
      : filtered;

    setFilteredBooks(finalFilteredBooks);
  };

  useEffect(() => {
    filterBooks(searchTerm, categoryFilter);
  }, [searchTerm, categoryFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-24">
      {/* Filter and Books Section */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 pt-20">
          <FilterComponent genres={genres} onFilterChange={handleFilterChange} />
        </div>

        {/* Books Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold text-center mb-10">All Books</h2>

          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <EachBook key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;

// Props validation
AllBooks.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
