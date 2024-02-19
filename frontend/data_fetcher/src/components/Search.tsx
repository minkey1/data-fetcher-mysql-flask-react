import React, { useState } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
}

function Search({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by city"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress} // Add event listener for keypress
        className='h-12 rounded-lg text-center'
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default Search;
