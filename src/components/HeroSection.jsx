// HeroSection.jsx
import React, { useRef, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "../App.css";

const HeroSection = () => {
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (leftImgRef.current) observer.observe(leftImgRef.current);
    if (rightImgRef.current) observer.observe(rightImgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Weather Card */}
      <div className="weather-wrapper">
        <WeatherCard />
      </div>

      {/* Hero Section */}
      <p className="portfolio-name">
        <b className="dot">Port</b>folio<b className="dot">.</b>
      </p>
      <section className="main-container">
        <div className="left-image-container">
          <img ref={leftImgRef} src="/images/software.svg" alt="Software" />
        </div>
        <header className="hero-container">
          <h2 className="greeting">Hi,</h2>
          <h1 className="hero-title">
            my name is <b>Leonardo</b>
            <b className="dot">.</b>
          </h1>
          <h2 className="hero-subtitle">
            I'm a <b className="dot">software developer</b> living in Espoo,
            Finland.
          </h2>
        </header>
        <div className="right-image-container">
          <img ref={rightImgRef} src="/images/coder.svg" alt="Coder" />
        </div>
      </section>

      <div className="divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default HeroSection;
