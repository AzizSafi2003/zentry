import { useEffect, useState } from "react";
import Lenis from "lenis";
import About from "./components/About";
import Contact from "./components/Contact";
import Features from "./components/Features";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Story from "./components/Story";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!showPreloader) return;
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyClass = document.body.className;
    const previousHtmlClass = document.documentElement.className;
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const preventScroll = (event) => {
      event.preventDefault();
    };

    const preventKeys = (event) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];
      if (keys.includes(event.key)) {
        event.preventDefault();
      }
    };

    document.addEventListener("wheel", preventScroll, {
      passive: false,
      capture: true,
    });
    document.addEventListener("touchmove", preventScroll, {
      passive: false,
      capture: true,
    });
    document.addEventListener("keydown", preventKeys, { capture: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
      document.removeEventListener("wheel", preventScroll, { capture: true });
      document.removeEventListener("touchmove", preventScroll, {
        capture: true,
      });
      document.removeEventListener("keydown", preventKeys, { capture: true });
      window.scrollTo(0, scrollY);
    };
  }, [showPreloader]);

  return (
    <>
      {showPreloader ? (
        <Preloader onComplete={() => setShowPreloader(false)} />
      ) : null}
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <NavBar />
        <Hero />

        <About />
        <Features />
        <Story />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default App;
