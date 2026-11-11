document.addEventListener("DOMContentLoaded", () => {
  const deployments = loadData("deployments", startDeployments);
  const incidents = loadData("incidents", startIncidents);
  const requests = loadData("requests", startRequests);
  const releases = loadData("releases", startReleases);

  const activeDeployments = deployments.filter(d => d.stage !== "production").length;
  const openIncidents = incidents.filter(i => i.status !== "resolved").length;
  const slaPercent = getSlaPercent(incidents, defaultSettings);
  const currentVersion = releases.length ? releases[releases.length - 1].version : "v1.2.1";

  document.querySelector("#kpiDeployments").textContent = activeDeployments;
  document.querySelector("#kpiIncidents").textContent = openIncidents;
  document.querySelector("#kpiSla").textContent = `${slaPercent}%`;
  document.querySelector("#kpiVersion").textContent = currentVersion;

  const slaNames = { on_track: "В срок", breached: "Нарушен", met: "Решён вовремя" };
  const tbody = document.querySelector("#recentIncidentsTable");
  tbody.innerHTML = "";

  incidents.slice(-5).reverse().forEach(item => {
    const sla = getSlaState(item, defaultSettings);
    const badgeClass = sla === "breached" ? "badge-bad" : (sla === "met" ? "badge-ok" : "badge-warn");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.priority}</td>
      <td>${item.status}</td>
      <td><span class="badge ${badgeClass}">${slaNames[sla]}</span></td>
    `;
    tbody.append(row);
  });

  const levels = ["critical", "high", "medium", "low"];
  new Chart(document.querySelector("#priorityChart"), {
    type: "bar",
    data: {
      labels: levels,
      datasets: [{
        label: "Количество инцидентов",
        data: levels.map(level => incidents.filter(item => item.priority === level).length),
        backgroundColor: ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"]
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const reqTypes = ["corrective", "adaptive", "perfective", "preventive"];
  new Chart(document.querySelector("#maintenanceChart"), {
    type: "doughnut",
    data: {
      labels: reqTypes,
      datasets: [{
        data: reqTypes.map(t => requests.filter(item => item.type === t).length),
        backgroundColor: ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"]
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
});
