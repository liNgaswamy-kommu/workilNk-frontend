const points = [
  {
    title: "Verified Workers",
    desc: "Every worker is verified for trust.",
    image: "/why/verified.png"
  },
  {
    title: "Affordable Pricing",
    desc: "Transparent pricing without hidden charges.",
    image: "/why/pricing.png"
  },
  {
    title: "Nearby Services",
    desc: "Find trusted workers available near your location.",
    image: "/why/nearby.png"
  },
  {
    title: "Quick & Easy",
    desc: "Post a task in minutes and get work done fast.",
    image: "/why/quick.png"
  }
];

const WhyChooseWorkiLnk = () => {
  return (
    <section className="why-section">
      <h2 className="section-title">
        Why Choose <span className="highlight-red">WorkiLnk</span>
      </h2>

      <div className="why-grid">
        {points.map((p, i) => (
          <div key={i} className="why-card">
            <div className="why-card-image">
              <img src={p.image} alt={p.title} />
            </div>

            <div className="why-card-content">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseWorkiLnk;
