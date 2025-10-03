import FeatureCard from "./FeatureCard";
import { MessageCircle, Users, Clock, Globe, Shield, Phone } from "lucide-react";

const HeroSection = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "High Fidelity",
      description: "The voice clone captures the unique tone, pitch, and accent of Deputy CM Eknath Sambhaji Shinde"
    },
    {
      icon: Clock,
      title: "Fast Generation",
      description: "Get your audio file within minutes of submitting your script"
    },
    {
      icon: Users,
      title: "Easy to Use",
      description: "Simply type your script, and our AI will do the rest"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "The voice clone can generate content in multiple languages"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data and scripts are handled with the utmost security and privacy"
    },
    {
      icon: Phone,
      title: "State-of-the-Art Technology",
      description: "Creates a near-perfect replica using advanced AI voice cloning"
    }
  ];

  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
         
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Experience a realistic and high-quality voice clone of Hon. Deputy CM Eknath Sambhaji Shinde Jii. Perfect for public service announcements, educational content, and personal messages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
