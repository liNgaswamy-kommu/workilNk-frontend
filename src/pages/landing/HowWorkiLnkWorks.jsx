const steps = [
  {
    title: "User Registration",
    description:
      "Users create an account on WorkiLnk to explore nearby task opportunities or post tasks.",
    image: "/workflow/register.png",
    align: "right",
  },
  {
    title: "Post or Do Work",
    description:
      "Tasks are posted with clear details such as location, budget, and expectations.",
    image: "/workflow/work.png",
    align: "left",
  },
  {
    title: "Secure Payment",
    description:
      "Payments are processed securely through the platform, ensuring transparency and safety.",
    image: "/workflow/payment.png",
    align: "right",
  },
  {
    title: "Feedback & Trust",
    description:
      "After task completion, users share feedback and ratings to build trust.",
    image: "/workflow/feedback.png",
    align: "left",
  },
];

const HowWorkiLnkWorks = () => {
  return (
    <section className="workflow-ref">
      {/* SECTION TITLE */}
      <h2 className="section-title">
        How <span className="highlight-red">WorkiLnk</span> Works
      </h2>

      <div className="workflow-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`workflow-row ${
              step.align === "left" ? "reverse" : ""
            }`}
          >
            {/* IMAGE */}
            <div className="workflow-image">
              <img src={step.image} alt={step.title} />
            </div>

            {/* 🔴 DOTTED CURVED ARROW (THEME RED) */}
            <div className="workflow-arrow">
              <svg width="160" height="80" viewBox="0 0 160 80">
                <path
                  d={
                    step.align === "right"
                      ? "M5 40 C50 0, 110 80, 155 40"
                      : "M155 40 C110 0, 50 80, 5 40"
                  }
                  fill="none"
                  stroke="#ff2d2d"          /* 🔥 WorkiLnk red */
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <polygon
                  points={
                    step.align === "right"
                      ? "150,35 160,40 150,45"
                      : "10,35 0,40 10,45"
                  }
                  fill="#ff2d2d"            /* 🔥 WorkiLnk red */
                />
              </svg>
            </div>

            {/* TEXT WITH HAND-DRAWN BORDER */}
            <div className="workflow-text sketch-box">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWorkiLnkWorks;
