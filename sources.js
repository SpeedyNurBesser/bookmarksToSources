
const templateString = ''

const generateButton = document.getElementById('generateButton')
generateButton.addEventListener("click", () => {
    values = getTreeselectValues()
    bookmarks = getBookmarksFromValues(values)
    for (let i = 0; i < bookmarks.length; i++) {
        string = fillTemplateWithBookmark(templateString, i, bookmarks[i].title, bookmarks[i].url)
    }
})

function getTreeselectValues() {
    return treeselect.value
}

function getBookmarksFromValues(values) {
    bookmarkList = []

    values.forEach(value => {
        resullt = findValueInTree(value, bookmarks)
        if (!resullt) {
            console.log("Couldn't find bookmark of value " + value + " in bookmark tree")
            // TODO: handle value not found
        } else {
            bookmarkList.apppend(resullt)
        }
    });

    return bookmarkList
}

function findValueInTree(value, tree) {
    output = undefined
    tree.forEach(children => {
        if (children.children) {
            childrenToCheck = findValueInTree(value, children.children)
        } else {
            childrenToCheck = children
        }

        if (childrenToCheck.value == value) {
            output = children
        }
    });

    return output
}


// get Info from Template (how to save? => String)
// get ListX of all selected values in Treeselect
// iterate through ListX: 
// 1. get element from bookmarks of given value
// 2. place Title and Url inside template string
// 3. append template string to ListY
// iterate through ListY:
// 1. append string to DOM as <p> 