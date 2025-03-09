function fillTemplateWithBookmark(template, bookmark, index) {
    title = bookmark.title
    url = bookmark.url
    
    output = template.replace('%index', index)
    output = output.replace('%title', title)
    output = output.replace('%url', url)
    return output
}