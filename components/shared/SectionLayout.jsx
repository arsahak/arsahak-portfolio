// import React from 'react';
// import clsx from 'clsx';

// const SectionLayout = React.memo(({ children, img, bg }) => {
//   return (
//     <section
//       className={clsx(
//         img,
//         bg,
//         'mx-auto flex justify-center items-center w-full',
//       )}
//     >
//       <div className='container py-[1.5rem] md:py-[3.5rem] px-5 xl:px-0'>
//         {children}
//       </div>
//     </section>
//   );
// });

// export default SectionLayout;
import React from 'react';

const SectionLayout = ({ children }) => {
  return <div className='container p-4 mx-auto'>{children}</div>;
};

export default SectionLayout;
