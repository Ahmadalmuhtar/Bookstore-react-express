import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from './ThemeProvider'; // Adjust the path as needed
import ThemeToggle from './ThemeToggle'; // Adjust the path as needed
import Add from './pages/Add';
import Books from './pages/Books';
import Update from './pages/Update';

function App() {
  return (
    <ThemeProvider>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/books' element={<Books />} />
            <Route path='/add' element={<Add />} />
            <Route path='/update/:id' element={<Update />} />
          </Routes>
          <ThemeToggle />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;