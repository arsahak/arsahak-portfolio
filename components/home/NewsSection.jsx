// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper";
// import "swiper/css/navigation";

// const NewsSection = () => {
//   return (
//     <section className="bg-black">
//       <div className="container py-6 md:py-20">
//         <div className="relative w-full">
//           {/* Left Navigation Button */}
//           <button
//             className="absolute left-0 z-10 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600"
//             id="prevButton"
//           >
//             &#8592;
//           </button>

//           {/* Swiper Slider */}
//           <Swiper
//             modules={[Navigation]}
//             slidesPerView={3}
//             spaceBetween={30}
//             loop={true} // Enable infinite loop
//             navigation={{
//               prevEl: "#prevButton",
//               nextEl: "#nextButton",
//             }}
//           >
//             <SwiperSlide>
//               <div className="p-4 bg-white shadow-md rounded-lg">
//                 <h2 className="text-lg font-bold">News Item 1</h2>
//                 <p className="text-sm text-gray-600">
//                   Description of news item 1
//                 </p>
//               </div>
//             </SwiperSlide>
//             <SwiperSlide>
//               <div className="p-4 bg-white shadow-md rounded-lg">
//                 <h2 className="text-lg font-bold">News Item 2</h2>
//                 <p className="text-sm text-gray-600">
//                   Description of news item 2
//                 </p>
//               </div>
//             </SwiperSlide>
//             <SwiperSlide>
//               <div className="p-4 bg-white shadow-md rounded-lg">
//                 <h2 className="text-lg font-bold">News Item 3</h2>
//                 <p className="text-sm text-gray-600">
//                   Description of news item 3
//                 </p>
//               </div>
//             </SwiperSlide>
//           </Swiper>

//           {/* Right Navigation Button */}
//           <button
//             className="absolute right-0 z-10 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600"
//             id="nextButton"
//           >
//             &#8594;
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsSection;
