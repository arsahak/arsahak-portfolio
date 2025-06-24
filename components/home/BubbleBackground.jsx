import "./Animation.css";

const BubbleBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
        <span key={i} className={`bubble bubble-${i + 1}`}></span>
      ))}
    </div>
  );
};

export default BubbleBackground;
