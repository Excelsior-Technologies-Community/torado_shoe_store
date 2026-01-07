import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (

    <header className="">

      {/* small header */}

      <div className="container bg-[#f1f1f1]  flex justify-between p-4 m-5">

        <div className='flex gap-2 items-center'>

          <p >
            About Us  ||
          </p>

          <p>
            Customer care: +01 947 847 4488
          </p>

        </div>

        <div className='flex gap-2 ml-auto'>

          <Link to={"/"}>
            <p className=''>
              find a store ||
            </p>
          </Link>

          <select name="language" id="language" className="border rounded px-2 py-1">
            <option value="english">English</option>
            <option value="turkish">Turkish</option>
            <option value="italian">Italian</option>
            <option value="hindi">Hindi</option>
          </select>

          <select name="currency" id="currency" className="border rounded px-2 py-1">
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="amd">AMD</option>
            <option value="inr">INR</option>
          </select>

        </div>

      </div>

      {/* MAin Dropdwon */}
      <div>

        <nav className='bg-gray-400'>

          <ul className="flex gap-8 px-10 py-4 font-semibold">

            {/* HOME */}
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>

            {/* SHOP MEGA MENU */}
            <li className="relative group cursor-pointer flex items-center gap-1">
              Shop <ChevronDown size={16} />

              {/* Mega Menu */}
              <div className="absolute left-0 top-full w-screen bg-[#111] text-white 
                          opacity-0 invisible group-hover:opacity-100 
                          group-hover:visible transition-all duration-300 z-50 my-5 py-5">

                <div className=" max-w-7xl mx-auto grid grid-cols-3 gap-2 px-8 
                absolute left-0 top-full w-screen bg-[#111] text-white 
                          opacity-0 invisible group-hover:opacity-100 
                          group-hover:visible transition-all duration-300 z-50 my-5 py-5 ">

                  {/* Column 1 */}
                  <div>
                    <h4 className="mb-4 m-10 font-bold">Shop Layout</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="hover:text-white">Left Sidebar</li>
                      <li className="hover:text-white">Right Sidebar</li>
                      <li className="hover:text-white">Grid view</li>
                      <li className="hover:text-white">Grid layout 2 columns</li>
                      <li className="hover:text-white">Grid layout 3 columns</li>
                      <li className="hover:text-white">Grid layout 4 columns</li>
                      <li className="hover:text-white">List view</li>
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h4 className="mb-4 font-bold">Categories</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="hover:text-white">Categories list Women</li>
                      <li className="hover:text-white">Categories list Man</li>
                      <li className="hover:text-white">Categories list Kids</li>
                      <li className="hover:text-white">Pagination Page</li>
                      <li className="hover:text-white">Shop without sidebar</li>
                      <li className="hover:text-white">Infinite scrolling</li>
                      <li className="hover:text-white">Without sidebar</li>
                    </ul>
                  </div>

                  {/* Column 3 - Banner */}
                  <div className="flex justify-center">
                    <img
                      src="/images/shop-hover-img.webp"
                      alt="New Collection"
                      className="rounded-lg shadow-lg w-32 h-auto"
                    />
                  </div>

                </div>
              </div>
            </li>

            {/* PRODUCTS */}
            <li className="relative group cursor-pointer flex items-center gap-1">
              Products <ChevronDown size={16} />
            </li>

            <li className="hover:text-yellow-400 cursor-pointer">Pages</li>
            <li className="hover:text-yellow-400 cursor-pointer">Blogs</li>
            <li className="hover:text-yellow-400 cursor-pointer">Features</li>
          </ul>

        </nav>

      </div>

    </header>
  );
};

export default Header;