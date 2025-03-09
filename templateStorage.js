
const resetTemplate = '%index. <i>%title</i> %url'

// Init Template

browser.storage.local.get(['template'])
  .then((result) => {
    if (!result.template) {
        setTemplate(resetTemplate)
    }
  })
  .catch((error) => {
    console.error(error);
  });

// Initiallly get template

function setTemplate(templateString) {
    browser.storage.local.set({ template: templateString })
        .then(() => {
            console.log('Set new template: ', templateString,)
        })
        .catch((error) => {
            console.error(error);
        });
}

function getTemplate() {
  browser.storage.local.get(['template'])
  .then((result) => {
    return result.template
  })
  .catch((error) => {
    console.error(error);
    return -1
  });
}