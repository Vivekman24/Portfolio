<div align="center">

# 🚀 Vivek Sai Manthri — Portfolio

A modern, fully responsive developer portfolio built with **Next.js 13**, **React 18**, **TypeScript**, and **Tailwind CSS**. Features smooth animations, 3D elements, an AI-powered chat assistant, and a beautiful dark theme.

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.5-FF0055?logo=framer)](https://www.framer.com/motion/)

</div>

---

## ✨ Features

| Section                       | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| **Hero**                      | Animated intro with gradient mesh background and smooth scroll prompts      |
| **About**                     | Personal story, technical skills grid, and soft skills showcase             |
| **Experience**                | Interactive timeline of professional internships with detailed achievements |
| **Projects**                  | Tilt-card showcase of key projects with tech badges and GitHub links        |
| **Credentials**               | Education timeline, certifications, and downloadable resume                 |
| **Leadership & Volunteering** | Community impact stats and volunteer experiences                            |
| **Fun Facts**                 | Hobbies and interests with playful animations                               |
| **Contact**                   | Fully functional contact form (Web3Forms) with social links                 |
| **AI Chat Assistant**         | GPT-powered chat that answers questions about the portfolio                 |

### Additional Highlights

- 🌙 **Dark Theme** — Sleek, modern dark UI with cyan/blue accent gradients
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🎨 **Smooth Animations** — Framer Motion page transitions, parallax scrolling, and micro-interactions
- 🖱️ **Interactive Elements** — Magnetic buttons, tilt cards, scroll progress indicator
- ⚡ **Performance Optimized** — Fast load times with Next.js optimizations
- ♿ **Accessible** — Semantic HTML and keyboard navigation support

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 13 (App Router)
- **Library:** React 18
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3, CSS Variables
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **Icons:** Lucide React

### UI Components

- **Primitives:** Radix UI (Dialog, Accordion, Tabs, Toast, etc.)
- **Theming:** next-themes
- **Forms:** React Hook Form + Zod validation

### Backend / API

- **API Routes:** Next.js Route Handlers
- **AI Integration:** OpenAI GPT-3.5/4, Google Gemini 2.0
- **Contact Form:** Web3Forms

### DevOps & Tooling

- **Package Manager:** npm
- **Linting:** ESLint (Next.js config)
- **Deployment:** Vercel

---

## 📁 Project Structure

```
Portfolio-main/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # AI chat API endpoint
│   ├── globals.css             # Global styles & Tailwind directives
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Main page composing all sections
├── components/
│   ├── sections/
│   │   ├── hero.tsx            # Hero section
│   │   ├── about.tsx           # About & skills
│   │   ├── experience.tsx      # Work experience timeline
│   │   ├── projects.tsx        # Project showcase
│   │   ├── resume.tsx          # Credentials & resume
│   │   ├── leadership.tsx      # Volunteering & leadership
│   │   ├── fun-facts.tsx       # Hobbies
│   │   └── contact.tsx         # Contact form
│   ├── ui/                     # Radix-based UI primitives
│   ├── ai-chat.tsx             # AI chat widget
│   ├── navigation.tsx          # Header navigation
│   ├── footer.tsx              # Footer with links
│   ├── tilt-card.tsx           # 3D tilt effect card
│   ├── magnetic-button.tsx     # Magnetic hover button
│   ├── scroll-progress.tsx     # Scroll progress bar
│   └── ...                     # Other shared components
├── hooks/
│   └── use-toast.ts            # Toast notification hook
├── lib/
│   └── utils.ts                # Utility functions (cn, etc.)
├── public/
│   ├── Vivek_Sai_Manthri_Resume.pdf
│   └── ...                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js configuration
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ (or yarn/pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Vivekman24/Portfolio.git
cd Portfolio

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local   # or create manually (see below)

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 AI Chat Setup

The portfolio includes an intelligent AI chat assistant that can answer questions about experience, projects, skills, and more.

### Option 1: Google Gemini (Recommended — Free Tier Available)

1. Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add to `.env.local`:
   ```env
   GOOGLEGEMINI_API_KEY=your_gemini_api_key_here
   ```

### Option 2: OpenAI GPT

1. Get an API key from [OpenAI Platform](https://platform.openai.com/)
2. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Option 3: No API Key (Fallback)

If no API keys are configured, the chat will use an intelligent local response system that still provides helpful answers about the portfolio.

---

## 📧 Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com/) to send emails without a backend.

1. Create a free account at [web3forms.com](https://web3forms.com/)
2. Get your access key
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
   ```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# AI Chat (at least one recommended)
GOOGLEGEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key

# Contact Form
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_key
```

---

## 🎨 Customization

### Personal Information

Update personal details in the following files:

- `components/sections/hero.tsx` — Name, title, tagline
- `components/sections/about.tsx` — Bio, skills
- `components/sections/experience.tsx` — Work history
- `components/sections/projects.tsx` — Project details
- `components/sections/resume.tsx` — Education, certifications
- `components/sections/leadership.tsx` — Volunteer experience
- `components/sections/contact.tsx` — Contact info
- `components/footer.tsx` — Footer links and info
- `app/api/chat/route.ts` — AI chat knowledge base (RESUME_DATA object)

### Styling

- **Colors:** Modify CSS variables in `app/globals.css`
- **Tailwind:** Extend theme in `tailwind.config.ts`
- **Fonts:** Update font imports in `app/layout.tsx`

### Resume

Replace `public/Vivek_Sai_Manthri_Resume.pdf` with your own resume file and update the filename reference in `components/sections/resume.tsx`.

---

## 📦 Available Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start development server on `localhost:3000` |
| `npm run build` | Create optimized production build            |
| `npm run start` | Start production server                      |
| `npm run lint`  | Run ESLint for code quality                  |

---

## 🌐 Deployment

### Vercel 

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard:
   - `GOOGLEGEMINI_API_KEY` or `OPENAI_API_KEY`
   - `NEXT_PUBLIC_WEB3FORMS_KEY`
4. Deploy!

> **Note:** This portfolio uses API routes for the AI chat, so it requires a platform that supports server-side functionality (Vercel, Railway, Render, etc.). Static hosting (GitHub Pages) won't work with the AI chat feature.

### Other Platforms

- **Railway:** Connect repo, add env vars, deploy
- **Render:** Create Web Service, configure build command
- **Netlify:** Use Next.js adapter, configure serverless functions

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Feel free to use this template for your own portfolio! If you do, a ⭐ on the repo would be appreciated.

---

## 📬 Contact

**Vivek Sai Manthri**

- 📧 Email: [manthrivivek@gmail.com](mailto:manthrivivek@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/vivek-sai-manthri](https://linkedin.com/in/vivek-sai-manthri)
- 🐙 GitHub: [github.com/Vivekman24](https://github.com/Vivekman24)
- 📍 Location: South Brunswick, NJ

---

<div align="center">

**Built with ❤️ by Vivek Sai Manthri**

</div>
