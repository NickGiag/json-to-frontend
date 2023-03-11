function generateFormLayout(json) {
  var title = getTitle(json);  
  var description = getDescription(json);
  const rows = json.layout.pages[0].rows;
  const form = document.createElement("form");
  const header = document.createElement("h1");
  const desc = document.createElement("h5");
  const container = document.createElement("div");
  
  header.innerText = title;
  desc.innerText = description;
  container.classList.add("container");
  
  rows.forEach(row => {
    const rowElem = document.createElement("div");
    rowElem.classList.add("row");
    row.columns.forEach(col => {
      const colElem = document.createElement("div");
      colElem.classList.add(`col-${col.size}`);
      col.fieldNames.forEach(fieldName => {
        const labelElem = document.createElement("label");
        labelElem.setAttribute("for",fieldName);
        labelElem.innerText = fieldName;
        const inputElem = document.createElement("input");
        inputElem.setAttribute("name", fieldName);
        colElem.appendChild(labelElem);
        colElem.appendChild(inputElem);
      });
      rowElem.appendChild(colElem);
    });
    container.appendChild(rowElem);
  });

  form.appendChild(header);
  form.appendChild(desc);
  form.appendChild(container);

  return form;
}

//global variable to change language
let languageId;

fetch("./layout.json")
  .then(response => response.json())
  .then(json => {
    languageId = json.layout.defaultLanguageId;
    const form = generateFormLayout(json);    
    document.getElementById("form-container").appendChild(form);
  })
  .catch(error => console.error(error));

//Switches to Greek or English title depending on the value
function getTitle(json) {
  if (languageId == "en_US") {
    return json.layout.pages[0].title["en_US"]
  } else  if (languageId == "el_GR") {
    return json.layout.pages[0].title["el_GR"]
  }
}

//Switches to Greek or English description depending on the value
function getDescription(json) {
  if (languageId == "en_US") {
    return json.layout.pages[0].description["en_US"]
  } else  if (languageId == "el_GR") {
    return json.layout.pages[0].description["el_GR"]
  }
}
