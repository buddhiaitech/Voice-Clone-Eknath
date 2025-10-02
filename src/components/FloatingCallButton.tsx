import { Phone } from "lucide-react";

const FloatingCallButton = () => {
  const handleScrollToContact = () => {
    const contactSection = document.querySelector('section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleScrollToContact}
      className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all z-50"
      aria-label="Start a call"
    >
      <Phone className="w-6 h-6" />
    </button>
  );
};

export default FloatingCallButton;
