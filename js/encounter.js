// XP Thresholds by Character Level
const xpThresholds = {
  1: { easy: 25, medium: 50, hard: 75, deadly: 100 },
  2: { easy: 50, medium: 100, hard: 150, deadly: 200 },
  3: { easy: 75, medium: 150, hard: 225, deadly: 400 },
  4: { easy: 125, medium: 250, hard: 375, deadly: 500 },
  5: { easy: 250, medium: 500, hard: 750, deadly: 1100 },
  // Add more levels as needed
};

// CR to XP conversion
const crToXP = {
  0: 10,
  0.125: 25,
  0.25: 50,
  0.5: 100,
  1: 200,
  2: 450,
  3: 700,
  4: 1100,
  5: 1800,
  // Add more CRs as needed
};

function addMonsterEntry() {
  const container = document.getElementById("monstersContainer");
  const newEntry = document.createElement("div");
  newEntry.className = "monster-entry mb-3";
  newEntry.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <label class="form-label">Monster Name:</label>
                <input type="text" class="form-control monster-name" placeholder="e.g., Goblin">
            </div>
            <div class="col-md-2">
                <label class="form-label">CR:</label>
                <input type="number" class="form-control monster-cr" step="0.125" min="0" value="0.25">
            </div>
            <div class="col-md-2">
                <label class="form-label">Quantity:</label>
                <input type="number" class="form-control monster-quantity" min="1" value="1">
            </div>
            <div class="col-md-4">
                <label class="form-label">Role:</label>
                <select class="form-select monster-role">
                    <option value="soldier">Soldier (Basic Combat)</option>
                    <option value="brute">Brute (High HP/Damage)</option>
                    <option value="controller">Controller (Crowd Control)</option>
                    <option value="leader">Leader (Buffs/Commands)</option>
                    <option value="artillery">Artillery (Ranged)</option>
                    <option value="lurker">Lurker (Stealth/Ambush)</option>
                </select>
            </div>
        </div>
        <button class="btn btn-danger btn-sm mt-2" onclick="this.parentElement.remove()">Remove</button>
    `;
  container.appendChild(newEntry);
}

function calculateEncounterDifficulty(totalXP, partyLevel, partySize) {
  const partyThreshold = xpThresholds[partyLevel] || xpThresholds[1];
  const totalPartyThreshold = {
    easy: partyThreshold.easy * partySize,
    medium: partyThreshold.medium * partySize,
    hard: partyThreshold.hard * partySize,
    deadly: partyThreshold.deadly * partySize,
  };

  if (totalXP <= totalPartyThreshold.easy) return "Easy";
  if (totalXP <= totalPartyThreshold.medium) return "Medium";
  if (totalXP <= totalPartyThreshold.hard) return "Hard";
  if (totalXP <= totalPartyThreshold.deadly) return "Deadly";
  return "Beyond Deadly";
}

function generateJSON() {
  const partySize = parseInt(document.getElementById("partySize").value);
  const partyLevel = parseInt(document.getElementById("partyLevel").value);
  const difficulty = document.getElementById("encounterDifficulty").value;
  const terrain = document.getElementById("terrain").value;
  const timeOfDay = document.getElementById("timeOfDay").value;
  const environmentalEffects = Array.from(
    document.getElementById("environmentalEffects").selectedOptions,
  ).map((opt) => opt.value);
  const tacticalNotes = document.getElementById("tacticalNotes").value;

  const monsters = [];
  let totalXP = 0;

  document.querySelectorAll(".monster-entry").forEach((entry) => {
    const monster = {
      name: entry.querySelector(".monster-name").value,
      cr: parseFloat(entry.querySelector(".monster-cr").value),
      quantity: parseInt(entry.querySelector(".monster-quantity").value),
      role: entry.querySelector(".monster-role").value,
    };

    const monsterXP = (crToXP[monster.cr] || 0) * monster.quantity;
    totalXP += monsterXP;
    monsters.push(monster);
  });

  const encounterData = {
    party: {
      size: partySize,
      averageLevel: partyLevel,
      targetDifficulty: difficulty,
    },
    environment: {
      terrain: terrain,
      timeOfDay: timeOfDay,
      effects: environmentalEffects,
    },
    monsters: monsters,
    calculatedDifficulty: calculateEncounterDifficulty(
      totalXP,
      partyLevel,
      partySize,
    ),
    totalXP: totalXP,
    tacticalNotes: tacticalNotes,
  };

  const output = document.getElementById("output");
  output.innerHTML = `
        <div class="alert ${encounterData.calculatedDifficulty === encounterData.party.targetDifficulty ? "alert-success" : "alert-warning"}">
            Calculated Difficulty: ${encounterData.calculatedDifficulty} (${totalXP} XP)
        </div>
        <pre><code>${JSON.stringify(encounterData, null, 2)}</code></pre>
    `;
}

// Add initial monster entry
document.addEventListener("DOMContentLoaded", () => {
  addMonsterEntry();
});
