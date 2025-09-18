import { useEffect, useRef } from "react";

export default function Skills() {
  const skillsImgRef = useRef(null);

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

    if (skillsImgRef.current) observer.observe(skillsImgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <article className="skills-container">
        <section className="skills-wrapper">
          <h2 className="skills-title">
            Skills<b className="dot">.</b>
          </h2>
          <p className="skills-description">
            My background includes studying a wide range of web technologies across both frontend and backend development. I've worked with tools and languages like <b>HTML</b>, <b>CSS</b>, <b>JavaScript</b>, <b>React</b>, <b>Node.js</b>, <b>C#</b>, and <b>.NET</b> to build responsive user interfaces and APIs.
          </p>
          <p className="skills-description">
            I've also learned how data is managed using relational and non-relational databases such as <b>PostgreSQL</b> and <b>MongoDB</b>. I regularly use <b>Visual Studio Code</b>, <b>GitHub</b>, and <b>browser developer tools</b> to streamline development, collaborate, and debug projects effectively.
          </p>
        </section>
        <div className="skills-image">
          <img ref={skillsImgRef} src="/images/skills.svg" alt="Skills" />
        </div>
      </article>

      {/* Right SVG divider */}
      <div className="right-divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="right-shape-fill"
          ></path>
        </svg>
      </div>
    </>
  );
}
