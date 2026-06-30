import Footer from "@/components/Footer";
import Features from "@/components/landing/Features";
import FinalCTA from "@/components/landing/FinalCTA";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import ProjectFlow from "@/components/landing/ProjectFlow";
import UseCases from "@/components/landing/UseCases";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <section>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ProjectFlow />
      <UseCases />
      <FinalCTA />
      <Footer />
    </section>
  );
}
