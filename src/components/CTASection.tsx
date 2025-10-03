import { Button } from "./ui/button";

const CTASection = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-secondary rounded-3xl px-12 py-16 text-center text-secondary-foreground">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Your Voice Clone Now
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            
            <p className="text-lg opacity-90">Fast, Secure & Easy to Use</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
