import { Button } from "./ui/button";

const CTASection = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-secondary rounded-3xl px-12 py-16 text-center text-secondary-foreground">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Your Voice Clone Now
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto opacity-95">
            Create professional audio content with the authentic voice of Deputy CM Eknath Sambhaji Shinde. Our state-of-the-art AI technology delivers a near-perfect replica for all your communication needs.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-lg"
            >
              Get Your Voice Clone Now
            </Button>
            <p className="text-lg opacity-90">Fast, Secure & Easy to Use</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
