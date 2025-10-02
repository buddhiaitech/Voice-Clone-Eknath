const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-medium">© 2025 Voice Clone Service</p>
          <p className="text-sm opacity-90">Professional AI Voice Cloning Technology</p>
        </div>
        <div className="text-right">
          <p className="font-medium">Contact: info@voiceclone.com</p>
          <p className="text-sm opacity-90">Powered by Advanced AI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
