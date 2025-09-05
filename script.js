const ORG = "geosolutions-it";
const REPO = "MapStore2";

// Helper to set text content safely
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Helper to set text content safely
function setLink(id, text) {
  const el = document.getElementById(id);
  if (el) el.href = text;
}

// Get latest release (as marked in GitHub)
fetch(`https://api.github.com/repos/${ORG}/${REPO}/releases/latest`)
  .then((r) => r.json())
  .then((data) => {
    setText("latest-release", data.tag_name || "N/A");
    setLink("latest-release-link", data.html_url || "#");

    if (data) {
      const regexRelease = /^v(\d{4}\.\d{2})\.\d{2}$/;
      const match = data.tag_name.match(regexRelease);
      const yearMonth = match[1];

      // Construct stable branch name
      const stableBranch = `${yearMonth}.xx`;

      setText("stable-branch", stableBranch);
      setLink(
        "stable-branch-link",
        `https://github.com/${ORG}/${REPO}/tree/${stableBranch}`
      );
    } else {
      setText("stable-branch", "Not found");
      setLink("stable-branch-link", "#");
    }
  })
  .catch(() => setText("latest-release", "Unavailable"));

// Get development branch (default branch, usually master or main)
fetch(`https://api.github.com/repos/${ORG}/${REPO}/branches/master`)
  .then((r) => r.json())
  .then((data) => {
    setText("dev-branch", data.name || "N/A");
    setLink("dev-branch-link", data._links.html || "#");
  })
  .catch(() => setText("dev-branch", "Unavailable"));

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add hover effects to version buttons
document.querySelectorAll(".version-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
    this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "none";
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe footer items
document.querySelectorAll(".footer-item").forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
  item.style.transition = "all 0.6s ease";
  observer.observe(item);
});
