import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import {
  HiEllipsisVertical,
  HiMiniBars3BottomRight,
  HiXMark,
} from "react-icons/hi2";
import { GifState } from "../context/context";
import GifSearch from "./gif-search";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { gf, favorites } = GifState();

  const fetchGifCategory = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategory();
  }, []);

  return (
    <nav className="relative z-50">
      <div className="relative flex gap-4 justify-between items-center mb-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/icon.png"
            className="flex items-center justify-center w-20"
            alt="Zymic logo"
          />
      <h1 className="text-5xl font-bold tracking-tight cursor-pointer neon-text ml-[-10px]">
  ZifHub
</h1>
    </Link>

        {/* Desktop Category + Controls */}
        <div className="font-bold text-md flex gap-2 items-center">
          {categories?.slice(0, 5)?.map((category) => (
            <Link
              key={category.name}
              to={`/${category.name_encoded}`}
              className="px-4 py-1 hover:gradient hover:glass border-b-2 hidden lg:block"
            >
              {category.name}
            </Link>
          ))}

          {/* Show more categories */}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategories ? "gradient glass" : ""
              } border-b-2 hidden lg:block cursor-pointer`}
            />
          </button>

          {/* Favorites link */}
          {favorites.length > 0 && (
            <div className="h-9 bg-red-700 pt-1.5 px-6 cursor-pointer rounded hidden lg:block">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <HiXMark className="text-red-400 cursor-pointer" size={30} />
            ) : (
              <HiMiniBars3BottomRight className="text-sky-400 cursor-pointer" size={30} />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <GifSearch />

      {/* -------------------- Desktop Dropdown (Large Screens) -------------------- */}
      <AnimatePresence>
        {showCategories && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute right-0 top-20 px-10 pt-6 pb-9 w-full gradient glass z-20 hidden lg:block"
          >
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => (
                <Link
                  className="font-bold hover:text-sky-300 transition"
                  key={category.name}
                  to={`/${category.name_encoded}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------- Mobile Dropdown Menu -------------------- */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden gradient glass px-10 py-8 mt-2 w-full cursor-pointer"
          >
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories?.map((category) => (
                <Link
                  key={category.name}
                  to={`/${category.name_encoded}`}
                  className="font-bold hover:text-sky-300 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {favorites.length > 0 && (
              <div className="mt-6 bg-gray-700 pt-2 pb-2 px-4 text-white font-bold rounded text-center">
                <Link to="/favorites" onClick={() => setShowMobileMenu(false)}>
                  Favorite GIFs
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
