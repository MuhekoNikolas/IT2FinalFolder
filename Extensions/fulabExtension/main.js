const pageUrl = new URL(window.location.href)
const Head = document.querySelector("head")

addFavicons()
//removeIndexHtmlFromUrl() //This removes the index.js url extension on fulab sites that can run without it, but it could slow down the site.

createPageMainWrapper()

addNavbarToPage()
manageIndividualPages()

