import React from 'react';
import { Image } from '@nextui-org/react';
import parse from 'html-react-parser';
import Link from 'next/link';

const BlogCard = ({ blogs }) => {
  const postDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-USA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };
  return (
    <div className='flex items-center gap-6 mb-4 '>
      <Link href={`/blog/${blogs?.slug}`}>
        <Image
          width={180}
          height={180}
          src={blogs?.featuredImage?.image?.url}
          alt={blogs?.featuredImage?.altText}
          className='bg-center bg-cover'
        />
        <div>
          <div className='font-thin text-[.8rem] text-white text-left italic mt-0'>
            {postDate(blogs?.createdAt)}
          </div>
          <div className='text-md tracking-normal font-bold text-[#D5AD45] text-left mb-0 line-clamp-2'>
            {blogs?.title}
          </div>
          <div className='font-normal text-[.8rem] text-white mb-4 text-justify sm:line-clamp-1 line-clamp-1 h-6'>
            {parse(blogs?.body)}
          </div>
          <button
            href={`/blog/${blogs?.slug}`}
            className='px-4 py-2 font-medium tracking-wider text-white border border-white rounded-full text-normal focus:outline-none hover:bg-white hover:text-black focus:ring-1 focus:ring-gray-200'
          >
            Read More
          </button>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
