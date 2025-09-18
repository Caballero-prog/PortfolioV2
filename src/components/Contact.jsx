import { useEffect, useRef } from "react";

export default function Contact() {
  const contactImgRef = useRef(null);

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

    if (contactImgRef.current) observer.observe(contactImgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <article className="contact-container">
      <h2 className="contact-title">
        Let's connect<b className="dot">.</b>
      </h2>
      <div className="contact-image">
        <img ref={contactImgRef} src="/PortfolioV2/images/connect.svg" alt="Connect" />
      </div>
      <p className="contact-description">
        Feel free to reach out for <b>collaborations</b>, <b>inquiries</b>, or potential <b>job opportunities</b>. I'm always open to connecting with <b>recruiters</b> and <b>professionals</b> for exciting <b>projects</b> or career advancements.
      </p>
    </article>
  );
}
