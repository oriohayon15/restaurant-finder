import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = () => {

    }

    return (
        <div>
            <input
                type='text'
                placeholder='Enter City'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input
                type='text'
                placeholder='Search Category...'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            
            <button onClick={handleSearch}>Search</button>

        </div>
    )
};

export default SearchBar;
