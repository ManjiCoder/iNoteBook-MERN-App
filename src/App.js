import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import NoteState from './components/context/notes/NoteState';

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
        </Routes>

      </BrowserRouter>
    </NoteState>
  );
}

export default App;
