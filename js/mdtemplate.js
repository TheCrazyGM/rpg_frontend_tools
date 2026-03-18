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

  // Dynamic Feats Fields
  function createFeatRow(name = '', url = '') {
    const row = document.createElement('div');
    row.className = 'input-group mb-2';
    row.innerHTML = `
      <input type="text" class="form-control" placeholder="Feat name" value="${name}">
      <input type="text" class="form-control" placeholder="URL (optional)" value="${url}">
      <button type="button" class="btn btn-outline-danger remove-feat-btn">Remove</button>
    `;
    return row;
  }

  function addFeatRow(name = '', url = '') {
    document.getElementById('featsList').appendChild(createFeatRow(name, url));
  }

  let featMsgTimer = null;

  function showFeatMinMsg() {
    const msg = document.getElementById('featMinMsg');
    clearTimeout(featMsgTimer);
    msg.style.transition = 'none';
    msg.style.opacity = '1';
    msg.style.display = 'block';
    featMsgTimer = setTimeout(() => {
      msg.style.transition = 'opacity 1s ease';
      msg.style.opacity = '0';
      setTimeout(() => { msg.style.display = 'none'; }, 1000);
    }, 5000);
  }

  function hideFeatMinMsg() {
    const msg = document.getElementById('featMinMsg');
    clearTimeout(featMsgTimer);
    msg.style.transition = 'none';
    msg.style.opacity = '0';
    msg.style.display = 'none';
  }

  document.getElementById('featsList').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-feat-btn')) {
      const list = document.getElementById('featsList');
      if (list.children.length > 1) {
        event.target.closest('.input-group').remove();
      } else {
        showFeatMinMsg();
      }
    }
  });

  document.getElementById('addFeat').addEventListener('click', () => {
    addFeatRow();
    hideFeatMinMsg();
  });

  if (!document.getElementById('featsList').hasChildNodes()) {
    addFeatRow();
  }

  // Dynamic Traits Fields
  function createTraitRow(name = '', url = '') {
    const row = document.createElement('div');
    row.className = 'input-group mb-2';
    row.innerHTML = `
      <input type="text" class="form-control" placeholder="Trait name" value="${name}">
      <input type="text" class="form-control" placeholder="URL (optional)" value="${url}">
      <button type="button" class="btn btn-outline-danger remove-trait-btn">Remove</button>
    `;
    return row;
  }

  function addTraitRow(name = '', url = '') {
    document.getElementById('traitsList').appendChild(createTraitRow(name, url));
  }

  let traitMsgTimer = null;

  function showTraitMinMsg(text) {
    const msg = document.getElementById('traitMinMsg');
    clearTimeout(traitMsgTimer);
    msg.textContent = text;
    msg.style.transition = 'none';
    msg.style.opacity = '1';
    msg.style.display = 'block';
    traitMsgTimer = setTimeout(() => {
      msg.style.transition = 'opacity 1s ease';
      msg.style.opacity = '0';
      setTimeout(() => { msg.style.display = 'none'; }, 1000);
    }, 5000);
  }

  function hideTraitMinMsg() {
    const msg = document.getElementById('traitMinMsg');
    clearTimeout(traitMsgTimer);
    msg.style.transition = 'none';
    msg.style.opacity = '0';
    msg.style.display = 'none';
  }

  document.getElementById('traitsList').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-trait-btn')) {
      const list = document.getElementById('traitsList');
      if (list.children.length > 1) {
        event.target.closest('.input-group').remove();
        if (list.children.length === 1) {
          showTraitMinMsg('Most PCs start with 2 traits.');
        }
      } else {
        showTraitMinMsg('A character should have at least 1 trait! Use "none" for these shenanigans.');
      }
    }
  });

  document.getElementById('addTrait').addEventListener('click', () => {
    addTraitRow();
    hideTraitMinMsg();
  });

  if (!document.getElementById('traitsList').hasChildNodes()) {
    addTraitRow();
    addTraitRow();
  }

  // Handle form submission
  document.getElementById('characterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Helper function to get trimmed value or empty string
    const get = id => document.getElementById(id)?.value.trim() || '';

    // Gather Traits rows
    const traitRows = Array.from(document.getElementById('traitsList').children);
    const traitsMarkdown = traitRows.map(row => {
      const [nameInp, urlInp] = row.querySelectorAll('input');
      const name = nameInp.value.trim();
      const url = urlInp.value.trim();
      if (!name) return null;
      return url ? `[${name}](${url})` : name;
    }).filter(Boolean).join(', ') || 'none';

    // Gather Feats rows
    const featRows = Array.from(document.getElementById('featsList').children);
    const featsMarkdown = featRows.map(row => {
      const [nameInp, urlInp] = row.querySelectorAll('input');
      const name = nameInp.value.trim();
      const url = urlInp.value.trim();
      if (!name) return null;
      return url ? `[${name}](${url})` : name;
    }).filter(Boolean).join(', ') || 'none';

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
| **AC**:${get('ac')}           | ${get('acDetails')}        | ${get('acMods')} |
| **HP**: ${get('hp')} | ${get('saves')} |

| Offense         |                          |
| --------------- | ------------------------ |
| Speed           | ${get('speed')}                   |
| Melee           | ${get('melee')} |
| Special Attacks | ${get('specialAttacks')} |

| Spells Known | (CL ${get('casterLevel')}) |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
${spellsKnownMarkdown}

| Statistics     |                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ability Scores | ${get('abilityScores')} |
| Feats          | ${featsMarkdown} |
| Traits         | ${traitsMarkdown} |
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