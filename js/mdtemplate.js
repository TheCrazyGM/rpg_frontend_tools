// Character Sheet Generator
document.addEventListener('DOMContentLoaded', () => {
  function createTemplateRow(name = '', url = '') {
    const row = document.createElement('div');
    row.className = 'input-group mb-2';
    row.innerHTML = `
      <input type="text" class="form-control" placeholder="e.g. Sorcerer 1, Accursed Bloodline" value="${name}">
      <input type="text" class="form-control" placeholder="URL (optional)" value="${url}">
      <button type="button" class="btn btn-outline-danger remove-template-btn">Remove</button>
    `;
    return row;
  }

  function addTemplateRow(name = '', url = '') {
    document.getElementById('templatesList').appendChild(createTemplateRow(name, url));
  }

  let templateMsgTimer = null;

  function showTemplateMinMsg() {
    const msg = document.getElementById('templateMinMsg');
    clearTimeout(templateMsgTimer);
    msg.style.transition = 'none';
    msg.style.opacity = '1';
    msg.style.display = 'block';
    templateMsgTimer = setTimeout(() => {
      msg.style.transition = 'opacity 1s ease';
      msg.style.opacity = '0';
      setTimeout(() => { msg.style.display = 'none'; }, 1000);
    }, 5000);
  }

  document.getElementById('templatesList').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-template-btn')) {
      const list = document.getElementById('templatesList');
      if (list.children.length > 1) {
        event.target.closest('.input-group').remove();
        document.getElementById('templateMinMsg').style.display = 'none';
      } else {
        showTemplateMinMsg();
      }
    }
  });

  document.getElementById('addTemplate').addEventListener('click', () => {
    addTemplateRow();
    document.getElementById('templateMinMsg').style.display = 'none';
  });

  if (!document.getElementById('templatesList').hasChildNodes()) {
    addTemplateRow();
  }
  // Dynamic Spells Known Fields
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

  // Show/hide spellcasting section based on dropdown
  const spellcastingSelect = document.getElementById('spellcasting');
  const spellcastingSection = document.getElementById('spellcastingSection');
  const spellsLabel = document.getElementById('spellsLabel');

  const spellLabels = { prepared: 'Spells Prepared', spontaneous: 'Spells Known' };

  const spontaneousToggleWrapper = document.getElementById('spontaneousToggleWrapper');
  const includeSpontaneousPreparedCheckbox = document.getElementById('includeSpontaneousPrepared');
  const spontaneousPreparedSection = document.getElementById('spontaneousPreparedSection');

  includeSpontaneousPreparedCheckbox.addEventListener('change', function () {
    spontaneousPreparedSection.style.display = this.checked ? 'block' : 'none';
    if (this.checked && !document.getElementById('spontaneousPreparedList').hasChildNodes()) {
      addSpontaneousPreparedRow();
    }
  });

  function createSpontaneousPreparedRow(level = '', spells = '') {
    const row = document.createElement('div');
    row.className = 'input-group mb-2';
    row.innerHTML = `
      <input type="text" class="form-control" placeholder="Level/Uses (e.g. 1 (2/day))" value="${level}">
      <input type="text" class="form-control" placeholder="Spells" value="${spells}">
      <button type="button" class="btn btn-outline-danger remove-spontaneous-prepared-btn">Remove</button>
    `;
    return row;
  }

  function addSpontaneousPreparedRow(level = '', spells = '') {
    document.getElementById('spontaneousPreparedList').appendChild(createSpontaneousPreparedRow(level, spells));
  }

  document.getElementById('spontaneousPreparedList').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-spontaneous-prepared-btn')) {
      event.target.closest('.input-group').remove();
    }
  });

  document.getElementById('addSpontaneousPrepared').addEventListener('click', () => addSpontaneousPreparedRow());

  const spellsKnownToggleWrapper = document.getElementById('spellsKnownToggleWrapper');
  const includeSpellsKnownCheckbox = document.getElementById('includeSpellsKnown');
  const spellsKnownExtraSection = document.getElementById('spellsKnownExtraSection');

  spellcastingSelect.addEventListener('change', function () {
    const val = this.value;
    if (val === 'none') {
      spellcastingSection.style.display = 'none';
      spellsKnownToggleWrapper.style.display = 'none';
      spontaneousToggleWrapper.style.display = 'none';
    } else {
      spellcastingSection.style.display = 'block';
      spellsLabel.textContent = spellLabels[val];
      spellsKnownToggleWrapper.style.display = val === 'prepared' ? 'block' : 'none';
      spontaneousToggleWrapper.style.display = val === 'spontaneous' ? 'block' : 'none';
      if (val !== 'prepared') {
        includeSpellsKnownCheckbox.checked = false;
        spellsKnownExtraSection.style.display = 'none';
        includeSpellbookCheckbox.checked = false;
        spellbookSection.style.display = 'none';
      }
      if (val !== 'spontaneous') {
        includeSpontaneousPreparedCheckbox.checked = false;
        spontaneousPreparedSection.style.display = 'none';
      }
    }
  });

  includeSpellsKnownCheckbox.addEventListener('change', function () {
    spellsKnownExtraSection.style.display = this.checked ? 'block' : 'none';
    if (this.checked && !document.getElementById('spellsKnownExtraList').hasChildNodes()) {
      addExtraSpellRow();
    }
  });

  function createExtraSpellRow(level = '', spells = '') {
    const row = document.createElement('div');
    row.className = 'input-group mb-2';
    row.innerHTML = `
      <input type="text" class="form-control" placeholder="Level/Uses (e.g. 1 (4/day))" value="${level}">
      <input type="text" class="form-control" placeholder="Spells" value="${spells}">
      <button type="button" class="btn btn-outline-danger remove-extra-spell-btn">Remove</button>
    `;
    return row;
  }

  function addExtraSpellRow(level = '', spells = '') {
    document.getElementById('spellsKnownExtraList').appendChild(createExtraSpellRow(level, spells));
  }

  document.getElementById('spellsKnownExtraList').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-extra-spell-btn')) {
      event.target.closest('.input-group').remove();
    }
  });

  document.getElementById('addSpellKnownExtra').addEventListener('click', () => addExtraSpellRow());

  // Spellbook
  const includeSpellbookCheckbox = document.getElementById('includeSpellbook');
  const spellbookSection = document.getElementById('spellbookSection');

  includeSpellbookCheckbox.addEventListener('change', function () {
    spellbookSection.style.display = this.checked ? 'block' : 'none';
    if (this.checked && !document.getElementById('spellbookList').hasChildNodes()) {
      addSpellbookRow();
    }
  });

  function createSpellbookRow(level = '', spells = '') {
    const row = document.createElement('div');
    row.className = 'input-group mb-2';
    row.innerHTML = `
      <input type="text" class="form-control" placeholder="Level (e.g. 1st)" value="${level}">
      <input type="text" class="form-control" placeholder="Spells" value="${spells}">
      <button type="button" class="btn btn-outline-danger remove-spellbook-btn">Remove</button>
    `;
    return row;
  }

  function addSpellbookRow(level = '', spells = '') {
    document.getElementById('spellbookList').appendChild(createSpellbookRow(level, spells));
  }

  document.getElementById('spellbookList').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-spellbook-btn')) {
      event.target.closest('.input-group').remove();
    }
  });

  document.getElementById('addSpellbookEntry').addEventListener('click', () => addSpellbookRow());

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

  // Dynamic Attacks Fields
  function createAttackRow(type = 'melee', description = '') {
    const row = document.createElement('div');
    row.className = 'input-group mb-2';
    row.innerHTML = `
      <select class="form-select" style="max-width:130px;">
        <option value="melee" ${type === 'melee' ? 'selected' : ''}>Melee</option>
        <option value="ranged" ${type === 'ranged' ? 'selected' : ''}>Ranged</option>
        <option value="other" ${type === 'other' ? 'selected' : ''}>Other</option>
      </select>
      <input type="text" class="form-control" placeholder="e.g. +1 to hit, 1d8+1" value="${description}">
      <button type="button" class="btn btn-outline-danger remove-attack-btn">Remove</button>
    `;
    return row;
  }

  function addAttackRow(type = 'melee', description = '') {
    document.getElementById('attacksList').appendChild(createAttackRow(type, description));
  }

  let attackMsgTimer = null;

  function showAttackMinMsg() {
    const msg = document.getElementById('attackMinMsg');
    clearTimeout(attackMsgTimer);
    msg.style.transition = 'none';
    msg.style.opacity = '1';
    msg.style.display = 'block';
    attackMsgTimer = setTimeout(() => {
      msg.style.transition = 'opacity 1s ease';
      msg.style.opacity = '0';
      setTimeout(() => { msg.style.display = 'none'; }, 1000);
    }, 5000);
  }

  document.getElementById('attacksList').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-attack-btn')) {
      const list = document.getElementById('attacksList');
      if (list.children.length > 1) {
        event.target.closest('.input-group').remove();
        document.getElementById('attackMinMsg').style.display = 'none';
      } else {
        showAttackMinMsg();
      }
    }
  });

  document.getElementById('addAttack').addEventListener('click', () => {
    addAttackRow();
    document.getElementById('attackMinMsg').style.display = 'none';
  });

  if (!document.getElementById('attacksList').hasChildNodes()) {
    addAttackRow('melee');
  }

  // Dynamic Notable Features Fields
  function createNotableFeatureRow(name = '', description = '') {
    const row = document.createElement('div');
    row.className = 'input-group mb-2';
    row.innerHTML = `
      <input type="text" class="form-control" placeholder="Feature name" value="${name}">
      <input type="text" class="form-control" placeholder="Description" value="${description}">
      <button type="button" class="btn btn-outline-danger remove-feature-btn">Remove</button>
    `;
    return row;
  }

  document.getElementById('notableFeaturesList').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-feature-btn')) {
      event.target.closest('.input-group').remove();
    }
  });

  document.getElementById('addNotableFeature').addEventListener('click', () => {
    document.getElementById('notableFeaturesList').appendChild(createNotableFeatureRow());
  });

  // Handle form submission
  document.getElementById('characterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Helper function to get trimmed value or empty string
    const get = id => document.getElementById(id)?.value.trim() || '';

    // Build race markdown link
    const race = get('race');
    const raceUrl = get('raceUrl');
    const raceMarkdown = race && raceUrl ? `[${race}](${raceUrl})` : race;

    // Gather Attack rows
    const attackRows = Array.from(document.getElementById('attacksList').children);
    const attacksMarkdown = attackRows.map(row => {
      const typeSelect = row.querySelector('select');
      const descInp = row.querySelector('input');
      const type = typeSelect.options[typeSelect.selectedIndex].text;
      const desc = descInp.value.trim();
      if (!desc) return null;
      return `| ${type} | ${desc} |`;
    }).filter(Boolean).join('\n') || '| None | |';

    // Gather Templates rows
    const templateRows = Array.from(document.getElementById('templatesList').children);
    const templatesMarkdown = templateRows.map(row => {
      const [nameInp, urlInp] = row.querySelectorAll('input');
      const name = nameInp.value.trim();
      const url = urlInp.value.trim();
      if (!name) return null;
      return url ? `[${name}](${url})` : name;
    }).filter(Boolean).join(', ') || 'None';

    // Gather Notable Features rows
    const featureRows = Array.from(document.getElementById('notableFeaturesList').children);
    const notableFeaturesMarkdown = featureRows.map(row => {
      const [nameInp, descInp] = row.querySelectorAll('input');
      const name = nameInp.value.trim();
      const desc = descInp.value.trim();
      if (!name) return null;
      return desc ? `**${name}**: ${desc}` : `**${name}**`;
    }).filter(Boolean).join('<br>');

    // Gather Traits rows
    const traitRows = Array.from(document.getElementById('traitsList').children);
    const traitsMarkdown = traitRows.map(row => {
      const [nameInp, urlInp] = row.querySelectorAll('input');
      const name = nameInp.value.trim();
      const url = urlInp.value.trim();
      if (!name) return null;
      return url ? `[${name}](${url})` : name;
    }).filter(Boolean).join(', ') || 'None';

    // Gather Feats rows
    const featRows = Array.from(document.getElementById('featsList').children);
    const featsMarkdown = featRows.map(row => {
      const [nameInp, urlInp] = row.querySelectorAll('input');
      const name = nameInp.value.trim();
      const url = urlInp.value.trim();
      if (!name) return null;
      return url ? `[${name}](${url})` : name;
    }).filter(Boolean).join(', ') || 'None';

    // Gather Spontaneous Prepared rows
    const spontaneousPreparedRows = Array.from(document.getElementById('spontaneousPreparedList').children);
    const spontaneousPreparedMarkdown = spontaneousPreparedRows.map(row => {
      const [levelInp, spellsInp] = row.querySelectorAll('input');
      if (!levelInp.value.trim() && !spellsInp.value.trim()) return null;
      return `| ${levelInp.value.trim()} | ${spellsInp.value.trim()} |`;
    }).filter(Boolean).join('\n');

    // Gather Spellbook rows
    const spellbookRows = Array.from(document.getElementById('spellbookList').children);
    const spellbookMarkdown = spellbookRows.map(row => {
      const [levelInp, spellsInp] = row.querySelectorAll('input');
      if (!levelInp.value.trim() && !spellsInp.value.trim()) return null;
      return `| ${levelInp.value.trim()} | ${spellsInp.value.trim()} |`;
    }).filter(Boolean).join('\n');

    // Gather extra Spells Known rows (Prepared + Spells Known checkbox)
    const extraSpellRows = Array.from(document.getElementById('spellsKnownExtraList').children);
    const spellsKnownExtraMarkdown = extraSpellRows.map(row => {
      const [levelInp, spellsInp] = row.querySelectorAll('input');
      if (!levelInp.value.trim() && !spellsInp.value.trim()) return null;
      return `| ${levelInp.value.trim()} | ${spellsInp.value.trim()} |`;
    }).filter(Boolean).join('\n');

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

| Templates:    | ${templatesMarkdown} | Character Level ${get('level')} |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| ${raceMarkdown} | ${get('alignment')} | Initiative ${get('initiative')}     |
| Senses:       | ${get('senses')} | Perception ${get('perception')}     |

| Defenses            |                                         |         |
| ------------------- | --------------------------------------- | ------- |
| **AC**:${get('ac')}           | ${get('acDetails')}        | ${get('acMods')} |
| **HP**: ${get('hp')} | **Fort**:${get('saveFort')}, **Reflex**:${get('saveReflex')}, **Will**:${get('saveWill')} |

| Offense         |                          |
| --------------- | ------------------------ |
| Speed           | ${get('speed')} |
${attacksMarkdown}
| Special Attacks | ${get('specialAttacks')} |

${spellcastingSelect.value !== 'none' ? `| ${spellLabels[spellcastingSelect.value]} | (CL ${get('casterLevel')}) |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
${spellsKnownMarkdown || '| None | |'}` : ''}${spellcastingSelect.value !== 'none' && includeSpontaneousPreparedCheckbox.checked && spontaneousPreparedMarkdown ? `

| Spells Prepared | (CL ${get('casterLevel')}) |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
${spontaneousPreparedMarkdown}` : ''}${spellcastingSelect.value !== 'none' && includeSpellsKnownCheckbox.checked && spellsKnownExtraMarkdown ? `

| Spells Known | (CL ${get('casterLevel')}) |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
${spellsKnownExtraMarkdown}` : ''}${spellcastingSelect.value !== 'none' && includeSpellbookCheckbox.checked && spellbookMarkdown ? `

| Spellbook | |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
${spellbookMarkdown}` : ''}

| Statistics     |                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ability Scores | **Str**: ${get('aStr')}, **Dex**: ${get('aDex')}, **Con**: ${get('aCon')}, **Int**: ${get('aInt')}, **Wis**: ${get('aWis')}, **Cha**: ${get('aCha')} |
| Combat         | Base Atk: ${get('bab')}, **CMB**: ${get('cmb')}, **CMD**: ${get('cmd')} |
| Feats          | ${featsMarkdown} |
| Traits         | ${traitsMarkdown} |
| Skills         | ${get('skills')} |

| Other             |                                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| Special Abilities | ${get('specialAbilities')} |
| Equipment:        | ${get('equipment')}          |${notableFeaturesMarkdown ? `
| Notable Features  | ${notableFeaturesMarkdown} |` : ''}`;

    // Display markdown output
    const output = document.getElementById('markdownOutput');
    output.textContent = md;
  });
});