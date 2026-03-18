function addEquipment() {
  const container = document.getElementById("equipmentContainer");
  const equipmentDiv = document.createElement("div");
  equipmentDiv.className = "equipment-item mb-2";
  equipmentDiv.innerHTML = `
    <div class="row g-2">
      <div class="col-md-4">
        <input type="text" class="form-control equipment-name" placeholder="Item Name">
      </div>
      <div class="col-md-2">
        <input type="number" class="form-control equipment-quantity" min="1" value="1" placeholder="Quantity">
      </div>
      <div class="col-md-5">
        <input type="text" class="form-control equipment-description" placeholder="Description (optional)">
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger btn-sm remove-equipment" onclick="removeEquipment(this)">×</button>
      </div>
    </div>
  `;
  container.appendChild(equipmentDiv);
}

function removeEquipment(button) {
  button.closest(".equipment-item").remove();
}

function getStats() {
  return {
    str: parseInt(document.getElementById("npcStr").value) || 10,
    dex: parseInt(document.getElementById("npcDex").value) || 10,
    con: parseInt(document.getElementById("npcCon").value) || 10,
    int: parseInt(document.getElementById("npcInt").value) || 10,
    wis: parseInt(document.getElementById("npcWis").value) || 10,
    cha: parseInt(document.getElementById("npcCha").value) || 10,
  };
}

function getSkills() {
  const skills = [];
  const skillMap = {
    skillAcrobatics: "Acrobatics",
    skillAnimalHandling: "Animal Handling",
    skillArcana: "Arcana",
    skillAthletics: "Athletics",
    skillDeception: "Deception",
    skillHistory: "History",
    skillInsight: "Insight",
    skillIntimidation: "Intimidation",
    skillInvestigation: "Investigation",
    skillMedicine: "Medicine",
    skillNature: "Nature",
    skillPerception: "Perception",
    skillPerformance: "Performance",
    skillPersuasion: "Persuasion",
    skillReligion: "Religion",
    skillSleightOfHand: "Sleight of Hand",
    skillStealth: "Stealth",
    skillSurvival: "Survival",
  };

  for (const [id, name] of Object.entries(skillMap)) {
    if (document.getElementById(id).checked) {
      skills.push(name);
    }
  }
  return skills;
}

function getEquipment() {
  const equipment = [];
  document.querySelectorAll(".equipment-item").forEach((item) => {
    const name = item.querySelector(".equipment-name").value.trim();
    const quantity =
      parseInt(item.querySelector(".equipment-quantity").value) || 1;
    const description = item
      .querySelector(".equipment-description")
      .value.trim();

    if (name) {
      equipment.push({
        name,
        quantity,
        description,
      });
    }
  });
  return equipment;
}

function generateJSON() {
  try {
    const npcData = {
      name: document.getElementById("npcName").value,
      description: document.getElementById("npcDescription").value,
      race: document.getElementById("npcRace").value,
      class: document.getElementById("npcClass").value,
      alignment: document.getElementById("npcAlignment").value,
      stats: getStats(),
      skills: getSkills(),
      equipment: getEquipment(),
      background: document.getElementById("npcBackground").value,
      notes: document.getElementById("npcNotes").value,
    };

    document.getElementById("output").innerHTML =
      `<pre>${JSON.stringify(npcData, null, 2)}</pre>`;
  } catch (error) {
    document.getElementById("output").innerHTML =
      `<div class="text-danger">Error generating NPC JSON: ${error.message}</div>`;
  }
}
