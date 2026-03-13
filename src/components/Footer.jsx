import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Footer = () => {
  const navLinks = ["Nexus", "Vault", "Prologue", "About", "Contact"];
  const splitIndex = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, splitIndex);
  const rightLinks = navLinks.slice(splitIndex);
  const footerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current || !logoRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const letters = logoRef.current.querySelectorAll("[data-letter]");
      gsap.fromTo(
        letters,
        { y: 30, opacity: 0, rotateX: 55 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full transition-colors duration-300">
      {/* Main Content */}
      <div className="mx-auto px-12 pt-24">
        {/* Top Section - CTA and Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 md:mb-32">
          {/* Left - CTA */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <h3 className="special-font text-2xl md:text-3xl font-medium tracking-wider font-zentry">
                <b>Join Zentry</b>
              </h3>
            </div>
          </div>

          {/* Middle - Nav Links */}
          <div className="flex flex-col space-y-3">
            {leftLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-medium w-fit relative ms-10 font-general uppercase after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-black cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right - Nav Links */}
          <div className="flex flex-col space-y-3">
            {rightLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-medium w-fit relative ms-10 font-general uppercase after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-black cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Giant Logo Text - Fixed overflow issue */}
        <div className="relative select-none">
          <h1
            ref={logoRef}
            className="special-font font-zentry text-[20vw] md:text-[23vw] font-bold leading-[0.85] pb-4 tracking-widest text-center"
            aria-label="Zentry"
          >
            {"Zentry".split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                data-letter
                className="inline-block"
              >
                <b>{char}</b>
              </span>
            ))}
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
