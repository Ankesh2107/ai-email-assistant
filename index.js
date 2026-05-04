/**
 * AI Email Assistant CLI Application
 * 
 * This application takes email input from the terminal, sends it to Groq API
 * for classification and reply generation, and displays the results.
 * 
 * Uses the shared AI processor module for core functionality.
 */

const { processEmail, validateApiKey } = require('./aiProcessor');
const readlineSync = require('readline-sync');

/**
 * Displays the results in a formatted way
 * @param {string} category - The email category
 * @param {string} reply - The generated reply
 */
function displayResults(category, reply) {
    console.log('\n' + '='.repeat(60));
    console.log('📧 AI EMAIL ASSISTANT RESULTS');
    console.log('='.repeat(60));
    
    // Display category with color coding
    const categoryColors = {
        'SUPPORT': '🔴', // Red for support issues
        'SALES': '🟢',   // Green for sales
        'GENERAL': '🔵'  // Blue for general
    };
    
    const icon = categoryColors[category] || '⚪';
    console.log(`${icon} Category: ${category}`);
    
    // Display reply
    console.log('\n💬 Suggested Reply:');
    console.log('-'.repeat(40));
    console.log(reply);
    console.log('-'.repeat(40));
    console.log('='.repeat(60));
}

/**
 * Gets email input from user via command line
 * @returns {string} The email text provided by user
 */
function getUserInput() {
    console.log('🤖 AI Email Assistant');
    console.log('Please paste your email content below:');
    console.log('(Press Enter twice to finish input)\n');
    
    // Get multiline input from user
    const userInput = readlineSync.question('', {
        limit: null,
        limitMessage: 'Press Enter twice to finish...',
        defaultInput: ''
    });
    
    return userInput.trim();
}

/**
 * Main function to run the AI Email Assistant CLI
 */
async function main() {
    try {
        console.log('🚀 Starting AI Email Assistant...\n');
        
        // Validate API key at startup
        validateApiKey();
        
        // Get email input from user
        const emailText = getUserInput();
        
        if (!emailText) {
            console.log('❌ No email content provided. Exiting.');
            return;
        }
        
        console.log('\n📝 Email received. Processing...');
        
        // Process the email with Groq API
        const result = await processEmail(emailText);
        
        // Display the results
        displayResults(result.category, result.reply);
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        
        // Provide helpful error messages
        if (error.message.includes('GROQ_API_KEY')) {
            console.log('\n💡 To fix this issue:');
            console.log('1. Get a free API key from https://groq.com/');
            console.log('2. Create a .env file in this directory');
            console.log('3. Add: GROQ_API_KEY=your_api_key_here');
        } else if (error.message.includes('Network error')) {
            console.log('\n💡 Please check your internet connection and try again.');
        }
        
        process.exit(1);
    }
}

// Run the application if this file is executed directly
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Unexpected error:', error.message);
        process.exit(1);
    });
}

// Export functions for testing
module.exports = {
    displayResults
};
