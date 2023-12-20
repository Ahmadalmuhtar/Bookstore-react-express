import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Add from './pages/Add';
import Books from './pages/Books';
import Update from './pages/Update';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/' element={<Add />} />
          <Route path='/' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
