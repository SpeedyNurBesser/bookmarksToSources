

const domElement = document.getElementById('bookmark-select');
let treeselect;
  
async function getBookmarks() {
    try {
        const response = await browser.runtime.sendMessage({ action: "getBookmarks" })
        return response.result

    } catch(error) {
      console.error(error);
      domElement.innerHTML = "Unable to load bookmarks."

    }
}

function generateTreeselect(bookmarks) {
    output = new Treeselect({
        parentHtmlContainer: domElement,
        value: [],
        options: bookmarks,
        alwaysOpen: true,
        appendToBody: true,
        emptyText: "No bookmarks found..."
      })

    return output
}

let valueIndex = 0

function convertBookmarksToTreeselectObject(bookmarks) {
    //console.log(bookmarks)
    
    bookmarks.forEach(bookmark => {
        valueIndex += 1

        if (!bookmark.children)  {
            bookmark.name = bookmark.title
            bookmark.value = valueIndex
            bookmark.children = []

        } else {
            bookmark.name = bookmark.title
            bookmark.value = valueIndex
            bookmark.children = convertBookmarksToTreeselectObject(bookmark.children)

        }
    });

    return bookmarks
}

async function createBookmarksTree() {
    let plainBookmarks = await getBookmarks()
    valueIndex = 0
    let convertedBookmarks = convertBookmarksToTreeselectObject(plainBookmarks[0].children[1].children)
    console.log(convertedBookmarks)

    if (treeselect) {
        treeselect.destroy()
    }

    treeselect = generateTreeselect(convertedBookmarks)
}

createBookmarksTree()

