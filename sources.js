let templateString;

let bookmarksAsStrings = []

browser.storage.local.get(['template'])
.then((result) => {
    if (result.template) {
        templateString = result.template;
    } else {
        templateString = resetTemplate;
    }
})
.catch((error) => {
  console.error(error);
});

const outputDiv = document.getElementById('output')

const htmlButton = document.getElementById('exportHtmlButton')
const txtButton = document.getElementById('exportTxtButton')
const docxButton = document.getElementById('exportDocxButton')

const exportButtons = [htmlButton, txtButton, docxButton]

const generateButton = document.getElementById('generateButton')
generateButton.addEventListener("click", () => {
    exportButtons.forEach(button => {
        button.style.display = 'inline'
    })

    outputDiv.innerHTML = ""

    selectedValues = getTreeselectValues()
    selectedBookmarks = getBookmarksFromValues(selectedValues)
    bookmarkStrings = []
    for (let i = 0; i < selectedBookmarks.length; i++) {
        string = fillTemplateWithBookmark(templateString, selectedBookmarks[i], i + 1)

        bookmarkStrings.push(string)
    }

    bookmarksAsStrings = []

    bookmarkStrings.forEach(bookmarkString => {
        p = `<p>${bookmarkString}</p>`

        bookmarksAsStrings.push(bookmarkString)

        outputDiv.innerHTML += p
    });
})

function getTreeselectValues() {
    return treeselect.value
}

function getBookmarksFromValues(values) {
    bookmarkList = []

    values.forEach(value => {
        result = findValueInTree(value, bookmarks)
        if (!result) {
            console.log("Couldn't find bookmark of value " + value + " in bookmark tree")
            // TODO: handle value not found
        } else {
            bookmarkList.push(result)
        }
    });

    return bookmarkList
}

function findValueInTree(value, tree) {
    for (let children of tree) {
        if (children.children.length != 0) {
            childrenToCheck = findValueInTree(value, children.children)
        } else {
            childrenToCheck = children
        }

        if (childrenToCheck != undefined && childrenToCheck.value == value) {
            return childrenToCheck
        }
    }

    return undefined
}

function downloadAsDefaultFile(filename, text) {
    let donwloadElement = document.createElement('a');
    donwloadElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    donwloadElement.setAttribute('download', filename);
  
    donwloadElement.style.display = 'none';
    document.body.appendChild(donwloadElement);
  
    donwloadElement.click();
  
    document.body.removeChild(donwloadElement);
  }

htmlButton.addEventListener("click", () => {
    htmlBookmarkString = ""

    bookmarksAsStrings.forEach(bookmarkString => {
        htmlBookmarkString += bookmarkString + "\n"
    })

    downloadAsDefaultFile('export.html', htmlBookmarkString)
})

txtButton.addEventListener("click", () => {
    txtBookmarkString = ""
    
    bookmarksAsStrings.forEach(bookmarkString => {
        // cleans up any unwanted html elements by giving the string to a div and only returning its textContent / innerText, which will automatically be cleaned up
        let div = document.createElement("div")
        div.innerHTML = bookmarkString
        let textOutput = div.textContent || div.innerText || "";

        txtBookmarkString += textOutput + "\n"
    })

    downloadAsDefaultFile('export.txt', txtBookmarkString)
})

docxButton.addEventListener("click", () => {
    let childrenText = []

    bookmarksAsStrings.forEach(bookmarkString => {
        // cleans up any unwanted html elements by giving the string to a div and only returning its textContent / innerText, which will automatically be cleaned up
        let div = document.createElement("div")
        div.innerHTML = bookmarkString
        let textOutput = div.textContent || div.innerText || "";
        let data = { html: div.outerHTML }
        console.log(data)


        childrenText.push(new docx.TextRun(textOutput))
    })

    let paragraphs = []

    childrenText.forEach(text =>  {
        paragraphs.push(new docx.Paragraph({
            children: [
              text
            ],
          }))
    })

    const doc = new docx.Document({
       sections: [{
         properties: {},
         children: paragraphs,
       }]
     });

      docx.Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, "export.docx");
      });
})

// get Info from Template (how to save? => String)
// get ListX of all selected values in Treeselect
// iterate through ListX: 
// 1. get element from bookmarks of given value
// 2. place Title and Url inside template string
// 3. append template string to ListY
// iterate through ListY:
// 1. append string to DOM as <p> 