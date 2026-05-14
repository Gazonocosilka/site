import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import ProjectsRail from "@/components/projects/ProjectsRail";
import Contact from "@/components/contact/Contact";

export default function Page() {
  return (
    <main className="relative w-full overflow-hidden bg-[#050505] text-bone-50">
      <Hero />
      <About />
      <ProjectsRail />
      <Contact />
    </main>
  );
}
