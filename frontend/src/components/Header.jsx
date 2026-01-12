// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronDown } from 'lucide-react';

// const Header = () => {
//   // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState(null);

//   const toggleMenu = (menu) => {
//     setOpenMenu(openMenu === menu ? null : menu);
//   };

//   return (

//     <header className="">

//       {/* small header */}

//       <div className="container bg-white  flex justify-between p-2 ">

//         <div className='flex gap-2 items-center'>

//           <p className=''>
//             About Us  ||
//           </p>

//           <p>
//             Customer care: +01 947 847 4488
//           </p>

//         </div>

//         <div className='flex gap-2 ml-auto'>

//           <Link to={"/"}>
//             <p className=''>
//               find a store ||
//             </p>
//           </Link>

//           <select name="language" id="language" className="border rounded px-2 py-1">
//             <option value="english">English</option>
//             <option value="turkish">Turkish</option>
//             <option value="italian">Italian</option>
//             <option value="hindi">Hindi</option>
//           </select>

//           <select name="currency" id="currency" className="border rounded px-2 py-1">
//             <option value="usd">USD</option>
//             <option value="eur">EUR</option>
//             <option value="amd">AMD</option>
//             <option value="inr">INR</option>
//           </select>

//         </div>

//       </div>

//       {/* MAin Dropdwon */}
//       <div>

//         <nav className='bg-black'>

//           <ul className="flex gap-8 px-10  max-w-5xl font-semibold">

//             {/* HOME */}
//             <li className="hover:text-yellow-400 cursor-pointer">Home</li>

//             {/* SHOP MEGA MENU */}
//             <li className="relative group cursor-pointer flex items-center gap-1">
//               Shop <ChevronDown size={16} />

//               {/* Mega Menu */}
//               <div className="absolute left-0 top-full w-screen bg-[#111] text-white 
//                           opacity-0 invisible group-hover:opacity-100 
//                           group-hover:visible transition-all duration-300 z-50  ">

//                 <div className=" max-w-7xl mx-auto grid grid-cols-3 gap-2 px-8 
//                 absolute left-0 top-full w-screen bg-[#111] text-white 
//                           opacity-0 invisible group-hover:opacity-100 
//                           group-hover:visible transition-all duration-300 z-50 my-5 py-5 ">

//                   {/* Column 1 */}
//                   <div>
//                     <h4 className="mb-4 font-bold">Shop Layout</h4>
//                     <ul className="space-y-3 text-sm text-gray-300">
//                       <li className="hover:text-white">Left Sidebar</li>
//                       <li className="hover:text-white">Right Sidebar</li>
//                       <li className="hover:text-white">Grid view</li>
//                       <li className="hover:text-white">Grid layout 2 columns</li>
//                       <li className="hover:text-white">Grid layout 3 columns</li>
//                       <li className="hover:text-white">Grid layout 4 columns</li>
//                       <li className="hover:text-white">List view</li>
//                     </ul>
//                   </div>

//                   {/* Column 2 */}
//                   <div>
//                     <h4 className="mb-4 font-bold">Categories</h4>
//                     <ul className="space-y-3 text-sm text-gray-300">
//                       <li className="hover:text-white">Categories list Women</li>
//                       <li className="hover:text-white">Categories list Man</li>
//                       <li className="hover:text-white">Categories list Kids</li>
//                       <li className="hover:text-white">Pagination Page</li>
//                       <li className="hover:text-white">Shop without sidebar</li>
//                       <li className="hover:text-white">Infinite scrolling</li>
//                       <li className="hover:text-white">Without sidebar</li>
//                     </ul>
//                   </div>

//                   {/* Column 3 - Banner */}
//                   <div className="flex justify-center">
//                     <img
//                       src="/images/shop-hover-img.webp"
//                       alt="New Collection"
//                       className="rounded-lg shadow-lg w-32 h-auto"
//                     />
//                   </div>

//                 </div>
//               </div>
//             </li>

//             {/* PRODUCTS */}
//             <li className="relative group cursor-pointer flex items-center gap-1">
//               Products <ChevronDown size={16} />

//               {/* Products Mega Menu */}
//               <div className="absolute left-0 top-full w-screen bg-[#111] text-white 
//                           opacity-0 invisible group-hover:opacity-100 
//                           group-hover:visible transition-all duration-300 z-50">

