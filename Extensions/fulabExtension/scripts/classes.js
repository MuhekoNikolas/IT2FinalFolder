class extensionLibrarySideMenuOptionClass{
    constructor(optionInformation){
        this.info = optionInformation

        this.element = document.createElement("div")
        this.element.classList.add("extensionLibrarySideMenuOption")

        if(pageUrl.searchParams.get("info")?.toLowerCase()==this.info.infoParam){
            this.element.classList.add("extensionLibrarySideMenuOptionActive")
        }

        this.element.innerText = this.info.title

        this.element.addEventListener("click", ()=>{
            window.location.href=new URL(this.info.url)
        })

    }
}

class extensionResourcesSideMenuOptionClass{
    constructor(optionInformation){
        this.info = optionInformation
        this.element = document.createElement("div")
        this.element.classList.add("extensionLibrarySideMenuOption")

        if(resourcePageIframe.getAttribute("src").toLowerCase() == this.info.url.toLowerCase()){
            this.element.classList.add("extensionLibrarySideMenuOptionActive")
        }

        this.element.innerText = this.info.title

        this.element.addEventListener("click", ()=>{
            document.querySelectorAll(".extensionLibrarySideMenuOptionActive").forEach(_x=>{
                _x.classList.remove("extensionLibrarySideMenuOptionActive")
            })
            resourcePageIframe.setAttribute("src", this.info.url)
            this.element.classList.add("extensionLibrarySideMenuOptionActive")
        })
    }
}