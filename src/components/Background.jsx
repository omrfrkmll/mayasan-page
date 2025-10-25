
export const Background = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url(/kground.svg)", backgroundSize: "cover", backgroundPosition: "center" }}></div>
      <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: "url(noise.webp)", backgroundSize: "300px 300px" }}></div>
    </div>
  );
};
