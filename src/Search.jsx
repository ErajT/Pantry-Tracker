import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FaSearch } from 'react-icons/fa';
import { green, grey } from '@mui/material/colors';

const Search = ({ items, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = items.filter(item => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()));
    onSearch(results); // Pass results back to parent component
    setSearchQuery(''); // Clear search query after submission
  };

  return (
    <form className='SearchForm' onSubmit={handleSearchSubmit}>
      <Box
        id='inputs'
        sx={{
          width: '60%',
          margin: '15px',
          borderRadius: 5,
          border: '1px solid #ddd',
          fontSize: 20,
          backgroundColor: 'peach',
          padding: 2
        }}
      >
        <TextField
          id="searchQuery"
          label="Search"
          variant="outlined"
          placeholder="Enter search term"
          required
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            height: '100%'
          }}
        />
      </Box>
      <Button
        type='submit'
        aria-label='Search'
        id='searchButton'
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: 'grey',
          height: '2cm',
          margin: 2,
          marginTop: 3,
          '&:hover': {
            backgroundColor: '#FFC0CB',
          },
        }}
      >
        <FaSearch />
      </Button>
    </form>
  );
};

export default Search;
