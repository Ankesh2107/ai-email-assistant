# AI Email Assistant

A modern web application and CLI tool that classifies emails and generates professional replies using the free Groq API with Llama 3 model.

## Features

- 🌐 **Modern Web Interface**: Clean, responsive SaaS-style web app
- 💻 **CLI Tool**: Command-line interface for power users
- 🤖 **AI-Powered Classification**: Automatically categorizes emails into SUPPORT, SALES, or GENERAL
- 💬 **Professional Replies**: Generates natural, human-like responses
- 🚀 **Fast & Free**: Uses Groq's free API with Llama 3 70B model
- ️ **Error Handling**: Robust error handling with helpful messages
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up API Key
```bash
# Copy the example file
cp .env.example .env

# Edit the .env file and add your Groq API key
# Get your free key from: https://groq.com/
```

### 3. Run Web Application
```bash
npm start
```
Then open http://localhost:3000 in your browser.

### 4. Run CLI (Optional)
```bash
npm run cli
```

## Detailed Setup Instructions

### Prerequisites
- Node.js 14 or higher
- Free Groq API key

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Get Groq API Key (Free)**
   - Visit [groq.com](https://groq.com/)
   - Sign up for a free account
   - Go to the API keys section
   - Copy your API key

3. **Configure Environment**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and replace with your API key
   # GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

### Running the Application

#### Web Application (Recommended)
```bash
npm start
```
- Opens at http://localhost:3000
- Modern, responsive web interface
- Real-time email processing
- Copy-to-clipboard functionality

#### CLI Interface
```bash
npm run cli
```
- Terminal-based interface
- Same AI processing power
- Great for automation and scripting

## Usage

### Web Application
1. **Start the server**: `npm start`
2. **Open browser**: Navigate to http://localhost:3000
3. **Enter email**: Paste your email content in the textarea
4. **Click "Generate Reply"**: Process the email with AI
5. **View results**: See category badge and suggested reply
6. **Copy reply**: Use the copy button to save the response

### CLI Interface
1. **Run CLI**: `npm run cli`
2. **Paste email content** when prompted
3. **Press Enter twice** to finish input
4. **View the results** with classification and suggested reply

## Web Application Features

### Modern UI Design
- Clean, minimal SaaS-style interface
- Gradient background with soft shadows
- Responsive design for all devices
- Smooth animations and transitions

### Interactive Elements
- Real-time character counter
- Loading states with spinner
- Color-coded category badges:
  - 🔴 **Support** - Red for issues
  - 🟢 **Sales** - Green for inquiries  
  - 🔵 **General** - Blue for other queries
- One-click copy to clipboard
- Error handling with helpful messages

### User Experience
- Keyboard shortcuts (Ctrl+Enter to submit)
- Sample email loader for testing
- Smooth scrolling to results
- Mobile-friendly touch interface

## Example Input and Output

### Example 1: Support Email
**Input:**
```
Hi, I'm having trouble with my account login. I keep getting an error message when I try to access my dashboard. Can you help me?
```

**Output:**
```
============================================================
📧 AI EMAIL ASSISTANT RESULTS
============================================================
🔴 Category: SUPPORT

💬 Suggested Reply:
----------------------------------------
I understand how frustrating login issues can be. I'm here to help resolve this problem for you. Could you please provide more details about the specific error message you're seeing? Once I have this information, I can guide you through the necessary steps to restore your account access.
----------------------------------------
============================================================
```

### Example 2: Sales Email
**Input:**
```
I'm interested in your enterprise pricing plan for our team of 50 employees. Could you send me a quote and information about advanced features?
```

**Output:**
```
============================================================
📧 AI EMAIL ASSISTANT RESULTS
============================================================
🟢 Category: SALES

💬 Suggested Reply:
----------------------------------------
Thank you for your interest in our enterprise plan! I'd be delighted to provide you with detailed pricing information for your team of 50 employees. Our enterprise plan includes advanced features like priority support, custom integrations, and enhanced security. Let me schedule a demo to discuss your specific requirements and prepare a customized quote.
----------------------------------------
============================================================
```

### Example 3: General Email
**Input:**
```
Thank you for the excellent service! I just wanted to let you know how much I appreciate your product and support team.
```

**Output:**
```
============================================================
📧 AI EMAIL ASSISTANT RESULTS
============================================================
🔵 Category: GENERAL

💬 Suggested Reply:
----------------------------------------
Thank you so much for your kind words and feedback! We're thrilled to hear that you're satisfied with our product and support team. Your appreciation means a lot to us and motivates us to continue providing excellent service. Please don't hesitate to reach out if you need anything in the future.
----------------------------------------
============================================================
```

## Project Structure

```
ai_email_cli/
├── package.json          # Dependencies and project configuration
├── server.js            # Express web server
├── index.js             # CLI application
├── aiProcessor.js       # Shared AI processing logic
├── index.html           # Web interface
├── styles.css           # Modern UI styling
├── script.js            # Frontend JavaScript
├── .env.example         # Environment variable template
├── README.md            # This documentation
├── EXAMPLES.md          # Usage examples
└── node_modules/        # Installed dependencies
```

## API Endpoints

### POST /process
Process email text and return classification + reply.

**Request:**
```json
{
  "text": "Your email content here"
}
```

**Response:**
```json
{
  "category": "SUPPORT",
  "reply": "Generated professional reply"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "AI Email Assistant API"
}
```

## Dependencies

- **axios** (v1.6.0): For making HTTP requests to Groq API
- **dotenv** (v16.3.1): For managing environment variables
- **readline-sync** (v1.4.10): For command-line input handling
- **express** (v4.18.2): Web server framework
- **cors** (v2.8.5): Cross-origin resource sharing

## AI Model Details

- **Provider**: Groq
- **Model**: llama-3.3-70b-versatile
- **Endpoint**: https://api.groq.com/openai/v1/chat/completions
- **Cost**: Free (with rate limits)

## Development

### Running in Development Mode
```bash
npm start
```

### Testing the API
```bash
# Test the health endpoint
curl http://localhost:3000/health

# Test email processing
curl -X POST http://localhost:3000/process \
  -H "Content-Type: application/json" \
  -d '{"text": "I need help with my account"}'
```

### Environment Variables
- `GROQ_API_KEY`: Your Groq API key (required)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## Error Handling

The application includes comprehensive error handling for:
- Missing API keys
- Network connectivity issues
- API rate limits
- Invalid responses
- Malformed input

## Troubleshooting

### Common Issues

1. **"GROQ_API_KEY not found"**
   - Ensure you've created a `.env` file
   - Check that the API key is correctly formatted
   - Make sure there are no spaces around the equals sign

2. **"Network error"**
   - Check your internet connection
   - Verify the Groq API is accessible
   - Try again after a few seconds

3. **"Invalid API key"**
   - Ensure your API key is valid
   - Check that you haven't exceeded rate limits
   - Generate a new API key if needed

### Rate Limits

Groq's free tier has rate limits. If you encounter rate limit errors:
- Wait a few seconds before retrying
- Consider upgrading to a paid plan for higher limits
- Use the application responsibly

## License

MIT License - Feel free to use and modify as needed.

## Support

If you encounter any issues:
1. Check this README for troubleshooting
2. Verify your setup matches the instructions
3. Ensure your API key is valid and properly configured
