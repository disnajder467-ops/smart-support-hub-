let releases = loadData("releases", startReleases);

function getLatestVersion() {
  return releases.length ? releases[releases.length - 1].version : "v1.2.1";
}

function updateVersionPreview() {
  const level = document.querySelector("#releaseLevel").value;
  document.querySelector("#nextVersionPreview").value = getNextVersion(getLatestVersion(), level);
}

function renderReleases() {
  const list = document.querySelector("#releasesList");
  list.innerHTML = "";

  [...releases].reverse().forEach(rel => {
    const card = document.createElement("article");
    card.className = "card";
    const itemsHtml = rel.changes.map(ch => `<li>${ch}</li>`).join("");
    card.innerHTML = `
      <div class="section-header">
        <h2>${rel.version} (${rel.level})</h2>
        <span class="version-badge">${rel.date}</span>
      </div>
      <ul class="release-list">${itemsHtml}</ul>
    `;
    list.append(card);
  });

  updateVersionPreview();
}

document.querySelector("#releaseLevel").addEventListener("change", updateVersionPreview);

document.querySelector("#releaseForm").addEventListener("submit", event => {
  event.preventDefault();
  const level = document.querySelector("#releaseLevel").value;
  const nextVer = getNextVersion(getLatestVersion(), level);
  const changesRaw = document.querySelector("#releaseChanges").value.trim();

  if (!changesRaw) return;

  const changes = changesRaw.split(",").map(s => s.trim()).filter(Boolean);
  releases.push({
    id: "REL-" + String(releases.length + 1).padStart(3, "0"),
    version: nextVer,
    date: new Date().toISOString().slice(0, 10),
    level,
    changes
  });

  saveData("releases", releases);
  const badge = document.querySelector("#currentVersionBadge");
  if (badge) badge.textContent = nextVer;

  renderReleases();
  event.target.reset();
  updateVersionPreview();
});

renderReleases();
