import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext'
import Add from './pages/Add';
import Books from './pages/Books';
import Update from './pages/Update';

function App() {
  return (
    <div className='App'>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/books' element={<Books />} />
            <Route path='/add' element={<Add />} />
            <Route path='/update/:id' element={<Update />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
