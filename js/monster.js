function getStats() {
  return {
    str: parseInt(document.getElementById("str").value) || 10,
    dex: parseInt(document.getElementById("dex").value) || 10,
    con: parseInt(document.getElementById("con").value) || 10,
    int: parseInt(document.getElementById("int").value) || 10,
    wis: parseInt(document.getElementById("wis").value) || 10,
    cha: parseInt(document.getElementById("cha").value) || 10,
  };
}

function getSavingThrows() {
  const saves = [];
  if (document.getElementById("strSave").checked) saves.push("Str");
  if (document.getElementById("dexSave").checked) saves.push("Dex");
  if (document.getElementById("conSave").checked) saves.push("Con");
  if (document.getElementById("intSave").checked) saves.push("Int");
  if (document.getElementById("wisSave").checked) saves.push("Wis");
  if (document.getElementById("chaSave").checked) saves.push("Cha");
  return saves.join(", ");
}

function getSkills() {
  const skills = [];
  const skillMap = {
    acrobatics: "Acrobatics",
    animalHandling: "Animal Handling",
    arcana: "Arcana",
    athletics: "Athletics",
    deception: "Deception",
    history: "History",
    insight: "Insight",
    intimidation: "Intimidation",
    investigation: "Investigation",
    medicine: "Medicine",
    nature: "Nature",
    perception: "Perception",
    performance: "Performance",
    persuasion: "Persuasion",
    religion: "Religion",
    sleightOfHand: "Sleight of Hand",
    stealth: "Stealth",
    survival: "Survival",
  };

  for (const [id, name] of Object.entries(skillMap)) {
    if (document.getElementById(id).checked) {
      skills.push(name);
    }
  }
  return skills.join(", ");
}

function addAbility() {
  const container = document.getElementById("specialAbilitiesContainer");
  const abilityDiv = document.createElement("div");
  abilityDiv.className = "special-ability mb-2";
  abilityDiv.innerHTML = `
    <div class="row g-2">
      <div class="col-md-4">
        <input type="text" class="form-control ability-name" placeholder="Ability Name">
      </div>
      <div class="col-md-7">
        <textarea class="form-control ability-description" placeholder="Ability Description" rows="2"></textarea>
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger btn-sm remove-ability" onclick="removeAbility(this)">×</button>
      </div>
    </div>
  `;
  container.appendChild(abilityDiv);
}

function addAction() {
  const container = document.getElementById("actionsContainer");
  const actionDiv = document.createElement("div");
  actionDiv.className = "action mb-2";
  actionDiv.innerHTML = `
    <div class="row g-2">
      <div class="col-md-4">
        <input type="text" class="form-control action-name" placeholder="Action Name">
      </div>
      <div class="col-md-7">
        <textarea class="form-control action-description" placeholder="Action Description" rows="2"></textarea>
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger btn-sm remove-action" onclick="removeAction(this)">×</button>
      </div>
    </div>
  `;
  container.appendChild(actionDiv);
}

function addLegendaryAction() {
  const container = document.getElementById("legendaryActionsContainer");
  const actionDiv = document.createElement("div");
  actionDiv.className = "legendary-action mb-2";
  actionDiv.innerHTML = `
    <div class="row g-2">
      <div class="col-md-3">
        <input type="text" class="form-control legendary-name" placeholder="Action Name">
      </div>
      <div class="col-md-2">
        <input type="number" class="form-control legendary-cost" min="1" max="3" value="1" placeholder="Cost">
      </div>
      <div class="col-md-6">
        <textarea class="form-control legendary-description" placeholder="Action Description" rows="2"></textarea>
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger btn-sm remove-legendary" onclick="removeLegendaryAction(this)">×</button>
      </div>
    </div>
  `;
  container.appendChild(actionDiv);
}

function removeAbility(button) {
  button.closest(".special-ability").remove();
}

function removeAction(button) {
  button.closest(".action").remove();
}

function removeLegendaryAction(button) {
  button.closest(".legendary-action").remove();
}

function getAbilities() {
  const abilities = [];
  document.querySelectorAll(".special-ability").forEach((ability) => {
    const name = ability.querySelector(".ability-name").value.trim();
    const description = ability
      .querySelector(".ability-description")
      .value.trim();
    if (name && description) {
      abilities.push({ name, description });
    }
  });
  return abilities;
}

function getActions() {
  const actions = [];
  document.querySelectorAll(".action").forEach((action) => {
    const name = action.querySelector(".action-name").value.trim();
    const description = action
      .querySelector(".action-description")
      .value.trim();
    if (name && description) {
      actions.push({ name, description });
    }
  });
  return actions;
}

function getLegendaryActions() {
  const actions = [];
  document.querySelectorAll(".legendary-action").forEach((action) => {
    const name = action.querySelector(".legendary-name").value.trim();
    const cost = parseInt(action.querySelector(".legendary-cost").value) || 1;
    const description = action
      .querySelector(".legendary-description")
      .value.trim();
    if (name && description) {
      actions.push({ name, cost, description });
    }
  });
  return actions;
}

function generateJSON() {
  try {
    const monsterData = {
      name: document.getElementById("monsterName").value,
      size: document.getElementById("size").value,
      type: document.getElementById("type").value,
      alignment: document.getElementById("alignment").value,
      armor_class: document.getElementById("armorClass").value,
      hit_points: document.getElementById("hitPoints").value,
      speed: document.getElementById("speed").value,
      stats: getStats(),
      saving_throws: getSavingThrows(),
      skills: getSkills(),
      challenge_rating: document.getElementById("cr").value,
      special_abilities: getAbilities(),
      actions: getActions(),
      legendary_actions: getLegendaryActions(),
    };

    document.getElementById("output").innerHTML =
      `<pre>${JSON.stringify(monsterData, null, 2)}</pre>`;
  } catch (error) {
    document.getElementById("output").innerHTML =
      `<div class="text-danger">Error generating monster JSON: ${error.message}</div>`;
  }
}
