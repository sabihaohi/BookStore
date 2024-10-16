import { useState } from "react";
import PropTypes from "prop-types";

const FilterComponent = ({ onFilterChange, genres }) => {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleFilterChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        onFilterChange(category);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md max-w-sm mx-auto"> {/* Added max-w-sm for width limit and mx-auto for centering */}
            <h3 className="text-lg font-bold mb-4">Filter by Topic</h3>
            <select
                value={selectedCategory}
                onChange={handleFilterChange}
                className="w-full p-2 border-2 border-gray-300 rounded-md"
            >
                <option value="">Select a Topic</option>
                {genres.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterComponent;

// Props validation
FilterComponent.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired, // Expecting an array of genres
};
