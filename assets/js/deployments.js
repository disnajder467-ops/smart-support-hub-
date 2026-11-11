let deployments = loadData("deployments", startDeployments);

const stageOrder = ["planning", "setup", "training", "production"];

function renderDeployments() {
  const tbody = document.querySelector("#deploymentTable");
  tbody.innerHTML = "";

  deployments.forEach(item => {
    const percent = Math.round((item.done / item.total) * 100);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.client}</td>
      <td>${item.product}</td>
      <td><span class="badge badge-warn">${item.stage}</span></td>
      <td>${item.done}/${item.total} (${percent}%)</td>
      <td>${item.owner}</td>
      <td>${item.plannedDate}</td>
      <td>
        ${item.stage !== "production"
          ? `<button class="btn btn-secondary btn-sm" onclick="advanceStage('${item.id}')">След. этап</button>`
          : `<span class="badge badge-ok">Завершено</span>`}
      </td>
    `;
    tbody.append(row);
  });
}

function advanceStage(id) {
  const item = deployments.find(d => d.id === id);
  if (!item) return;
  const idx = stageOrder.indexOf(item.stage);
  if (idx < stageOrder.length - 1) {
    item.stage = stageOrder[idx + 1];
    item.done = Math.min(item.total, item.done + 1);
    saveData("deployments", deployments);
    renderDeployments();
  }
}

document.querySelector("#deploymentForm").addEventListener("submit", event => {
  event.preventDefault();
  const client = document.querySelector("#depClient").value.trim();
  const product = document.querySelector("#depProduct").value.trim();
  const owner = document.querySelector("#depOwner").value.trim();
  const stage = document.querySelector("#depStage").value;
  const plannedDate = document.querySelector("#depDate").value;

  if (!client || !product || !owner) return;

  const doneMap = { planning: 0, setup: 1, training: 2, production: 3 };
  deployments.push({
    id: "DEP-" + String(deployments.length + 1).padStart(2, "0"),
    client,
    product,
    version: "v1.2.1",
    stage,
    owner,
    plannedDate,
    done: doneMap[stage] ?? 0,
    total: 3
  });

  saveData("deployments", deployments);
  renderDeployments();
  event.target.reset();
});

renderDeployments();