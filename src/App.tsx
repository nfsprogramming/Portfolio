import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import GitHubStats from "./components/GitHubStats";
import CurrentGoals from "./components/CurrentGoals";
import Contact from "./components/Contact";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Lenis smooth scroll init — gated by loader so reveal feels clean.
  useLenis();

  // Lock scroll until the preloader finishes.
  useEffect(() => {
    if (!loaded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [loaded]);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />
      <Navbar />
      <main className="main" data-loaded={loaded}>
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Projects />
        <Experience />
        <Certifications />
        <GitHubStats />
        <CurrentGoals />
        <Contact />
      </main>
    </>
  );
}
