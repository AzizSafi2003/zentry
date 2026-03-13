import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass, alt = "" }) => (
  <div className={clipClass}>
    <img src={src} alt={alt} loading="lazy" decoding="async" />
  </div>
);

const Contact = () => {
  return (
    <section
      id="contact"
      className="mt-32 mb-16 min-h-96 w-screen px-4 md:px-10"
    >
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            clipClass="contact-clip-path-1"
            src="img/contact-1.webp"
          />

          <ImageClipBox
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            src="img/contact-2.webp"
          />
        </div>

        <div className="absolute -top-46 left-12 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />

          <ImageClipBox
            src="img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125 absolute"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="font-general text-[10px] uppercase">Join Zentry</p>

          <AnimatedTitle
            title="Let's build the <br /> new era of <br /> gaming together"
            containerClass="mt-5 text-center"
          />

          <Button
            title="contact us"
            containerClass="mt-10 cursor-pointer bg-white !text-black"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
