
browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({ url: "main.html" });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getBookmarks") {
        // getBookmarks
        browser.bookmarks.getTree()
            .then(bookmarks => {
                sendResponse({result: bookmarks});
            })

            .catch(error => {
                console.error(error);
                sendResponse({result: []})
              });
  
    }

    return true
})

