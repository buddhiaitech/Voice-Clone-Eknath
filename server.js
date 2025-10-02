// Development server for API routes
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API route for making calls
app.post('/api/make-call', async (req, res) => {
  try {
    const { phoneNumber, name } = req.body;

    // Validate required fields
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Format Indian phone number to E164 format (+91xxxxxxxxxx)
    const formattedNumber = phoneNumber.startsWith('+91') 
      ? phoneNumber 
      : `+91${phoneNumber.replace(/\D/g, '')}`;

    // Validate phone number format (Indian numbers are 10 digits after +91)
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!phoneRegex.test(formattedNumber)) {
      return res.status(400).json({ 
        error: 'Please enter a valid Indian phone number (10 digits starting with 6-9)' 
      });
    }

    console.log('Making call to:', formattedNumber);
    console.log('Using Assistant ID:', process.env.ASSISTANT_ID);
    console.log('Using Phone Number ID:', process.env.PHONE_NUMBER_ID);

    // Prepare the call payload for Vapi API
    const callPayload = {
      assistantId: process.env.ASSISTANT_ID,
      phoneNumberId: process.env.PHONE_NUMBER_ID,
      customer: {
        number: formattedNumber,
        name: name || undefined,
        numberE164CheckEnabled: false
      }
    };

    console.log('Call payload:', JSON.stringify(callPayload, null, 2));

    // Make the call to Vapi API
    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VAPI_PRIVATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(callPayload),
    });

    const vapiData = await response.json();
    console.log('Vapi response:', response.status, vapiData);

    if (!response.ok) {
      console.error('Vapi API Error:', vapiData);
      return res.status(response.status).json({ 
        error: vapiData.message || 'Failed to initiate call',
        details: vapiData
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Call initiated successfully to ${formattedNumber}`,
      callId: vapiData.id,
      callData: vapiData
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Development API server is running',
    env: {
      hasPrivateApiKey: !!process.env.VAPI_PRIVATE_API_KEY,
      hasAssistantId: !!process.env.ASSISTANT_ID,
      hasPhoneNumberId: !!process.env.PHONE_NUMBER_ID
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Development API server running on http://localhost:${PORT}`);
  console.log(`📞 Call endpoint: http://localhost:${PORT}/api/make-call`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
  
  // Check environment variables
  console.log('\n🔐 Environment Variables:');
  console.log('VAPI_PRIVATE_API_KEY:', process.env.VAPI_PRIVATE_API_KEY ? 'Found ✓' : 'Missing ✗');
  console.log('ASSISTANT_ID:', process.env.ASSISTANT_ID ? 'Found ✓' : 'Missing ✗');
  console.log('PHONE_NUMBER_ID:', process.env.PHONE_NUMBER_ID ? 'Found ✓' : 'Missing ✗');
});