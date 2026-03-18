// Dynamic Spells Known Fields
document.addEventListener('DOMContentLoaded', () => {
  // Create a new spell row with the given level and spells
  function createSpellRow(level = '', spells = '') {
    const row = document.createElement('div');
    row.className = 'input-group mb-2';
    row.innerHTML = `
      <input type="text" class="form-control" placeholder="Level/Uses (e.g. 1 (4/day))" value="${level}">
      <input type="text" class="form-control" placeholder="Spells (e.g. Ear-Piercing Scream, Animate Rope)" value="${spells}">
      <button type="button" class="btn btn-outline-danger remove-spell-btn">Remove</button>
    `;
    return row;
  }

  // Add a new spell row to the spells known list
  function addSpellRow(level = '', spells = '') {
    document.getElementById('spellsKnownList').appendChild(createSpellRow(level, spells));
  }

  // Handle remove spell row button clicks
  document.getElementById('spellsKnownList').addEventListener('click', function(event) {
    if(event.target.classList.contains('remove-spell-btn')) {
      const row = event.target.closest('.input-group');
      if(row) row.remove();
    }
  });

  // Add spell button click handler
  document.getElementById('addSpellKnown').addEventListener('click', () => addSpellRow());

  // Add one row by default
  if (!document.getElementById('spellsKnownList').hasChildNodes()) {
    addSpellRow();
  }

  // Handle form submission
  document.getElementById('characterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Helper function to get trimmed value or empty string
    const get = id => document.getElementById(id)?.value.trim() || '';

    // Gather Spells Known rows
    const spellRows = Array.from(document.getElementById('spellsKnownList').children);
    const spellsKnownMarkdown = spellRows.map(row => {
      const [levelInp, spellsInp] = row.querySelectorAll('input');
      if (!levelInp.value.trim() && !spellsInp.value.trim()) return null;
      return `| ${levelInp.value.trim()} | ${spellsInp.value.trim()} |`;
    }).filter(Boolean).join('\n');

    // Generate markdown matching the exact template format
    const md =
`## Character Sheet "format", in markdown!

### Premade Character: ${get('characterName')}

| Templates:    | ${get('templates')} | Character Level ${get('level')} |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| ${get('raceClassAlignment')} |  | Initiative ${get('initiative')}     |
| Senses:       | ${get('senses')} | Perception ${get('perception')}     |

| Defenses            |                                         |         |
| ------------------- | --------------------------------------- | ------- |
| **AC**:${get('ac')}           | **HP**: ${get('hp')} | **Saves**: ${get('saves')} |

| Offense         |                          |
| --------------- | ------------------------ |
| Speed           | ${get('speed')}                   |
| Melee           | ${get('melee')} |
| Special Attacks | ${get('specialAttacks')} |

| Spells Known | (CL 1st) |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
${spellsKnownMarkdown}

| Statistics     |                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ability Scores | ${get('abilityScores')} |
| Feats          | ${get('feats')} |
| Skills         | ${get('skills')} |

| Other             |                                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| Special Abilities | ${get('specialAbilities')} |
| Equipment:        | ${get('equipment')}          |`;

    // Display markdown output
    const output = document.getElementById('markdownOutput');
    output.textContent = md;
  });
});