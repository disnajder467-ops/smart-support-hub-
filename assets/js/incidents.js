const slaNames = { on_track: "В срок", breached: "Нарушен", met: "Решён вовремя" };
let incidents = loadData("incidents", startIncidents);

function renderIncidents(list) {
  const tbody = document.querySelector("#incidentTable");
  tbody.innerHTML = "";

  list.forEach(item => {
    const sla = getSlaState(item, defaultSettings);
    const badgeClass = sla === "breached" ? "badge-bad" : (sla === "met" ? "badge-ok" : "badge-warn");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.priority}</td>
      <td>${item.status}</td>
      <td><span class="badge ${badgeClass}">${slaNames[sla]}</span></td>
      <td>
        ${item.status !== "resolved"
          ? `<button class="btn btn-primary btn-sm" onclick="resolveIncident('${item.id}')">Решить</button>`
          : "—"}
      </td>
    `;
    tbody.append(row);
  });
}

function resolveIncident(id) {
  const item = incidents.find(incident => incident.id === id);
  if (!item) return;
  item.status = "resolved";
  item.resolvedAt = new Date().toISOString();
  saveData("incidents", incidents);
  applyFilter();
}

function applyFilter() {
  const value = document.querySelector("#statusFilter").value;
  const result = value === "all" ? incidents : incidents.filter(item => item.status === value);
  renderIncidents(result);
}

document.querySelector("#incidentForm").addEventListener("submit", event => {
  event.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const priority = document.querySelector("#priority").value;

  if (title === "") {
    alert("Введите описание инцидента");
    return;
  }

  incidents.push({
    id: "INC-" + String(incidents.length + 1).padStart(3, "0"),
    title,
    priority,
    status: "new",
    createdAt: new Date().toISOString(),
    resolvedAt: null
  });

  saveData("incidents", incidents);
  applyFilter();
  event.target.reset();
});

document.querySelector("#statusFilter").addEventListener("change", applyFilter);

renderIncidents(incidents);
