const SectionLayoutBgImg = ({ children, img, bg }) => {
  return (
    <section className={`${img} ${bg} mx-auto flex w-full `}>
      <div className="container py-[3.5rem] mx-5 lg-mx-0">{children}</div>
    </section>
  );
};

export default SectionLayoutBgImg;
