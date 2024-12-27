import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GenerateModel from "./pages/GenerateModel";
import Plans from "./pages/Plans";
import Library from "./pages/Library";
import ModelDetails from "./pages/ModelDetails";
import Cart from "./pages/Cart";
import Explore from "./pages/Explore";
import SavedProducts from "./pages/SavedProducts";
import Search from "./pages/Search";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create-model" element={<GenerateModel />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/library" element={<Library />} />
            <Route path="/explore/:itemName" element={<Explore />} />
            <Route path="/saved-products" element={<SavedProducts />} />
            <Route path="/product/:title" element={<ModelDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
