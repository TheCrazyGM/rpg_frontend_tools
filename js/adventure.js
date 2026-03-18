function addLocation() {
  const container = document.getElementById("locationsContainer");
  const template = container.children[0].cloneNode(true);
  // Clear values
  template
    .querySelectorAll("input, textarea")
    .forEach((input) => (input.value = ""));
  // Reset selects to first option
  template
    .querySelectorAll("select")
    .forEach((select) => (select.selectedIndex = 0));
  container.appendChild(template);
}

function addNPC() {
  const container = document.getElementById("npcsContainer");
  const template = container.children[0].cloneNode(true);
  template
    .querySelectorAll("input, textarea")
    .forEach((input) => (input.value = ""));
  template
    .querySelectorAll("select")
    .forEach((select) => (select.selectedIndex = 0));
  container.appendChild(template);
}

function addReward() {
  const container = document.getElementById("rewardsContainer");
  const template = container.children[0].cloneNode(true);
  template
    .querySelectorAll("input, textarea")
    .forEach((input) => (input.value = ""));
  template
    .querySelectorAll("select")
    .forEach((select) => (select.selectedIndex = 0));
  container.appendChild(template);
}

function generateAdventure() {
  try {
    const adventure = {
      name: document.getElementById("adventureName").value,
      levelRange: {
        min: parseInt(document.getElementById("minLevel").value),
        max: parseInt(document.getElementById("maxLevel").value),
      },
      setting: document.getElementById("setting").value,
      theme: document.getElementById("theme").value,
      overview: {
        hook: document.getElementById("hook").value,
        summary: document.getElementById("summary").value,
      },
      locations: Array.from(document.querySelectorAll(".location-entry")).map(
        (entry) => ({
          name: entry.querySelector(".location-name").value,
          type: entry.querySelector(".location-type").value,
          difficulty: entry.querySelector(".location-difficulty").value,
          description: entry.querySelector(".location-description").value,
        }),
      ),
      npcs: Array.from(document.querySelectorAll(".npc-entry")).map(
        (entry) => ({
          name: entry.querySelector(".npc-name").value,
          role: entry.querySelector(".npc-role").value,
          race: entry.querySelector(".npc-race").value,
          description: entry.querySelector(".npc-description").value,
        }),
      ),
      rewards: Array.from(document.querySelectorAll(".reward-entry")).map(
        (entry) => ({
          type: entry.querySelector(".reward-type").value,
          value: entry.querySelector(".reward-value").value,
          location: entry.querySelector(".reward-location").value,
          description: entry.querySelector(".reward-description").value,
        }),
      ),
      notes: document.getElementById("notes").value,
    };

    document.getElementById("output").innerHTML =
      `<pre>${JSON.stringify(adventure, null, 2)}</pre>`;
  } catch (error) {
    document.getElementById("output").innerHTML =
      `<div class="text-danger">Error generating adventure JSON: ${error.message}</div>`;
  }
}
