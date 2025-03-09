let templateString

browser.storage.local.get(['template'])
.then((result) => {
    templateString = result.template
})
.catch((error) => {
  console.error(error);
});

const outputDiv = document.getElementById('output')

const generateButton = document.getElementById('generateButton')
generateButton.addEventListener("click", () => {
    outputDiv.innerHTML = ""

    selectedValues = getTreeselectValues()
    selectedBookmarks = getBookmarksFromValues(selectedValues)
    bookmarkStrings = []
    for (let i = 0; i < selectedBookmarks.length; i++) {
        string = fillTemplateWithBookmark(templateString, selectedBookmarks[i], i + 1)

        bookmarkStrings.push(string)
    }

    bookmarkStrings.forEach(bookmarkString => {
        p = `<p>${bookmarkString}</p>`

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


// get Info from Template (how to save? => String)
// get ListX of all selected values in Treeselect
// iterate through ListX: 
// 1. get element from bookmarks of given value
// 2. place Title and Url inside template string
// 3. append template string to ListY
// iterate through ListY:
// 1. append string to DOM as <p> 