//                 <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 px-8 py-5">

//                   {/* Column 1 - Product Types */}
//                   <div>
//                     <h4 className="mb-4 font-bold">Product Types</h4>
//                     <ul className="space-y-3 text-sm text-gray-300">
//                       <li className="hover:text-white">Product Default</li>
//                       <li className="hover:text-white">Product Full Width</li>
//                       <li className="hover:text-white">Product Slider</li>
//                       <li className="hover:text-white">Product Bottom Thumbnails</li>
//                       <li className="hover:text-white">Product Left Thumbnails</li>
//                       <li className="hover:text-white">Product Right Thumbnails</li>
//                     </ul>
//                   </div>

//                   {/* Column 2 - Product Views */}
//                   <div>
//                     <h4 className="mb-4 font-bold">Product Views</h4>
//                     <ul className="space-y-3 text-sm text-gray-300">
//                       <li className="hover:text-white">Product Grid View</li>
//                       <li className="hover:text-white">Product Drawer Sidebar</li>
//                       <li className="hover:text-white">Product Tab Accordions</li>
//                       <li className="hover:text-white">Product Video</li>
//                       <li className="hover:text-white">Thumbnail Hover Zoom</li>
//                       <li className="hover:text-white">Product Grid 02 Columns</li>
//                     </ul>
//                   </div>

//                   {/* Column 3 - Special Products */}
//                   <div>
//                     <h4 className="mb-4 font-bold">Special Products</h4>
//                     <ul className="space-y-3 text-sm text-gray-300">
//                       <li className="hover:text-white">Product Pre Orders</li>
//                       <li className="hover:text-white">Product Countdown Timer</li>
//                       <li className="hover:text-white">Sale Products</li>
//                       <li className="hover:text-white">New Products</li>
//                     </ul>
//                   </div>

//                   {/* Column 4 - Image */}
//                   <div className="flex justify-center">
//                     <img
//                       src="/images/shop-hover-img.webp"
//                       alt="Products Collection"
//                       className="rounded-lg shadow-lg w-32 h-auto"
//                     />
//                   </div>

//                 </div>
//               </div>
//             </li>

//             <li className="relative group cursor-pointer flex items-center gap-1">
//               Pages <ChevronDown size={16} />

//               {/* Pages Mega Menu */}
//               <div className="absolute left-0 top-full w-screen bg-[#111] text-white 
//                           opacity-0 invisible group-hover:opacity-100 
//                           group-hover:visible transition-all duration-300 z-50">

//                 <div className="max-w-5xl mx-auto grid grid-cols-3 gap-2 px-3 py-5 items-start">

//                   {/* Column 1 - Info Pages */}
//                   <div>
//                     <h4 className="mb-4 font-bold">Information</h4>
//                     <ul className="space-y-3 text-sm text-gray-300">
//                       <li className="hover:text-white">About Us</li>
//                       <li className="hover:text-white">Contact Us</li>
//                       <li className="hover:text-white">FAQs</li>
//                       <li className="hover:text-white">Terms And Conditions</li>
//                       <li className="hover:text-white">Privacy Policy</li>
//                     </ul>
//                   </div>

//                   {/* Column 2 - Account & Shop */}
//                   <div>
//                     <h4 className="mb-4 font-bold">Account & Shop</h4>
//                     <ul className="space-y-3 text-sm text-gray-300">
//                       <li className="hover:text-white">Login</li>
//                       <li className="hover:text-white">Register</li>
//                       <li className="hover:text-white">Cart</li>
//                       <li className="hover:text-white">Wishlist</li>
//                       <li className="hover:text-white">Checkout</li>
//                       <li className="hover:text-white">Error</li>
//                     </ul>
//                   </div>

//                   {/* Column 3 - Image */}
//                   <div className="flex justify-center">
//                     <img
//                       src="/images/shop-hover-img.webp"
//                       alt="Pages Collection"
//                       className="rounded-lg shadow-lg w-32 h-auto"
//                     />
//                   </div>

//                 </div>
//               </div>
//             </li>
//             <li className="relative group cursor-pointer flex items-center gap-1">
//               Blogs <ChevronDown size={16} />

