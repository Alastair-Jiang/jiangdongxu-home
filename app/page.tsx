import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { getAllProjects } from "@/lib/github";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6">
        <Hero />
        <About />
        <Projects projects={projects} />
      </main>
      <Footer />
    </>
  );
}
