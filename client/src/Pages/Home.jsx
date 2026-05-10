import { useEffect, useRef } from "react";
import gsap from "gsap";

import Navbar from "../components/Navbar";

function Home() {

  const heroRef = useRef(null);

  useEffect(() => {

    gsap.fromTo(
      heroRef.current,

      {
        opacity: 0,
        y: 80,
      },

      {
        opacity: 1,
        y: 0,
        duration: 1.5,
      }
    );

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <section
        ref={heroRef}
        className="flex flex-col items-center justify-center text-center min-h-[85vh] px-6"
      >

        <h1 className="text-5xl md:text-7xl font-bold">

          Book Trusted
          <span className="text-cyan-400">
            {" "}
            Services
          </span>

        </h1>

        <p className="mt-6 text-gray-300 text-lg max-w-2xl">

          Customer and Vendor booking platform
          built using React, Node.js, MongoDB,
          Tailwind CSS and GSAP.

        </p>

        <div className="flex gap-4 mt-8">

          <a
            href="/signup"
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </a>

        </div>

      </section>

    </div>
  );
}

export default Home;