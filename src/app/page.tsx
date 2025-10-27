import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";
import Header from "@/components/Header";
import ScrollText from "@/components/ScrollText";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      {/* Splash Screen Component */}
      <SplashScreen />

      {/* Header Component - Transparent background */}
      <Header />

      {/* Hero Section - Main landing section with floating image and text */}
      <HeroSection />

      {/* Scroll-Driven Text Animation Section - Full Width */}
      <div className="bg-white dark:bg-gray-900">
        <ScrollText />
      </div>

      {/* Tech Stack Component - Modern Tech Stack with Interactive Grid (After Hero Section) */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <TechStack />
      </div>

      {/* Spacer for Footer Reveal */}
      <div className="h-[100dvh]"></div>

      {/* Fixed Footer Component - Reveals like a curtain on scroll */}
      <Footer />
    </>
  );
}
