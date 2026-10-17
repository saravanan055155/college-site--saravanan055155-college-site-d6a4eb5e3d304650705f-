
async function loadSiteData() {
  try {
    const response = await fetch("data.json?t=" + Date.now());

    if (!response.ok) {
      throw new Error("Unable to load site data");
    }

    const data = await response.json();

    document.getElementById("college").textContent =
      data.college || "College Portfolio";

    document.getElementById("collegeName").textContent =
      data.college || "Not configured";

    document.getElementById("participantCode").textContent =
      data.code || "Not configured";

    document.getElementById("labSlot").textContent =
      data.labSlot || "Not assigned";

    document.getElementById("commitSha").textContent =
      data.commitSha || "Awaiting deployment";

    document.getElementById("runNumber").textContent =
      data.runNumber ?? "Awaiting deployment";
  } catch (error) {
    console.error("Site data error:", error);
    document.getElementById("collegeName").textContent =
      "Data unavailable";
  }
}

loadSiteData();
