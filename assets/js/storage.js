function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function getSlaState(incident, settings = defaultSettings, now = Date.now()) {
  const hours = settings.slaHours[incident.priority] || 24;
  const created = new Date(incident.createdAt).getTime();
  const deadline = created + hours * 60 * 60 * 1000;

  if (incident.status === "resolved" && incident.resolvedAt) {
    const resolved = new Date(incident.resolvedAt).getTime();
    return resolved <= deadline ? "met" : "breached";
  }
  return now > deadline ? "breached" : "on_track";
}

function getSlaPercent(incidents, settings = defaultSettings) {
  const resolved = incidents.filter(item => item.status === "resolved");
  if (resolved.length === 0) return 100;
  const met = resolved.filter(item => getSlaState(item, settings) === "met");
  return Math.round((met.length / resolved.length) * 100);
}

function getNextVersion(current, level) {
  const parts = current.replace("v", "").split(".").map(Number);
  if (level === "major") return `v${parts[0] + 1}.0.0`;
  if (level === "minor") return `v${parts[0]}.${parts[1] + 1}.0`;
  return `v${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

function initCommonUI() {
  const releases = loadData("releases", startReleases);
  const latestVersion = releases.length ? releases[releases.length - 1].version : "v1.2.1";
  const badge = document.querySelector("#currentVersionBadge");
  if (badge) badge.textContent = latestVersion;

  const themeButton = document.querySelector("#themeButton");
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const theme = document.body.classList.contains("light") ? "light" : "dark";
      localStorage.setItem("theme", theme);
    });
  }
}

document.addEventListener("DOMContentLoaded", initCommonUI);
