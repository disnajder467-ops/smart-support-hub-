let requests = loadData("requests", startRequests);

function renderRequests() {
  const tbody = document.querySelector("#maintenanceTable");
  tbody.innerHTML = "";

  requests.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.type}</td>
      <td>${item.status}</td>
      <td>${item.targetVersion}</td>
      <td>
        ${item.status !== "done"
          ? `<button class="btn btn-secondary btn-sm" onclick="completeRequest('${item.id}')">Выполнить</button>`
          : `<span class="badge badge-ok">Готово</span>`}
      </td>
    `;
    tbody.append(row);
  });
}

function completeRequest(id) {
  const item = requests.find(r => r.id === id);
  if (!item) return;
  item.status = "done";
  saveData("requests", requests);
  renderRequests();
}

document.querySelector("#maintenanceForm").addEventListener("submit", event => {
  event.preventDefault();
  const title = document.querySelector("#reqTitle").value.trim();
  const type = document.querySelector("#reqType").value;
  const targetVersion = document.querySelector("#reqVersion").value.trim();

  if (!title) return;

  requests.push({
    id: "REQ-" + String(requests.length + 1).padStart(3, "0"),
    title,
    type,
    status: "new",
    targetVersion: targetVersion || "v1.3.0"
  });

  saveData("requests", requests);
  renderRequests();
  event.target.reset();
});

renderRequests();
