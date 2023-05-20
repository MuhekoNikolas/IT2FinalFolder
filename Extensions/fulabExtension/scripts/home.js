
var pageMainWrapper;
var faviconImage  = "https://fulab.no/fulibs/favicon.png";

var resourcePageIframe = document.createElement("iframe");
resourcePageIframe.classList.add("extensionResourcePageIframe")
resourcePageIframe.setAttribute("src", "https://fulab.no/fusionInfo/guide.html")

navBarHtml = `
    <div class="extensionNavBarHomeButton" style="">Fulab 2.0</div>
    <img class="extensionNavBarProfileSettingsButton" src="https://fulab.no/fulibs/icons/tannhjul.png">
    <div class="extensionNavBarEditorButton" style=""> Editor</div>
    <div class="extensionNavBarApiButton" style=""> API</div>
    <div class="extensionNavBarResourcesButton" style="">  Ressurser</div>
    <div class="extensionNavBarMySubjectButton" style="">Mitt fag</div>
    <div class="extensionNavBarLibraryButton" style="">Skolebibliotek</div>
    <div class="extensionNavBarCalculatorButton" style="">Kalkulator</div>
    <div class="extensionNavBarValeNetlifyButton" style="">Lokal koding</div>
    <div class="extensionNavBarTechtubeButton" style="">TechTube</div>
    <div class="extensionNavBarAboutButton" style="">Om</div>
`

var extensionTabInfo = {
    "KomIgangId":{
        TabId:'KomIgangId',
        FrameId:'HomeFrameId',
        url:'https://fulab.no/fusionInfo/oppstart.html',
    },

    "OppsettId": {
        TabId:'OppsettId',
        FrameId:'OppsettFrameId',
        url:'https://fulab.no/fusionProfil/index.html',
        activated:false
    }
    ,
    "EditorId": {
        TabId:'EditorId',
        FrameId:'EditorFrameId',
        //url:'../fusionIDE/index.html',
        url:'https://fulab.no/fusionIDE_2.0/index.html?v=2.0',
        activated:false
    }
    ,
    "ManualId": {
        TabId:'ManualId',
        FrameId:'ManualFrameId',
        url:'https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionInterface.js,Algo-funksjoner',
        activated:false
    },

    "SkolemappeId":{
        TabId:'SkolemappeId',
        FrameId:'SkolemappeFrameId',
        url:"https://fulab.no/fusionInfo/fagmappe.html"
    },

    "SkolebibliotekId": {
        TabId:'SkolebibliotekId',
        FrameId:'SkolebibliotekFrameId',
        url: "https://fulab.no/fusionInfo/skolebibliotek.html"
    },

    "SyntaksId": {
        TabId:'SyntaksId',
        FrameId:'SyntaksFrameId',
        url:'https://fulab.no/fusionKurs/kodekurs/html/3spraak.html',
        activated:false
    }
    ,
    "RunId": {
        TabId:'RunId',
        FrameId:'KjorFrameId',
        url:'https://fulab.no/fusionCoderun/indexIDE.html?url=autosave',
        activated:false
    }
    ,
    "KalkulatorId": {
        TabId:'KalkulatorId',
        FrameId:'KalkulatorFrameId',
        url:'https://fulab.no/fusionKalkulator/index.html',
        activated:false
    },

    "ProsjektId":{
        TabId:'ProsjektId',
        FrameId:'ProsjektFrameId',
        url:"https://fulab.no/fusionInfo/prosjektet.html",
    },
    

    "GuideId": {
        TabId:'GuideId',
        FrameId:'GuideFrameId',
        url:'https://fulab.no/fusionInfo/guide.html',
        activated:false
    },

    "TechTubeId":{
        TabId: "TechTubeId",
        FrameId: "TechTubeFrameId",
        url: "https://fulab.no/techtube/",
        activated:false
    },

    "ValeNetlifyId": {
        TabId: "ValeNetlifyId",
        FrameId: "ValeNetlifyFrameId",
        url: "https://js-vale.netlify.app/meny/",
        activated:false
    }
}

