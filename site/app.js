
async function loadSite() {
  try {
    const [dataResponse, buildResponse] = await Promise.all([
      fetch("data.json?t=" + Date.now()),
      fetch("build.json?t=" + Date.now())
    ]);

    if (!dataResponse.ok || !buildResponse.ok) {
      throw new Error("Could not load site data");
    }

    const data = await dataResponse.json();
    const build = await buildResponse.json();

    document.getElementById("college").textContent = data.college;
    document.getElementById("code").textContent = data.code;
    document.getElementById("sha").textContent = build.sha;
    document.getElementById("run").textContent = build.run;
    document.getElementById("year").textContent =
      new Date().getFullYear();

    const icons = ["💻", "🔬", "🧪"];
    const labsContainer = document.getElementById("labs");

    labsContainer.replaceChildren();

    data.labs.forEach((lab, index) => {
      const card = document.createElement("article");
      card.className = "lab-card";

      const icon = document.createElement("div");
      icon.className = "lab-icon";
      icon.textContent = icons[index] || "🏫";

      const title = document.createElement("h3");
      title.textContent = lab.name;

      const time = document.createElement("div");
      time.className = "lab-time";
      time.textContent = `${lab.opens} – ${lab.closes}`;

      const label = document.createElement("p");
      label.className = "lab-label";
      label.textContent = "Scheduled lab session";

      card.append(icon, title, time, label);
      labsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Website loading error:", error);
    document.getElementById("college").textContent =
      "Unable to load website data";
    document.getElementById("labs").textContent =
      "Please refresh the page or try again later.";
  }
}

loadSite();
