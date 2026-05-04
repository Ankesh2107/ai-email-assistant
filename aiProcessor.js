/**
 * AI Email Processor Module
 * 
 * This module contains the core AI processing logic that can be reused
 * by both the CLI application and the web server.
 */

require('dotenv').config();
const axios = require('axios');

// Load environment variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Validates that the API key is available
 * @throws {Error} If API key is missing
 */
function validateApiKey() {
    if (!GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY not found in environment variables. Please set it in your .env file.');
    }
}

/**
 * Creates the prompt for the LLM based on user input
 * @param {string} userInput - The email text to process
 * @returns {string} The complete prompt for the LLM
 */
function createPrompt(userInput) {
    return `You are an intelligent AI email assistant designed for business communication.

Your task is to:
- Read the email carefully
- Classify it into SUPPORT, SALES, or GENERAL
- Generate a professional reply

Guidelines:
- Write natural, human-like replies
- Avoid generic phrases like "Dear valued customer"
- Personalize based on the specific email content
- Keep tone professional but conversational
- Length: 4–6 lines
- SUPPORT → show empathy and offer specific help
- SALES → be persuasive and informative
- GENERAL → be clear and helpful
- Do not mention AI or that you are a bot
- Do not hallucinate unknown details

Email:
"""
${userInput}
"""

Output format:
Category: <SUPPORT / SALES / GENERAL>
Reply:
<reply>`;
}

/**
 * Parses the AI response to extract category and reply
 * @param {string} aiResponse - The raw response from AI
 * @returns {Object} Object with category and reply properties
 */
function parseAIResponse(aiResponse) {
    try {
        // Split response by lines
        const lines = aiResponse.split('\n').map(line => line.trim()).filter(line => line);
        
        let category = '';
        let reply = '';
        let currentSection = '';
        
        // Parse each line
        for (const line of lines) {
            if (line.startsWith('Category:')) {
                category = line.replace('Category:', '').trim();
                currentSection = 'category';
            } else if (line.startsWith('Reply:')) {
                reply = line.replace('Reply:', '').trim();
                currentSection = 'reply';
            } else if (currentSection === 'category' && !category) {
                // Continue reading category if not complete
                category += ' ' + line;
            } else if (currentSection === 'reply') {
                // Continue reading reply content
                reply += (reply ? ' ' : '') + line;
            }
        }
        
        // Validate category
        const validCategories = ['SUPPORT', 'SALES', 'GENERAL'];
        if (!validCategories.includes(category.toUpperCase())) {
            category = 'GENERAL'; // Default fallback
        }
        
        // Ensure we have both category and reply
        if (!category) category = 'GENERAL';
        if (!reply) reply = 'Thank you for your email. We will review your message and respond appropriately.';
        
        return {
            category: category.toUpperCase(),
            reply: reply
        };
        
    } catch (error) {
        console.error('Error parsing AI response:', error.message);
        // Return fallback values
        return {
            category: 'GENERAL',
            reply: 'Thank you for your email. We will review your message and respond appropriately.'
        };
    }
}

/**
 * Main email processing function that can be used by both CLI and web app
 * @param {string} emailText - The email text to process
 * @returns {Promise<Object>} Object containing category and reply
 * @throws {Error} If API request fails
 */
async function processEmail(emailText) {
    try {
        // Validate API key before making request
        validateApiKey();
        
        // Create the prompt
        const prompt = createPrompt(emailText);
        
        // Prepare API request payload
        const payload = {
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        };
        
        // Make API request to Groq
        const response = await axios.post(GROQ_API_URL, payload, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 second timeout
        });
        
        // Extract the response content
        const aiResponse = response.data.choices[0].message.content.trim();
        
        // Parse the response to extract category and reply
        const result = parseAIResponse(aiResponse);
        
        return result;
        
    } catch (error) {
        // Handle different types of errors
        if (error.response) {
            // API responded with error status
            throw new Error(`Groq API Error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
        } else if (error.request) {
            // Network error
            throw new Error('Network error: Unable to connect to Groq API. Please check your internet connection.');
        } else {
            // Other errors
            throw new Error(`Error: ${error.message}`);
        }
    }
}

// Export the main processing function and utilities
module.exports = {
    processEmail,
    createPrompt,
    parseAIResponse,
    validateApiKey
};
