import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-3 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Phone className="w-6 h-6" />
          <div>
            <h1 className="text-xl font-bold">Voice Clone</h1>
            <p className="text-sm opacity-90">Get a Perfect Replica of a Voice</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold">एकनाथ संभाजी शिंदे</h2>
          <p className="text-sm opacity-90">Eknath Sambhaji Shinde, Maharashtra Deputy CM</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
