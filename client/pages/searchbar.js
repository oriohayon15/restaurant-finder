import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = () => {

    }

    return (
        <div className="flex items-center justify-center">
            <input className="bg-gray-50 border border-gray-300 rounded px-4 py-2 w-40 m-8 focus:outline-none focus:ring-2 focus:ring-black"
                type='text'
                placeholder='Enter City'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input className="bg-gray-50 border border-gray-300 rounded px-4 py-2 w-150 m-8 focus:outline-none focus:ring-2 focus:ring-black"
                type='text'
                placeholder='Search Category...'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            
            <button className="px-4 py-2 bg-black text-white font-semibold rounded-md shadow-md hover:bg-gray-700 cursor-pointer transition duration-200"
             onClick={handleSearch}>Search</button>

        </div>
    )
};

export default SearchBar;
