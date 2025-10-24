import { HeroSection } from "../components/HeroSection";
import VideoStorytellingModule from "../components/VideoStorytellingModule";
import KeywordMarquee from "../components/KeywordMarquee";
import { ProductsSection } from "../components/ProductsSection";
import { ReferenceCompaniesSection } from "../components/ReferenceCompaniesSection";
import { BlogPage } from "./BlogPage";

export const HomePage = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url(/grid-background.svg)", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "300px 300px" }}></div>
        <HeroSection />
      </div>
      <div className="relative">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url(/grid-background.svg)", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "300px 300px" }}></div>
        <VideoStorytellingModule />
      </div>
      <div className="relative">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url(/grid-background.svg)", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "300px 300px" }}></div>
        <KeywordMarquee />
      </div>
      <div className="relative">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url(/grid-background.svg)", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "300px 300px" }}></div>
        <ProductsSection />
      </div>
      <div className="relative">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url(/grid-background.svg)", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "300px 300px" }}></div>
        <ReferenceCompaniesSection />
      </div>
      <div className="relative">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url(/grid-background.svg)", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "300px 300px" }}></div>
        <BlogPage />
      </div>
    </>
  );
};

