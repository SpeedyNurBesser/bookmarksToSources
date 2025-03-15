const saveButton = document.getElementById('save-button')
const resetButton = document.getElementById('reset-button')

const templateInput = document.getElementById('template-input')
const previewBox = document.getElementById('preview-box')

const alertBoxPlace = document.getElementById('alerts')

const exampleBookmark = {
    url: 'https://example.com',
    title: 'Example written by Ole370'
}
const exampleIndex = 1

const page = document.getElementById('page')

function addAlertBox(message, strongMessage = "Info! ") {
  alertBox = document.createElement("div")
  alertBox.setAttribute("class", "alert")
  alertBox.innerHTML = `<span class="close-button" >&times;</span><strong>${strongMessage}</strong> ${message}`
  alertBoxPlace.append(alertBox)

  closeButtons = document.getElementsByClassName('close-button')
  for (let i = 0; i < closeButtons.length; i++) {
      closeButtons[i].onclick = function(){
      let div = this.parentElement;
      div.style.opacity = "0";
      setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}
}

let template;
browser.storage.local.get(['template'])
.then((result) => {
  template = result.template
  setPreviewFromTemplate(template)
  templateInput.value = template
})
.catch((error) => {
  console.error(error);
});


function setPreviewFromTemplate(template) {
    templatedString = fillTemplateWithBookmark(template, exampleBookmark, exampleIndex)

    previewBox.innerHTML = templatedString
}

templateInput.addEventListener("change", () => {
    templateString = templateInput.value
    setPreviewFromTemplate(templateString)
});

resetButton.addEventListener("click", () => {
    templateInput.value = resetTemplate
    setTemplate(resetTemplate)
    addAlertBox("Successfully reset template.")
})

saveButton.addEventListener("click", () => {
    setTemplate(templateInput.value)
    addAlertBox(`Set new template: "${templateInput.value}"`)
})