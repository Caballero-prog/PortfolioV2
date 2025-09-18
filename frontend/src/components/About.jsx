import { useEffect, useRef } from "react";

export default function About() {
  const collegeImgRef = useRef(null);

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

    if (collegeImgRef.current) observer.observe(collegeImgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <article className="about-container">
      <div className="school-image">
        <img ref={collegeImgRef} src="/images/college.svg" alt="College" />
      </div>
      <section className="about-wrapper">
        <h2 className="about-title">
          About<b className="dot">.</b>
        </h2>
        <p className="about-description">
          I started studying <b>software development</b> at <b>Business College Helsinki</b> and have been <b>coding</b>{" "}
          almost daily since then. Each step has helped me better understand how <b>websites</b> are structured and connected
          behind the scenes, from layout and styling to interactivity and functionality.
        </p>
        <p className="about-description">
          I enjoy learning through <b>practice</b> and solving small <b>challenges</b>. Even small breakthroughs feel
          rewarding and keep me motivated to grow into a <b>confident developer</b>. My goal is to build <b>websites</b> that
          not only <b>look great</b> but also <b>perform smoothly</b> and provide a good user experience.
        </p>
      </section>
    </article>
  );
}
