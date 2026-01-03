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
      <SmoothScrollSection parallaxStrength={30}>
        <About />
      </SmoothScrollSection>
      <SectionDivider variant="dots" />
      <SmoothScrollSection parallaxStrength={40}>
        <Experience />
      </SmoothScrollSection>
      <SectionDivider variant="wave" flip />
      <SmoothScrollSection parallaxStrength={35}>
        <Projects />
      </SmoothScrollSection>
      <SectionDivider variant="dots" />
      <SmoothScrollSection parallaxStrength={30}>
        <Resume />
      </SmoothScrollSection>
      <SectionDivider variant="wave" />
      <SmoothScrollSection parallaxStrength={35}>
        <Leadership />
      </SmoothScrollSection>
      <SectionDivider variant="dots" />
      <SmoothScrollSection parallaxStrength={25}>
        <FunFacts />
      </SmoothScrollSection>
      <SectionDivider variant="wave" flip />
      <SmoothScrollSection parallaxStrength={30}>
        <Contact />
      </SmoothScrollSection>
      <ScrollToTop />
    </div>
  );
}