//               {/* Blogs Mega Menu */}
//               <div className="absolute left-0 top-full  w-screen bg-[#111] text-white 
//                           opacity-0 invisible group-hover:opacity-100 
//                           group-hover:visible transition-all duration-300 z-50">

//                 <div className="max-w-full mx-auto grid grid-cols-3 gap-6 px-8 py-5">

//                   {/* Column 1 - Blog Layouts */}
//                   <div>
//                     <h4 className="mb-4 font-bold">Blog Layouts</h4>
//                     <ul className="space-y-3 text-sm text-gray-300">
//                       <li className="hover:text-white">Blog Standard</li>
//                       <li className="hover:text-white">Blog Grid</li>
//                       <li className="hover:text-white">Blog Left Sidebar</li>
//                       <li className="hover:text-white">Blog Right Sidebar</li>
//                       <li className="hover:text-white">Blog List View</li>
//                     </ul>
//                   </div>

//                   {/* Column 2 - Blog Views */}
//                   <div>
//                     <h4 className="mb-4 font-bold">Blog Views</h4>
//                     <ul className="space-y-3 text-sm text-gray-300">
//                       <li className="hover:text-white">Blog Grid Mix</li>
//                       <li className="hover:text-white">Blog Full Width</li>
//                       <li className="hover:text-white">Blog Without Sidebar</li>
//                       <li className="hover:text-white">Single Post With Sidebar</li>
//                       <li className="hover:text-white">Single Post Without Sidebar</li>
//                     </ul>
//                   </div>

//                   {/* Column 3 - Featured Post */}
//                   <div className="bg-gray-800 p-4 rounded-lg">
//                     <img
//                       src="/images/blog-img.webp"
//                       alt="Blog Post"
//                       className="rounded-lg w-full h-24 object-cover mb-3"
//                     />
//                     <p className="text-xs text-gray-400 mb-2">By: admin | 2 comments</p>
//                     <h5 className="text-sm font-semibold text-white">Tips to buy any sneaker...</h5>
//                   </div>

//                 </div>
//               </div>
//             </li>

//             <li className="relative group cursor-pointer flex items-center gap-1">
//               Features <ChevronDown size={16} />

//               {/* Features Dropdown */}
//               <div className="absolute left-0 top-full bg-[#111] text-white 
//                           opacity-0 invisible group-hover:opacity-100 
//                           group-hover:visible transition-all duration-300 z-50 min-w-48">

//                 <div className="px-6 py-5">
//                   <ul className="space-y-3 text-sm text-gray-300">
//                     <li className="hover:text-white">Portfolio</li>
//                     <li className="hover:text-white">Track My Order</li>
//                     <li className="hover:text-white">Advanced Filter</li>
//                     <li className="hover:text-white">Load More Button</li>
//                   </ul>
//                 </div>

//               </div>
//             </li>
//           </ul>

//         </nav>

//       </div>

//     </header>
//   );
// };

// export default Header;

