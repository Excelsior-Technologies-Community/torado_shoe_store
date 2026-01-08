import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { RiShoppingBag2Fill } from "react-icons/ri";
import ProductSwiper from '../components/products/ProductSwiper'
import { productAPI, imageAPI, testimonialsAPI } from '../utils/api'
import { FaArrowRight, FaRegEye } from 'react-icons/fa'
import { IoMdSwap, IoMdStar } from 'react-icons/io'
import { IoIosHeartEmpty } from 'react-icons/io'





function Homepage() {


    const [products, setProducts] = useState([])
    const [testimonials, setTestimonials] = useState([])


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await productAPI.getProducts();
            setProducts(response.data.products)
            console.log(response.data);


        }
        const fetchTestimonials = async () => {
            const response = await testimonialsAPI.getTestimonials();
            setTestimonials(response.data.testimonials)
            console.log(response.data);

        }
        fetchTestimonials();
        fetchProducts();
    }, [])


    return (
        <>
            <div className=''>



                <div>

                    <div className='w-full [&_.swiper-button-next]:p-2 [&_.swiper-button-prev]:p-2 [&_.swiper-button-next]:bg-black/20 [&_.swiper-button-prev]:bg-black/20 [&_.swiper-button-next]:w-8 [&_.swiper-button-prev]:w-8 [&_.swiper-button-next]:h-8 [&_.swiper-button-prev]:h-8 [&_.swiper-button-next:after]:text-sm [&_.swiper-button-prev:after]:text-sm
            [&_.swiper-button-next]:rounded-full
            [&_.swiper-button-prev]:rounded-full
            '>

                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}
                            navigation={true}
                            // pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}

                            pagination={{
                                clickable: true,
                                type: 'bullet',
                                dynamicBullets: true,
                                bulletActiveClass: 'swiper-pagination-bullet-active-custom '

                            }}

                        >

                            <SwiperSlide>
                                <div className=''>

                                    <div className="bg-[url('images/banner-img-1.webp')] bg-cover bg-center w-full h-screen flex items-center">

                                        <div className='mx-10'>
                                            <p>
                                                Exclusive Collection
                                            </p>

                                            <h2 className='text-5xl font-semibold mt-3'>
                                                New Sneaker <br /> Collection
                                            </h2>

                                            <p className='text-gray-500 mt-5 mb-5'>
                                                Extra 25% Off On Your First Order
                                            </p>

                                            <button className='bg-black text-white p-4 flex items-center gap-4'>
                                                Shop Now <RiShoppingBag2Fill />

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </SwiperSlide>

                            <SwiperSlide>
                                <div className=''>

                                    <div className="bg-[url('images/banner-img-2.webp')] bg-cover bg-center w-full h-screen flex items-center">



                                        <div className='mx-10'>
                                            <p>
                                                Exclusive Collection
                                            </p>

                                            <h2 className='text-5xl font-semibold mt-3'>
                                                Fashion Sneaker  <br /> Collection 2025
                                            </h2>

                                            <p className='text-gray-500 mt-5 mb-5'>
                                                Extra 25% Off On Your First Order
                                            </p>

                                            <button className='bg-black text-white p-4 flex items-center gap-4'>
                                                Shop Now <RiShoppingBag2Fill />

                                            </button>

                                        </div>


                                    </div>

                                </div>

                            </SwiperSlide>

                            <SwiperSlide>
                                <div className=''>

                                    <div className="bg-[url('images/banner-img-3.webp')] bg-cover bg-center w-full h-screen flex items-center">


                                        <div className='mx-10'>
                                            <p>
                                                Exclusive Collection
                                            </p>

                                            <h2 className='text-5xl font-semibold mt-3'>
                                                Collect Your Style <br /> Sneakers
                                            </h2>

                                            <p className='text-gray-500 mt-5 mb-5'>
                                                Extra 25% Off On Your First Order
                                            </p>

                                            <button className='bg-black text-white p-4 flex items-center gap-4'>
                                                Shop Now <RiShoppingBag2Fill />

                                            </button>

                                        </div>


                                    </div>

                                </div>

                            </SwiperSlide>

                        </Swiper>



                    </div >

                </div>

                <div className='mt-10'>

                    <div className=' lg:mx-10 grid lg:grid-cols-3 lg:gap-10 my-5'>
                        <img src="/images/collection-img-1.webp" alt="" className='' />
                        <img src="/images/collection-img-2.webp" alt="" className='' />
                        <img src="/images/collection-img-3.webp" alt="" className='' />

                    </div>



                </div>

                <div>

                    <ProductSwiper />

                </div>

                <div className='grid lg:grid-cols-2 justify-items-center  m-10'>

                    <div className="bg-[url('images/arrival-img-1.webp')] bg-contain  lg:h-[350px] lg:w-[500px] flex items-center">

                        <div className='absolute gap-5 mx-5 m-2'>

                            <p className='text-xl font-semibold'>
                                New Arrival
                            </p>

                            <h4 className='text-2xl font-extrabold'>
                                Fashion shoe
                            </h4>

                            <p className='text-red-400 '>
                                50% OFF ON Every PURCHASE
                            </p>

                            <button
                                className='bg-black text-white p-2 flex items-center gap-4 mt-3'>
                                Shop Now <RiShoppingBag2Fill />

                            </button>

                        </div>

                    </div>

                    <div className="bg-[url('images/arrival-img-2.webp')] bg-contain  lg:h-[350px] lg:w-[500px] flex items-center">

                        <div className='absolute gap-5 mx-5 m-2'>

                            <p className='text-xl font-semibold'>
                                New Collection
                            </p>

                            <h4 className='text-2xl font-extrabold'>
                                Sneakers
                            </h4>

                            <p className='text-red-400 '>
                                Sale upto 60%
                            </p>

                            <button
                                className='bg-black text-white p-2 flex items-center gap-4 mt-3'>
                                Shop Now <RiShoppingBag2Fill />

                            </button>

                        </div>



                    </div>




                </div>


                <div>

                    <div className='mx-10'>
                        <div className='flex  items-center'>
                            <div>
                                <p className='text-xl font-semibold'>Explore New  Arrivals</p>
                            </div>

                            <div className='ml-auto'>
                                <button className='flex items-center '>
                                    Explore More <FaArrowRight />
                                </button>

                            </div>

                        </div>
                    </div>


                    <div className='grid lg:grid-cols-4 gap-5 mx-10 mt-5'>

                        {products && Array.isArray(products) && products.map((product, index) => {
                            if (product) {
                                return (
                                    <div key={product.id || index} className='p-2'>
                                        <div className='relative group overflow-hidden'>
                                            <img
                                                src={imageAPI.getImageUrl(product.primaryImage?.image_url)}

                                                alt={product.name}
                                                className='w-full h-48 object-cover'
                                            />
                                            <div className='absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20'>
                                                <IoMdSwap className='bg-white text-black rounded-full text-xl p-1 hover:bg-gray-200 cursor-pointer' />
                                                <IoIosHeartEmpty className='bg-white text-black rounded-full text-xl p-1 hover:bg-gray-200 cursor-pointer' />
                                                <FaRegEye className='bg-white text-black rounded-full text-xl p-1 hover:bg-gray-200 cursor-pointer' />
                                            </div>
                                        </div>
                                        <div className='mt-2'>
                                            <h3 className='text-sm text-black'>{product.name}</h3>
                                            <div className='flex items-center gap-2'>
                                                <p className='text-sm text-gray-500'>${product.price}</p>
                                                {product.sale_price && (
                                                    <p className='text-sm text-black line-through'>${product.sale_price}</p>
                                                )}
                                            </div>
                                            <div className='flex items-center mt-1'>
                                                <IoMdStar className='text-black' />
                                                <IoMdStar className='text-black' />
                                                <IoMdStar className='text-black' />
                                                <IoMdStar className='text-black' />
                                                <IoMdStar className='text-black' />
                                            </div>
                                            <button className='bg-black text-white p-2 flex items-center gap-2 mt-2 w-full justify-center'>
                                                Shop Now <RiShoppingBag2Fill />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        })}

                    </div>


                </div>

                <div className="bg-[url('/images/shop-bg-1.webp')] bg-cover bg-center h-96 flex items-center justify-center">

                    <div className='text-center text-black'>
                        <p className='text-lg font-semibold'>
                            New Arrivals
                        </p>

                        <h2 className='text-4xl font-bold mt-2 mb-2'>
                            Running Shoes
                        </h2>

                        <p className='text-lg text-red-400 mb-4'>
                            Modern Style Only This Week
                        </p>
                        <button className='bg-black text-white px-6 py-3 flex items-center gap-2 mx-auto'>
                            Shop Now <RiShoppingBag2Fill />
                        </button>

                    </div>

                </div>


                <div>
                    <div className='mx-10'>
                        <div className='flex  items-center'>
                            <div>
                                <p className='text-xl font-semibold'>Explore New  Arrivals</p>
                            </div>

                            <div className='ml-auto'>
                                <button className='flex items-center '>
                                    Explore More <FaArrowRight />
                                </button>

                            </div>

                        </div>

                    </div>


                    <div>

                        <ProductSwiper />

                    </div>




                </div>

                <div className='my-10 bg-gray-100'>
                    <div className='text-center py-8'>
                        <h2 className='text-3xl font-bold'>Our customer says about Torado</h2>
                    </div>

                    <div className='flex mx-auto max-w-6xl px-10 relative'>
                        <div className='w-1/2'>
                            <img src="/images/testimonial-1.webp" alt="" className='h-96 w-full object-cover rounded-l-lg' />
                        </div>

                        <div className='absolute right-40 top-1/2 transform -translate-y-1/2 w-1/2 flex items-center justify-center z-10'>
                            <Swiper
                                slidesPerView={2}
                                pagination={true}
                                navigation={true}
                                loop={true}
                                className='w-full h-full'>
                                {testimonials.map((testimonial, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='flex bg-white flex-col items-center justify-center h-full p-8 rounded-lg shadow-lg mx-4'>
                                            <div className='text-center max-w-md'>
                                                <p className='text-lg mb-6 italic'>
                                                    "{testimonial.message}"
                                                </p>
                                                <div className='flex items-center justify-center gap-4'>
                                                    <img src={testimonial.image || "No Image"}
                                                        className='w-12 h-12 rounded-full object-cover' />
                                                    <div className='text-left'>
                                                        <p className='font-semibold text-lg'>
                                                            {testimonial.name}
                                                        </p>
                                                        <p className='text-gray-500'>
                                                            {testimonial.designation || 'Customer'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>

































            </div>
        </>
    )
}

export default Homepage
