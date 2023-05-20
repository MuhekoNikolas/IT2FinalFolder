

function drawGraf(arr, col="red"){
    var allXes = []
    var allYes = []
    obj = arr
    tegnBrukXY(0, 11, -15, 30)
    for(let ind in obj){
        yVal = obj[ind]
        x = ind
        y =  yVal
        allXes.push(x)
        allYes.push(y)
        tegnPunkt(x,y, /*/verdi=allData[ind].month,/*/ markør = "sirkel", farge=col)
    }
    
    tegnAkser("Month", "Temperatur", 1, 1)
    tegnKurve(allXes, allYes, farge=col, bredde=0.5)
}

function visGrafMinMax(changeTitle=true){
    viskUt()
    tegnBrukBakgrunn(bgcol);
    changeTitle == true ? tegnTittel(`Tafjord [SN60500] visualisering av MinMax`) : tegnTittel("Tafjord [SN60500]");
    drawGraf(allData.Minimums_temperatur, "blue")
    drawGraf(allData.Maksimums_temperatur, "green")

    tegnTekst("Maksimums temp", 7,3.5, "green")
    tegnTekst("Minimums temp", 7,-4.5, "blue")
}

function visGrafGsnittMinMax(){
    viskUt()
    tegnBrukBakgrunn(bgcol);
    tegnTittel(`Tafjord [SN60500] visualisering av MinMax gjennomsnitt`);
    drawGraf(allData.AllAverages, "red")
    tegnTekst("Gjennomsnitt MinMax", 7, 6.5, "red")
}

function visGrafDiffMinMax(){
    viskUt()
    tegnBrukBakgrunn(bgcol);
    tegnTittel(`Tafjord [SN60500] visualisering av MinMax differanse`);
    drawGraf(allData.Differences, "cyan")
    tegnTekst("Gjennomsnitt MinMax", 7, 6.5, "cyan")
}

function tegnSoyleDiagram(obj, name=null){
    tegnBrukBakgrunn(bgcol);
    tegnTittel(`Tafjord [SN60500] soyle visualisering av ${name}`);
    obj = obj
    for(var yInd in obj){
        y = obj[yInd]
        tegnBrukXY(0, 11, -17, 30)
        tegnFyltRektangel((1*yInd),-10, 1,y,fyllfarge=Colors[yInd])
        console.log(tegn.canvas.width)
        tegnTekst(allData.data[yInd].month.substring(0,3), 1*yInd, 20, farge=Colors[yInd],vinkel=0,justering='left', 10)
        tegnTekst(y, (1*yInd)+1, -10+y, farge="white",vinkel=90,justering='left', 20)
        tegnTekst(`${y}`, -0.5, y-10, farge="orange",vinkel=0,justering='left', 9 )
    }
}