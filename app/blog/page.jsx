import React from "react";
import Image from "next/image";
import { blogData } from "@/config/data";
import GetAllPostData from "@/lib/GetAllPostData";
import SectionLayout from "@/components/shared/SectionLayout";
import parse from "html-react-parser";
import { Link } from "@nextui-org/react";
import ScrollMotionEffect from "@/components/motion/ScrollMotionEffect";

const page = async () => {
  const blogPostData = await GetAllPostData();

  const postDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  return (
    <section className="pt-24 pb-6  md:pt-36 md:pb-10">
      <div className="container">
        <ScrollMotionEffect effect="fade-down" duration="2000">
          <h2 className="mb-4 text-3xl font-bold tracking-normal text-left text-white">
            Recent Blog Post
          </h2>
        </ScrollMotionEffect>
        <ScrollMotionEffect effect="fade-right" duration="2000">
          <hr className="w-full h-[1px] mx-auto my-8 bg-gray-200 border-0 rounded md:my-5" />
        </ScrollMotionEffect>
        <div className="gap-0 mb-10 md:gap-12 md:flex items-start">
          {blogPostData?.data
            ?.filter((pub, no) => pub.published === true && no === 0)
            ?.map((blogs, index) => (
              <div className="flex-1">
                <Link href={`/blog/${blogs?.slug}`}>
                  <div>
                    <ScrollMotionEffect effect="fade-right" duration="2000">
                      <Image
                        width={1800}
                        height={300}
                        src={blogs?.featuredImage?.image?.url}
                        alt={blogs?.featuredImage?.altText}
                        className="bg-center bg-cover"
                      />

                      <p className="font-thin text-[1rem] text-white text-left italic mt-2">
                        {postDate(blogs?.createdAt)}
                      </p>
                      <h2 className="text-2xl tracking-normal font-bold text-[#D5AD45] text-left mb-2 ">
                        {blogs?.title}
                      </h2>
                      <div className="font-normal text-[1rem] text-white mb-8 line-clamp-6">
                        {parse(blogs?.body)}
                      </div>
                      <button className="px-8 py-3 font-medium tracking-wider text-white border border-white rounded-full text-normal focus:outline-none hover:bg-white hover:text-black focus:ring-1 focus:ring-gray-200">
                        Read More
                      </button>
                    </ScrollMotionEffect>
                  </div>
                </Link>
              </div>
            ))}

          <div className="flex-1 md:h-[650px] overflow-y-scroll overflow-x-hidden mt-10 md:mt-0 ">
            {blogPostData?.data
              ?.filter((pub, no) => pub.published === true)
              ?.map((blogs, index) => (
                <ScrollMotionEffect effect="fade-left" duration="2000">
                  <Link
                    className="flex items-center gap-6 mb-8"
                    key={index}
                    href={`/blog/${blogs?.slug}`}
                  >
                    <Image
                      width={180}
                      height={180}
                      src={blogs?.featuredImage?.image?.url}
                      alt={blogs?.featuredImage?.altText}
                      className="bg-center bg-cover"
                    />
                    <div>
                      <p className="font-thin text-[.8rem] text-white text-left italic mt-2">
                        {postDate(blogs?.createdAt)}
                      </p>
                      <h2 className="text-xl tracking-normal font-bold text-[#D5AD45] mb-2">
                        {blogs?.title}
                      </h2>
                      <div className="font-normal text-[.8rem] text-white mb-4 sm:line-clamp-1 line-clamp-1">
                        {parse(blogs?.body)}
                      </div>
                      <button
                        href={`/blog/${blogs?.slug}`}
                        className="px-4 py-2 font-medium tracking-wider text-white border border-white rounded-full text-normal focus:outline-none hover:bg-white hover:text-black focus:ring-1 focus:ring-gray-200"
                      >
                        Read More
                      </button>
                    </div>
                  </Link>
                </ScrollMotionEffect>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