var extensionLibrarySideMenuInfo = {
    "fusioninterface.js": {
        title: "FusionInterface.js",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionInterface.js",
        infoParam: "fusioninterface.js"
    },

    "fusioninterface.js,algo-funksjoner": {
        title:"Grunnlegende",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionInterface.js,Algo-funksjoner",
        infoParam: "fusioninterface.js,algo-funksjoner"
    },

    "fusioninterface.js,tallbehandling": {
        title: "Tallbehandling",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionInterface.js,Tallbehandling",
        infoParam: "fusioninterface.js,tallbehandling"
    },
 
    "fusioninterface.js,funksjoner": {
        title: "Matematiske Funksjoner",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionInterface.js,funksjoner",
        infoParam: "fusioninterface.js,funksjoner"
    },

    "fusioninterface.js,input/output": {
        title:"Enkel inn/ut dialog",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionInterface.js,Input/Output",
        infoParam: "fusioninterface.js,input/output"
    },

    "fusioninterface.js,lister": {
        title:"Lister",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionInterface.js,Lister",
        infoParam: "fusioninterface.js,lister"
    },

    "fusioninterface.js,matplotlib": {
        title:"Matplotlib",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionInterface.js,Matplotlib",
        infoParam: "fusioninterface.js,matplotlib"
    },

    "tegnepakke.js": {
        title: "Tegnepakke.js",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=tegnepakke.js",
        infoParam: "tegnepakke.js"
    },

    "tegnepakke.js,basis": {
        title:"Tegn-Basis",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=tegnepakke.js,Basis",
        infoParam: "tegnepakke.js,basis"
    },

    "tegnepakke.js,geometri": {
        title:"Tegn-Geometri",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=tegnepakke.js,Geometri",
        infoParam: "tegnepakke.js,geometri"
    },

    "tegnepakke.js,matematikk": {
        title:"Tegn-Matematikk",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=tegnepakke.js,Matematikk",
        infoParam: "tegnepakke.js,matematikk"
    },

    "turtle.js": {
        title:"Turtle.js",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=turtle.js",
        infoParam: "turtle.js"
    },

    "turtle.js,turtle-engelsk": {
        title:"Turtle",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=turtle.js,Turtle-Engelsk",
        infoParam: "turtle.js,turtle-engelsk"
    },

    "datafilreader.js": {
        title:"DatafilReader.js",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=datafilReader.js",
        infoParam: "datafilreader.js"
    },

    "datafilreader.js,csv-databibliotek": {
        title:"Datasett-CSV",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=datafilReader.js,CSV-databibliotek",
        infoParam: "datafilreader.js,csv-databibliotek"
    },

    "fusiondialogpakke.js": {
        title:"FusionDialogpakke.js",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionDialogpakke.js",
        infoParam: "fusiondialogpakke.js"
    },

    "fusiondialogpakke.js,lagdialogelementer": {
        title:"Dialog-Elementer",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionDialogpakke.js,LagDialogelementer",
        infoParam: "fusiondialogpakke.js,lagdialogelementer"
    },

    "fusiondialogpakke.js,feltverdier": {
        title:"Dialog-FeltVerdier",
        url: "https://fulab.no/fulibs/visSeksjonBibliotek.php?info=fusionDialogpakke.js,Feltverdier",
        infoParam: "fusiondialogpakke.js,feltverdier"
    }

}

var extensionResourcesSideMenuInfo = {
    "Informasjon":[
        {
            title:"Informasjon",
            url: "https://fulab.no/fusionInfo/guide.html"
        }
    ],

    "3 språk": [ 
        {
            title: "Syntax",
            url:"https://fulab.no/fusionKurs/kodekurs/html/3spraak.html"
        }
    ],

    "Kursmoduler":[
        {
            title: "Kursmeny",
            url:"https://fulab.no/page.php?skolemappe=fusion&&fagmappe=kodekurs&&side=meny.html"
        }
    ],
    
    "Eksempelkode":[
        {
            title: "Lokal koding",
            url:"https://fulab.no/fusionInfo/kodelokalt/plotting.html"
        },

        {
            title: "Temaveiviser",
            url:"https://fulab.no/fusionKurs/index.html"
        },


        {
            title: "Turtle",
            url:"https://fulab.no/fusionCoderun/visTurtle.html"
        },

        {
            title: "Tren matte",
            url:"https://fulab.no/fusionCoderun/trenMatte.html"
        }
    ],

    "Biblioteker": [
        {
            title: "Math.js (CDN)",
            url:"https://fulab.no/fusionInfo/mathJS.html"
        },

        {
            title: "Bilder",
            url:"https://fulab.no/fusionBilder/index.html"
        }
    ],

    "Developer": [
        {
            title: "devdocs.io",
            url:"https://fulab.no/fusionInfo/devdocs.html"
        }
    ]
    
}


var ExtensionSchoolLibrarySideMenuInfo = {
    "/fusioninfo/skolebibliotek.html": {
        name: "Informasjon",
        url: "https://fulab.no/fusionInfo/skolebibliotek.html"
    }, 

    "/fusionserver/index_stubs.html?type=kodestarter": {
        name: "Kodestarter",
        url: "https://fulab.no/fusionServer/index_stubs.html?type=kodestarter",
    },

    "/fusionserver/index_csvdata.html?type=data": {
        name: "Databibliotek",
        url: "https://fulab.no/fusionServer/index_csvdata.html?type=data",
    },

    "/fusionserver/index_libs.html?type=bibliotek": {
        name: "Kodebibliotek",
        url: "https://fulab.no/fusionServer/index_libs.html?type=bibliotek",
    },

    "/fusionserver/index_apps.html?type=html": {
        name: "Nettside",
        url: "https://fulab.no/fusionServer/index_apps.html?type=html",
    }
}