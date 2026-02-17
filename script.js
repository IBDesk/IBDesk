const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section[id]");
const yearEl = document.getElementById("year");
const contactForm = document.getElementById("contactForm");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 90, 600)}ms`;
  observer.observe(item);
});

const updateActiveNav = () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const body = [
      `Name/Alias: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Program Level: ${formData.get("level")}`,
      `Subject: ${formData.get("subject")}`,
      `Deadline: ${formData.get("deadline")}`,
      "",
      "Project Request:",
      `${formData.get("message")}`,
    ].join("\n");

    const subject = encodeURIComponent("Consultation Request | The IB STEM Desk");
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${encodedBody}`;
  });
}
