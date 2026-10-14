import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import AIChat from '@/components/ai-chat';
import Footer from '@/components/footer';
import PageTransition from '@/components/page-transition';
import ScrollProgress from '@/components/scroll-progress';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Vivek's AI-Powered Portfolio",
  description: 'Full-stack developer specializing in AI integration and modern web technologies',
  keywords: ['portfolio', 'developer', 'AI', 'machine learning', 'full-stack'],
  authors: [{ name: 'Vivek Sai Manthri' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      style={{
        background: '#050912',
        color: '#f0f4ff',
      }}
    >
      <body
        className={`${spaceGrotesk.className} antialiased bg-[#050912]`}
        style={{ backgroundColor: '#050912', color: '#f0f4ff' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ScrollProgress />
            <PageTransition>
            <div className="relative min-h-screen bg-[#050912]" style={{ backgroundColor: '#050912' }}>

              {/* Dark overlay to improve contrast on deployed builds */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0.1), rgba(2,6,23,0.15))', zIndex: 0 }} />
              {/* removed page-wide SVG grid overlay to prevent gridding effect */}
            <Navigation />
            <main className="relative z-10">
              {children}
            </main>
              <Footer />
            <AIChat />
          </div>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}