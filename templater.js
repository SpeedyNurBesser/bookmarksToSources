function fillTemplateWithBookmark(template, bookmark, index) {
    title = bookmark.title
    url = bookmark.url
    
    output = template.replace(/%index/g, index)
    output = output.replace(/%title/g, title)
    output = output.replace(/%url/g, url)
    return output
}