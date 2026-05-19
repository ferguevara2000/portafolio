import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
    </main>
  )
}