import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const Header = () => {
  return (
    <header>
      {/* Top Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-2 text-sm">
          <div className="flex gap-3">
            <span>About Us ||</span>
            <span>Customer care: +01 947 847 4488</span>
          </div>

          <div className="flex gap-2 items-center">
            <Link to="/">find a store ||</Link>

            <select className="border px-2 py-1">
              <option>English</option>
              <option>Hindi</option>
            </select>

            <select className="border px-2 py-1">
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="bg-black relative">
        <ul className="max-w-7xl mx-auto flex gap-8 px-6 py-4 text-white font-semibold">

          <li className="hover:text-yellow-400 cursor-pointer">Home</li>

          {/* SHOP */}
          <li className="group cursor-pointer flex items-center gap-1">
            Shop <ChevronDown size={16} />

            {/* FULL WIDTH MEGA MENU */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-full max-w-7xl bg-[#111]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-300 z-50">

              <div className="grid grid-cols-3 gap-8 px-10 py-8">

                <div>
                  <h4 className="mb-4 font-bold">Shop Layout</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <Link to="/products?layout=left" className="block hover:text-white">
                      Left Sidebar
                    </Link>
                    <Link to="/products?layout=right" className="block hover:text-white">
                      Right Sidebar
                    </Link>
                    <Link to="/products?layout=grid" className="block hover:text-white">
                      Grid View
                    </Link>
                    <Link to="/products?layout=none" className="block hover:text-white">
                      No Sidebar
                    </Link>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 font-bold">Categories</h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="hover:text-white">Women</li>
                    <li className="hover:text-white">Men</li>
                    <li className="hover:text-white">Kids</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <img
                    src="/images/shop-hover-img.webp"
                    className="w-40 rounded"
                    alt="Shop"
                  />
                </div>

              </div>
            </div>
          </li>

          {/* PRODUCTS */}
          <li className="group cursor-pointer flex items-center gap-1">
            Products <ChevronDown size={16} />

            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-full max-w-7xl bg-[#111]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-300 z-50">

              <div className="grid grid-cols-4 gap-8 px-10 py-8">

                <div>
                  <h4 className="mb-4 font-bold">Product Types</h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li>Product Default</li>
                    <li>Product Slider</li>
                    <li>Product Gallery</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 font-bold">Views</h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li>Grid</li>
                    <li>List</li>
                    <li>Video</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 font-bold">Special</h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li>Sale</li>
                    <li>New</li>
                    <li>Countdown</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <img
                    src="/images/shop-hover-img.webp"
                    className="w-40 rounded"
                    alt="Products"
                  />
                </div>

              </div>
            </div>
          </li>

          {/* PAGES */}
          <li className="group cursor-pointer flex items-center gap-1">
            Pages <ChevronDown size={16} />

            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-full max-w-7xl bg-[#111]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-300 z-50">

              <div className="grid grid-cols-3 gap-8 px-10 py-8">

                <div>
                  <h4 className="mb-4 font-bold">Shop Pages</h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="hover:text-white">Shop</li>
                    <li className="hover:text-white">Shop Details</li>
                    <li className="hover:text-white">Cart</li>
                    <li className="hover:text-white">Checkout</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 font-bold">Other Pages</h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="hover:text-white">About</li>
                    <li className="hover:text-white">Contact</li>
                    <li className="hover:text-white">FAQ</li>
                    <li className="hover:text-white">Error</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <img
                    src="/images/shop-hover-img.webp"
                    className="w-32 rounded shadow-lg"
                    alt="Pages"
                  />
                </div>

              </div>
            </div>
          </li>

          {/* BLOGS */}
          <li className="  group cursor-pointer flex items-center gap-1">
            Blogs <ChevronDown size={16} />

            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-full max-w-7xl bg-[#111]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-300 z-50">

              <div className="grid grid-cols-3 gap-8 px-10 py-8">

                <div>
                  <h4 className="mb-4 font-bold">Blog Layouts</h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <Link to="/blogs?layout=standard" className="block hover:text-white">Blog Standard</Link>
                    <Link to="/blogs?layout=grid" className="block hover:text-white">Blog Grid</Link>
                    <Link to="/blogs?layout=left" className="block hover:text-white">Blog Left Sidebar</Link>
                    <Link to="/blogs?layout=right" className="block hover:text-white">Blog Right Sidebar</Link>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 font-bold">Blog Views</h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="hover:text-white">Blog Grid Mix</li>
                    <li className="hover:text-white">Blog Full Width</li>
                    <li className="hover:text-white">Single Post</li>
                  </ul>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <img
                    src="/images/blog-img.webp"
                    className="rounded-lg w-full h-24 object-cover mb-3"
                    alt="Blog Post"
                  />
                  <p className="text-xs text-gray-400 mb-2">By: admin | 2 comments</p>
                  <h5 className="text-sm font-semibold text-white">Tips to buy any sneaker...</h5>
                </div>

              </div>
            </div>
          </li>

          {/* FEATURES */}
          <li className="relative group cursor-pointer flex items-center gap-1">
            Features <ChevronDown size={16} />

            <div className="absolute left-1/2 transform -translate-x-1/2 top-full bg-[#111]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-300 z-50 min-w-48">

              <div className="px-6 py-5">
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="hover:text-white">Portfolio</li>
                  <li className="hover:text-white">Track My Order</li>
                  <li className="hover:text-white">Advanced Filter</li>
                  <li className="hover:text-white">Load More Button</li>
                </ul>
              </div>

            </div>
          </li>

        </ul>
      </nav>

    </header>
  )
}

export default Header
