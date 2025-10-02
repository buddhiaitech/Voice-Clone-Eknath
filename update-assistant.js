// Script to update your Vapi assistant configuration
// Run this to fix the conversation response issues

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const ASSISTANT_ID = 'a54c6902-12b6-43db-8f05-be00d1b198cf';
const VAPI_PRIVATE_API_KEY = process.env.VAPI_PRIVATE_API_KEY;

async function updateAssistant() {
  try {
    const response = await fetch(`https://api.vapi.ai/assistant/${ASSISTANT_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${VAPI_PRIVATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Eknath Shinde Voice Clone",
        firstMessage: "नमस्कार! मी एकनाथ शिंदे आहे. आपण कसे आहात? आज मी आपल्याशी काय बोलू शकतो?",
        firstMessageMode: "assistant-speaks-first",
        
        // Model configuration
        model: {
          provider: "openai",
          model: "gpt-4o",
          temperature: 0.7,
          messages: [{
            role: "system",
            content: `तुम्ही एकनाथ शिंदे आहात, महाराष्ट्राचे उपमुख्यमंत्री. तुम्ही मराठीत बोलता आणि जनतेशी प्रेमाने संवाद साधता. 

तुमचे वागणे:
- मैत्रीपूर्ण आणि सहायक असावे
- मराठीत उत्तर द्या, परंतु इंग्रजी समजत असल्यास इंग्रजीत उत्तर देऊ शकता  
- 30 शब्दांपेक्षा कमी उत्तर द्या
- जनतेच्या समस्या ऐका आणि योग्य मार्गदर्शन करा
- राजकीय चर्चा टाळा आणि सकारात्मक राहा

You are Eknath Shinde, Deputy CM of Maharashtra. You speak in Marathi and communicate lovingly with people.

Your behavior:
- Be friendly and helpful
- Answer in Marathi, but can answer in English if needed
- Keep responses under 30 words
- Listen to people's problems and provide appropriate guidance
- Avoid political discussions and stay positive`
          }]
        },

        // Voice configuration
        voice: {
          provider: "11labs",
          voiceId: "21m00Tcm4TlvDq8ikWAM", // You may need to change this to a more suitable voice
          speed: 1.0,
          fallbackPlan: {
            voices: [
              {
                provider: "azure",
                voiceId: "en-IN-NeerjaNeural"
              }
            ]
          }
        },

        // Critical: Speaking timing configuration
        startSpeakingPlan: {
          waitSeconds: 0.4,
          smartEndpointingPlan: {
            provider: "livekit",
            waitFunction: "2000 / (1 + exp(-10 * (x - 0.5)))"
          }
        },

        stopSpeakingPlan: {
          numWords: 0,
          voiceSeconds: 0.2,
          backoffSeconds: 1.0
        },

        // Message plan for better conversation flow
        messagePlan: {
          idleMessages: [
            "काय झालं? आपण तिथे आहात का?", 
            "मला काही मदत करता येईल का?",
            "आपल्या प्रश्नाची वाट पाहत आहे."
          ],
          idleTimeoutSeconds: 15,
          idleMessageMaxSpokenCount: 2,
          idleMessageResetCountOnUserSpeechEnabled: true
        },

        // Background speech denoising
        backgroundSpeechDenoisingPlan: {
          smartDenoisingPlan: {
            enabled: true
          }
        }
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Assistant updated successfully!');
      console.log('Your assistant should now respond properly during calls.');
    } else {
      console.error('❌ Failed to update assistant:', result);
    }
    
  } catch (error) {
    console.error('❌ Error updating assistant:', error.message);
  }
}

// Run the update
updateAssistant();