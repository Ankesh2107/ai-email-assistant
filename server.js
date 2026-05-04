/**
 * AI Email Assistant Web Server
 * 
 * Express server that provides API endpoints for the AI Email Assistant
 * web application and serves static files.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { processEmail } = require('./aiProcessor');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname))); // Serve static files

/**
 * API endpoint to process email text
 * POST /process
 * 
 * Request body:
 * {
 *   "text": "email content"
 * }
 * 
 * Response:
 * {
 *   "category": "SUPPORT|SALES|GENERAL",
 *   "reply": "generated reply text"
 * }
 */
app.post('/process', async (req, res) => {
    try {
        // Validate request body
        const { text } = req.body;
        
        if (!text || typeof text !== 'string') {
            return res.status(400).json({
                error: 'Invalid request. Please provide email text in the "text" field.'
            });
        }
        
        // Validate minimum text length
        if (text.trim().length < 10) {
            return res.status(400).json({
                error: 'Email text is too short. Please provide at least 10 characters.'
            });
        }
        
        // Process the email using the AI processor
        const result = await processEmail(text.trim());
        
        // Return successful response
        res.json({
            category: result.category,
            reply: result.reply
        });
        
    } catch (error) {
        console.error('Error processing email:', error.message);
        
        // Handle different types of errors
        let statusCode = 500;
        let errorMessage = 'An error occurred while processing your email.';
        
        if (error.message.includes('GROQ_API_KEY')) {
            statusCode = 500;
            errorMessage = 'Server configuration error. Please contact support.';
        } else if (error.message.includes('Network error')) {
            statusCode = 503;
            errorMessage = 'Unable to connect to AI service. Please try again later.';
        } else if (error.message.includes('Groq API Error')) {
            statusCode = 502;
            errorMessage = 'AI service error. Please try again later.';
        }
        
        res.status(statusCode).json({
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * Health check endpoint
 * GET /health
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'AI Email Assistant API'
    });
});

/**
 * Serve the main HTML file for the web interface
 * GET /
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error'
    });
});

/**
 * 404 handler
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});

/**
 * Start the server
 */
app.listen(PORT, () => {
    console.log(`🚀 AI Email Assistant Server running on http://localhost:${PORT}`);
    console.log(`📧 Web interface available at http://localhost:${PORT}`);
    console.log(`🔗 API endpoint: http://localhost:${PORT}/process`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Server terminated');
    process.exit(0);
});

module.exports = app;
