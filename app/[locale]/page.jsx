import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <section>
      <Navbar />
      <Hero />
      <Features />
    </section>
  );
}
