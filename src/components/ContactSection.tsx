import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Loader2, Phone } from "lucide-react";
import axios from "axios";

const ContactSection = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to handle call initiation
  const handleMakeCall = async () => {
    // Basic validation
    if (!phoneNumber.trim()) {
      toast({
        variant: "destructive",
        title: "Phone Number Required",
        description: "Please enter a phone number to make a call."
      });
      return;
    }

    // Validate Indian phone number format (10 digits starting with 6-9)
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    if (cleanNumber.length !== 10 || !/^[6-9]\d{9}$/.test(cleanNumber)) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian phone number starting with 6-9."
      });
      return;
    }

    setIsLoading(true);

    try {
      // Use different API endpoints for development vs production
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/make-call'
        : '/api/make-call';
      
      const response = await axios.post(apiUrl, {
        phoneNumber: cleanNumber,
        name: name.trim() || undefined
      });

      if (response.data.success) {
        toast({
          title: "Call Initiated Successfully! 📞",
          description: `Calling ${response.data.message.split(' to ')[1]}. You should receive the call shortly.`
        });
        
        // Clear the form after successful call
        setPhoneNumber("");
        setName("");
      }
    } catch (error) {
      console.error('Call initiation failed:', error);
      
      const errorMessage = error.response?.data?.error || 'Failed to initiate call. Please try again.';
      toast({
        variant: "destructive",
        title: "Call Failed",
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-secondary text-secondary-foreground px-8 py-6">
            <h2 className="text-2xl font-bold">मंत्री संपर्क प्रणाली</h2>
            <p className="text-sm opacity-90">Minister Contact System</p>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                फोन नंबर (Phone Number)
              </label>
              <div className="flex gap-2">
                <div className="bg-muted rounded-lg px-4 py-2 text-muted-foreground font-medium flex items-center">
                  + 91
                </div>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 text-lg"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Enter 10 digit number without country code
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                नाव (Recipient's Name)
              </label>
              <Input
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg"
              />
            </div>

            <Button 
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6"
              onClick={handleMakeCall}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Initiating Call...
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-5 w-5" />
                  कॉल करा (Send Call)
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
