


var norwegianInput;
var englishInput;

var initialDictionary = "Hello;Hallo\nBye;Hadde\nDog;Hund\nCat;Katt\nZoo;Dyr-Parken"


function initialiseVariables(){
    //Initialising variables on startup.
    norwegianInput = document.querySelector("#norwegianInput")
    englishInput = document.querySelector("#englishInput")

    localStorage.getItem("dictionary") == null ? localStorage.setItem("dictionary", initialDictionary) : -1

    norwegianInput.addEventListener("keypress", (()=>{translate("no-en")}))
    englishInput.addEventListener("keypress", (()=>{translate("en-no")}))

    updateWordsTable()
}


function changeDictionaryToFile(input){
    //Enables the user to import a csv file as a dictionary.
    fileReader = new FileReader()
    files = input.files

    if(files.length > 0){
        fileReader.readAsText(files[files.length-1])
        fileReader.onload = ()=>{
            content = fileReader.result
            reg = new RegExp("[a-zA-Z0-9(-?)]+;[a-zA-Z0-9(-?)]+","ig")
            allTranslations = content.match(reg)
            newEnglishTranslations = []
            newNorwegianTranslations = []
            newAllTranslations = []
            allUnrepeatedTranslations = []
            allTranslations.forEach(translation=>{
                newEnAndNoWords = translation.split(";")
                if(!newEnglishTranslations.includes(newEnAndNoWords[0].toLowerCase())){
                    if(!newNorwegianTranslations.includes(newEnAndNoWords[1].toLowerCase())){
                        newEnglishTranslations.push(newEnAndNoWords[0].toLowerCase())
                        newNorwegianTranslations.push(newEnAndNoWords[1].toLowerCase())
                        allUnrepeatedTranslations.push(`${capitalize(newEnAndNoWords[0])};${capitalize(newEnAndNoWords[1])}`)
                    }
                }
            })
            resetDictionary(newDict=allUnrepeatedTranslations.join("\n"))
        }
        fileReader.onerror = ()=>{alert("An error occured while loading the fileReader")}
    }
}


function resetDictionary(newDict){
    //Resets/deletes the currently saved dictionary.
    if( typeof(newDict) != "string" ){
        localStorage.setItem("dictionary", initialDictionary)
    } else {
        localStorage.setItem("dictionary", newDict)
    }
    updateWordsTable()
}

function capitalize(word){
    //Capitalises a word: "hello" -> "Hello"
    return word[0].toUpperCase() + word.substring(1,word.length).toLowerCase()
}


function translate(lang){
    //Translates the values of the inputs.
    if(lang=="no-en"){
        englishInput.setAttribute("disabled", "true")
        norwegianInput.removeAttribute("disabled")

        englishInput.value = ""
        toTranslate = norwegianInput.value 
        translation = getTranslation(lang="no-en", toTranslate)
        englishInput.value = translation

    } else {
        englishInput.removeAttribute("disabled")
        norwegianInput.setAttribute("disabled", "")

        norwegianInput.value = ""
        toTranslate = englishInput.value 
        translation = getTranslation(lang="en-no", toTranslate)
        norwegianInput.value = translation
    }

}

function changeTranslation(langSetting){
    //Changes the translation setting for the app. || Enables switching between languages.
    if(langSetting == "en-no"){
        englishInput.removeAttribute("disabled")
        norwegianInput.setAttribute("disabled", "")
        translate(lang="en-no")
    } else {
        englishInput.setAttribute("disabled", "true")
        norwegianInput.removeAttribute("disabled")
        translate(lang="no-en")
    }
}

function getTranslation(lang, toTranslate){
    //Gets a translation from the Dictionary.
    if(toTranslate == ""){toTranslate = "null"}

    dictionary = localStorage.getItem("dictionary")
    norwegianToEnglishRegex = new RegExp( `[a-zA-Z(-?)]+;[a-zA-Z]*${toTranslate}[a-zA-Z]*`, "ig")
    englishToNorwegianRegex = new RegExp( `[a-zA-Z]*${toTranslate}[a-zA-Z]*;[a-zA-Z(-?)]+`, "ig")

    if(lang == "no-en"){  
        matches = dictionary.match(norwegianToEnglishRegex) || null

        if(matches == null) { return "" }
        match = matches[0].split(";")

        if(match[1].toLowerCase() == toTranslate.toLowerCase()){return match[0]} else {return ""}
    } else {
        matches = dictionary.match(englishToNorwegianRegex) || null

        if(matches == null) { return "" }
        match = matches[0].split(";")

        if(match[0].toLowerCase() == toTranslate.toLowerCase()){return match[1]} else {return ""}
    }
}

function isNull(val){
    //Checks if the value is null/Doesnot exist
    if(val.length < 1){
        return true
    } else {
        return false
    }
}

function addNewTranslation(){
    //Adds a new translation to the dictionary.

    newNorwegianInput = document.getElementById("addNewTranslationNorwegianInput")
    newEnglishInput = document.getElementById("addNewTranslationEnglishInput")

    if(isNull(newNorwegianInput.value)==false){
        if(isNull(newEnglishInput.value)==false){
            norwegianWordExists = getTranslation(lang="no-en", newNorwegianInput.value)
            if( norwegianWordExists.length < 1){
                englishWordExists = getTranslation(lang="en-no", newEnglishInput.value)

                if( englishWordExists.length < 1){

                    dictionary = localStorage.getItem("dictionary")
                    val = `${dictionary}\n${capitalize(newEnglishInput.value)};${capitalize(newNorwegianInput.value)}`
                    localStorage.setItem("dictionary", val)
                    alert("Created new translation")
                    updateWordsTable()
    
                } else {
                    alert("No duplicates allowed.")
                }

            } else {
                alert("No duplicates allowed.")
            }
        } else {
            alert("New English word field cant be empty")
        }

    } else {
        alert("New Norwegian word field cant be empty")
    }
}

function updateWordsTable(){
    //Updates the table that shows all the words in the dictionary
    allWordsTable = document.querySelector(".translaterAllTranslationsTable")
    allWordsTable.innerHTML = "<tr><th>Index</th><th>English</th><th>Norwegian</th></tr>"
    dictionary = localStorage.getItem("dictionary")
    reg = new RegExp("[a-zA-Z0-9(-?)]+;[a-zA-Z0-9(-?)]+","ig")
    allTranslations = dictionary.match(reg) || []

    allTranslations.sort((x,y)=>{
        x.substring(0,1) > y.substring(0,1) ? toReturn = 1 : toReturn = -1
        return toReturn
    })


    allTranslations.forEach(translation=>{
        splitted = translation.split(";")
        english = splitted[0]
        norwegian = splitted[1]
        row = document.createElement("tr")
        indCell = document.createElement("td")
        englishCell = document.createElement("td")
        norwegianCell = document.createElement("td")

        indCell.innerText = allTranslations.indexOf(translation)
        englishCell.innerText  = english
        norwegianCell.innerText  = norwegian

        row.append(indCell)
        row.append(englishCell)
        row.append(norwegianCell)

        allWordsTable.append(row)
    })
    
}