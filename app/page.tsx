import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollStory from "@/components/ScrollStory";
import Services from "@/components/Services";
import Facts from "@/components/Facts";
import Showcase from "@/components/Showcase";
import Faq from "@/components/Faq";
import NextPageBanner from "@/components/NextPageBanner";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <div id="home">
          <Hero />
        </div>
        <div id="mission">
          <ScrollStory />
        </div>
        <div id="values">
          <Services />
        </div>
        <Facts />
        <div id="about-us">
          <Showcase />
        </div>
        <Faq />
        <NextPageBanner />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
