# AI Email Assistant - Example Usage

This document provides detailed examples of how to use the AI Email Assistant CLI and what to expect from different types of emails.

## Quick Start Examples

### Support Email Example
**Email Text:**
```
Hi, I'm having trouble with my account login. I keep getting an error message when I try to access my dashboard. Can you help me?
```

**Expected Output:**
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

### Sales Email Example
**Email Text:**
```
I'm interested in your enterprise pricing plan for our team of 50 employees. Could you send me a quote and information about advanced features?
```

**Expected Output:**
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

### General Email Example
**Email Text:**
```
Thank you for the excellent service! I just wanted to let you know how much I appreciate your product and support team.
```

**Expected Output:**
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

## Test Cases for Different Scenarios

### 1. Technical Support Issues
**Input:** "My software keeps crashing when I try to export reports. This is urgent for our quarterly meeting."
**Expected Category:** SUPPORT
**Expected Reply Style:** Empathetic, urgent, solution-focused

### 2. Product Inquiries
**Input:** "Does your product integrate with Salesforce? We need CRM integration for our sales team."
**Expected Category:** SALES
**Expected Reply Style:** Informative, feature-focused, persuasive

### 3. General Feedback
**Input:** "I've been using your platform for 6 months and it's been great. Just wanted to share my positive experience."
**Expected Category:** GENERAL
**Expected Reply Style:** Appreciative, friendly, brief

### 4. Billing Questions
**Input:** "I was charged twice for this month's subscription. Can you help me fix this billing issue?"
**Expected Category:** SUPPORT
**Expected Reply Style:** Professional, reassuring, action-oriented

### 5. Feature Requests
**Input:** "I would love to see a dark mode feature in your application. It would help with late-night work sessions."
**Expected Category:** GENERAL
**Expected Reply Style:** Appreciative, forward-looking, professional

### 6. Partnership Inquiries
**Input:** "We are a marketing agency interested in partnering with you. Can we discuss collaboration opportunities?"
**Expected Category:** SALES
**Expected Reply Style:** Business-oriented, enthusiastic, next-steps focused

## Command Line Usage

### Basic Usage
```bash
npm start
```

### Direct Node.js Execution
```bash
node index.js
```

### Interactive Session Example
```
$ npm start

🚀 Starting AI Email Assistant...

🤖 AI Email Assistant
Please paste your email content below:
(Press Enter twice to finish input)

Hi, I'm having trouble with my account login. I keep getting an error message when I try to access my dashboard.

📝 Email received. Processing...
Processing email with AI...

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

## Tips for Best Results

### 1. Clear Email Content
- Provide complete email text
- Include relevant context and details
- Avoid overly brief or vague messages

### 2. Professional Tone
- The assistant works best with business communication
- Casual or informal emails may still be processed but with less accuracy

### 3. Single Topic
- Focus on one main issue or inquiry per email
- Multiple topics may confuse the classification

### 4. Complete Sentences
- Use proper grammar and complete sentences
- This helps the AI better understand the context

## Common Patterns

### Support Emails Often Contain:
- Problem descriptions
- Error messages
- Urgency indicators
- Help requests
- Technical issues

### Sales Emails Often Contain:
- Pricing inquiries
- Feature questions
- Purchase intent
- Demo requests
- Partnership discussions

### General Emails Often Contain:
- Feedback
- Thank you messages
- General questions
- Information sharing
- Casual inquiries

## Error Scenarios

### Invalid API Key
```
❌ Error: GROQ_API_KEY not found in environment variables. Please set it in your .env file.

💡 To fix this issue:
1. Get a free API key from https://groq.com/
2. Create a .env file in this directory
3. Add: GROQ_API_KEY=your_api_key_here
```

### Network Issues
```
❌ Error: Network error: Unable to connect to Groq API. Please check your internet connection.

💡 Please check your internet connection and try again.
```

### Empty Input
```
❌ No email content provided. Exiting.
```

These examples should help you understand how to use the AI Email Assistant effectively and what to expect from different types of email inputs.
