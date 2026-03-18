// Handle custom input fields
document.getElementById('spellCastingTime').addEventListener('change', function() {
  const customInput = document.getElementById('spellCastingTimeCustom');
  customInput.classList.toggle('d-none', this.value !== 'Custom');
});

document.getElementById('spellRange').addEventListener('change', function() {
  const customInput = document.getElementById('spellRangeCustom');
  customInput.classList.toggle('d-none', this.value !== 'Custom');
});

document.getElementById('spellDuration').addEventListener('change', function() {
  const customInput = document.getElementById('spellDurationCustom');
  customInput.classList.toggle('d-none', this.value !== 'Custom');
});

document.getElementById('componentMaterial').addEventListener('change', function() {
  const materialDiv = document.getElementById('materialComponentDiv');
  materialDiv.classList.toggle('d-none', !this.checked);
});

document.getElementById('classCustom').addEventListener('change', function() {
  const customClassDiv = document.getElementById('customClassDiv');
  customClassDiv.classList.toggle('d-none', !this.checked);
});

function addEffect() {
  const container = document.getElementById('effectsContainer');
  const effectDiv = document.createElement('div');
  effectDiv.className = 'effect-item mb-2';
  effectDiv.innerHTML = `
    <div class="row g-2">
      <div class="col-md-3">
        <select class="form-select effect-type">
          <option value="damage">Damage</option>
          <option value="healing">Healing</option>
          <option value="condition">Condition</option>
          <option value="other">Other Effect</option>
        </select>
      </div>
      <div class="col-md-3">
        <input type="text" class="form-control effect-amount" placeholder="Amount (e.g., 2d6)">
      </div>
      <div class="col-md-5">
        <input type="text" class="form-control effect-description" placeholder="Description (e.g., fire damage)">
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger btn-sm remove-effect" onclick="removeEffect(this)">×</button>
      </div>
    </div>
  `;
  container.appendChild(effectDiv);
}

function removeEffect(button) {
  button.closest('.effect-item').remove();
}

function getComponents() {
  const components = [];
  if (document.getElementById('componentVerbal').checked) components.push('V');
  if (document.getElementById('componentSomatic').checked) components.push('S');
  if (document.getElementById('componentMaterial').checked) {
    const materials = document.getElementById('materialComponents').value.trim();
    if (materials) {
      components.push(`M (${materials})`);
    } else {
      components.push('M');
    }
  }
  return components;
}

function getClasses() {
  const classes = [];
  const classMap = {
    "classArtificer": "Artificer",
    "classBard": "Bard",
    "classCleric": "Cleric",
    "classDruid": "Druid",
    "classPaladin": "Paladin",
    "classRanger": "Ranger",
    "classSorcerer": "Sorcerer",
    "classWarlock": "Warlock",
    "classWizard": "Wizard"
  };

  for (const [id, name] of Object.entries(classMap)) {
    if (document.getElementById(id).checked) {
      classes.push(name);
    }
  }

  if (document.getElementById('classCustom').checked) {
    const customClass = document.getElementById('customClass').value.trim();
    if (customClass) {
      classes.push(customClass);
    }
  }

  return classes;
}

function getEffects() {
  const effects = [];
  document.querySelectorAll('.effect-item').forEach(item => {
    const type = item.querySelector('.effect-type').value;
    const amount = item.querySelector('.effect-amount').value.trim();
    const description = item.querySelector('.effect-description').value.trim();
    
    if (amount || description) {
      effects.push({
        type,
        amount,
        description
      });
    }
  });
  return effects;
}

function generateSpell() {
  try {
    const castingTime = document.getElementById('spellCastingTime').value;
    const range = document.getElementById('spellRange').value;
    const duration = document.getElementById('spellDuration').value;

    const spellData = {
      name: document.getElementById('spellName').value,
      level: document.getElementById('spellLevel').value,
      school: document.getElementById('spellSchool').value,
      castingTime: castingTime === 'Custom' ? document.getElementById('spellCastingTimeCustom').value : castingTime,
      range: range === 'Custom' ? document.getElementById('spellRangeCustom').value : range,
      components: getComponents(),
      duration: duration === 'Custom' ? document.getElementById('spellDurationCustom').value : duration,
      concentration: document.getElementById('spellConcentration').checked,
      ritual: document.getElementById('spellRitual').checked,
      description: document.getElementById('spellDescription').value,
      effects: getEffects(),
      classes: getClasses(),
      source: document.getElementById('spellSource').value
    };

    document.getElementById('output').innerHTML = `<pre>${JSON.stringify(spellData, null, 2)}</pre>`;
  } catch (error) {
    document.getElementById('output').innerHTML = `<div class="text-danger">Error generating spell JSON: ${error.message}</div>`;
  }
}
