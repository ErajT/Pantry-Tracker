import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Search from './Search';
import AddItemPopup from './AddItemPopup';
import { grey } from '@mui/material/colors';

function Content() {
  const [items, setItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      const initialItems = [
        { itemName: 'Item 1', quantity: 1 },
        { itemName: 'Item 2', quantity: 1 },
        { itemName: 'Item 3', quantity: 1 }
      ];
      setItems(initialItems);
      localStorage.setItem('items', JSON.stringify(initialItems));
    }
  }, []);

  const handleSearchSubmit = (results) => {
    setSearchResults(results);
    setIsSearching(true);
  };

  const updateQuantity = (index, delta) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += delta;
    if (updatedItems[index].quantity < 0) updatedItems[index].quantity = 0;
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const handleAddItem = (newItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <Box 
      sx={{ 
        padding: 2,
        backgroundColor: grey[200], // Light gray background
        borderRadius: 2, // Rounded corners
      }}
    >
      <h1>Pantry Tracker</h1>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setPopupOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Item
      </Button>
      <Search onSearch={handleSearchSubmit} items={items} />
      
      {/* Displaying search results or current items */}
      <Box className='results' sx={{ mt: 2 }}>
        <List>
          {(isSearching ? searchResults : items).length > 0 ? (
            (isSearching ? searchResults : items).map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.itemName} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => updateQuantity(index, -1)}
                    sx={{ minWidth: '30px', margin: '0 5px' }}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => updateQuantity(index, 1)}
                    sx={{ minWidth: '30px', margin: '0 5px' }}
                  >
                    +
                  </Button>
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No results found." />
            </ListItem>
          )}
        </List>
      </Box>

      <AddItemPopup 
        open={popupOpen} 
        onClose={() => setPopupOpen(false)} 
        onAddItem={handleAddItem} 
      />
    </Box>
  );
};

export default Content;
