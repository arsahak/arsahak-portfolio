"use client";
import { motion } from "framer-motion";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

const orbitron = Orbitron({ subsets: ["latin"] });

const NewsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simple image URL getter for blog
  const getImageUrl = (blog) => {
    return blog?.featureImage?.image?.url || "/opengraph-image.png";
  };

  // Get clean description
  const getDescription = (blog) => {
    if (!blog?.metaDescription && !blog?.description)
      return "Read this blog post to learn more.";
    const text = (blog.metaDescription || blog.description)
      .replace(/<[^>]*>/g, " ")
      .trim()
      .replace(/\s+/g, " ");
    if (text.length <= 120) return text;
    return text.slice(0, 120).replace(/[,;:.!?\s]*$/, "") + "...";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/blog?published=true", {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          const publishedBlogs = Array.isArray(data)
            ? data.filter((blog) => blog.published === true)
            : [];
          // Get latest 3 blogs
          setBlogs(publishedBlogs.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-6 md:gap-y-0 mb-16">
          <div className="w-full md:w-[40%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={`text-4xl md:text-5xl text-center md:text-left mb-4 ${orbitron.className}`}
              >
                Latest Blog Posts
              </h2>
            </ScrollMotionEffect>
          </div>

          <div className="w-full md:w-[55%]">
            <ScrollMotionEffect effect="fade-left" duration="2000">
              <p className="text-lg text-center md:text-left text-gray-300 leading-relaxed">
                Stay updated with the latest insights in web development, design
                trends, and technology innovations. Discover practical tips and
                industry best practices.
              </p>
            </ScrollMotionEffect>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="bg-gradient-to-br from-[#181818] to-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 h-full flex flex-col animate-pulse"
              >
                <div className="h-64 bg-gray-700"></div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between mb-3">
                    <div className="w-20 h-4 bg-gray-600 rounded"></div>
                    <div className="w-16 h-4 bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-full h-6 bg-gray-600 rounded mb-3"></div>
                  <div className="w-3/4 h-6 bg-gray-600 rounded mb-4"></div>
                  <div className="w-full h-4 bg-gray-600 rounded mb-2"></div>
                  <div className="w-5/6 h-4 bg-gray-600 rounded mb-4"></div>
                  <div className="w-24 h-4 bg-gray-600 rounded mt-auto"></div>
                </div>
              </div>
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <motion.div
                key={blog._id || blog.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Link href={`/blog/${blog.slug}`} className="block h-full">
                  <div className="bg-gradient-to-br from-[#181818] to-[#1a1a1a] rounded-2xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300 border border-white/10 group-hover:border-primary/30 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-64 flex-shrink-0">
                      <Image
                        src={getImageUrl(blog)}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {blog.category || "General"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <span>{formatDate(blog.createdAt)}</span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          5 min read
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                        {blog.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                        {getDescription(blog)}
                      </p>

                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300 mt-auto">
                        Read More
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 text-lg">No blog posts found.</div>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-primary to-[#8750f7] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              View All Posts
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

// "use client";
// import React from "react";
// import SectionLayout from "../shared/SectionLayout";
// import CardMotion from "../motion/CardMotion";
// import ImageMotion from "../motion/ImageMotion";
// import MotionEffect from "../motion/MotionEffect";
// import { Mulish, Bitter } from "next/font/google";
// import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
// import { articlesInfo } from "@/config/data";
// import BlackButton from "../shared/BlackButton";
// import ScondayButton from "../shared/ScondayButton";
// const bitter = Bitter({ subsets: ["latin"] });
// const mulish = Mulish({ subsets: ["latin"] });

// const NewsSection = () => {
// const list = [
//   {
//     title: "Waivers",
//     img: "/assets/home/blogone.png",
//     price: "April 28, 2021",
//   },
//   {
//     title: "Do You Need an Immigration Lawyer for naturalization",
//     img: "/assets/home/blogtwo.png",
//     price: "April 28, 2021",
//   },
//   {
//     title: "How can i contact an immigration lawyer for free",
//     img: "/assets/home/blogthree.png",
//     price: "April 28, 2021",
//   },
// ];
//   return (
//     <SectionLayout bg="bg-slate-50 ">
//       <div className="">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center">
//           <CardMotion
//             whileInView={{
//               opacity: 1,
//               y: 0,
//               transition: {
//                 duration: 1.1,
//               },
//             }}
//             initial={{
//               opacity: 0,
//               y: 100,
//             }}
//           >
//             <div className="">
//               <h2 className="text-stone-950 font-bold text-base ">News</h2>
//               <hr class="h-[2px] my-0 bg-stone-950 border-0 w-4"></hr>
//               <h2
//                 className={`text-stone-950 font-bold text-5xl mt-5 mb-4 text-center md:text-left ${bitter.className}`}
//               >
//                 News
//               </h2>
//             </div>
//           </CardMotion>
//           <CardMotion
//             whileInView={{
//               opacity: 1,
//               y: 0,
//               transition: {
//                 duration: 1.1,
//               },
//             }}
//             initial={{
//               opacity: 0,
//               y: 100,
//             }}
//           >
//             <div className="flex justify-end invisible md:visible">
//               <ScondayButton
//                 title={"View All"}
//                 link={"/blog"}
//                 style={"bg-[#1B2639] text-white"}
//                 radius={"none"}
//               />
//             </div>
//           </CardMotion>
//         </div>
//         <CardMotion
//           whileInView={{
//             opacity: 1,
//             y: 0,
//             transition: {
//               duration: 1.1,
//             },
//           }}
//           initial={{
//             opacity: 0,
//             y: 100,
//           }}
//         >
//           <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-0 md:mt-12">
//             {list.map((item, index) => (
//               <Card
//                 shadow="sm"
//                 radius="none"
//                 key={index}
//                 isPressable
//                 onPress={() => console.log("item pressed")}
//               >
//                 <CardBody className=" p-0">
//                   <Image
//                     shadow="none"
//                     radius="none"
//                     width="100%"
//                     alt={item.title}
//                     className="w-full object-cover h-[300px]"
//                     src={item.img}
//                   />
//                 </CardBody>
//                 <CardFooter className="text-small block text-left">
//                   <h2 className="text-default-500 text-lg font-bold block line-clamp-1">
//                     {item.title}
//                   </h2>
//                   <p className="text-default-500 block">{item.price}</p>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </CardMotion>

//         <CardMotion
//           whileInView={{
//             opacity: 1,
//             y: 0,
//             transition: {
//               duration: 1.1,
//             },
//           }}
//           initial={{
//             opacity: 0,
//             y: 100,
//           }}
//         >
//           <div className="flex justify-center visible md:invisible mt-12 md:mt-[-60px]">
//             <ScondayButton
//               title={"View All"}
//               link={"/blog"}
//               style={"bg-[#1B2639] text-white"}
//               radius={"none"}
//             />
//           </div>
//         </CardMotion>
//       </div>
//     </SectionLayout>
//   );
// };

// export default NewsSection;
