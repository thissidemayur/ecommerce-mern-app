import { useState, useEffect, useRef } from 'react';
import { CircleUser, ShoppingCart, Menu, Search, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../store/authSlice.js';
import { Link } from 'react-router';
import slugify from 'react-slugify';
import { useLogoutUserMutation } from '../store/ApiUserFetch.js';
import AccountDropdown from './AccountDropdown';

export default function Navbar() {
  const isLogin = useSelector((state) => state.authSlice.status);
  const userDetail = useSelector((state) => state.authSlice.userDetail); // Fixed selector
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const [hover, setHover] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const categories = [
    {
      name: 'Men',
      slug: slugify('men'),
      items: [
        ["Tops", "T-shirts", "Shirts", "Sweatshirts", "Hoodies", "Polo Shirts", "Tank Tops", "Jackets", "Blazers"],
        ["Bottomwear", "Jeans", "Trousers", "Joggers", "Cargo Pants", "Chinos", "Shorts", "Sweatpants"],
        ["Dresses & Jumpsuits"],
        ["Outerwear", "Jackets", "Coats", "Blazers", "Bomber Jackets", "Parkas"],
        ["Activewear", "Trackpants", "Gym Shorts", "Workout T-shirts", "Sports Jackets", "Compression Wear", "Running Shoes"],
        ["Suits & Blazers", "Suits", "Blazers", "Waistcoats", "Tuxedos"]
      ]
    },
    {
      name: 'Women',
      slug: slugify('women'),
      items: [
        ["Tops", "T-shirts", "Blouses", "Sweaters", "Sweatshirts", "Hoodies", "Tank Tops", "Cardigans", "Polo Shirts", "Peplum Tops", "Cropped Tops"],
        ["Bottomwear", "Jeans", "Trousers", "Leggings", "Chinos", "Culottes", "Shorts", "Joggers", "Sweatpants", "Skirts", "Palazzo Pants", "Midi Skirts"],
        ["Dresses & Jumpsuits", "Maxi Dresses", "Midi Dresses", "Mini Dresses", "Cocktail Dresses", "Casual Dresses", "Bodycon Dresses", "Tunic Dresses", "Jumpsuits", "Rompers", "Playsuits"],
        ["Outerwear", "Jackets", "Coats", "Blazers", "Cardigans", "Bomber Jackets", "Trench Coats", "Puffer Jackets", "Parkas", "Peacoats", "Denim Jackets"],
        ["Activewear", "Sports Bras", "Gym T-shirts", "Trackpants", "Leggings", "Yoga Pants", "Running Shoes", "Sports Jackets", "Active Shorts", "Compression Wear", "Athletic Hoodies"],
        ["Footwear", "Sneakers", "Flats", "Heels", "Boots", "Sandals", "Wedges", "Loafers", "Flip Flops", "Ballet Flats", "Slides"],
        
        ["Lingerie & Sleepwear", "Bras", "Panties", "Shapewear", "Sleepwear", "Nightgowns", "Pajama Sets", "Lingerie Sets", "Robes", "Bodysuits"],
        ["Swimwear", "Bikinis", "One-Piece Swimsuits", "Tankinis", "Swim Dresses", "Cover-Ups", "Swim Shorts"]
      ]
    },
    {
      name: "Accessories",
      slug: slugify('accessories'),
      items: [
        ["Handbags", "Tote Bags", "Clutches", "Backpacks", "Crossbody Bags", "Wallets", "Sunglasses", "Hats", "Scarves", "Belts", "Watches", "Jewelry", "Hair Accessories", "Tights"]
      ]
    },
    {
      name: "Footwear",
      slug: slugify('footwear'),
      items: [
        ["Sneakers", "Flats", "Heels", "Boots", "Sandals", "Wedges", "Loafers", "Flip Flops", "Ballet Flats", "Slides"]
      ]
    }
  ];
  
  

  const handleSubitemClick = (item, parentSlug) => {
    console.log(`Navigating to: /categories/${parentSlug}/${slugify(item)}`);
    setHover(null); // Close dropdown after clicking a subitem
    setMobileMenuOpen(false); // Close mobile menu after clicking a subitem
  };

  // Close mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileMenuRef.current || !mobileMenuOpen) return;
      if (!mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [mobileMenuOpen]);

  // Close mobile menu if Escape key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileMenuOpen || keyCode !== 27) return;
      setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [mobileMenuOpen]);

  // Toggle mobile menu and log state for debugging
  const handleMobileMenuToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Toggling mobile menu, new state:", !mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full shadow sticky top-0 z-50 bg-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left section - Logo + Hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <figure>
              <img
                className="w-9 h-9"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
            </figure>
          </Link>
          {/* Hamburger Icon for Mobile */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden text-black focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Desktop Categories */}
          <ul className="hidden md:flex items-center gap-6">
            {categories.map((category, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setHover(category.slug)}
                onMouseLeave={() => setHover(null)}
              >
                <Link
                  to={`/categories/${category.slug}`}
                  className="text-sm font-medium text-black hover:text-black/80 hover:underline transition-colors duration-150 cursor-pointer"
                >
                  {category.name}
                </Link>
                {hover === category.slug && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-lg mt-2 rounded-lg p-4 z-50 flex gap-5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {Array.isArray(category.items[0]) ? (
                      category.items.map((itemGroup, i) => (
                        <ul key={i} className="min-w-[150px]">
                          {itemGroup.map((item, j) => (
                            <li key={j}>
                              <Link
                                to={`/categories/${category.slug}/${slugify(item)}`}
                                className="text-sm text-black hover:text-black/80 hover:underline py-1 cursor-pointer transition-colors duration-150 block"
                                onClick={() => handleSubitemClick(item, category.slug)}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ))
                    ) : (
                      <ul className="min-w-[150px]">
                        {category.items.map((item, j) => (
                          <li key={j}>
                            <Link
                              to={`/categories/${category.slug}/${slugify(item)}`}
                              className="text-sm text-black hover:text-black/80 hover:underline py-1 cursor-pointer transition-colors duration-150 block"
                              onClick={() => handleSubitemClick(item, category.slug)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right section - Search, Cart, User */}
        <div className="flex items-center gap-3">
          <div className="border-2 border-black bg-white rounded-md w-32 sm:w-40 md:w-52 h-9 flex items-center px-2 focus-within:ring-2 focus-within:ring-black transition-all duration-150">
            <Search className="mr-1 text-black" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white focus:ring-0 focus:outline-none text-sm text-black placeholder-black/50"
            />
          </div>
          <Link to="/cart" className="text-black hover:text-black/80 transition-colors duration-150">
            <ShoppingCart className="cursor-pointer" size={24} />
          </Link>
          {isLogin ? (
            <AccountDropdown
              identifier={userDetail?.email || "user@example.com"}
              userName={userDetail?.fullName || "User"}
              userImg={userDetail?.userImg}
            />
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm font-medium text-black hover:text-black/80 hover:underline transition-colors duration-150 cursor-pointer"
            >
              <CircleUser size={20} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Backdrop to close on click outside */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className="relative w-full h-full p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4 border-b border-black pb-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                className="w-9 h-9"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-black focus:outline-none"
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="mt-4">
            {categories.map((category, index) => (
              <div key={index} className="border-b border-black last:border-b-0">
                <Link
                  to={`/categories/${category.slug}`}
                  className="block py-3 text-base font-semibold text-black hover:text-black/80 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
                {Array.isArray(category.items[0]) ? (
                  category.items.map((itemGroup, i) => (
                    <div key={i} className="pl-4">
                      {itemGroup.map((item, j) => (
                        <Link
                          key={j}
                          to={`/categories/${category.slug}/${slugify(item)}`}
                          className="block py-2 text-sm text-black hover:text-black/80 hover:underline transition-colors duration-150"
                          onClick={() => handleSubitemClick(item, category.slug)}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="pl-4">
                    {category.items.map((item, j) => (
                      <Link
                        key={j}
                        to={`/categories/${category.slug}/${slugify(item)}`}
                        className="block py-2 text-sm text-black hover:text-black/80 hover:underline transition-colors duration-150"
                        onClick={() => handleSubitemClick(item, category.slug)}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}