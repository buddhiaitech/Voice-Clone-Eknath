// API route for making outbound calls via Vapi
// This runs on Vercel serverless functions

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    // Make the call to Vapi API
    const vapiResponse = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VAPI_PRIVATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(callPayload),
    });

    const vapiData = await vapiResponse.json();

    if (!vapiResponse.ok) {
      console.error('Vapi API Error:', vapiData);
      return res.status(vapiResponse.status).json({ 
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
}