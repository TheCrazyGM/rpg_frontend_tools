function addRegion() {
  const container = document.getElementById("regionsContainer");
  const template = container.children[0].cloneNode(true);
  template
    .querySelectorAll("input, textarea")
    .forEach((input) => (input.value = ""));
  template
    .querySelectorAll("select")
    .forEach((select) => (select.selectedIndex = 0));
  container.appendChild(template);
}

function addFaction() {
  const container = document.getElementById("factionsContainer");
  const template = container.children[0].cloneNode(true);
  template
    .querySelectorAll("input, textarea")
    .forEach((input) => (input.value = ""));
  template
    .querySelectorAll("select")
    .forEach((select) => (select.selectedIndex = 0));
  container.appendChild(template);
}

function addDeity() {
  const container = document.getElementById("deitiesContainer");
  const template = container.children[0].cloneNode(true);
  template
    .querySelectorAll("input, textarea")
    .forEach((input) => (input.value = ""));
  template
    .querySelectorAll("select")
    .forEach((select) => (select.selectedIndex = 0));
  container.appendChild(template);
}

function generateWorld() {
  try {
    const world = {
      name: document.getElementById("worldName").value,
      genre: document.getElementById("genre").value,
      technology: document.getElementById("technology").value,
      description: document.getElementById("description").value,
      history: document.getElementById("history").value,
      regions: Array.from(document.querySelectorAll(".region-entry")).map(
        (entry) => ({
          name: entry.querySelector(".region-name").value,
          climate: entry.querySelector(".region-climate").value,
          population: entry.querySelector(".region-population").value,
          description: entry.querySelector(".region-description").value,
        }),
      ),
      factions: Array.from(document.querySelectorAll(".faction-entry")).map(
        (entry) => ({
          name: entry.querySelector(".faction-name").value,
          type: entry.querySelector(".faction-type").value,
          influence: entry.querySelector(".faction-influence").value,
          description: entry.querySelector(".faction-description").value,
        }),
      ),
      deities: Array.from(document.querySelectorAll(".deity-entry")).map(
        (entry) => ({
          name: entry.querySelector(".deity-name").value,
          domain: entry.querySelector(".deity-domain").value,
          alignment: entry.querySelector(".deity-alignment").value,
          description: entry.querySelector(".deity-description").value,
        }),
      ),
      magicSystem: {
        prevalence: document.getElementById("magicPrevalence").value,
        description: document.getElementById("magicDescription").value,
      },
      notes: document.getElementById("notes").value,
    };

    document.getElementById("output").innerHTML =
      `<pre>${JSON.stringify(world, null, 2)}</pre>`;
  } catch (error) {
    document.getElementById("output").innerHTML =
      `<div class="text-danger">Error generating world JSON: ${error.message}</div>`;
  }
}
