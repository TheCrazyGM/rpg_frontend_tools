function addPrerequisite() {
  const container = document.getElementById("prerequisitesContainer");
  const prereqDiv = document.createElement("div");
  prereqDiv.className = "prerequisite-item mb-2";
  prereqDiv.innerHTML = `
    <div class="row g-2">
      <div class="col-md-4">
        <select class="form-select prerequisite-type">
          <option value="Ability Score">Ability Score</option>
          <option value="Base Attack Bonus">Base Attack Bonus</option>
          <option value="Feat">Feat</option>
          <option value="Level">Level</option>
          <option value="Race">Race</option>
          <option value="Skill">Skill</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="col-md-7">
        <input type="text" class="form-control prerequisite-value" placeholder="Prerequisite value">
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger btn-sm remove-prerequisite" onclick="removePrerequisite(this)">×</button>
      </div>
    </div>
  `;
  container.appendChild(prereqDiv);
}

function removePrerequisite(button) {
  button.closest(".prerequisite-item").remove();
}

function addBenefit() {
  const container = document.getElementById("benefitsContainer");
  const benefitDiv = document.createElement("div");
  benefitDiv.className = "benefit-item mb-2";
  benefitDiv.innerHTML = `
    <div class="row g-2">
      <div class="col-md-11">
        <textarea class="form-control benefit-text" rows="2" placeholder="Describe the benefit"></textarea>
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger btn-sm remove-benefit" onclick="removeBenefit(this)">×</button>
      </div>
    </div>
  `;
  container.appendChild(benefitDiv);
}

function removeBenefit(button) {
  button.closest(".benefit-item").remove();
}

function getPrerequisites() {
  const prerequisites = [];
  document.querySelectorAll(".prerequisite-item").forEach((item) => {
    const type = item.querySelector(".prerequisite-type").value;
    const value = item.querySelector(".prerequisite-value").value.trim();

    if (value) {
      prerequisites.push({
        type,
        value,
      });
    }
  });
  return prerequisites;
}

function getBenefits() {
  const benefits = [];
  document.querySelectorAll(".benefit-text").forEach((item) => {
    const text = item.value.trim();
    if (text) {
      benefits.push(text);
    }
  });
  return benefits;
}

function getTags() {
  const tags = [];
  const tagMap = {
    tagAction: "Action",
    tagBonus: "Bonus",
    tagCombat: "Combat",
    tagMagic: "Magic",
    tagPassive: "Passive",
    tagSkill: "Skill",
    tagSocial: "Social",
    tagUtility: "Utility",
    tagWeapon: "Weapon",
  };

  for (const [id, name] of Object.entries(tagMap)) {
    if (document.getElementById(id).checked) {
      tags.push(name);
    }
  }
  return tags;
}

function generateFeat() {
  try {
    const featData = {
      name: document.getElementById("featName").value,
      description: document.getElementById("featDescription").value,
      prerequisites: getPrerequisites(),
      benefits: getBenefits(),
      special: document.getElementById("featSpecial").value,
      type: document.getElementById("featType").value,
      source: document.getElementById("featSource").value,
      tags: getTags(),
    };

    document.getElementById("output").innerHTML =
      `<pre>${JSON.stringify(featData, null, 2)}</pre>`;
  } catch (error) {
    document.getElementById("output").innerHTML =
      `<div class="text-danger">Error generating feat JSON: ${error.message}</div>`;
  }
}

function generateJSON() {
  const featData = {
    name: document.getElementById("featName").value,
    description: document.getElementById("featDescription").value,
    prerequisites: getPrerequisites(),
    benefits: getBenefits(),
    special: document.getElementById("featSpecial").value,
    type: document.getElementById("featType").value,
    source: document.getElementById("featSource").value,
    tags: getTags(),
  };

  const jsonOutput = JSON.stringify(featData, null, 2);
  document.getElementById("output").textContent = jsonOutput;
}
