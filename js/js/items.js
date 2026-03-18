function addMagicalProperty() {
  const container = document.getElementById("magicalPropertiesContainer");
  const propertyDiv = document.createElement("div");
  propertyDiv.className = "magical-property mb-2";
  propertyDiv.innerHTML = `
    <div class="row g-2">
      <div class="col-md-4">
        <input type="text" class="form-control property-name" placeholder="Property Name">
      </div>
      <div class="col-md-7">
        <input type="text" class="form-control property-description" placeholder="Property Description">
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger btn-sm remove-property" onclick="removeProperty(this)">×</button>
      </div>
    </div>
  `;
  container.appendChild(propertyDiv);
}

function removeProperty(button) {
  button.closest(".magical-property").remove();
}

function getSelectedProperties() {
  const properties = [];
  const checkboxes = document.querySelectorAll(".form-check-input:checked");
  checkboxes.forEach((checkbox) => properties.push(checkbox.value));

  const customProps = document.getElementById("customProperties").value;
  if (customProps.trim()) {
    properties.push(...customProps.split(",").map((prop) => prop.trim()));
  }

  return properties;
}

function getMagicalProperties() {
  const properties = [];
  document.querySelectorAll(".magical-property").forEach((prop) => {
    const name = prop.querySelector(".property-name").value.trim();
    const description = prop
      .querySelector(".property-description")
      .value.trim();
    if (name && description) {
      properties.push({ name, description });
    }
  });
  return properties;
}

function formatOutput(data) {
  let output = `<h3>${data.name}</h3>`;
  output += `<p><em>${data.item_type}${data.rarity ? `, ${data.rarity}` : ""}</em></p>`;
  output += `<p>${data.description}</p>`;

  if (data.requires_attunement) {
    output += `<p><strong>Requires Attunement</strong>${data.attunement_description ? `: ${data.attunement_description}` : ""}</p>`;
  }

  if (data.properties.length > 0) {
    output += `<p><strong>Properties:</strong> ${data.properties.join(", ")}</p>`;
  }

  if (data.magical_properties.length > 0) {
    output += "<h4>Magical Properties:</h4><ul>";
    data.magical_properties.forEach((prop) => {
      output += `<li><strong>${prop.name}:</strong> ${prop.description}</li>`;
    });
    output += "</ul>";
  }

  if (data.cursed && data.curse_details) {
    output += `<p><strong>Curse:</strong> ${data.curse_details}</p>`;
  }

  return output;
}

function generateItem() {
  try {
    const itemData = {
      name: document.getElementById("itemName").value,
      description: document.getElementById("itemDescription").value,
      item_type: document.getElementById("itemType").value,
      rarity: document.getElementById("itemRarity").value,
      requires_attunement:
        document.getElementById("itemAttunement").value === "true",
      attunement_description: document.getElementById(
        "itemAttunementDescription",
      ).value,
      properties: getSelectedProperties(),
      magical_properties: getMagicalProperties(),
      cursed: document.getElementById("itemCursed").value === "true",
      curse_details: document.getElementById("itemCurseDetails").value,
    };

    document.getElementById("output").innerHTML =
      `<pre>${JSON.stringify(itemData, null, 2)}</pre>`;
  } catch (error) {
    document.getElementById("output").innerHTML =
      `<div class="text-danger">Error generating item JSON: ${error.message}</div>`;
  }
}
