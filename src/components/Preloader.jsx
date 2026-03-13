import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

const Preloader = forwardRef(({ onComplete }, ref) => {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);
  const number1Ref = useRef(null);
  const number2Ref = useRef(null);
  const number3Ref = useRef(null);
  const numbersContainerRef = useRef(null);
  const percentageRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const timelineRef = useRef(null);
  useImperativeHandle(ref, () => ({
    getTimeline: () => timelineRef.current,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      timelineRef.current = tl;

      if (typeof onComplete === "function") {
        tl.eventCallback("onComplete", onComplete);
      }

      const speed = 1.0;
      const ease = "power2.inOut";
      const itemHeight = 0.9;

      gsap.set([line1Ref.current, line2Ref.current], {
        yPercent: 100,
        opacity: 0,
      });
      gsap.set(number1Ref.current, { y: "100%", opacity: 0 });
      gsap.set([number2Ref.current, number3Ref.current], { y: 0 });

      let currentTens = 0;
      const phases = [];
      let currentProgressLocal = 0;

      while (currentProgressLocal < 85) {
        const increment = 12 + Math.floor(Math.random() * 13);
        currentProgressLocal = Math.min(currentProgressLocal + increment, 85);
        phases.push(currentProgressLocal);
      }

      phases.forEach((targetProgress, index) => {
        const onesDigit = Math.floor(Math.random() * 10);
        const increase = Math.floor(Math.random() * 2) + 1;
        currentTens = Math.min(currentTens + increase, 8);

        tl.to(
          number2Ref.current,
          {
            y: `${-(currentTens * itemHeight)}em`,
            duration: speed * 1.2,
            ease: "power3.out",
          },
          index === 0 ? "+=0.2" : ">",
        );

        tl.to(
          number3Ref.current,
          {
            y: `${-(onesDigit * itemHeight)}em`,
            duration: speed * 1.2,
            ease: "power3.out",
          },
          "<",
        );

        if (index === 0) {
          tl.to(
            line1Ref.current,
            {
              yPercent: 0,
              opacity: 1,
              duration: speed * 0.8,
              ease: "power3.out",
            },
            "<0.3",
          );
        }

        if (index === 1) {
          tl.to(
            line2Ref.current,
            {
              yPercent: 0,
              opacity: 1,
              duration: speed * 0.8,
              ease: "power3.out",
            },
            "<0.3",
          );
        }

        tl.to(
          progressFillRef.current,
          {
            height: `${targetProgress}%`,
            duration: speed,
            ease,
          },
          "<",
        );
      });

      const finalOnesDigit = Math.floor(Math.random() * 10);
      currentTens = 9;

      tl.to(
        number2Ref.current,
        {
          y: `${-(9 * itemHeight)}em`,
          duration: speed * 1.0,
          ease: "power3.out",
        },
        ">",
      );

      tl.to(
        number3Ref.current,
        {
          y: `${-(finalOnesDigit * itemHeight)}em`,
          duration: speed * 1.0,
          ease: "power3.out",
        },
        "<",
      );

      tl.to(
        progressFillRef.current,
        {
          height: `${90 + finalOnesDigit}%`,
          duration: speed,
          ease,
        },
        "<",
      );

      tl.to(
        number3Ref.current,
        {
          y: `${-10 * itemHeight}em`,
          duration: speed * 0.5,
          ease: "power2.inOut",
        },
        ">",
      );

      tl.to(
        number2Ref.current,
        {
          y: `${-10 * itemHeight}em`,
          duration: speed * 0.5,
          ease: "power2.inOut",
        },
        "<0.1",
      );

      tl.to(
        number1Ref.current,
        {
          y: "0%",
          opacity: 1,
          duration: speed * 0.4,
          ease: "back.out(1.2)",
        },
        "<",
      );

      tl.to(
        progressFillRef.current,
        {
          height: "100%",
          duration: speed * 0.3,
          ease: "power2.out",
        },
        "<",
      );

      tl.to({}, { duration: 0.4 });

      const exitTl = gsap.timeline();

      exitTl
        .to(number1Ref.current, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        })
        .to(
          number2Ref.current,
          {
            y: "-=100",
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
          },
          "<",
        )
        .to(
          number3Ref.current,
          {
            y: "-=100",
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
          },
          "<",
        )
        .to(
          percentageRef.current,
          {
            yPercent: -100,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          "<",
        )
        .to(
          [line1Ref.current, line2Ref.current],
          {
            yPercent: -100,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.in",
          },
          "<0.2",
        )
        .to(
          progressFillRef.current,
          {
            width: "100vw",
            duration: 1.2,
            ease: "power3.inOut",
          },
          "-=0.4",
        )
        .to(
          containerRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.0,
            ease: "power3.inOut",
          },
          "-=0.2",
        );

      tl.add(exitTl);
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 bg-blue-50 flex items-center justify-center"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div
        ref={progressBarRef}
        className="absolute left-0 top-0 h-full w-1.5 bg-neutral-100 overflow-hidden"
      >
        <div
          ref={progressFillRef}
          className="absolute bottom-0 left-0 w-full bg-neutral-900 h-0"
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 overflow-hidden">
          <div
            ref={line1Ref}
            className="overflow-hidden"
            style={{ paddingBottom: "0.2em" }}
          >
            <p className="text-3xl md:text-5xl font-light text-neutral-800 tracking-tight leading-[1.2]">
              Respawn your legend —
            </p>
          </div>
          <div
            ref={line2Ref}
            className="overflow-hidden"
            style={{ paddingBottom: "0.2em" }}
          >
            <p className="text-3xl md:text-5xl font-light text-neutral-500 tracking-tight leading-[1.2]">
              The next level loads when you do.
            </p>
          </div>
        </div>

        <div ref={numbersContainerRef} className="flex items-baseline gap-1">
          <div className="h-[0.9em] overflow-hidden text-7xl md:text-9xl font-bold text-neutral-900 leading-none">
            <div
              ref={number1Ref}
              className="will-change-transform translate-y-full opacity-0"
            >
              <span className="block h-[0.9em] leading-none">1</span>
            </div>
          </div>

          <div className="h-[0.9em] overflow-hidden text-7xl md:text-9xl font-bold text-neutral-900 leading-none">
            <div
              ref={number2Ref}
              className="flex flex-col will-change-transform"
              style={{ height: "9.9em" }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => (
                <span
                  key={`tens-${i}`}
                  className="special-font h-[0.9em] leading-none flex items-center justify-center font-zentry"
                >
                  <b>{num}</b>
                </span>
              ))}
            </div>
          </div>

          <div className="h-[0.9em] overflow-hidden text-7xl md:text-9xl font-bold text-neutral-900 leading-none">
            <div
              ref={number3Ref}
              className="flex flex-col will-change-transform"
              style={{ height: "9.9em" }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => (
                <span
                  key={`ones-${i}`}
                  className="special-font h-[0.9em] leading-none flex items-center justify-center font-zentry"
                >
                  <b>{num}</b>
                </span>
              ))}
            </div>
          </div>

          <span
            ref={percentageRef}
            className="text-2xl md:text-4xl font-light text-neutral-400 ml-2 self-start mt-2 special-font font-zentry"
          >
            %
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">
          Loading Experience
        </span>
      </div>
    </div>
  );
});

Preloader.displayName = "Preloader";

export default Preloader;
