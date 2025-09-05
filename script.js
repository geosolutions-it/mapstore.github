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

// Get development branch (default branch, master)
fetch(`https://api.github.com/repos/${ORG}/${REPO}/branches/master`)
  .then((r) => r.json())
  .then((data) => {
    setText("dev-branch", data.name || "N/A");
    setLink("dev-branch-link", data._links.html || "#");
  })
  .catch(() => setText("dev-branch", "Unavailable"));
