/**
 * AI Email Assistant - Frontend JavaScript
 * Handles user interactions and API communication
 */

// DOM Elements
const emailInput = document.getElementById('emailInput');
const charCount = document.getElementById('charCount');
const processBtn = document.getElementById('processBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');
const resultsSection = document.getElementById('resultsSection');
const categoryBadge = document.getElementById('categoryBadge');
const categoryIcon = document.querySelector('.category-icon');
const categoryText = document.querySelector('.category-text');
const replyText = document.getElementById('replyText');
const copyBtn = document.getElementById('copyBtn');

// API Configuration
const API_ENDPOINT = '/process';

/**
 * Initialize the application
 */
function init() {
    setupEventListeners();
    updateCharCounter();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Input events
    emailInput.addEventListener('input', updateCharCounter);
    emailInput.addEventListener('input', clearError);
    
    // Button events
    processBtn.addEventListener('click', handleProcessEmail);
    
    // Copy button event
    copyBtn.addEventListener('click', copyReply);
    
    // Enter key to submit (Ctrl+Enter for new line)
    emailInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleProcessEmail();
        }
    });
}

/**
 * Update character counter
 */
function updateCharCounter() {
    const currentLength = emailInput.value.length;
    const maxLength = 5000;
    
    charCount.textContent = currentLength;
    
    // Update counter color based on length
    if (currentLength > maxLength * 0.9) {
        charCount.style.color = '#e53e3e';
    } else if (currentLength > maxLength * 0.7) {
        charCount.style.color = '#dd6b20';
    } else {
        charCount.style.color = '#718096';
    }
}

/**
 * Handle email processing
 */
async function handleProcessEmail() {
    const emailText = emailInput.value.trim();
    
    // Validation
    if (!emailText) {
        showError('Please enter email content before processing.');
        return;
    }
    
    if (emailText.length < 10) {
        showError('Email content is too short. Please provide at least 10 characters.');
        return;
    }
    
    if (emailText.length > 5000) {
        showError('Email content is too long. Please keep it under 5000 characters.');
        return;
    }
    
    try {
        // Show loading state
        setLoadingState(true);
        clearError();
        hideResults();
        
        // Send request to API
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: emailText
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to process email');
        }
        
        // Display results
        displayResults(data.category, data.reply);
        
    } catch (error) {
        console.error('Error processing email:', error);
        showError(error.message || 'An error occurred while processing your email. Please try again.');
    } finally {
        setLoadingState(false);
    }
}

/**
 * Set loading state
 */
function setLoadingState(isLoading) {
    processBtn.disabled = isLoading;
    
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        emailInput.disabled = true;
    } else {
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        emailInput.disabled = false;
    }
}

/**
 * Display results
 */
function displayResults(category, reply) {
    // Update category badge
    updateCategoryBadge(category);
    
    // Update reply text
    replyText.textContent = reply;
    
    // Show results section
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Update category badge
 */
function updateCategoryBadge(category) {
    // Remove existing category classes
    categoryBadge.className = 'category-badge';
    
    // Add category-specific class and content
    const categoryConfig = {
        'SUPPORT': {
            class: 'support',
            icon: '🔴',
            text: 'Support'
        },
        'SALES': {
            class: 'sales',
            icon: '🟢',
            text: 'Sales'
        },
        'GENERAL': {
            class: 'general',
            icon: '🔵',
            text: 'General'
        }
    };
    
    const config = categoryConfig[category] || categoryConfig['GENERAL'];
    
    categoryBadge.classList.add(config.class);
    categoryIcon.textContent = config.icon;
    categoryText.textContent = config.text;
}

/**
 * Copy reply to clipboard
 */
async function copyReply() {
    const reply = replyText.textContent;
    
    try {
        await navigator.clipboard.writeText(reply);
        
        // Update button state
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="copy-icon">✅</span> Copied!';
        copyBtn.style.background = '#48bb78';
        copyBtn.style.color = 'white';
        copyBtn.style.borderColor = '#48bb78';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
            copyBtn.style.borderColor = '';
        }, 2000);
        
    } catch (error) {
        console.error('Error copying text:', error);
        // Fallback for older browsers
        copyToClipboardFallback(reply);
    }
}

/**
 * Fallback copy method for older browsers
 */
function copyToClipboardFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        
        // Update button state
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="copy-icon">✅</span> Copied!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
        
    } catch (error) {
        console.error('Fallback copy failed:', error);
        showError('Failed to copy text to clipboard.');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorSection.style.display = 'block';
    
    // Scroll to error
    errorSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Clear error message
 */
function clearError() {
    errorSection.style.display = 'none';
}

/**
 * Hide results section
 */
function hideResults() {
    resultsSection.style.display = 'none';
}

/**
 * Add sample text for testing (development helper)
 */
function addSampleText() {
    const sampleEmails = [
        "Hi, I'm having trouble with my account login. I keep getting an error message when I try to access my dashboard. Can you help me?",
        "I'm interested in your enterprise pricing plan for our team of 50 employees. Could you send me a quote and information about advanced features?",
        "Thank you for the excellent service! I just wanted to let you know how much I appreciate your product and support team."
    ];
    
    const randomSample = sampleEmails[Math.floor(Math.random() * sampleEmails.length)];
    emailInput.value = randomSample;
    updateCharCounter();
}

// Development helper - add sample button (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const sampleBtn = document.createElement('button');
    sampleBtn.textContent = 'Load Sample';
    sampleBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 8px 12px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85rem;
        z-index: 1000;
    `;
    sampleBtn.addEventListener('click', addSampleText);
    document.body.appendChild(sampleBtn);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
