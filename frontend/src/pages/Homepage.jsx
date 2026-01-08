import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { RiShoppingBag2Fill } from "react-icons/ri";
import ProductSwiper from '../components/products/ProductSwiper'




function Homepage() {
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

































            </div>
        </>
    )
}

export default Homepage
