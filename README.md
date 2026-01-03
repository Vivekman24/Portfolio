# 🚀 Portfolio Website

## 📋 Overview

A modern, fully responsive developer portfolio built with Next.js, React, and TypeScript. Features smooth animations powered by Framer Motion, an AI-powered chat assistant that answers questions about my background and experience, and a sleek dark theme with cyan/blue accent gradients. The portfolio showcases my professional experience, projects, skills, education, and includes a functional contact form. Designed with a mobile-first approach and optimized for performance.

## ✨ Key Features

### 🎨 Design & UI

- **Modern Dark Theme**: Sleek design with gradient mesh backgrounds and cyan/blue accents.
- **Smooth Animations**: Page transitions, parallax scrolling, and micro-interactions using Framer Motion.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop viewing.
- **Interactive Elements**: Magnetic buttons, tilt cards, and scroll progress indicator.

### 📑 Portfolio Sections

- **Hero**: Animated intro with gradient background and smooth scroll prompts.
- **About**: Personal story, technical skills grid, and soft skills showcase.
- **Experience**: Interactive timeline of professional internships with detailed achievements.
- **Projects**: Tilt-card showcase with tech badges and GitHub links.
- **Credentials**: Education timeline, certifications, and downloadable resume.
- **Leadership & Volunteering**: Community impact stats and volunteer experiences.
- **Fun Facts**: Hobbies and interests with playful animations.
- **Contact**: Fully functional contact form with social links.

### 🤖 AI Chat Assistant

- **Intelligent Responses**: GPT-powered chat that answers questions about my experience, projects, and skills.
- **Multiple AI Backends**: Supports Google Gemini and OpenAI APIs.
- **Fallback System**: Works without API keys using intelligent local responses.

### 📧 Contact Form

- **Web3Forms Integration**: Sends emails without requiring a backend server.
- **Form Validation**: Client-side validation for all form fields.
- **Toast Notifications**: Feedback on successful or failed submissions.

---

## 💻 Technologies Used

### Frontend

- **Next.js 13**: React framework with App Router for server-side rendering.
- **React 18**: Component-based UI library.
- **TypeScript**: Type-safe JavaScript for better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Animation library for smooth transitions and effects.

### UI Components

- **Radix UI**: Accessible, unstyled UI primitives (Dialog, Accordion, Tabs, Toast, etc.).
- **Lucide React**: Beautiful, customizable icon library.
- **React Hook Form + Zod**: Form handling with schema validation.

### Backend / API

- **Next.js API Routes**: Serverless functions for the AI chat endpoint.
- **OpenAI / Google Gemini**: AI providers for intelligent chat responses.
- **Web3Forms**: Third-party service for contact form submissions.

### Development Tools

- **ESLint**: Code linting and quality checks.
- **npm**: Package manager for dependencies.
- **Vercel**: Recommended platform for deployment.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 18 or later.
- **npm**: Version 9 or later (comes with Node.js).

---

### 🔧 Installation Steps

#### 1. Clone the Repository:

```bash
git clone https://github.com/Vivekman24/Portfolio.git
cd Portfolio
```

#### 2. Install Dependencies:

```bash
npm install
```

#### 3. Set Up Environment Variables:

Create a `.env.local` file in the root directory with the following:

```env
# AI Chat (at least one recommended for full functionality)
GOOGLEGEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key

# Contact Form
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

**API Key Sources:**

- Google Gemini: [Google AI Studio](https://aistudio.google.com/app/apikey)
- OpenAI: [OpenAI Platform](https://platform.openai.com/api-keys)
- Web3Forms: [web3forms.com](https://web3forms.com/)

#### 4. Run the Development Server:

```bash
npm run dev
```

#### 5. Open in Browser:

Navigate to `http://localhost:3000` to view the portfolio.

---

### 🌐 Deployment

#### Deploy to Vercel:

1. Push your code to GitHub.
2. Import the repository on [Vercel](https://vercel.com/).
3. Add environment variables in the Vercel dashboard.
4. Deploy!

> **Note**: This portfolio uses API routes for the AI chat, so it requires a platform that supports server-side functionality (Vercel, Railway, Render). Static hosting like GitHub Pages won't work with the AI chat feature.

---

## 📬 Contact

- **Email**: manthrivivek@gmail.com
- **LinkedIn**: [linkedin.com/in/vivek-sai-manthri](https://linkedin.com/in/vivek-sai-manthri)
- **GitHub**: [github.com/Vivekman24](https://github.com/Vivekman24)
