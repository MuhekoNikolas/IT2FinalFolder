


var DATA = null;
var dataAnalyzer;

var leafletMap;
var mapDiv;
var mapContainer;

function initializeMap(){

    mapsPlaceholder = []


    mapContainer = document.querySelector(".mapSection")

    MapId = `Map${Date.now()}`.replace("\.", "_")
    mapDiv = document.getElementById("Map") || document.createElement("div")
    mapDiv.setAttribute("id", MapId)
    mapDiv.setAttribute("class", "Map")
    mapContainer.append(mapDiv)

    leafletMap = L.map(MapId, {
        center: [51.505, -0.09],
        zoom: 13
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(leafletMap)

    lowestAndMostVisitedThree = dataAnalyzer.analyzeLeastAndMostThree()

    topThreeRecordsMarker = L.divIcon({className: "topThreeRecordsMapMarker", iconSize:[15,20], popupAnchor: [0, 0],})
    leastThreeRecordsMarker = L.divIcon({className: "leastThreeRecordsMapMarker", iconSize:[15,20], popupAnchor: [0, 0]})

    for(_ind = 0; _ind<Object.keys(lowestAndMostVisitedThree.most).length; _ind++){
        _record = lowestAndMostVisitedThree.most[Object.keys(lowestAndMostVisitedThree.most)[_ind]]
        marker = L.marker([_record.x, _record.y], {icon: topThreeRecordsMarker, title:_record.locationName}).addTo(leafletMap);
        marker.bindPopup(`<b>${_record.locationName}</b><br />#${_ind+1} Most visited</b><br />${_record.visits} visits`).openPopup();
    }

    for(_ind = 0; _ind<Object.keys(lowestAndMostVisitedThree.least).length; _ind++){
        // _redIcon = L.icon({
        //     iconUrl: '/js/leaflet/images/marker-icon-red.png',
        //     iconAnchor: [22, 94],
        //     popupAnchor: [-9, -85],
        //     shadowUrl: '/js/leaflet/images/marker-shadow.png',
        //     shadowAnchor: [22, 94]
        // });
        

        _record = lowestAndMostVisitedThree.least[Object.keys(lowestAndMostVisitedThree.least)[_ind]]
        marker = L.marker([_record.x, _record.y], {icon:leastThreeRecordsMarker, title:_record.locationName}).addTo(leafletMap);
        marker.bindPopup(`<b>${_record.locationName}</b><br />#${_ind+1} least visited</b><br />${_record.visits} visits`).openPopup();
    }

    TopThreeVisitedPointsDiagram.draw()
    LeastThreeVisitedPointsDiagram.draw()

}



function showLoadingScreen(removeIt=false){
    if(removeIt==false){
        document.querySelector(".loadingScreen")?.classList?.add("active")
    } else {
        document.querySelector(".loadingScreen")?.classList?.remove("active")
    }
}

function userClickedToImportDataFile(){
    if([null, undefined].includes(mapDiv) == false){
        alert("You have already analyzed data during this session, Please refresh the website to analyze more data.")
        window.location.reload()
    }
    _inputParent = document.createElement("div")
    _inputParent.innerHTML = `<input id="dataFileInput" type="file" accept=".csv,.json" onchange="userImportedDataFile(this)">`
    input = _inputParent.children[0]
    input.click()
}

function userImportedDataFile(input){
    showLoadingScreen()
    //Reads the file and checks wether its csv or json.
    input = input || document.getElementById("dataFileInput")
    fileReader = new FileReader()
    files = input.files

    if(files.length > 0){
        fileReader.readAsText(files[files.length-1])
        fileReader.onload = ()=>{
            data = fileReader.result
            
            dataIsJSON = checkDatasetType(data).isJSON;
            if(dataIsJSON == false){
                data = csvToJSON(data)
            } else {
                data = JSON.parse(data)
            }
            DATA = data
            dataAnalyzer = new DataAnalyzer(DATA)

            initializeMap()
            DaysOfWeekDiagram.draw()

            showLoadingScreen(removeIt=true)
        }
        fileReader.onerror = ()=>{alert("An error occured while loading the fileReader"); showLoadingScreen(removeIt=true)}
    }
}


function checkDatasetType(data){
    _response = {
        isJSON: false,
        isCSV: false
    }
    try{
        _data = JSON.parse(data)
        _response.isJSON = true
    } catch(err) {
        _response.isJSON = false
        _response.isCSV = true
    }

    return _response
}

function csvToJSON(csv){
    lines = csv.split('\n')
    keys = lines[0].split(',')
    return lines.slice(1).map(line => {
        return line.split(',').reduce((acc, cur, i) => {
            toAdd = {}
            toAdd[keys[i]] = cur
            return { ...acc, ...toAdd }
        }, {})
    })
}