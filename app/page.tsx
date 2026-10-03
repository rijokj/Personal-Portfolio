import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Stats } from "@/components/sections/Stats";
import { Timeline } from "@/components/sections/Timeline";
import { Projects } from "@/components/sections/Projects";
import { Testimonials3D } from "@/components/sections/Testimonials3D";
import { Guestbook } from "@/components/sections/Guestbook";
import { ContactUFO } from "@/components/sections/ContactUFO";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative flex-1">
      {/* 1. Hero Section with Typewriter Multilingual Greeting */}
      <Hero />

      {/* 2. Infinite Tech Stack Marquee */}
      <TechMarquee />

      {/* 3. Milestone Animated Counter Stats */}
      <Stats />

      {/* 4. Experience Timeline */}
      <Timeline />

      {/* 5. Projects Showcase with Sticky Browser Preview */}
      <Projects />

      {/* 6. 3D Perspective Testimonial Carousel */}
      <Testimonials3D />

      {/* 7. Interactive Guestbook Wall */}
      <Guestbook />

      {/* 8. UFO Tractor Beam Contact Section */}
      <ContactUFO />

      {/* 9. Minimalist Footer */}
      <Footer />
    </main>
  );
}
