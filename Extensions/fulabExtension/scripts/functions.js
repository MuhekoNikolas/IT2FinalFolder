


function redirectToTab(tabId){
    //Redirects the user to a page when they click on a navBar button. 
    tabInfo = extensionTabInfo[tabId] //fetch info about the tabId from extensionTabInfo
    if(tabInfo==null){
        return
    }
    requestedTabUrl = tabInfo.url
    window.location.href = requestedTabUrl
}


function addFavicons(){
    //Adds the fulab favicon on the page, I wanted the favicon to remain the same even when the url changes from fulab.com/*
    faviconLink = document.createElement("link")
    faviconLink.rel = "icon"
    faviconLink.href = faviconImage
    faviconLink.type = "image/png"
    document.querySelector("head").append(faviconLink)
}


function addNavbarToPage(){
    //Creates a navbar and adds it to the page, NB: Might need some improvements and use of loops.
    OriginalNavBar = document.querySelector(".tab")
    if(OriginalNavBar){
        OriginalNavBar.remove()
    }

    myNavBar = document.createElement("div")
    myNavBar.classList.add("extensionNavBar")


    /*
        <button class="tabitems extensionNavBarHomeButton">Fulab 2.0</button>
        <img class="extensionNavBarProfileSettingsButton" onclick="openTab(event, 'OppsettId')" src="../fulibs/icons/tannhjul.png">
        <button class="tabitems extensionNavBarEditorButton" onclick="openTab(event, 'EditorId')"> Editor</button>
        <button class="tabitems extensionNavBarApiButton" onclick="openTab(event, 'ManualId')"> API</button>
        <button class="tabitems extensionNavBarResourcesButton" onclick="openTab(event, 'GuideId')">  Ressurser</button>
        <button class="tabitems extensionNavBarMySubjectButton" onclick="openTab(event, 'SkolemappeId')">Mitt fag</button>
        <button class="tabitems extensionNavBarLibraryButton" onclick="openTab(event, 'SkolebibliotekId')">Skolebibliotek</button>
        <button class="tabitems extensionNavBarCalculatorButton" onclick="openTab(event, 'KalkulatorId')">Kalkulator</button>
        <button class="tabitems extensionNavBarAboutButton" onclick="openTab(event, 'ProsjektId')">Om</button>
    */


    myNavBar.innerHTML = navBarHtml //Update the nav bars html to the custom code defined in home.js.
    document.body.insertBefore(myNavBar, document.body.children[0]) //Add the navbar to the top of the page.

    //Select all buttons added to the navbar through line: 48
    extensionNavBarHomeButton = document.querySelector(".extensionNavBarHomeButton") || document.createElement("button")
    extensionNavBarHomeButton.addEventListener("click", ()=>{redirectToTab(tabId="KomIgangId")} ) //Make it redirect to a page when clicked.
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["KomIgangId"].url).pathname.toLowerCase() ){ //If the user is currently on this button's redirect page, then highlight the button.
        extensionNavBarHomeButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarProfileSettingsButton = document.querySelector(".extensionNavBarProfileSettingsButton") || document.createElement("button")
    extensionNavBarProfileSettingsButton.addEventListener("click", ()=>{redirectToTab(tabId="OppsettId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["OppsettId"].url).pathname.toLowerCase() ){
        extensionNavBarProfileSettingsButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarEditorButton = document.querySelector(".extensionNavBarEditorButton") || document.createElement("button")
    extensionNavBarEditorButton.addEventListener("click", ()=>{redirectToTab(tabId="EditorId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["EditorId"].url).pathname.toLowerCase() ){
        extensionNavBarEditorButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarApiButton = document.querySelector(".extensionNavBarApiButton") || document.createElement("button")
    extensionNavBarApiButton.addEventListener("click", ()=>{redirectToTab(tabId="ManualId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["ManualId"].url).pathname.toLowerCase() ){
        extensionNavBarApiButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarResourcesButton = document.querySelector(".extensionNavBarResourcesButton") || document.createElement("button")
    extensionNavBarResourcesButton.addEventListener("click", ()=>{redirectToTab(tabId="GuideId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["GuideId"].url).pathname.toLowerCase() ){
        extensionNavBarResourcesButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarMySubjectButton = document.querySelector(".extensionNavBarMySubjectButton") || document.createElement("button")
    extensionNavBarMySubjectButton.addEventListener("click", ()=>{redirectToTab(tabId="SkolemappeId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["SkolemappeId"].url).pathname.toLowerCase() ){
        extensionNavBarMySubjectButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarLibraryButton = document.querySelector(".extensionNavBarLibraryButton") || document.createElement("button")
    extensionNavBarLibraryButton.addEventListener("click", ()=>{redirectToTab(tabId="SkolebibliotekId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["SkolebibliotekId"].url).pathname.toLowerCase() ){
        extensionNavBarLibraryButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarCalculatorButton = document.querySelector(".extensionNavBarCalculatorButton") || document.createElement("button")
    extensionNavBarCalculatorButton.addEventListener("click", ()=>{redirectToTab(tabId="KalkulatorId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["KalkulatorId"].url).pathname.toLowerCase() ){
        extensionNavBarCalculatorButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarTechtubeButton = document.querySelector(".extensionNavBarTechtubeButton") || document.createElement("button")
    extensionNavBarTechtubeButton.addEventListener("click", ()=>{redirectToTab(tabId="TechTubeId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["TechTubeId"].url).pathname.toLowerCase() ){
        extensionNavBarTechtubeButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarValeNetlifyButton = document.querySelector(".extensionNavBarValeNetlifyButton") || document.createElement("button")
    extensionNavBarValeNetlifyButton.addEventListener("click", ()=>{redirectToTab(tabId="ValeNetlifyId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["ValeNetlifyId"].url).pathname.toLowerCase() ){
        extensionNavBarValeNetlifyButton.classList.add("extensionTopBarButtonActive")
    }

    extensionNavBarAboutButton = document.querySelector(".extensionNavBarAboutButton") || document.createElement("button")
    extensionNavBarAboutButton.addEventListener("click", ()=>{redirectToTab(tabId="ProsjektId")} )
    if( pageUrl.pathname.toLowerCase() == new URL(extensionTabInfo["ProsjektId"].url).pathname.toLowerCase() ){
        extensionNavBarAboutButton.classList.add("extensionTopBarButtonActive")
    }
}


function manageIndividualPages(){
    //This functions calls other specific functions based on what site the use is on.
    pageUrlPath = pageUrl.pathname.toLowerCase()+pageUrl.search //Get the current url excluding the domain. (/home?search=about)
    if(["/", "/2.0", "/2.0/", "/2.0/index.html", "/2.0/index.html/"].includes(pageUrlPath.toLowerCase())){
        //If the current page is the homepage, then redirect to fulab's oppstart page. This speeds up the page because "/2.0/index.html" takes alot of time to load compared to "/oppstart.html"
        document.location.href = "https://fulab.no/fusionInfo/oppstart.html"
        return
    }

    if(["/fulibs/visseksjonbibliotek.php", "/fulibs/visseksjonbibliotek.php/", "/fusionmanual/?5", "/fusionmanual/?5/", "/fusionmanual", "/fusionmanual/"].includes(pageUrl.pathname.toLowerCase())){
        //If the curent page is the API page.
        addLibrarySideMenu() 
    }

    if(["/fusioninfo/fagmappe.html/", "/fusioninfo/fagmappe.html"].includes(pageUrlPath.toLowerCase())){
                //If the curent page is the Fagmappe page.
        addSubjectFolderInputs()
    }

    if(["/fusioninfo/guide.html/", "/fusioninfo/guide.html"].includes(pageUrlPath.toLowerCase())){
        //If the curent page is the Ressurser page.
        addResourcesSideMenu()
    }

    if(["/fusioninfo/skolebibliotek.html/", "/fusioninfo/skolebibliotek.html"].concat(Object.keys(ExtensionSchoolLibrarySideMenuInfo)).includes(pageUrlPath.toLowerCase())){ 
        //If the curent page is the Skolebibliotek page.
        addSchoolLibrarySideMenu()
    }
}



function removeIndexHtmlFromUrl(){
    //Removes /index.html from pages that support it.
    if(["/2.0/", "/2.0", "/2.0/index.html/", "/2.0/index.html"].includes(pageUrl.pathname.toLowerCase())){
        window.location.href = "https://fulab.no/fusionInfo/oppstart.html"
        return
    }

    if(pageUrl.pathname.endsWith("/index.html")){
        pageUrl.pathname = pageUrl.pathname.slice(0, pageUrl.pathname.length-11)
        window.location.href = pageUrl
        return
    }
}

function addLibrarySideMenu(){
    librarySideMenu = document.createElement("div")
    librarySideMenu.classList.add("extensionLibrarySideMenu")

    pageMainWrapper.style = "left:210px; width: calc( 100vw - 220px );"
    document.body.insertBefore(librarySideMenu, pageMainWrapper)

    Object.keys(extensionLibrarySideMenuInfo).forEach(_librarySideMenuOption_=>{
        _option = new extensionLibrarySideMenuOptionClass(extensionLibrarySideMenuInfo[_librarySideMenuOption_])
        librarySideMenu.append(_option.element)
    })
}

function addSubjectFolderInputs(){
    pageMainWrapper.innerHTML = `  
        Skolemappe 
        <input id="mfag_smappe">  <!-- NB oppdateres i fusionAdmin -->
        Fagmappe
        <input id="mfag_fmappe">
        <button class="navbutton1"> Fagmeny</button>
        <button class="navbutton2"> Kodebibliotek</button>
        <div>
            <iframe class="frame" id="SkolemappeFrameId" src="../fusionInfo/fagmappe.html"> </iframe>
        </div>
    `;
    document.querySelector(".navbutton1").addEventListener("click", openSchoolCourseMenu)
    document.querySelector(".navbutton2").addEventListener("click", openSchoolCourseLib)
}

function createPageMainWrapper(){
    pageMainWrapper = document.createElement("div")
    pageMainWrapper.classList.add("extensionPageMainWrapper")
    
    _bodyHtml = document.body.innerHTML
    document.body.innerHTML = ""

    pageMainWrapper.innerHTML = _bodyHtml
    
    document.body.append(pageMainWrapper)

    // manualTable = document.querySelector(".FusionManualTable") || document.createElement("table")
    // pageMainWrapper.append(manualTable)
}


function addResourcesSideMenu(){
    resourcesSideMenu = document.createElement("div")
    resourcesSideMenu.classList.add("extensionLibrarySideMenu")
    resourcesSideMenu.classList.add("extensionResourceSideMenu")

    pageMainWrapper.style = "left:210px; width: calc( 100vw - 220px );"
    document.body.insertBefore(resourcesSideMenu, pageMainWrapper)

    pageMainWrapper.innerHTML = "";
    pageMainWrapper.append(resourcePageIframe)

    sideMenuSectionNames = Object.keys(extensionResourcesSideMenuInfo)
    resourcePageIframe.setAttribute("src", extensionResourcesSideMenuInfo["Informasjon"][0].url)

    for(let sideMenuSectionName of sideMenuSectionNames){
        _thisSectionParentElement = document.createElement("div")
        _thisSectionParentElement.classList.add("extensionResourceSideMenuSectionParent")
        _thisTitleElement = document.createElement("h4")
        _thisTitleElement.classList.add("extensionResourceSideMenuSectionTitle")
        _thisTitleElement.innerText = sideMenuSectionName
        _thisSectionParentElement.append(_thisTitleElement)

        sideMenuSectionContent = extensionResourcesSideMenuInfo[sideMenuSectionName]
        for(_optionInfo of sideMenuSectionContent){
            option = new extensionResourcesSideMenuOptionClass(_optionInfo)
            _thisSectionParentElement.append(option.element)
        }

        resourcesSideMenu.append(_thisSectionParentElement)
    }
}


function addSchoolLibrarySideMenu(){
    /*
    <div class="column1">
		<p> Premium <br>Krever bruksavtale </p>
		<h2>Verktøy</h2>
		<button class="navbutton" onclick="openServer('SkolebibliotekFrameId','../fusionServer/index_stubs.html?type=kodestarter' )"> Kodestarter</button><br>
		<button class="navbutton" onclick="openServer('SkolebibliotekFrameId','../fusionServer/index_csvdata.html?type=data' )"> Databibliotek</button><br>
		<button class="navbutton" onclick="openServer('SkolebibliotekFrameId','../fusionServer/index_libs.html?type=bibliotek' )"> Kodebibliotek</button><br>
		<button class="navbutton" onclick="openServer('SkolebibliotekFrameId','../fusionServer/index_apps.html?type=html' )"> Nettside</button><br>
	</div>
    */

    //console.log(Object.keys(ExtensionSchoolLibrarySideMenuInfo), pageUrl.pathname.toLowerCase()+pageUrl.search)

    _schoolLibrarySideMenu = document.createElement("div")

    _schoolLibrarySideMenu.classList.add("extensionLibrarySideMenu")

    pageMainWrapper.style = "left:210px; width: calc( 100vw - 220px );"
    document.body.insertBefore(_schoolLibrarySideMenu, pageMainWrapper)

    _schoolLibrarySideMenuInfoDiv = document.createElement("div")
    _schoolLibrarySideMenuInfoDiv.innerHTML =  `<h2>Premium krever bruksAvtale</h2>
    <h3>Verktøy</h3>`
    _schoolLibrarySideMenuInfoDiv.classList.add("schoolLibrarySideMenuInfoDiv")
    _schoolLibrarySideMenu.append(_schoolLibrarySideMenuInfoDiv)

    _schoolLibrarySideMenuLinksDiv = document.createElement("div")

    for(_schoolLibrarySideMenuElementKey  of Object.keys(ExtensionSchoolLibrarySideMenuInfo)){
        _schoolLibrarySideMenuElement = ExtensionSchoolLibrarySideMenuInfo[_schoolLibrarySideMenuElementKey]
        _thisAnchor = document.createElement("a")
        _thisAnchor.setAttribute("href", _schoolLibrarySideMenuElement.url)
        _thisAnchor.classList.add("extensionLinksButton")
        _thisContainer = document.createElement("div")
        _thisContainer.innerText = _schoolLibrarySideMenuElement.name

        _thisContainer.classList.add("extensionSchoolLibrarySideMenuOption")

        if([_schoolLibrarySideMenuElementKey, `${_schoolLibrarySideMenuElementKey}/`].includes(pageUrl.pathname.toLowerCase()+pageUrl.search)){
            _thisContainer.classList.add("extensionSchoolLibrarySideMenuOptionActive")
        }

        _thisAnchor.append(_thisContainer)
        _schoolLibrarySideMenuLinksDiv.append(_thisAnchor)
    }

    _schoolLibrarySideMenu.append(_schoolLibrarySideMenuLinksDiv)

}