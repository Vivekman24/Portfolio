# Portfolio Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# AI Chat API Keys (at least one required for AI responses)
GOOGLEGEMINI_API_KEY=your_google_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Contact Form - Web3Forms
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
```

---

## AI Chat Setup

The AI chat supports multiple providers with automatic fallback:

### Option 1: Google Gemini (Recommended - Free)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to `.env.local`:
   ```
   GOOGLEGEMINI_API_KEY=your_key_here
   ```

### Option 2: OpenAI

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key and add it to `.env.local`:
   ```
   OPENAI_API_KEY=your_key_here
   ```

### Fallback Mode

If no API keys are configured, the chat uses intelligent local responses based on your portfolio data.

---

## Contact Form Setup (Web3Forms)

The contact form uses [Web3Forms](https://web3forms.com/) for email delivery.

### Step 1: Get Your Access Key

1. Go to [Web3Forms](https://web3forms.com/)
2. Enter your email address (manthrivivek@gmail.com)
3. Click "Create Your Free Access Key"
4. Check your email for the access key

### Step 2: Add to Environment

Add the key to your `.env.local` file:
```
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

### Step 3: Restart Development Server

```bash
npm run dev
```

---

## Troubleshooting

### AI Chat Issues

**"Failed to get AI response"**
- Check your internet connection
- Verify your API key is correct
- The chat will use fallback responses automatically

**Rate Limit Errors**
- The chat automatically falls back to local responses
- Consider using a different API provider

### Contact Form Issues

**"Failed to send message"**
- Check that your Web3Forms access key is correct
- Make sure the key starts with a valid format
- Verify you've confirmed your email with Web3Forms

---

## Security Notes

- Never commit `.env.local` to version control
- The file is already in `.gitignore`
- Keep your API keys secure and don't share publicly
- For production, add environment variables in your hosting platform (Vercel, etc.)
