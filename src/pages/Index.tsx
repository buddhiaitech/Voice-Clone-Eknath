import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Index;
