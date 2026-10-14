import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Experience from '@/components/sections/experience';
import Projects from '@/components/sections/projects';
import Resume from '@/components/sections/resume';
import Leadership from '@/components/sections/leadership';
import FunFacts from '@/components/sections/fun-facts';
import Contact from '@/components/sections/contact';
import SectionDivider from '@/components/section-divider';
import SmoothScrollSection from '@/components/smooth-scroll-section';
import ScrollToTop from '@/components/scroll-to-top';

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <SectionDivider variant="wave" />
      <SmoothScrollSection fadeIn={false}>
        <About />
      </SmoothScrollSection>
      <SectionDivider variant="dots" />
      <Experience />
      <SectionDivider variant="wave" flip />
      <SmoothScrollSection fadeIn={false}>
        <Projects />
      </SmoothScrollSection>
      <SectionDivider variant="dots" />
      <SmoothScrollSection fadeIn={false}>
        <Resume />
      </SmoothScrollSection>
      <SectionDivider variant="wave" />
      <SmoothScrollSection fadeIn={false}>
        <Leadership />
      </SmoothScrollSection>
      <SectionDivider variant="dots" />
      <SmoothScrollSection fadeIn={false}>
        <FunFacts />
      </SmoothScrollSection>
      <SectionDivider variant="wave" flip />
      <SmoothScrollSection fadeIn={false}>
        <Contact />
      </SmoothScrollSection>
      <ScrollToTop />
    </div>
  );
}
